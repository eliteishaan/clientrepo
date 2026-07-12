/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

function getDirSize(dirPath) {
  let size = 0;
  const files = fs.readdirSync(dirPath);

  for (let i = 0; i < files.length; i++) {
    const filePath = path.join(dirPath, files[i]);
    const stats = fs.statSync(filePath);

    if (stats.isFile()) {
      size += stats.size;
    } else if (stats.isDirectory()) {
      size += getDirSize(filePath);
    }
  }
  return size;
}

const nextDir = path.join(__dirname, '.next');
const staticChunksDir = path.join(nextDir, 'static', 'chunks');
const staticCssDir = path.join(nextDir, 'static', 'css');

try {
  const jsSize = getDirSize(staticChunksDir);
  const cssSize = fs.existsSync(staticCssDir) ? getDirSize(staticCssDir) : 0;
  
  console.log('--- REAL MEASUREMENTS ---');
  console.log(`Total First Load JS (Chunks): ${(jsSize / 1024).toFixed(2)} KB`);
  console.log(`Total CSS Size: ${(cssSize / 1024).toFixed(2)} KB`);
  console.log('-------------------------');
} catch (e) {
  console.error('Error measuring bundle:', e);
}
