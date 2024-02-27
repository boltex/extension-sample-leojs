// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "helloworld-sample" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		void accessOtherExtension();
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World!');
	});

	context.subscriptions.push(disposable);
}
async function accessOtherExtension() {
	const extensionId = 'boltex.leojs'; // Replace with the actual ID
	const extension = vscode.extensions.getExtension(extensionId);

	if (!extension) {
		console.error(`Extension ${extensionId} not found.`);
		return;
	}

	// Ensure the extension is activated
	try {
		const g = await extension.activate();
		// Now you can use the exported API
		// console.log('Accessed exported API:', Object.keys(g).join(' '));
		if (g && g.app && g.app.windowList.length) {
			const c = g.app.windowList[g.app.gui.frameIndex].c;
			vscode.window.showInformationMessage(
				'Number of Leo documents opened: ' + g.app.windowList.length.toString() +
				'\nCurrent node\'s headline is: ' + c.p.h
			);
		} else {
			vscode.window.showInformationMessage('No Leo documents opened in LeoJS');
		}

	} catch (error) {
		console.error('Error activating extension:', error);
	}
}