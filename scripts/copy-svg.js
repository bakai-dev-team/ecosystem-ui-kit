import fs from 'fs-extra';
import path from 'path';

const srcIcons = '/Users/zhainaknurlanov/Desktop/ui-kit/src/shared/assets/icons';
const distIcons = '/Users/zhainaknurlanov/Desktop/ui-kit/dist/shared/assets/icons';

async function copySVG() {
  console.log('Copying SVG files...');
  console.log('From:', srcIcons);
  console.log('To:', distIcons);
  
  try {
    if (await fs.pathExists(srcIcons)) {
      await fs.ensureDir(distIcons);
      const files = await fs.readdir(srcIcons);
      const svgFiles = files.filter(f => f.endsWith('.svg'));
      
      for (const file of svgFiles) {
        await fs.copyFile(path.join(srcIcons, file), path.join(distIcons, file));
        console.log(`${file}`);
      }
      console.log(`Copied ${svgFiles.length} SVG files`);
    } else {
      console.log('Source directory not found');
    }
  } catch (error) {
    console.log('Error:', error.message);
  }
}

copySVG();
