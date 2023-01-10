const fs = require('fs');
const path = require('path');

const EXCLUDED_FILE_SUFFIX = '.spec.ts';
const SUPPORTED_SCRIPT_EXTENSIONS = ['.ts'];
export const scanFolder = (dir) => {
  const components = [];
  fs.readdirSync(dir).forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.lstatSync(filePath);
    if (stat.isDirectory()) {
      components.push(...scanFolder(filePath));
      return;
    }
    const extension = path.extname(file);
    if (!SUPPORTED_SCRIPT_EXTENSIONS.includes(extension) || file.includes(EXCLUDED_FILE_SUFFIX)) {
      return;
    }
    const contents = fs.readFileSync(filePath, 'utf8');
    const [, selector] = contents.match(/@Component\(\{[\s\S]*selector: '(.+?)',/) ?? [];
    if (!selectorMatch) {
      return;
    }
    const [, className] = contents.match(/export class (.+?) /) ?? [];
    if (className) {
      components.push({ selector, className, filePath });
    }
  });
  return components
};
