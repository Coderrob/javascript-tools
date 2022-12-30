const vscode = require('vscode');

// Get the active text editor
const editor = vscode.window.activeTextEditor;

// Get the document associated with the active text editor
const document = editor.document;

// Use the `getDiagnostics` method to get the lint errors for the document
const lintErrors = vscode.languages.getDiagnostics(document.uri);

// Log the lint errors to the console
lintErrors.forEach((error) => console.log(error));

// Check if there are any lint errors
if (lintErrors.length > 0) {
  // If there are lint errors, throw an error to cause an ESLint failure
  throw new Error('Lint errors were found in the HTML file');
}
