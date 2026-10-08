const fs = require('fs');
const path = require('path');

const svgPath = path.join(__dirname, '..', 'public', 'assets', 'icons', 'Desktop - Home.svg');
const svg = fs.readFileSync(svgPath, 'utf8');

// Helper to extract defs (linearGradient, radialGradient, filter, etc.)
const defsMatch = svg.match(/<defs>([\s\S]*?)<\/defs>/);
const defs = defsMatch ? defsMatch[1] : '';

const iconsDir = path.join(__dirname, '..', 'public', 'assets', 'icons');
const imagesDir = path.join(__dirname, '..', 'public', 'assets', 'images');
const extractedDir = path.join(__dirname, '..', 'public', 'assets', 'extracted');

// 1. Logo Mark
// In Figma: x: 80, y: 58.54, w: 60, h: 33.92
// Let's get the logo paths
const logoPaths = [];
const pRegex = /<path\s+([^>]*?)d="([^"]+)"([^>]*?)>/g;
let m;
while ((m = pRegex.exec(svg)) !== null) {
  const d = m[2];
  if (d.includes('104.305 71.5451') || d.includes('109.734 79.0411') || d.includes('111.604 70.2812')) {
    logoPaths.push(m[0]);
  }
}

// Get defs for logo (paint0_linear, paint1_linear, paint2_linear)
let logoDefs = '';
['paint0_linear_1010_8', 'paint1_linear_1010_8', 'paint2_linear_1010_8'].forEach(id => {
  const defRegex = new RegExp(`<linearGradient[^>]*id="${id}"[\\s\\S]*?<\\/linearGradient>`, 'g');
  const dMatch = defs.match(defRegex);
  if (dMatch) logoDefs += dMatch[0] + '\n';
});

const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="80 58.54 60 33.92" width="60" height="34" fill="none">
  <defs>
    ${logoDefs}
  </defs>
  ${logoPaths.join('\n  ')}
</svg>`;
fs.writeFileSync(path.join(iconsDir, 'logo-mark.svg'), logoSvg);
console.log('Fixed logo-mark.svg with viewBox 80 58.54 60 33.92');

// 2. Pillar Mind: 764 2404 88 38
// Find the waveform path around y=2425 (L204)
const mindPathMatch = svg.match(/<path[^>]*d="M850\.538 2425\.4[^"]*"[^>]*\/>/);
const mindPath = mindPathMatch ? mindPathMatch[0] : '';
const mindSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="764 2404 88 38" width="100%" height="100%" fill="none">
  ${mindPath}
</svg>`;
fs.writeFileSync(path.join(iconsDir, 'pillar-mind.svg'), mindSvg);
console.log('Fixed pillar-mind.svg with viewBox 764 2404 88 38');

// 3. Pillar Body: 778.7 2596.7 58.6 63.6
// Find leaf path around y=2596 (L196)
const bodyPathMatch = svg.match(/<path[^>]*d="M835\.857 2596\.86[^"]*"[^>]*\/>/);
const bodyPath = bodyPathMatch ? bodyPathMatch[0] : '';
const bodySvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="778.7 2596.7 58.6 63.6" width="100%" height="100%" fill="none">
  ${bodyPath}
</svg>`;
fs.writeFileSync(path.join(iconsDir, 'pillar-body.svg'), bodySvg);
console.log('Fixed pillar-body.svg with viewBox 778.7 2596.7 58.6 63.6');

// 4. Pillar Wisdom (node 1010:236 - radiating sun in the Framework wisdom card)
// In Framework Wisdom card: y ≈ 2815 to 2865, x ≈ 779 to 836
// Let's find all paths in this range
const wisdomPaths = [];
const pRegex2 = /<path\s+([^>]*?)d="([^"]+)"([^>]*?)>/g;
while ((m = pRegex2.exec(svg)) !== null) {
  const d = m[2];
  if (d.includes('808.158 2815') || d.includes('818.463 2833') || d.includes('835.229 2842') || d.includes('808.158 2863') || d.includes('828.692 2861') || d.includes('828.774 2823') || d.includes('786.999 2842') || d.includes('794.545 2857') || d.includes('794.545 2827')) {
    wisdomPaths.push(m[0]);
  }
}
console.log('Found Wisdom 1010:236 paths:', wisdomPaths.length);
const wisdomSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="778.7 2814 58 58" width="100%" height="100%" fill="none">
  ${wisdomPaths.join('\n  ')}
</svg>`;
fs.writeFileSync(path.join(iconsDir, 'pillar-wisdom.svg'), wisdomSvg);
console.log('Fixed pillar-wisdom.svg with node 1010:236');

// 5. AI Icons
// AI 1: 698 5176 20.55 20.56 (Heart-hand: L329, L330, L331)
const ai1Tags = [];
[
  /d="M699 5188\.42[^"]*"/,
  /d="M701\.143 5191\.99[^"]*"/,
  /d="M710\.785 5188\.42[^"]*"/
].forEach(regex => {
  const match = svg.match(new RegExp(`<path[^>]*${regex.source}[^>]*\\/?>`));
  if (match) ai1Tags.push(match[0]);
});
const ai1Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="698 5176 20.55 20.56" width="100%" height="100%" fill="none">
  ${ai1Tags.join('\n  ')}
