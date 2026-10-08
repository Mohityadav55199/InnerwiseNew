const fs = require('fs');
const path = require('path');

const svgPath = path.join(__dirname, '..', 'public', 'assets', 'icons', 'Desktop - Home.svg');
const svg = fs.readFileSync(svgPath, 'utf8');

// Helper to extract defs (linearGradient, radialGradient, filter, etc.)
const defsMatch = svg.match(/<defs>([\s\S]*?)<\/defs>/);
const defs = defsMatch ? defsMatch[1] : '';

// Function to calculate bounding box of a path's 'd' attribute
function getBBox(d) {
  const nums = d.match(/[-+]?[0-9]*\.?[0-9]+/g);
  if (!nums) return null;
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
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
  return { minX, minY, maxX, maxY, w: maxX - minX, h: maxY - minY };
}

// 1. Logo Mark (infinity with pink dot)
// Let's find the exact paths for the logo mark around x: 80-125, y: 55-85
const logoRegex = /<path[^>]*d="([^"]*)"[^>]*>/g;
let m;
const logoPaths = [];
while ((m = logoRegex.exec(svg)) !== null) {
  const fullTag = m[0];
  const d = m[1];
  if (d.includes('104.305 71.5451') || d.includes('109.734 79.0411') || d.includes('111.604 70.2812') || (d.includes('92.635') && d.includes('72.0378'))) {
    logoPaths.push(fullTag);
  }
}
console.log('Logo paths found:', logoPaths.length);

