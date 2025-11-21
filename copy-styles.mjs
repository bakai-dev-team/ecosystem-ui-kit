import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Starting to copy SCSS files...');

async function copyStyles() {
  const srcDir = path.join(__dirname, 'src');
  const distDir = path.join(__dirname, 'dist');
  
  console.log('Copying SCSS files...');
  
  try {
    const scssFiles = await findFiles(srcDir, '.scss');
    console.log(`Found ${scssFiles.length} SCSS files`);
    
    for (const file of scssFiles) {
      const relativePath = path.relative(srcDir, file);
      const destPath = path.join(distDir, relativePath);
      
      await fs.ensureDir(path.dirname(destPath));
      await fs.copyFile(file, destPath);
      console.log(`Copied: ${relativePath}`);
    }
    
    console.log(`Successfully copied ${scssFiles.length} SCSS files`);
  } catch (error) {
    console.error('Error copying SCSS files:', error);
  }
}

async function findFiles(dir, ext) {
  let results = [];
  
  try {
    const items = await fs.readdir(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      
      try {
        const stat = await fs.stat(fullPath);
        
        if (stat.isDirectory()) {
          if (!['node_modules', 'dist', '.git'].includes(item)) {
            const subResults = await findFiles(fullPath, ext);
            results = results.concat(subResults);
          }
        } else if (item.endsWith(ext)) {
          results.push(fullPath);
        }
      } catch (err) {
        console.log(`Skipping ${fullPath}: ${err.message}`);
      }
    }
  } catch (err) {
    console.log(`Could not read directory ${dir}: ${err.message}`);
  }
  
  return results;
}

copyStyles().catch(console.error);
