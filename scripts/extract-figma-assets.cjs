const fs = require('fs');
const path = require('path');

const svgPath = path.join(__dirname, '..', 'public', 'assets', 'icons', 'Desktop - Home.svg');
if (!fs.existsSync(svgPath)) {
  console.error('File not found:', svgPath);
  process.exit(1);
}

console.log('Reading Desktop - Home.svg (31MB)...');
const svgContent = fs.readFileSync(svgPath, 'utf8');
console.log('Read successfully, length:', svgContent.length);

const outputDir = path.join(__dirname, '..', 'public', 'assets', 'extracted');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Regex to capture image tags with base64 data
const imageRegex = /<image[\s\S]*?xlink:href="data:image\/(png|jpeg|jpg);base64,([^"]+)"[\s\S]*?\/>/g;
let match;
let count = 0;

while ((match = imageRegex.exec(svgContent)) !== null) {
  const fullTag = match[0];
  const mime = match[1];
  const base64Data = match[2];
  
  const widthMatch = fullTag.match(/width="([^"]+)"/);
  const heightMatch = fullTag.match(/height="([^"]+)"/);
  const idMatch = fullTag.match(/id="([^"]+)"/);
  
  const width = widthMatch ? Math.round(parseFloat(widthMatch[1])) : 'w';
  const height = heightMatch ? Math.round(parseFloat(heightMatch[1])) : 'h';
  const id = idMatch ? idMatch[1] : `img_${count}`;
  const ext = mime === 'jpeg' ? 'jpg' : mime;
  
  const filename = `${count}_${id}_${width}x${height}.${ext}`;
  const buffer = Buffer.from(base64Data, 'base64');
  fs.writeFileSync(path.join(outputDir, filename), buffer);
  console.log(`Extracted: ${filename} (${buffer.length} bytes)`);
  count++;
}

console.log(`Total extracted images: ${count}`);
