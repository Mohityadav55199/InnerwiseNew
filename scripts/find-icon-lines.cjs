const fs = require('fs');
const path = require('path');

const svgPath = path.join(__dirname, '..', 'public', 'assets', 'icons', 'Desktop - Home.svg');
const svg = fs.readFileSync(svgPath, 'utf8');
const lines = svg.split('\n');

console.log('Searching for lines containing specific icon strokes/fills...');

// Search for strokes:
// Explore icons have stroke="#FAF5F2"
// AI icons have stroke="#47A3F8"
// Pillars have fill="#FAF5F2" or stroke="#FAF5F2"
// Wave has y="7747" or similar

lines.forEach((line, idx) => {
  if (line.includes('stroke="#FAF5F2"') || line.includes('stroke="#47A3F8"') || line.includes('835.857') || line.includes('850.538') || line.includes('7747') || line.includes('1010_25') || line.includes('1010:25')) {
    console.log(`L${idx}: ${line.slice(0, 150)}`);
  }
});
