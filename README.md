# Run in Browser

Quickly open files in your browser relative to a configured webroot path.

## Features

- Right-click any file in the VS Code Explorer and select "Run in Browser"
- Automatically constructs the correct URL based on your webroot configuration
- Perfect for ColdFusion, PHP, or any other server-side development

## Configuration

This extension has two settings:

- `runInBrowser.host`: The host and port for your local server (default: `127.0.0.1:8500`)
- `runInBrowser.webroot`: The absolute path to your webroot directory (default: `C:\ColdFusion2021\cfusion\wwwroot`)

## Usage

1. Configure your host and webroot in VS Code Settings
2. Right-click on any file under your webroot in the Explorer
3. Select "Run in Browser"
4. The file opens in your default browser with the correct URL

## Requirements

- Files must be located under the configured webroot path
- Your local server must be running

## Release Notes

### 0.0.1

Initial release