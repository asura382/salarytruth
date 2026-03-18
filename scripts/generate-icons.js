const sharp = require("sharp")

async function generateIcon(size, outputPath) {
  const svg = `
    <svg width="${size}" height="${size}" 
      xmlns="http://www.w3.org/2000/svg">
      <rect width="${size}" height="${size}" 
        fill="#1a56db" rx="${size * 0.15}"/>
      <text 
        x="50%" y="50%" 
        font-family="Arial, sans-serif"
        font-size="${size * 0.38}" 
        font-weight="bold"
        fill="white" 
        text-anchor="middle" 
        dominant-baseline="central">
        ST
      </text>
    </svg>
  `
  await sharp(Buffer.from(svg))
    .png()
    .toFile(outputPath)
}

async function main() {
  await generateIcon(192, "public/icon-192.png")
  await generateIcon(512, "public/icon-512.png")
  console.log("Icons generated!")
}

main()
