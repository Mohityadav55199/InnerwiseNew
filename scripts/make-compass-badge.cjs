const fs = require('fs');
const path = require('path');

const svgPath = path.join(__dirname, '..', 'public', 'assets', 'icons', 'Desktop - Home.svg');
const svg = fs.readFileSync(svgPath, 'utf8');

// Find all elements around x: 590-710, y: 180-300
const lines = svg.split('\n');
const badgeLines = [];
lines.forEach((line, idx) => {
  if ((line.includes('203.223') || line.includes('194.195') || line.includes('pattern14') || line.includes('image1_1010_8')) && idx < 500) {
    console.log(`L${idx}: ${line.slice(0, 150)}`);
    badgeLines.push(line);
  }
});

// Let's create an SVG that embeds the extracted 3D compass and vector curved text
// Or an SVG that contains the exact paths from Desktop - Home.svg
// The compass is rotated -12.28 deg, width 71, height 77 at (608.965, 203.223)
// The curved text is around (659.97, 194.195)
const compassBase64 = fs.readFileSync(path.join(__dirname, '..', 'public', 'assets', 'extracted', '1_image1_1010_8_2000x1250.png')).toString('base64');

// Find the curved text path tag in svg
const textPathMatch = svg.match(/<path[^>]*d="M659\.97 194\.195[^"]*"[^>]*>/);
const textPathTag = textPathMatch ? textPathMatch[0] : '';

console.log('Text path found:', !!textPathMatch);

const badgeSvg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="585 180 125 125" width="102" height="102" fill="none">
  <g transform="rotate(-12.2845 608.965 203.223)">
    <image width="71" height="77" x="608.965" y="203.223" xlink:href="data:image/png;base64,${compassBase64}" />
  </g>
  ${textPathTag}
</svg>`;

fs.writeFileSync(path.join(__dirname, '..', 'public', 'assets', 'images', 'inner-compass-badge.svg'), badgeSvg);
console.log('Saved authentic inner-compass-badge.svg');