</svg>`;
fs.writeFileSync(path.join(iconsDir, 'ai-icon-1.svg'), ai1Svg);
console.log('Fixed ai-icon-1.svg with viewBox 698 5176 20.55 20.56');

// AI 3: 698 5255 21.96 22 (Chat-cards: L337, L338, L339)
const ai3Tags = [];
[
  /d="M700\.539 5269\.85[^"]*"/,
  /d="M716\.693 5262\.46[^"]*"/,
  /d="M699 5266[^"]*"/
].forEach(regex => {
  const match = svg.match(new RegExp(`<path[^>]*${regex.source}[^>]*\\/?>`));
  if (match) ai3Tags.push(match[0]);
});
const ai3Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="698 5255 21.96 22" width="100%" height="100%" fill="none">
  ${ai3Tags.join('\n  ')}
</svg>`;
fs.writeFileSync(path.join(iconsDir, 'ai-icon-3.svg'), ai3Svg);
console.log('Fixed ai-icon-3.svg with viewBox 698 5255 21.96 22');

// 6. Explore Icons
// explore-book: 387 5932 32.39 32 (L381)
const expBookMatch = svg.match(/<path[^>]*d="M403\.195 5963[^"]*"[^>]*\/>/);
const expBookSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="387 5932 32.39 32" width="100%" height="100%" fill="none">
  ${expBookMatch ? expBookMatch[0] : ''}
</svg>`;
fs.writeFileSync(path.join(iconsDir, 'explore-book.svg'), expBookSvg);
console.log('Fixed explore-book.svg with viewBox 387 5932 32.39 32');

// explore-flask: 696 5932 28.04 32 (L383)
const expFlaskMatch = svg.match(/<path[^>]*d="M704\.925 5933[^"]*"[^>]*\/>/);
const expFlaskSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="696 5932 28.04 32" width="100%" height="100%" fill="none">
  ${expFlaskMatch ? expFlaskMatch[0] : ''}
</svg>`;
fs.writeFileSync(path.join(iconsDir, 'explore-flask.svg'), expFlaskSvg);
console.log('Fixed explore-flask.svg with viewBox 696 5932 28.04 32');

// explore-quiz: 1003 5932 27.2 32 (L385, L386)
const expQuizTags = [];
[/d="M1024\.4 5933[^"]*"/, /d="M1009\.4 5940\.2[^"]*"/].forEach(regex => {
  const match = svg.match(new RegExp(`<path[^>]*${regex.source}[^>]*\\/?>`));
  if (match) expQuizTags.push(match[0]);
});
const expQuizSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="1003 5932 27.2 32" width="100%" height="100%" fill="none">
  ${expQuizTags.join('\n  ')}
</svg>`;
fs.writeFileSync(path.join(iconsDir, 'explore-quiz.svg'), expQuizSvg);
console.log('Fixed explore-quiz.svg with viewBox 1003 5932 27.2 32');

// explore-flag: 393 6177 25.23 32 (L382)
const expFlagMatch = svg.match(/<path[^>]*d="M394 6208[^"]*"[^>]*\/>/);
const expFlagSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="393 6177 25.23 32" width="100%" height="100%" fill="none">
  ${expFlagMatch ? expFlagMatch[0] : ''}
</svg>`;
fs.writeFileSync(path.join(iconsDir, 'explore-flag.svg'), expFlagSvg);
console.log('Fixed explore-flag.svg with viewBox 393 6177 25.23 32');

// 7. CTA Wave: -48 7747 1513 843 (node 1010:25)
const waveMatch = svg.match(/<path[^>]*d="M1148\.54 7828\.4[^"]*"[^>]*\/>/);
const waveSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-48 7747 1513 843" width="100%" height="100%" preserveAspectRatio="none" fill="none">
  ${waveMatch ? waveMatch[0] : ''}
</svg>`;
fs.writeFileSync(path.join(iconsDir, 'cta-wave.svg'), waveSvg);
console.log('Fixed cta-wave.svg with viewBox -48 7747 1513 843');

// 8. Sparkles (exact Figma star vectors 1010:543–545, etc.)
// e.g. M1225.47 8071.83 or M524.301 4856
// Let's create sparkle.svg from M524.301 4856
const sparkleMatch = svg.match(/<path[^>]*d="M524\.301 4856[^"]*"[^>]*\/>/);
const sparkleSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="519 4854 22 25" width="100%" height="100%" fill="none">
  ${sparkleMatch ? sparkleMatch[0] : ''}
</svg>`;
fs.writeFileSync(path.join(iconsDir, 'sparkle.svg'), sparkleSvg);
console.log('Fixed sparkle.svg with Figma star vector');

// 9. Quick Reset Photo 1 (Water droplet is image12!)
fs.copyFileSync(
  path.join(extractedDir, '12_image12_1010_8_1000x750.jpg'),
  path.join(imagesDir, 'reset-breathe.jpg')
);
console.log('Fixed reset-breathe.jpg with image12 (water droplet)');
