const fs = require('fs');
const path = require('path');

const svgPath = path.join(__dirname, '..', 'public', 'assets', 'icons', 'Desktop - Home.svg');
const svg = fs.readFileSync(svgPath, 'utf8');

// Find all patterns 21 to 26 and their embedded images
// In defs:
// image8 (coin), image9 (monk), image10 (lotus), image2 (sun), image5 (bell), image11 (polaroid)
const base64Map = {};
['image8_1010_8', 'image9_1010_8', 'image10_1010_8', 'image2_1010_8', 'image5_1010_8', 'image11_1010_8'].forEach(id => {
  const m = svg.match(new RegExp(`<image id="${id}"[^>]*xlink:href="([^"]+)"`));
  if (m) base64Map[id] = m[1];
});

// Let's find all rects/paths for Approach section (y: 3330 to 3920, x: 700 to 1360)
const lines = svg.split('\n');
const approachElements = [];

lines.forEach((line, idx) => {
  if (idx < 500) {
    if (line.includes('3432.91') || line.includes('3799.77') || line.includes('3804.63') || line.includes('3492.87') || line.includes('3334') || line.includes('3531.06') || line.includes('3627.58') || line.includes('3812.76') || (line.includes('stroke="#FAF5F2"') && line.includes('3806.54'))) {
      approachElements.push(line);
      console.log(`Approach element L${idx}: ${line.slice(0, 100)}`);
    }
  }
});

// Get defs for patterns 21 to 26 and filters
const patternDefs = [];
['pattern21_1010_8', 'pattern22_1010_8', 'pattern23_1010_8', 'pattern24_1010_8', 'pattern25_1010_8', 'pattern26_1010_8'].forEach(pid => {
  const pMatch = svg.match(new RegExp(`<pattern id="${pid}"[\\s\\S]*?<\\/pattern>`));
  if (pMatch) patternDefs.push(pMatch[0]);
});

// Also include image definitions
const imgDefs = Object.entries(base64Map).map(([id, href]) => {
  const imgTagMatch = svg.match(new RegExp(`<image id="${id}"[^>]*\\/>`));
  return imgTagMatch ? imgTagMatch[0] : '';
});

// Approach group viewBox: 703 3330 652 588
const approachSvg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="703 3330 652 588" width="652" height="588" fill="none">
  <defs>
    ${imgDefs.join('\n    ')}
    ${patternDefs.join('\n    ')}
  </defs>
  ${approachElements.join('\n  ')}
</svg>`;

fs.writeFileSync(path.join(__dirname, '..', 'public', 'assets', 'images', 'approach-illustration.svg'), approachSvg);
console.log('Saved authentic full-group approach-illustration.svg');
