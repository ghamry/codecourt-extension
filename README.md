# Code Court - VS Code Extension

Seamlessly access, create, and manage your [Code Court](https://www.codecourt.dev) snippets directly from VS Code.

## ✨ Features

### 🔐 Secure Authentication
- **One-click OAuth login** - No manual token copy/paste
- Automatic browser callback
- Secure token storage in VS Code SecretStorage
- 90-day session duration

### 📚 Snippet Management
- **Browse all your snippets** in a dedicated sidebar
- **Create snippets** from selected code or entire files
- **Edit snippets** (title, description, visibility)
- **Delete snippets** with confirmation
- **Insert snippets** into active editor with one click

### 🔍 Smart Search & Filtering
- **Live filtering** by keywords, tags, or language
- Search across title, description, and code
- Clear filter with one click
- "No results" state with helpful message

### 🎨 Rich UX Features
- **Snippet variables** support ($1, ${TM_FILENAME}, etc.)
- **Hover preview** with Markdown-formatted code
- **Auto-detect language** from file extension
- **Progress indicators** for all operations
- **Keyboard shortcuts** for quick actions

### 🌐 Integration
- **Open in browser** to view/share on Code Court
- **Visibility control** (Public, Protected, Private)
- **Tags support** for better organization
- **Auto-refresh** after create/edit/delete

## 🚀 Getting Started

### Installation

1. Install from [VS Code Marketplace](#) (coming soon)
2. Or install manually:
   ```bash
   code --install-extension codecourt-vscode-0.1.0.vsix
   ```

### First Use

1. Open the Code Court sidebar (click the icon in Activity Bar)
2. Click "Sign In" button
3. Browser opens to Code Court authentication
4. Approve access
5. Automatically redirected back to VS Code
6. Your snippets load automatically! 🎉

## 📖 Usage

### Creating a Snippet

**From selection:**
1. Select code in any file
2. Right-click > "Code Court: Create Snippet from Selection"
3. Or: `Ctrl+Shift+P` > "Code Court: Create Snippet from Selection"

**From entire file:**
1. Open any file (no selection needed)
2. `Ctrl+Shift+P` > "Code Court: Create Snippet from Selection"

**Wizard steps:**
- Enter title (min 3 characters)
- Enter description (optional)
- Enter tags, comma-separated (optional)
- Select visibility (Public/Protected/Private)

### Inserting a Snippet

**From sidebar:**
1. Click any snippet in sidebar
2. Code inserts at cursor position

**From search:**
1. `Ctrl+Shift+P` > "Code Court: Search Snippets"
2. Enter search query
3. Select snippet from results
4. Code inserts at cursor position

### Editing a Snippet

1. Right-click snippet in sidebar
2. Select "Edit Snippet"
3. Update title, description, or visibility
4. Confirm

### Filtering Snippets

1. Click search icon in sidebar toolbar
2. Enter filter keywords
3. Sidebar shows matching snippets only
4. Click clear icon to remove filter

## ⌨️ Keyboard Shortcuts

| Command | Shortcut | Description |
|---------|----------|-------------|
| Sign In | - | Authenticate with Code Court |
| Create Snippet | - | Create from selection/file |
| Search Snippets | - | Filter sidebar snippets |
| Refresh Snippets | - | Reload from server |

*Tip: Use Command Palette (`Ctrl+Shift+P`) to access all commands*

## 🎨 Extension Settings

This extension contributes the following settings:

- `codecourt.apiUrl`: Code Court API URL (default: `https://www.codecourt.dev`)
- `codecourt.insertMode`: How to insert snippets (`cursor` or `replace`)

## 📸 Screenshots

### Snippet Sidebar
![Sidebar](./assets/screenshot-sidebar.png)
*Browse and manage all your snippets*

### Create Snippet Wizard
![Create](./assets/screenshot-create.png)
*Easy step-by-step snippet creation*

### Hover Preview
![Preview](./assets/screenshot-preview.png)
*Rich preview on hover*

### Search & Filter
![Search](./assets/screenshot-search.png)
*Find snippets instantly*

## 🔒 Privacy & Security

- **OAuth 2.0** authentication with secure token storage
- **Token encryption** via VS Code SecretStorage API
- **HTTPS only** - All API calls encrypted
- **No data collection** - Your snippets stay private
- **Open source** - Review the code anytime

## 🐛 Known Issues

None at the moment! Found a bug? [Report it here](https://github.com/your-username/codecourt-vscode/issues)

## 📝 Release Notes

### 0.1.0 (Initial Release)

**Features:**
- Modern OAuth authentication
- Complete CRUD operations (Create, Read, Update, Delete)
- Sidebar filtering with live search
- Snippet variables support
- Hover preview
- Edit snippet functionality
- Rich error handling

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [Code Court Website](https://www.codecourt.dev)
- [GitHub Repository](https://github.com/your-username/codecourt-vscode)
- [Report Issues](https://github.com/your-username/codecourt-vscode/issues)
- [VS Code Marketplace](#) (coming soon)

## 💬 Support

Need help? Have questions?

- [Open an issue](https://github.com/your-username/codecourt-vscode/issues)
- [Visit Code Court](https://www.codecourt.dev)

---

**Made with ❤️ for developers by developers**
