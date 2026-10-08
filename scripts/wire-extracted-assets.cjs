const fs = require('fs');
const path = require('path');

const extractedDir = path.join(__dirname, '..', 'public', 'assets', 'extracted');
const imagesDir = path.join(__dirname, '..', 'public', 'assets', 'images');

const copies = [
  // 1. Topographic pattern
  { src: '0_image0_1010_8_2732x4096.png', dest: 'topo-pattern.png' },
  
  // 2. Discover section 3D renders
  { src: '2_image2_1010_8_1000x1000.png', dest: 'discover-calm.png' },
  { src: '3_image3_1010_8_2000x2000.png', dest: 'discover-sleep.png' },
  { src: '4_image4_1010_8_2000x2000.png', dest: 'discover-understand.png' },
  { src: '5_image5_1010_8_2000x1556.png', dest: 'discover-habits.png' },
  { src: '6_image6_1010_8_2000x2000.png', dest: 'discover-connect.png' },
  { src: '7_image7_1010_8_2048x2048.png', dest: 'discover-change.png' },
  
  // 3. Rituals Bell
  { src: '5_image5_1010_8_2000x1556.png', dest: 'rituals-bell.png' },
  
  // 4. Approach Mascot / Illustration
  { src: '9_image9_1010_8_2048x1152.png', dest: 'approach-illustration.png' },
  
  // 5. Quick Reset Photos
  { src: '11_image11_1010_8_1000x667.jpg', dest: 'reset-breathe.jpg' },
  { src: '13_image13_1010_8_1000x558.jpg', dest: 'reset-attention.jpg' },
  { src: '14_image14_1010_8_1000x667.jpg', dest: 'reset-tension.jpg' },
  { src: '15_image15_1010_8_1000x667.jpg', dest: 'reset-calm.jpg' },
  
  // 6. AI Avatar & Phone Mockup
  { src: '16_image16_1010_8_848x1264.png', dest: 'phone-mockup.png' },
  { src: '17_image17_1010_8_648x1152.png', dest: 'avatar-mascot.png' },
  
  // 7. CTA Mascot (pattern34 uses image18)
  { src: '18_image18_1010_8_2048x1152.png', dest: 'cta-mascot.png' },

  // 8. Hero 3D Compass
  { src: '1_image1_1010_8_2000x1250.png', dest: 'compass-3d.png' },
];

copies.forEach(({ src, dest }) => {
  const srcPath = path.join(extractedDir, src);
  const destPath = path.join(imagesDir, dest);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${src} -> ${dest}`);
  } else {
    console.warn(`Source not found: ${src}`);
  }
});
console.log('All extracted assets wired successfully!');
