# Code Court for VS Code

> Access your Code Court snippets directly in VS Code. Browse, insert, and create code snippets without ever leaving your editor.

## ✨ Features

- **Browse Snippets**: View all your Code Court snippets in the sidebar
- **Quick Insert**: One-click to insert any snippet at your cursor
- **Create from Selection**: Turn selected code into a snippet instantly
- **Search**: Find snippets by title, language, or tags
- **Seamless Sync**: Always up-to-date with your Code Court account

## 🚀 Getting Started

### 1. Installation

Install the extension from the VS Code Marketplace or search for "Code Court" in VS Code extensions.

### 2. Sign In

1. Click the Code Court icon in the Activity Bar
2. Click "Sign In" or run the `Code Court: Sign In` command
3. Authenticate with your Code Court account
4. You're ready to go!

### 3. Use Your Snippets

- **Browse**: Expand the Code Court sidebar to see all your snippets
- **Insert**: Click the insert icon next to any snippet
- **Create**: Select code, right-click, and choose "Create Snippet from Selection"
- **Search**: Click the search icon in the sidebar

## 📖 Commands

Access these commands via the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`):

- `Code Court: Sign In` - Authenticate with Code Court
- `Code Court: Sign Out` - Sign out of your account
- `Code Court: Refresh Snippets` - Reload your snippets
- `Code Court: Create Snippet from Selection` - Create a new snippet from selected code
- `Code Court: Search Snippets` - Search your snippets
- `Code Court: Open in Browser` - Open snippet in Code Court web app

## ⚙️ Settings

Configure the extension in VS Code Settings:

- `codecourt.apiUrl` - Code Court API URL (default: `https://www.codecourt.dev`)
- `codecourt.autoRefresh` - Auto-refresh snippets on startup (default: `true`)
- `codecourt.insertMode` - How to insert snippets: `cursor` or `replace` (default: `cursor`)

## 🔒 Privacy & Security

- Your authentication token is stored securely in VS Code's SecretStorage
- All communication with Code Court uses HTTPS
- No data is collected or shared with third parties

## 🐛 Troubleshooting

### Extension won't activate
- Reload VS Code: `Developer: Reload Window`
- Check the Output panel: View > Output > Code Court

### Authentication issues
- Sign out and sign in again
- Check your internet connection
- Verify you can access https://www.codecourt.dev

### Snippets not loading
- Click the refresh button in the sidebar
- Check Output panel for errors
- Ensure you're signed in

## 📝 Development

### Prerequisites
- Node.js 20+
- VS Code 1.85+

### Setup
```bash
npm install
npm run watch
```

### Testing
Press `F5` to run the extension in debug mode.

### Building
```bash
npm run compile
```

## 🤝 Contributing

Issues and pull requests are welcome! Visit [github.com/yourusername/codecourt-vscode](https://github.com/yourusername/codecourt-vscode)

## 📄 License

MIT License - see LICENSE file for details

## 🔗 Links

- [Code Court Web App](https://www.codecourt.dev)
- [Report Issues](https://github.com/yourusername/codecourt-vscode/issues)
- [Documentation](https://www.codecourt.dev/docs)

---

Made with ❤️ for developers who love clean code
