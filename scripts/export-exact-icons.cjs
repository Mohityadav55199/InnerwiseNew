const fs = require('fs');
const path = require('path');

const svgPath = path.join(__dirname, '..', 'public', 'assets', 'icons', 'Desktop - Home.svg');
const svg = fs.readFileSync(svgPath, 'utf8');
const lines = svg.split('\n');

function getBBoxFromTags(tags) {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  tags.forEach(tag => {
    const dMatch = tag.match(/d="([^"]+)"/);
    if (!dMatch) return;
    const nums = dMatch[1].match(/[-+]?[0-9]*\.?[0-9]+/g);
    if (!nums) return;
    for (let i = 0; i < nums.length - 1; i += 2) {
      const x = parseFloat(nums[i]);
      const y = parseFloat(nums[i+1]);
      if (!isNaN(x) && !isNaN(y)) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  });
  return { minX, minY, maxX, maxY, w: maxX - minX, h: maxY - minY };
}

function createSvgFromLines(lineIndices, pad = 2) {
  const tags = lineIndices.map(i => lines[i].trim());
  const b = getBBoxFromTags(tags);
  const vbX = b.minX - pad;
  const vbY = b.minY - pad;
  const vbW = b.w + pad * 2;
  const vbH = b.h + pad * 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vbX} ${vbY} ${vbW} ${vbH}" width="100%" height="100%" fill="none">\n  ${tags.join('\n  ')}\n</svg>`;
}

const iconsDir = path.join(__dirname, '..', 'public', 'assets', 'icons');

// 1. Pillars
// Mind: L204
fs.writeFileSync(path.join(iconsDir, 'pillar-mind.svg'), createSvgFromLines([204], 4));
// Body (Leaf): L196
fs.writeFileSync(path.join(iconsDir, 'pillar-body.svg'), createSvgFromLines([196], 4));
// Wisdom (Sun with rays): L167 to L176
fs.writeFileSync(path.join(iconsDir, 'pillar-wisdom.svg'), createSvgFromLines([167, 168, 169, 170, 171, 172, 173, 174, 175, 176], 4));

// 2. AI Companion Icons
// AI 1: Heart-hand (L329, L330, L331)
fs.writeFileSync(path.join(iconsDir, 'ai-icon-1.svg'), createSvgFromLines([329, 330, 331], 2));
// AI 2: Magnifier (L333, L334, L335)
fs.writeFileSync(path.join(iconsDir, 'ai-icon-2.svg'), createSvgFromLines([333, 334, 335], 2));
// AI 3: Chat Cards (L337, L338, L339)
fs.writeFileSync(path.join(iconsDir, 'ai-icon-3.svg'), createSvgFromLines([337, 338, 339], 2));

// 3. Explore Icons
// Book: L381
fs.writeFileSync(path.join(iconsDir, 'explore-book.svg'), createSvgFromLines([381], 2));
// Flag: L382
fs.writeFileSync(path.join(iconsDir, 'explore-flag.svg'), createSvgFromLines([382], 2));
// Flask: L383
fs.writeFileSync(path.join(iconsDir, 'explore-flask.svg'), createSvgFromLines([383], 2));
// Quiz: L385, L386
fs.writeFileSync(path.join(iconsDir, 'explore-quiz.svg'), createSvgFromLines([385, 386], 2));
// Play: L387
fs.writeFileSync(path.join(iconsDir, 'explore-play.svg'), createSvgFromLines([387], 2));

console.log('All exact icons extracted from Desktop - Home.svg successfully!');
