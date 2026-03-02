import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
// import * as myExtension from '../../extension';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Sample test', () => {
		assert.strictEqual(-1, [1, 2, 3].indexOf(5));
		assert.strictEqual(-1, [1, 2, 3].indexOf(0));
	});
});

suite('URL Construction', () => {
	function buildUrl(host: string, urlPath: string): string {
		const protocolMatch = host.match(/^(https?):?[\/\\]+/);
		const protocol = protocolMatch ? protocolMatch[1] : 'http';
		const cleanHost = host.replace(/^https?:[\/\\]+/, '');
		return `${protocol}://${cleanHost}/${urlPath}`;
	}

	test('http:// prefix preserved', () => {
		assert.strictEqual(buildUrl('http://localhost:8888', 'test.cfm'), 'http://localhost:8888/test.cfm');
	});

	test('https:// prefix preserved', () => {
		assert.strictEqual(buildUrl('https://localhost:8888', 'test.cfm'), 'https://localhost:8888/test.cfm');
	});

	test('http:\\\\ prefix preserved', () => {
		assert.strictEqual(buildUrl('http:\\\\localhost:8888', 'test.cfm'), 'http://localhost:8888/test.cfm');
	});

	test('https:\\\\ prefix preserved', () => {
		assert.strictEqual(buildUrl('https:\\\\localhost:8888', 'test.cfm'), 'https://localhost:8888/test.cfm');
	});

	test('no protocol defaults to http', () => {
		assert.strictEqual(buildUrl('localhost:8888', 'test.cfm'), 'http://localhost:8888/test.cfm');
	});

	test('host with IP and port defaults to http', () => {
		assert.strictEqual(buildUrl('127.0.0.1:8500', 'folder/file.cfm'), 'http://127.0.0.1:8500/folder/file.cfm');
	});
});
