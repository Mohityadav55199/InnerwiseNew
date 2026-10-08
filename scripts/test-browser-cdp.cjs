const { spawn, execSync } = require('child_process');
const http = require('http');
const fs = require('fs');

// Look for Chrome or Edge executable
const browserPaths = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  process.env.LOCALAPPDATA + '\\Google\\Chrome\\Application\\chrome.exe',
  process.env.LOCALAPPDATA + '\\Microsoft\\Edge\\Application\\msedge.exe',
];

const exe = browserPaths.find(p => fs.existsSync(p));
console.log('Found browser executable:', exe);

if (!exe) {
  console.error('No browser executable found!');
  process.exit(1);
}

// Start browser with remote debugging port
const port = 9222;
const browserProc = spawn(exe, [
  '--headless',
  `--remote-debugging-port=${port}`,
  '--disable-gpu',
  '--no-sandbox',
  'http://localhost:5173'
]);

setTimeout(async () => {
  try {
    const listRes = await new Promise((resolve, reject) => {
      http.get(`http://127.0.0.1:${port}/json/list`, (res) => {
        let d = '';
        res.on('data', c => d += c);
        res.on('end', () => resolve(JSON.parse(d)));
      }).on('error', reject);
    });

    console.log('Open targets in browser:', listRes.length);
    const page = listRes.find(p => p.type === 'page');
    if (!page) {
      console.error('No page target found');
      browserProc.kill();
      return;
    }

    console.log('Page target WebSocket URL:', page.webSocketDebuggerUrl);

    // Use WebSocket to connect to DevTools Protocol
    // We can use standard WebSocket client if available or basic evaluation
    console.log('Browser test connection successful!');
  } catch (err) {
    console.error('CDP Error:', err.message);
  } finally {
    browserProc.kill();
  }
}, 2000);
