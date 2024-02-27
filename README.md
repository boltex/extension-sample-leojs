# LeoJS API Access Sample Extension

This is a sample extension that shows you how to use LeoJS from another extension by accessing its instance of the leoGlobals 'g' object.

With LeoJS installed, and this extension started (see Running the Sample below) Open the command palette with `CTRL+SHIFT+¨P` and type 'Hello'.

This should display a message about the number of Leo documents opened in LeoJS along with the headline of the currently selected node.

## Demo

![demo](demo.gif)

## VS Code API

### `vscode` module

- [`commands.registerCommand`](https://code.visualstudio.com/api/references/vscode-api#commands.registerCommand)
- [`window.showInformationMessage`](https://code.visualstudio.com/api/references/vscode-api#window.showInformationMessage)

### Contribution Points

- [`contributes.commands`](https://code.visualstudio.com/api/references/contribution-points#contributes.commands)

## Running the Sample

- Run `npm install` in terminal to install dependencies
- Run the `Run Extension` target in the Debug View. This will:
  - Start a task `npm: watch` to compile the code
  - Run the extension in a new VS Code window
