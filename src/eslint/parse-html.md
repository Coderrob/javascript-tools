# Parse html

    Install the following dependencies:

    eslint: A tool for linting and fixing code.
    @angular/eslint-plugin: An ESLint plugin for Angular that includes rules for type checking templates.
    @typescript-eslint/parser: An ESLint parser that can parse TypeScript code.

You can install these dependencies using the following command:

```bash
npm install --save-dev eslint @angular/eslint-plugin @typescript-eslint/parser
```

```js
module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@angular/eslint-plugin'],
  rules: {
    // Enable the template type checking rules
    '@angular/template-type-checking': 'error',
  },
};
```

```bash
eslint . --ext .html
```
