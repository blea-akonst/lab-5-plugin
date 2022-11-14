import * as vscode from 'vscode';

import * as fs from 'fs';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "lab-5-extension-vsc" is now active!');
	let disposable = vscode.commands.registerCommand('lab-5-extension-vsc.createHelloWorldOnC', () => {
		if (!vscode.workspace) {
			return vscode.window.showErrorMessage('Please open a project folder first');
		}

		const folderPath = vscode.workspace.workspaceFolders[0].uri
			.toString()
			.split(':')[1];

		const fileContent = `#include <stdio.h>

		int main(int argc, char **argv) {
			printf('Hello world');
			return 0;
		}
		`;

		fs.writeFile(path.join(folderPath, 'hello_world.c'), fileContent, (err) => {
			if (err) {
				return vscode.window.showErrorMessage(
					'Failed to create Hello World file!'
				  );
			}
		});

		vscode.window.showInformationMessage('File with C Hello World was created successfully.');
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {
	console.log('Your extension \'lab-5-extension-vsc\' is disabled!');
}
