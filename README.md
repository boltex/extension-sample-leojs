# LeoJS API Access Sample Extension

> _For Leo script samples with LeoJS and UI interaction, see [scripting-samples-leojs](https://github.com/boltex/scripting-samples-leojs)_

**This is a sample extension that shows you how to access and use LeoJS from another extension through its exposed instance of the leoGlobals 'g' object.**

It grabs the extension, and the g object is what is actually exported by the activation method

```
const extension = vscode.extensions.getExtension('boltex.leojs');
const g = await extension.activate();
```

To run and try it. with LeoJS installed, and this extension started (see Running the Sample below) Open the command palette with `CTRL+SHIFT+P` and type 'Hello'.

This should access LeoJs and display a message about the number of Leo documents opened along with the headline of the currently selected node.

There is also a hook that is setup as example of usage of Leo 'hooks'with g.registerHandler. Inserting a node triggers a hook that is registered on the "create-node" event like so:

```
g.registerHandler("create-node", newNodeHandler);
```

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
