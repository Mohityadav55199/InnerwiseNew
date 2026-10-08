const { spawn } = require('child_process');
const http = require('http');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const port = 9225;

const browser = spawn(chromePath, [
  '--headless',
  `--remote-debugging-port=${port}`,
  '--disable-gpu',
  '--no-sandbox',
  '--window-size=1440,9002',
  'http://localhost:5173'
]);

function getJSON(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => resolve(JSON.parse(d)));
    }).on('error', reject);
  });
}

setTimeout(async () => {
  try {
    const list = await getJSON(`http://127.0.0.1:${port}/json/list`);
    const page = list.find(p => p.type === 'page');
    const ws = new WebSocket(page.webSocketDebuggerUrl);

    let msgId = 1;
    const callbacks = new Map();
    ws.onmessage = (e) => {
      const res = JSON.parse(e.data);
      if (res.id && callbacks.has(res.id)) {
        callbacks.get(res.id)(res);
        callbacks.delete(res.id);
      }
    };

    function send(method, params = {}) {
      return new Promise((resolve) => {
        const id = msgId++;
        callbacks.set(id, resolve);
        ws.send(JSON.stringify({ id, method, params }));
      });
    }

    await new Promise(r => ws.onopen = r);
    await new Promise(r => setTimeout(r, 2000));

    await send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 9002,
      deviceScaleFactor: 1,
      mobile: false
    });

    await new Promise(r => setTimeout(r, 400));

    const res = await send('Runtime.evaluate', {
      returnByValue: true,
      expression: `JSON.stringify({
        scrollW: document.body.scrollWidth,
        innerW: window.innerWidth,
        scrollH: document.body.scrollHeight,
        heroMedia: (() => { const r = document.querySelector('.hero-tier-b > div:last-child')?.getBoundingClientRect(); return r ? { x: Math.round(r.x), y: Math.round(r.y + window.scrollY), w: Math.round(r.width), h: Math.round(r.height) } : null; })(),
        heroStatement: (() => { const r = document.querySelector('.hero-tier-b > p')?.getBoundingClientRect(); return r ? { x: Math.round(r.x), y: Math.round(r.y + window.scrollY), w: Math.round(r.width), h: Math.round(r.height) } : null; })(),
        discoverPanel: (() => { const r = document.querySelector('.discover-panel')?.getBoundingClientRect(); return r ? { x: Math.round(r.x), y: Math.round(r.y + window.scrollY), w: Math.round(r.width), h: Math.round(r.height) } : null; })(),
        frameworkInner: (() => { const r = document.querySelector('.framework-inner')?.getBoundingClientRect(); return r ? { x: Math.round(r.x), y: Math.round(r.y + window.scrollY), w: Math.round(r.width), h: Math.round(r.height) } : null; })(),
        ritualsBanner: (() => { const r = document.querySelector('.rituals-banner')?.getBoundingClientRect(); return r ? { x: Math.round(r.x), y: Math.round(r.y + window.scrollY), w: Math.round(r.width), h: Math.round(r.height) } : null; })(),
        approachInner: (() => { const r = document.querySelector('.approach-inner')?.getBoundingClientRect(); return r ? { x: Math.round(r.x), y: Math.round(r.y + window.scrollY), w: Math.round(r.width), h: Math.round(r.height) } : null; })(),
        aiPhone: (() => { const r = document.querySelector('.ai-phone-wrap')?.getBoundingClientRect(); return r ? { x: Math.round(r.x), y: Math.round(r.y + window.scrollY), w: Math.round(r.width), h: Math.round(r.height) } : null; })(),
        aiAvatar: (() => { const r = document.querySelector('.ai-avatar')?.getBoundingClientRect(); return r ? { x: Math.round(r.x), y: Math.round(r.y + window.scrollY), w: Math.round(r.width), h: Math.round(r.height) } : null; })(),
        aiContent: (() => { const r = document.querySelector('.ai-content')?.getBoundingClientRect(); return r ? { x: Math.round(r.x), y: Math.round(r.y + window.scrollY), w: Math.round(r.width), h: Math.round(r.height) } : null; })(),
        exploreGrid: (() => { const r = document.querySelector('.explore-grid')?.getBoundingClientRect(); return r ? { x: Math.round(r.x), y: Math.round(r.y + window.scrollY), w: Math.round(r.width), h: Math.round(r.height) } : null; })(),
        faqInner: (() => { const r = document.querySelector('.faq-inner')?.getBoundingClientRect(); return r ? { x: Math.round(r.x), y: Math.round(r.y + window.scrollY), w: Math.round(r.width), h: Math.round(r.height) } : null; })(),
        finalCta: (() => { const r = document.querySelector('section[aria-labelledby="final-cta-heading"]')?.getBoundingClientRect(); return r ? { x: Math.round(r.x), y: Math.round(r.y + window.scrollY), w: Math.round(r.width), h: Math.round(r.height) } : null; })(),
        footer: (() => { const r = document.querySelector('footer')?.getBoundingClientRect(); return r ? { x: Math.round(r.x), y: Math.round(r.y + window.scrollY), w: Math.round(r.width), h: Math.round(r.height) } : null; })(),
        discoverCards: Array.from(document.querySelectorAll('.need-card')).map(c => ({
          title: c.querySelector('h3')?.textContent?.trim(),
          desc: c.querySelector('p')?.textContent?.trim(),
          titleSize: window.getComputedStyle(c.querySelector('h3')).fontSize,
          descSize: window.getComputedStyle(c.querySelector('p')).fontSize,
        }))
      })`
    });

    const valStr = res.result?.result?.value || res.result?.value;
    const data = JSON.parse(valStr);
    console.log('1440px Validation Results:', JSON.stringify(data, null, 2));

    ws.close();
  } catch (err) {
    console.error('CDP Error:', err);
  } finally {
    browser.kill();
  }
}, 2000);
