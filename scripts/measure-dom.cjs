const { spawn } = require('child_process');
const http = require('http');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const port = 9224;

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
    if (!page) throw new Error('No page target');

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

    const viewports = [1440, 1280, 1024, 768, 430, 390, 375];

    for (const w of viewports) {
      await send('Emulation.setDeviceMetricsOverride', {
        width: w,
        height: 9002,
        deviceScaleFactor: 1,
        mobile: w <= 768
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
          discoverH2: document.querySelector('#discover-heading')?.textContent?.trim(),
          discoverSub: document.querySelector('.discover-panel > div:first-child > p:last-child')?.textContent?.trim(),
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
          cards: Array.from(document.querySelectorAll('.need-card')).map(c => ({
            title: c.querySelector('h3')?.textContent?.trim(),
            desc: c.querySelector('p')?.textContent?.trim()
          }))
        })`
      });

      console.log('Raw CDP response:', JSON.stringify(res));
      const valStr = res.result?.result?.value || res.result?.value;
      if (!valStr) {
        console.error('No value in response:', res);
        continue;
      }
      const data = JSON.parse(valStr);
      console.log(`\n=================== VIEWPORT ${w}px ===================`);
      console.log(`ScrollWidth: ${data.scrollW}px (innerWidth: ${data.innerW}px) | Horizontal Overflow: ${data.scrollW > data.innerW ? 'FAIL (OVERFLOW)' : 'PASS (NO OVERFLOW)'}`);
      console.log(`Total Scroll Height: ${data.scrollH}px`);
      console.log(`Hero Media:`, data.heroMedia);
      console.log(`Hero Statement:`, data.heroStatement);
      console.log(`Discover Panel:`, data.discoverPanel);
      console.log(`Discover H2: "${data.discoverH2}"`);
      console.log(`Discover Subhead: "${data.discoverSub}"`);
      console.log(`Framework Container:`, data.frameworkInner);
      console.log(`Rituals Banner:`, data.ritualsBanner);
      console.log(`Approach Container:`, data.approachInner);
      console.log(`AI Phone:`, data.aiPhone);
      console.log(`AI Avatar:`, data.aiAvatar);
      console.log(`AI Content:`, data.aiContent);
      console.log(`Explore Grid:`, data.exploreGrid);
      console.log(`FAQ Container:`, data.faqInner);
      console.log(`Final CTA Section:`, data.finalCta);
      console.log(`Footer:`, data.footer);
      if (w === 1440) {
        console.log(`Discover Cards:`, data.cards);
      }
    }

    ws.close();
  } catch (err) {
    console.error('CDP Error:', err);
  } finally {
    browser.kill();
  }
}, 2000);
