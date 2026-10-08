const { execSync } = require('child_process');
const http = require('http');

console.log('Testing dev server response on localhost:5173...');
const req = http.get('http://localhost:5173', (res) => {
  console.log('Dev server status:', res.statusCode);
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Dev server HTML length:', data.length);
  });
});
req.on('error', (e) => {
  console.error('Error connecting to dev server:', e.message);
});
