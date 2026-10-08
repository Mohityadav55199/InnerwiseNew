const fs = require('fs');
const path = require('path');

const svgPath = path.join(__dirname, '..', 'public', 'assets', 'icons', 'Desktop - Home.svg');
const svg = fs.readFileSync(svgPath, 'utf8');

console.log('SVG total size:', (svg.length / 1024 / 1024).toFixed(2), 'MB');

// Find all image definitions in defs
const imgDefs = [];
const imgDefRegex = /<image id="([^"]+)" width="([^"]+)" height="([^"]+)"/g;
let m;
while ((m = imgDefRegex.exec(svg)) !== null) {
  imgDefs.push({ id: m[1], w: m[2], h: m[3] });
}
console.log('Image definitions in defs:', imgDefs);

// Find pattern defs and what image they use
const patterns = {};
const patternRegex = /<pattern id="([^"]+)"[^>]*>([\s\S]*?)<\/pattern>/g;
while ((m = patternRegex.exec(svg)) !== null) {
  const pId = m[1];
  const pContent = m[2];
  const useMatch = pContent.match(/xlink:href="#([^"]+)"/);
  patterns[pId] = useMatch ? useMatch[1] : 'unknown';
}
console.log('Patterns count:', Object.keys(patterns).length);

// Find where patterns are used (e.g. fill="url(#pattern0_1010_8)") with context (coordinates/element)
const elements = [];
const elRegex = /<([a-zA-Z0-9]+)\s+([^>]*fill="url\(#(pattern[^)]+)\)"[^>]*)>/g;
while ((m = elRegex.exec(svg)) !== null) {
  const tag = m[1];
  const attrs = m[2];
  const patId = m[3];
  elements.push({ tag, patId, imageId: patterns[patId], attrs: attrs.replace(/\s+/g, ' ').slice(0, 200) });
}
console.log('Elements using patterns:', elements.length);
elements.forEach((e, idx) => console.log(`${idx}: ${e.tag} -> ${e.patId} (img: ${e.imageId}) | ${e.attrs}`));
