import * as vscode from 'vscode';
import * as path from 'path';
import open from 'open';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand(
        'extension.openFromWebroot',
        (uri: vscode.Uri) => {
            const config = vscode.workspace.getConfiguration('openFromWebroot');
            const host = config.get<string>('host', '127.0.0.1:8500');
            const webroot = config.get<string>('webroot', '');

            if (!webroot) {
                vscode.window.showErrorMessage('Please configure the webroot path in settings');
                return;
            }

            const filePath = uri.fsPath;
            const normalizedWebroot = path.normalize(webroot);
            const normalizedFilePath = path.normalize(filePath);

            // Check if file is under webroot (case-insensitive on Windows)
            if (!normalizedFilePath.toLowerCase().startsWith(normalizedWebroot.toLowerCase())) {
                vscode.window.showErrorMessage('File is not under the configured webroot');
                return;
            }

            // Get relative path using original case
            const relativePath = normalizedFilePath.substring(normalizedWebroot.length).replace(/^[\\\/]/, '');
            
            // Convert to URL path (forward slashes)
            const urlPath = relativePath.split(path.sep).join('/');
            
            // Extract protocol if user included one, default to http
            const protocolMatch = host.match(/^(https?):?[\/\\]+/);
            const protocol = protocolMatch ? protocolMatch[1] : 'http';
            const cleanHost = host.replace(/^https?:[\/\\]+/, '');
            const url = `${protocol}://${cleanHost}/${urlPath}`;
            
            // Open in browser
            open(url);
            vscode.window.showInformationMessage(`Opening: ${url}`);
        }
    );

    context.subscriptions.push(disposable);
}

export function deactivate() {}