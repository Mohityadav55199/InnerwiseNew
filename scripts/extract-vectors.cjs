const fs = require('fs');
const path = require('path');

const svgPath = path.join(__dirname, '..', 'public', 'assets', 'icons', 'Desktop - Home.svg');
const svg = fs.readFileSync(svgPath, 'utf8');

// Helper to find all defs gradients/filters/patterns
const defsMatch = svg.match(/<defs>([\s\S]*?)<\/defs>/);
const defsContent = defsMatch ? defsMatch[1] : '';

console.log('Defs length:', defsContent.length);

// Let's find specific sections by coordinate filtering or regex
// Let's inspect groups or standalone paths

function findPathsInBox(minX, minY, maxX, maxY) {
  const matches = [];
  // match <path ... d="..." ...> or <g ...>...</g>
  // Simple regex to extract paths with coordinates
  const pathRegex = /<path\s+([^>]*?)d="([^"]+)"([^>]*?)>/g;
  let m;
  while ((m = pathRegex.exec(svg)) !== null) {
    const fullTag = m[0];
    const attrs = m[1] + ' ' + m[3];
    const d = m[2];
    
    // Check first few numbers in d
    const nums = d.match(/[-+]?[0-9]*\.?[0-9]+/g);
    if (!nums || nums.length < 2) continue;
    
    let inBox = false;
    for (let i = 0; i < Math.min(nums.length - 1, 20); i += 2) {
      const x = parseFloat(nums[i]);
      const y = parseFloat(nums[i+1]);
      if (x >= minX && x <= maxX && y >= minY && y <= maxY) {
        inBox = true;
        break;
      }
    }
    if (inBox) {
      matches.push({ tag: fullTag, d, attrs });
    }
  }
  return matches;
}

console.log('--- 1. Logo Mark (x: 80-140, y: 40-100) ---');
const logoPaths = findPathsInBox(80, 40, 140, 100);
console.log('Found logo paths:', logoPaths.length);
logoPaths.forEach((p, i) => console.log(i, p.attrs.slice(0, 100), p.d.slice(0, 60)));

console.log('--- 2. CTA Wave (x: 0-1440, y: 7700-8100) ---');
const wavePaths = findPathsInBox(0, 7700, 1440, 8100);
console.log('Found wave paths:', wavePaths.length);
wavePaths.forEach((p, i) => console.log(i, p.attrs.slice(0, 100), p.d.slice(0, 60)));

console.log('--- 3. Pillar Icons (x: 700-1300, y: 2300-2900) ---');
const pillarPaths = findPathsInBox(700, 2300, 1300, 2900);
console.log('Found pillar paths:', pillarPaths.length);
pillarPaths.forEach((p, i) => console.log(i, p.attrs.slice(0, 100), p.d.slice(0, 60)));

console.log('--- 4. AI Icons & Sparkles (x: 600-1300, y: 4700-5500) ---');
const aiPaths = findPathsInBox(100, 4700, 1300, 5500);
console.log('Found AI paths:', aiPaths.length);
aiPaths.forEach((p, i) => console.log(i, p.attrs.slice(0, 100), p.d.slice(0, 60)));

console.log('--- 5. Explore Icons (x: 200-1200, y: 5600-6500) ---');
const explorePaths = findPathsInBox(200, 5600, 1200, 6500);
console.log('Found Explore paths:', explorePaths.length);
explorePaths.forEach((p, i) => console.log(i, p.attrs.slice(0, 100), p.d.slice(0, 60)));