// Also check linearGradients used by logo (e.g. paint0_linear, etc.)
function getReferencedDefs(tags) {
  const refIds = new Set();
  tags.forEach(t => {
    const refs = t.match(/url\(#([^)]+)\)/g);
    if (refs) refs.forEach(r => refIds.add(r.replace(/url\(#|\)/g, '')));
  });
  let neededDefs = '';
  refIds.forEach(id => {
    const defRegex = new RegExp(`<([a-zA-Z0-9]+)[^>]*id="${id}"[\\s\\S]*?<\\/\\1>`, 'g');
    const singleDefRegex = new RegExp(`<[a-zA-Z0-9]+[^>]*id="${id}"[^>]*\\/>`, 'g');
    const dMatch = defs.match(defRegex) || defs.match(singleDefRegex);
    if (dMatch) neededDefs += dMatch[0] + '\n';
  });
  return neededDefs;
}

// Write Logo Mark SVG
// In Figma, logo mark is at roughly x: 90 to 125 (w ≈ 35), y: 58 to 82 (h ≈ 24)
const logoDefs = getReferencedDefs(logoPaths);
const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="90 58 35 25" width="35" height="25" fill="none">
  <defs>
    ${logoDefs}
  </defs>
  ${logoPaths.join('\n  ')}
</svg>`;
fs.writeFileSync(path.join(__dirname, '..', 'public', 'assets', 'icons', 'logo-mark.svg'), logoSvg);
console.log('Saved logo-mark.svg');

// 2. CTA Wave
// In Figma, node 1010:25 or the white curve starting at y=7747.
// Let's find path with M1148.54 7828.4 or any path spanning 0 to 1440 around y=7747
const allPaths = [];
const pRegex = /<path\s+([^>]*?)d="([^"]+)"([^>]*?)>/g;
while ((m = pRegex.exec(svg)) !== null) {
  allPaths.push({ tag: m[0], d: m[2], full: m[0] });
}

const wavePathObj = allPaths.find(p => p.d.includes('1148.54 7828.4') || (p.d.includes('7747') && p.d.includes('1440')));
if (wavePathObj) {
  console.log('Found wave path!');
  const bbox = getBBox(wavePathObj.d);
  console.log('Wave bbox:', bbox);
  // Figma wave viewBox is 0 0 1440 333 (or top-left relative)
  const waveSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${bbox.minX} ${bbox.minY} ${bbox.w} ${bbox.h}" width="100%" height="100%" preserveAspectRatio="none" fill="none">
  ${wavePathObj.tag}
</svg>`;
  fs.writeFileSync(path.join(__dirname, '..', 'public', 'assets', 'icons', 'cta-wave.svg'), waveSvg);
  console.log('Saved cta-wave.svg');
}

// 3. Pillar Icons:
// Mind (Wisdom/Mind/Body):
// Pillar 1 (Mind, y=2315-2510): icon at y ≈ 2410-2440
// Pillar 2 (Body, y=2533-2728): leaf icon at y ≈ 2580-2610
// Pillar 3 (Inner Wisdom, y=2748-2943): sun icon at y ≈ 2815-2865

const mindPaths = allPaths.filter(p => {
  const b = getBBox(p.d);
  return b && b.minX >= 830 && b.maxX <= 870 && b.minY >= 2410 && b.maxY <= 2450;
});
console.log('Mind icon paths:', mindPaths.length);
if (mindPaths.length > 0) {
  const b = getBBox(mindPaths[0].d);
  const mindSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${b.minX - 4} ${b.minY - 4} ${b.w + 8} ${b.h + 8}" width="32" height="32" fill="none">
  ${mindPaths.map(p => p.tag).join('\n')}
</svg>`;
  fs.writeFileSync(path.join(__dirname, '..', 'public', 'assets', 'icons', 'pillar-mind.svg'), mindSvg);
  console.log('Saved pillar-mind.svg');
}

const bodyPaths = allPaths.filter(p => {
  const b = getBBox(p.d);
  return b && b.minX >= 820 && b.maxX <= 860 && b.minY >= 2580 && b.maxY <= 2620;
});
console.log('Body icon paths (leaf):', bodyPaths.length);
if (bodyPaths.length > 0) {
  const b = getBBox(bodyPaths[0].d);
  const bodySvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${b.minX - 4} ${b.minY - 4} ${b.w + 8} ${b.h + 8}" width="32" height="32" fill="none">
  ${bodyPaths.map(p => p.tag).join('\n')}
</svg>`;
  fs.writeFileSync(path.join(__dirname, '..', 'public', 'assets', 'icons', 'pillar-body.svg'), bodySvg);
  console.log('Saved pillar-body.svg');
}

const wisdomPaths = allPaths.filter(p => {
  const b = getBBox(p.d);
  return b && b.minX >= 770 && b.maxX <= 840 && b.minY >= 2810 && b.maxY <= 2870;
});
console.log('Wisdom icon paths:', wisdomPaths.length);
if (wisdomPaths.length > 0) {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  wisdomPaths.forEach(p => {
    const b = getBBox(p.d);
    minX = Math.min(minX, b.minX);
    minY = Math.min(minY, b.minY);
    maxX = Math.max(maxX, b.maxX);
    maxY = Math.max(maxY, b.maxY);
  });
  const wisdomSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${minX - 4} ${minY - 4} ${maxX - minX + 8} ${maxY - minY + 8}" width="32" height="32" fill="none">
  ${wisdomPaths.map(p => p.tag).join('\n')}
</svg>`;
  fs.writeFileSync(path.join(__dirname, '..', 'public', 'assets', 'icons', 'pillar-wisdom.svg'), wisdomSvg);
  console.log('Saved pillar-wisdom.svg');
}

// 4. AI Companion Icons:
// AI 1 (heart-hand at y ≈ 5180-5195):
const ai1Paths = allPaths.filter(p => {
  const b = getBBox(p.d);
  return b && b.minX >= 695 && b.maxX <= 715 && b.minY >= 5170 && b.maxY <= 5200;
});
console.log('AI icon 1 paths:', ai1Paths.length);
if (ai1Paths.length > 0) {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  ai1Paths.forEach(p => {
    const b = getBBox(p.d);
    minX = Math.min(minX, b.minX);
    minY = Math.min(minY, b.minY);
    maxX = Math.max(maxX, b.maxX);
    maxY = Math.max(maxY, b.maxY);
  });
  const ai1Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${minX - 2} ${minY - 2} ${maxX - minX + 4} ${maxY - minY + 4}" width="24" height="24" fill="none">
  ${ai1Paths.map(p => p.tag).join('\n')}
</svg>`;
  fs.writeFileSync(path.join(__dirname, '..', 'public', 'assets', 'icons', 'ai-icon-1.svg'), ai1Svg);
  console.log('Saved ai-icon-1.svg');
}

// AI 2 (magnifier at y ≈ 5215-5240):
const ai2Paths = allPaths.filter(p => {
  const b = getBBox(p.d);
  return b && b.minX >= 695 && b.maxX <= 725 && b.minY >= 5210 && b.maxY <= 5240;
});
console.log('AI icon 2 paths:', ai2Paths.length);
if (ai2Paths.length > 0) {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  ai2Paths.forEach(p => {
    const b = getBBox(p.d);
    minX = Math.min(minX, b.minX);
    minY = Math.min(minY, b.minY);
    maxX = Math.max(maxX, b.maxX);
    maxY = Math.max(maxY, b.maxY);
  });
  const ai2Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${minX - 2} ${minY - 2} ${maxX - minX + 4} ${maxY - minY + 4}" width="24" height="24" fill="none">
  ${ai2Paths.map(p => p.tag).join('\n')}
</svg>`;
  fs.writeFileSync(path.join(__dirname, '..', 'public', 'assets', 'icons', 'ai-icon-2.svg'), ai2Svg);
  console.log('Saved ai-icon-2.svg');
}

// AI 3 (cards/chat at y ≈ 5260-5280):
const ai3Paths = allPaths.filter(p => {
  const b = getBBox(p.d);
  return b && b.minX >= 695 && b.maxX <= 725 && b.minY >= 5255 && b.maxY <= 5285;
});
console.log('AI icon 3 paths:', ai3Paths.length);
if (ai3Paths.length > 0) {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  ai3Paths.forEach(p => {
    const b = getBBox(p.d);
    minX = Math.min(minX, b.minX);
    minY = Math.min(minY, b.minY);
    maxX = Math.max(maxX, b.maxX);
    maxY = Math.max(maxY, b.maxY);
  });
  const ai3Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${minX - 2} ${minY - 2} ${maxX - minX + 4} ${maxY - minY + 4}" width="24" height="24" fill="none">
  ${ai3Paths.map(p => p.tag).join('\n')}
</svg>`;
  fs.writeFileSync(path.join(__dirname, '..', 'public', 'assets', 'icons', 'ai-icon-3.svg'), ai3Svg);
  console.log('Saved ai-icon-3.svg');
}

// 5. Explore Icons:
// Book (x ≈ 395-425, y ≈ 5950-5975)
// Flag (x ≈ 390-415, y ≈ 6175-6210)
// Flask (x ≈ 695-720, y ≈ 5930-5965)
// Flask 2 / Play (x ≈ 695-720, y ≈ 6175-6210)
// Quiz / Clipboard (x ≈ 1000-1030, y ≈ 5930-5965)
// Play (x ≈ 1005-1030, y ≈ 6175-6200)

function exportIcon(name, minX, minY, maxX, maxY, size = 32) {
  const paths = allPaths.filter(p => {
    const b = getBBox(p.d);
    return b && b.minX >= minX && b.maxX <= maxX && b.minY >= minY && b.maxY <= maxY;
  });
  console.log(`Explore ${name} paths:`, paths.length);
  if (paths.length > 0) {
    let bMinX = Infinity, bMinY = Infinity, bMaxX = -Infinity, bMaxY = -Infinity;
    paths.forEach(p => {
      const b = getBBox(p.d);
      bMinX = Math.min(bMinX, b.minX);
      bMinY = Math.min(bMinY, b.minY);
      bMaxX = Math.max(bMaxX, b.maxX);
      bMaxY = Math.max(bMaxY, b.maxY);
    });
    const s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${bMinX - 3} ${bMinY - 3} ${bMaxX - bMinX + 6} ${bMaxY - bMinY + 6}" width="${size}" height="${size}" fill="none">
  ${paths.map(p => p.tag).join('\n')}
</svg>`;
    fs.writeFileSync(path.join(__dirname, '..', 'public', 'assets', 'icons', `${name}.svg`), s);
    console.log(`Saved ${name}.svg`);
  }
}

exportIcon('explore-book', 390, 5945, 425, 5975);
exportIcon('explore-flag', 385, 6170, 420, 6215);
exportIcon('explore-flask', 690, 5925, 725, 5965);
exportIcon('explore-quiz', 1000, 5925, 1035, 5965);
exportIcon('explore-play', 1005, 6170, 1035, 6200);

// 6. Sparkle:
const sparklePaths = allPaths.filter(p => {
  const b = getBBox(p.d);
  return b && b.minX >= 520 && b.maxX <= 535 && b.minY >= 4850 && b.maxY <= 4880;
});
if (sparklePaths.length > 0) {
  const b = getBBox(sparklePaths[0].d);
  const sparkleSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${b.minX - 2} ${b.minY - 2} ${b.w + 4} ${b.h + 4}" width="24" height="24" fill="none">
  ${sparklePaths[0].tag}
</svg>`;
  fs.writeFileSync(path.join(__dirname, '..', 'public', 'assets', 'icons', 'sparkle.svg'), sparkleSvg);
  console.log('Saved sparkle.svg');
}

// 7. Hero Inner Compass Badge:
// In Figma, x ≈ 608, y ≈ 190-280. It has image1_1010_8 (compass render) and curved text path at y ≈ 194-205!
// Let's create an exact inner-compass-badge.svg containing the 3D compass + curved text!
const compassImg = path.join(__dirname, '..', 'public', 'assets', 'extracted', '1_image1_1010_8_2000x1250.png');
// Let's copy it or embed it
fs.copyFileSync(compassImg, path.join(__dirname, '..', 'public', 'assets', 'images', 'compass-3d.png'));
console.log('Saved compass-3d.png');
