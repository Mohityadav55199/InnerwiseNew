const fs = require('fs');
const path = require('path');

const svgPath = path.join(__dirname, '..', 'public', 'assets', 'icons', 'Desktop - Home.svg');
if (!fs.existsSync(svgPath)) {
  console.error('File not found:', svgPath);
  process.exit(1);
}

console.log('Reading Desktop - Home.svg (31MB)...');
const svgContent = fs.readFileSync(svgPath, 'utf8');
console.log('Read successfully, size:', svgContent.length, 'bytes');

// Check embedded base64 images inside the SVG defs / pattern
const imageMatches = svgContent.match(/<image[\s\S]*?xlink:href=\"data:image\/(png|jpeg|jpg);base64,([^\"]+)\"[\s\S]*?\/>/g) || [];
console.log('Found embedded raster images:', imageMatches.length);

const outputDir = path.join(__dirname, '..', 'public', 'assets', 'extracted');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

imageMatches.forEach((imgTag, idx) => {
  const typeMatch = imgTag.match(/data:image\/(png|jpeg|jpg);base64,/);
  const dataMatch = imgTag.match(/base64,([^\"]+)/);
  const widthMatch = imgTag.match(/width=\"([^\"]+)\"/);
  const heightMatch = imgTag.match(/height=\"([^\"]+)\"/);
  
  if (typeMatch && dataMatch) {
    const ext = typeMatch[1] === 'jpeg' ? 'jpg' : typeMatch[1];
    const buffer = Buffer.from(dataMatch[1], 'base64');
    const width = widthMatch ? widthMatch[1] : 'unknown';
    const height = heightMatch ? heightMatch[1] : 'unknown';
    const filename = `image_${idx}_${width}x${height}.${ext}`;
    fs.writeFileSync(path.join(outputDir, filename), buffer);
    console.log(`Saved image ${idx}: ${filename} (${buffer.length} bytes)`);
  }
});
