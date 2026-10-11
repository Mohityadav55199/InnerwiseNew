#!/usr/bin/env node
/**
 * Zero-dependency visual regression check (Node ≥ 22 for global fetch/WebSocket).
 *
 *   node scripts/visual-diff.mjs snap <label> [url]    → .visual/<label>-<width>-<tile>.png
 *   node scripts/visual-diff.mjs diff <before> <after> → changed-pixel report per width
 *                                                         + .visual/diff-<before>-<after>-<width>-<tile>.png
 *
 * Drives a local Chrome/Edge over the DevTools protocol. Full pages are captured as 2000px
 * tiles (a single ~10k px capture stalls headless Chrome) and compared tile by tile on a
 * <canvas> inside the browser, so no image libraries are needed.
 * Start the site first: `npm run build && npm run preview` (default url below).
 * Env: WIDTHS=375,768,1440  CHROME_PATH=…  DEBUG=1
 */
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const WIDTHS = (process.env.WIDTHS || '375,768,1440').split(',').map(Number);
const TILE = 2000;
const OUT = path.resolve('.visual');
const BROWSERS = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
];
// 1×1 transparent PNG — stands in for a tile that exists in only one of the two snapshots
const BLANK = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const t0 = Date.now();
const log = (...a) => { if (process.env.DEBUG) console.log(`  [${((Date.now() - t0) / 1000).toFixed(1)}s]`, ...a); };
const tilesOf = (label, width) => fs.readdirSync(OUT).filter((f) => f.startsWith(`${label}-${width}-`)).length;

async function launch() {
  const exe = process.env.CHROME_PATH || BROWSERS.find((p) => fs.existsSync(p));
  if (!exe) throw new Error('No Chrome/Edge found — set CHROME_PATH');
  const port = 9500 + Math.floor(Math.random() * 400);
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'visual-diff-'));
  const proc = spawn(exe, ['--headless=new', `--remote-debugging-port=${port}`, '--hide-scrollbars',
    '--disable-gpu', `--user-data-dir=${profile}`, 'about:blank'], { stdio: 'ignore' });

  let target;
  for (let i = 0; i < 60 && !target; i++) {
    await sleep(250);
    try { target = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).find((t) => t.type === 'page'); } catch { /* not up yet */ }
  }
  if (!target) throw new Error('Browser did not start');

  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((r) => { ws.onopen = r; });
  let id = 0;
  const pending = new Map();
  ws.onmessage = (e) => {
    const msg = JSON.parse(e.data);
    if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg.result); pending.delete(msg.id); }
  };
  const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
  const evaluate = async (expression) => (await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true })).result.value;
  const close = () => { ws.close(); proc.kill(); };
  return { send, evaluate, close };
}

