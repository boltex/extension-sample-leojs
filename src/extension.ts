// The module 'vscode' contains the VS Code extensibility API
import * as vscode from 'vscode';

// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "extension-sample-leojs" is now active!');

	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('extension.helloWorld', () => {

		void accessLeoJSDemo();

		vscode.window.showInformationMessage('Hello World!');
	});

	context.subscriptions.push(disposable);
}

async function accessLeoJSDemo() {

	// Here is how to get the LeoJS extension and its 'g' global object.
	// It could be done in 'activate', or any other part of the extension's code.

	const extension = vscode.extensions.getExtension('boltex.leojs');
	if (!extension) {
		console.error(`LeoJS not found.`);
		return;
	}

	try {
		const g = await extension.activate();

		// Now you can use the 'g' leoGlobals object. E.g. to list all its members:
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
		console.error('Error activating LeoJS:', error);
	}
}