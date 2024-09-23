// The module 'vscode' contains the VS Code extensibility API
import * as vscode from 'vscode';

// your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext): Promise<unknown> {

	// This line of code will only be executed once when your extension is activated
	vscode.window.showInformationMessage('Congratulations, your extension "extension-sample-leojs" is now active!');

	// Here is how to get the LeoJS extension and its 'g' global object.
	// It could be done here in the 'activate'function,  and stored in a variable,
	// or in any other part of the extension's code.
	const extension = vscode.extensions.getExtension('boltex.leojs');
	if (!extension) {
		vscode.window.showErrorMessage(`LeoJS not found.`);
		return;
	}

	try {
		const g = await extension.activate();
		// Now you can use the 'g' leoGlobals object. E.g. to list all its members:
		// console.log('Accessed exported API:', Object.keys(g).join(' '));

		// Here's how to use a hook and registerHandler to react to the user inserting new nodes
		const newNodeHandler = (tag: string, keywords: Record<string, any>) => {
			// In a timeout for the user's headline input window to resolve.
			setTimeout(() => { vscode.window.showInformationMessage(`Handler ${tag}: New node is ${keywords.p.h}`); }, 0);
		};

		g.registerHandler("create-node", newNodeHandler);

	} catch (error) {
		vscode.window.showErrorMessage('Error activating LeoJS');
	}

	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
		void accessLeoJSDemo(); // This command also shows how to get the g global object to access c.p, etc.
	});

	context.subscriptions.push(disposable);
}

async function accessLeoJSDemo() {

	// Here is again how to get the LeoJS extension and its 'g' global object. (if not already available in some stored variable)
	// It could be done above in the 'activate', or any other part of the extension's code.
	const extension = vscode.extensions.getExtension('boltex.leojs');
	if (!extension) {
		vscode.window.showErrorMessage(`LeoJS not found.`);
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
		vscode.window.showErrorMessage('Error activating LeoJS');
	}
}