async function snap(label, url = 'http://localhost:4173/') {
  fs.mkdirSync(OUT, { recursive: true });
  const b = await launch();
  try {
    for (const width of WIDTHS) {
      await b.send('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: width < 800 });
      await b.send('Page.navigate', { url });
      for (let i = 0; i < 40; i++) {
        await sleep(250);
        if (await b.evaluate("document.readyState === 'complete' && !!document.querySelector('#root footer')")) break;
      }
      await b.evaluate('document.fonts.ready');
      log('loaded', width);

      // load lazy images up front, then scroll through once so async-decoded images are painted
      await b.evaluate(`(async () => {
        document.querySelectorAll('img[loading="lazy"]').forEach((i) => { i.loading = 'eager'; });
        const loaded = Promise.all([...document.images].map((i) => i.complete ? 0 : new Promise((r) => { i.addEventListener('load', r); i.addEventListener('error', r); })));
        await Promise.race([loaded, new Promise((r) => setTimeout(r, 8000))]);
        for (let y = 0; y < document.documentElement.scrollHeight; y += 600) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); }
        scrollTo(0, 0);
        await Promise.race([Promise.all([...document.images].map((i) => i.decode().catch(() => {}))), new Promise((r) => setTimeout(r, 5000))]);
      })()`);
      await sleep(1400); // let the scroll-reveal transitions finish
      log('images ready', width);

      const height = await b.evaluate('document.documentElement.scrollHeight');
      for (const old of fs.readdirSync(OUT).filter((f) => f.startsWith(`${label}-${width}-`))) fs.rmSync(path.join(OUT, old));
      let tile = 0;
      for (let y = 0; y < height; y += TILE, tile++) {
        const shot = await b.send('Page.captureScreenshot', {
          format: 'png', captureBeyondViewport: true, clip: { x: 0, y, width, height: Math.min(TILE, height - y), scale: 1 },
        });
        fs.writeFileSync(path.join(OUT, `${label}-${width}-${tile}.png`), Buffer.from(shot.data, 'base64'));
      }
      console.log(`${label}  ${width}×${height}  (${tile} tiles)`);
    }
  } finally { b.close(); }
}

/** Runs in the page: compares two base64 PNGs, returns counts and a diff image. */
const COMPARE = `async (a, c) => {
  const load = (d) => new Promise((r) => { const i = new Image(); i.onload = () => r(i); i.src = 'data:image/png;base64,' + d; });
  const [A, B] = await Promise.all([load(a), load(c)]);
  const w = Math.max(A.width, B.width), h = Math.max(A.height, B.height);
  const px = (img) => { const cv = new OffscreenCanvas(w, h); const x = cv.getContext('2d'); x.drawImage(img, 0, 0); return x.getImageData(0, 0, w, h).data; };
  const da = px(A), db = px(B);
  const out = new OffscreenCanvas(w, h); const ox = out.getContext('2d'); const od = ox.createImageData(w, h);
  let changed = 0, minY = Infinity, maxY = -1;
  for (let i = 0; i < da.length; i += 4) {
    const d = Math.abs(da[i] - db[i]) + Math.abs(da[i + 1] - db[i + 1]) + Math.abs(da[i + 2] - db[i + 2]);
    if (d > 24) { changed++; const y = Math.floor(i / 4 / w); minY = Math.min(minY, y); maxY = Math.max(maxY, y); od.data.set([255, 0, 80, 255], i); }
    else { const g = (db[i] + db[i + 1] + db[i + 2]) / 3; od.data.set([g, g, g, 60], i); }
  }
  ox.putImageData(od, 0, 0);
  const buf = new Uint8Array(await (await out.convertToBlob({ type: 'image/png' })).arrayBuffer());
  let s = ''; for (let i = 0; i < buf.length; i += 0x8000) s += String.fromCharCode(...buf.subarray(i, i + 0x8000));
  return { changed, total: w * h, rows: changed ? [minY, maxY] : null, png: btoa(s) };
}`;

async function diff(before, after) {
  const b = await launch();
  try {
    for (const width of WIDTHS) {
      const count = Math.max(tilesOf(before, width), tilesOf(after, width));
      let changed = 0;
      let total = 0;
      const rows = [];
      for (let t = 0; t < count; t++) {
        const read = (label) => {
          const f = path.join(OUT, `${label}-${width}-${t}.png`);
          return fs.existsSync(f) ? fs.readFileSync(f).toString('base64') : BLANK;
        };
        const r = await b.evaluate(`(${COMPARE})(${JSON.stringify(read(before))}, ${JSON.stringify(read(after))})`);
        fs.writeFileSync(path.join(OUT, `diff-${before}-${after}-${width}-${t}.png`), Buffer.from(r.png, 'base64'));
        changed += r.changed;
        total += r.total;
        if (r.rows) rows.push(`${t * TILE + r.rows[0]}–${t * TILE + r.rows[1]}`);
      }
      const pct = total ? ((changed / total) * 100).toFixed(3) : '0.000';
      console.log(`${width}px  ${changed} px changed (${pct}%)  ${count} tiles${rows.length ? `  rows ${rows.join(', ')}` : ''}`);
    }
  } finally { b.close(); }
}

const [cmd, ...args] = process.argv.slice(2);
if (cmd === 'snap' && args[0]) await snap(args[0], args[1]);
else if (cmd === 'diff' && args[1]) await diff(args[0], args[1]);
else { console.log('usage: visual-diff.mjs snap <label> [url] | diff <before> <after>'); process.exit(1); }
process.exit(0);
