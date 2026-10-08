const fs = require('fs');
const path = require('path');

const svgPath = path.join(__dirname, '..', 'public', 'assets', 'icons', 'Desktop - Home.svg');
const svg = fs.readFileSync(svgPath, 'utf8');

// Let's search for groups, paths, ids, and specific coordinate regions in Desktop - Home.svg
console.log('Searching for vector groups...');

// 1. Logo mark: Around navbar (x=183, y=60 or top)
// 2. Wave: y=7747 (node 1010:25 or d="...")
// 3. Pillar icons: y=2300-2600
// 4. Explore icons: y=5500-6500
// 5. AI icons: y=4800-5500
// 6. Sparkles

// Find all elements around y=7747 for CTA wave
const lines = svg.split('\n');
console.log('Total lines:', lines.length);

// Search for wave path around y 7747
const pathRegex = /<path\s+([^>]*d="([^"]+)"[^>]*)>/g;
let m;
const paths = [];
while ((m = pathRegex.exec(svg)) !== null) {
  const full = m[0];
  const d = m[2];
  if (d.includes('M') && (d.length > 50 || full.includes('fill') || full.includes('stroke'))) {
    // Check if path has bounding or coordinates or id
    paths.push({ tag: full.slice(0, 150), dLen: d.length, dStart: d.slice(0, 60) });
  }
}
console.log('Found paths:', paths.length);
paths.slice(0, 30).forEach((p, i) => console.log(i, p.dLen, p.tag, p.dStart));
