const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function generateOGImage() {
  const inputImage = path.join(__dirname, '..', 'public', 'images', 'projects', 'election-tv2.jpg');
  const outputImage = path.join(__dirname, '..', 'public', 'og.png');

  // SVG text overlay - cinematic style
  const svgText = `
    <svg width="1200" height="630">
      <!-- Dark gradient overlay for readability -->
      <defs>
        <linearGradient id="darkGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:rgb(0,0,0);stop-opacity:0.7" />
          <stop offset="50%" style="stop-color:rgb(0,0,0);stop-opacity:0.75" />
          <stop offset="100%" style="stop-color:rgb(0,0,0);stop-opacity:0.7" />
        </linearGradient>
      </defs>
      <rect width="1200" height="630" fill="url(#darkGrad)" />

      <!-- Text content - centered -->
      <text x="600" y="280"
            font-family="system-ui, -apple-system, sans-serif"
            font-size="72"
            font-weight="300"
            fill="white"
            text-anchor="middle"
            letter-spacing="-1">patrick jørgensen</text>

      <text x="600" y="360"
            font-family="system-ui, -apple-system, sans-serif"
            font-size="28"
            font-weight="300"
            fill="rgba(255,255,255,0.7)"
            text-anchor="middle"
            letter-spacing="2">creative technologist · musician</text>
    </svg>
  `;

  try {
    // Process the image
    await sharp(inputImage)
      .resize(1200, 630, { fit: 'cover', position: 'center' })
      .grayscale()
      .modulate({ brightness: 0.5, saturation: 0.3 }) // Darken and desaturate
      .composite([{
        input: Buffer.from(svgText),
        top: 0,
        left: 0
      }])
      .png()
      .toFile(outputImage);

    console.log('✅ OG image created successfully at /public/og.png');
    console.log('   Dimensions: 1200×630');
    console.log('   Style: Cinematic (grayscale, darkened, centered text)');
  } catch (error) {
    console.error('❌ Error generating OG image:', error);
    process.exit(1);
  }
}

generateOGImage();
