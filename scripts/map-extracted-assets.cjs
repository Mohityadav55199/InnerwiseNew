const fs = require('fs');
const path = require('path');

const svgPath = path.join(__dirname, '..', 'public', 'assets', 'icons', 'Desktop - Home.svg');
const svgContent = fs.readFileSync(svgPath, 'utf8');

// Find all elements using url(#pattern...) or xlink:href
const patternDefs = {};
const patternRegex = /<pattern id="([^"]+)"[\s\S]*?<use xlink:href="#([^"]+)"/g;
let match;
while ((match = patternRegex.exec(svgContent)) !== null) {
  patternDefs[match[1]] = match[2];
}

// Find all elements referencing pattern
const uses = [];
const rectRegex = /<rect[\s\S]*?fill="url\(#([^)]+)\)"[\s\S]*?\/>/g;
while ((match = rectRegex.exec(svgContent)) !== null) {
  const patternId = match[1];
  const tag = match[0];
  const x = (tag.match(/x="([^"]+)"/) || [null, '0'])[1];
  const y = (tag.match(/y="([^"]+)"/) || [null, '0'])[1];
  const w = (tag.match(/width="([^"]+)"/) || [null, '0'])[1];
  const h = (tag.match(/height="([^"]+)"/) || [null, '0'])[1];
  const imageId = patternDefs[patternId] || patternId;
  uses.push({ patternId, imageId, x, y, w, h });
}

console.log('Figma image uses:', JSON.stringify(uses, null, 2));
