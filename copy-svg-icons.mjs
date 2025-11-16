import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function copySvgIcons() {
  console.log('🚀 Starting to copy SVG icon files...');
  
  const sourceDir = path.join(__dirname, 'src', 'shared', 'assets', 'svg-icons');
  const targetDir = path.join(__dirname, 'dist', 'shared', 'assets', 'svg-icons');

  try {
    if (!await fs.pathExists(sourceDir)) {
      console.log('❌ Source SVG icons directory does not exist:', sourceDir);
      return;
    }

    console.log(`📁 Source: ${sourceDir}`);
    console.log(`📁 Target: ${targetDir}`);
    
    // Создаем целевую папку если не существует
    await fs.ensureDir(targetDir);
    
    // Копируем все файлы из папки svg-icons
    const items = await fs.readdir(sourceDir);
    let copiedCount = 0;
    
    for (const item of items) {
      const sourcePath = path.join(sourceDir, item);
      const targetPath = path.join(targetDir, item);
      
      if ((await fs.stat(sourcePath)).isFile()) {
        await fs.copy(sourcePath, targetPath);
        console.log(`✅ Copied: ${item}`);
        copiedCount++;
      }
    }
    
    console.log(`🎉 Successfully copied ${copiedCount} SVG icon files`);
  } catch (error) {
    console.error('❌ Error copying SVG icons:', error);
  }
}

copySvgIcons();