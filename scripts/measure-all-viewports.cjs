const { spawn } = require('child_process');
const http = require('http');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const port = 9223;

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

    const wsUrl = page.webSocketDebuggerUrl;
    console.log('Connecting to WebSocket:', wsUrl);

    // Node 22 global.WebSocket is built-in
    const ws = new WebSocket(wsUrl);

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

    // Wait for page to fully render
    await new Promise(r => setTimeout(r, 2000));

    // Viewports to test
    const viewports = [1440, 1280, 1024, 768, 430, 390, 375];

    for (const w of viewports) {
      await send('Emulation.setDeviceMetricsOverride', {
        width: w,
        height: 9002,
        deviceScaleFactor: 1,
        mobile: w <= 768
      });

      await new Promise(r => setTimeout(r, 500));

      const evalRes = await send('Runtime.evaluate', {
        expression: `
          (() => {
            const getBox = (sel) => {
              const el = document.querySelector(sel);
              if (!el) return null;
              const r = el.getBoundingClientRect();
              return { x: Math.round(r.x), y: Math.round(r.y + window.scrollY), w: Math.round(r.width), h: Math.round(r.height) };
            };

            const scrollW = document.body.scrollWidth;
            const innerW = window.innerWidth;
            const scrollH = document.body.scrollHeight;

            const heroMedia = getBox('.hero-tier-b > div:last-child');
            const heroStatement = getBox('.hero-tier-b > p');
            const discoverPanel = getBox('.discover-panel');
            const frameworkInner = getBox('.framework-inner');
            const ritualsBanner = getBox('.rituals-banner');
            const approachInner = getBox('.approach-inner');
            const aiVisual = getBox('.ai-visual');
            const aiContent = getBox('.ai-content');
            const exploreGrid = getBox('.explore-grid');
            const faqInner = getBox('.faq-inner');
            const finalCta = getBox('section[aria-labelledby="final-cta-heading"]');
            const footer = getBox('footer');

            // Discover cards copy
            const cards = Array.from(document.querySelectorAll('.need-card')).map(c => {
              const h3 = c.querySelector('h3')?.textContent?.trim();
              const p = c.querySelector('p')?.textContent?.trim();
              return { h3, p };
            });

            return {
              viewport: ${w},
              scrollW,
              innerW,
              scrollH,
              overflow: scrollW > innerW,
              boxes: {
                heroMedia,
                heroStatement,
                discoverPanel,
                frameworkInner,
                ritualsBanner,
                approachInner,
                aiVisual,
                aiContent,
                exploreGrid,
                faqInner,
                finalCta,
                footer
              },
              cards
            };
          })()
        `,
        returnByValue: true
      });

      console.log(`\n=== Viewport ${w}px ===`);
      const val = evalRes.result?.value;
      console.log(`Scroll Width: ${val?.scrollW} (inner: ${val?.innerW}) | Overflow: ${val?.overflow}`);
      console.log(`Total Scroll Height: ${val?.scrollH}px`);
      console.log('Boxes:', JSON.stringify(val?.boxes, null, 2));
      if (w === 1440) {
        console.log('Discover Cards at 1440:', JSON.stringify(val?.cards, null, 2));
      }
    }

    ws.close();
  } catch (err) {
    console.error('Test error:', err);
  } finally {
    browser.kill();
  }
}, 2000);
