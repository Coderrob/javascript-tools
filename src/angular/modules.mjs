const fs = require('fs');
const path = require('path');

const SUPPORTED_SCRIPT_EXTENSIONS = ['.js', '.ts'];

const components = [];

export const scanFolder = (dir) => {
  fs.readdirSync(dir).forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.lstatSync(filePath);
    if (stat.isDirectory()) {
      scanFolder(filePath);
      return;
    }
    //
    if (!SUPPORTED_SCRIPT_EXTENSIONS.includes(path.extname(filePath))) {
      return;
    }
    // Read the file contents
    const contents = fs.readFileSync(filePath, 'utf8');
    // Extract the selector value from the @Component decorator
    // - note: ai made assumption only one component per file - should validate w/ lint rules
    // - note: regex open any security issues? need to validate
    const [, selector] = contents.match(
      /@Component\(\{[\s\S]*selector: '(.+?)',/
    );
    if (!selectorMatch) {
      return;
    }
    // Extract the module class name
    const [, moduleClass] = contents.match(/export class (.+?) /);
    if (moduleClass) {
      components.push({ selector, moduleClass, filePath });
    }
  });
};
