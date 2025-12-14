# Change Log

All notable changes to the "Code Court" extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2025-12-14

### Added
- 🎉 **Initial release of Code Court VS Code Extension**
- 🔐 **Modern OAuth Authentication**
  - One-click browser authentication
  - Automatic callback to VS Code
  - Secure token storage (90-day sessions)
  - Silent sign-out with no errors
- 📚 **Snippet Management**
  - Browse all snippets in dedicated sidebar
  - Create snippets from selected code or entire files
  - Edit snippet title, description, and visibility
  - Delete snippets with confirmation modal
  - Auto-refresh after all operations
- 🔍 **Search & Filtering**
  - Live filtering in sidebar by keywords
  - Search across title, description, and code
  - Clear filter with one click
  - "No results" empty state
- 🎨 **Rich User Experience**
  - Snippet variables support ($1, ${TM_FILENAME}, etc.)
  - Hover preview with Markdown-formatted code
  - Auto-detect language from file extension
  - Progress indicators for all async operations
  - Professional icons throughout
- 🌐 **Code Court Integration**
  - Open snippets in browser
  - Visibility control (Public/Protected/Private)
  - Tags support for organization
  - Syncs with Code Court web platform
- 🛡️ **Security & Privacy**
  - OAuth 2.0 with secure token storage
  - HTTPS-only API calls
  - Ownership verification on all operations
  - No data collection or telemetry

### Features in Detail

#### Authentication Flow
- Browser-based OAuth with automatic redirect
- No manual token copy/paste required
- 5-minute timeout protection
- Encrypted token storage via VS Code SecretStorage

#### Create Snippet Wizard
- Step-by-step guided process
- Title validation (min 3 characters)
- Optional description and tags
- Visibility selection dropdown
- Action buttons: "View in Browser" or "Create Another"

#### Edit Snippet
- Update title with live validation
- Edit description (optional field)
- Change visibility (Public/Protected/Private)
- Original code/language/tags preserved
- Progress indicator during update

#### Search & Filter
- Real-time filtering as you type
- Searches title, description, and code
- Shows snippet count: "Found X snippet(s)"
- Select to insert directly into editor
- Respects insert mode (cursor/replace)

#### Snippet Variables
- Supports all VS Code snippet variables
- Tabstops: $1, $2, ${1:default}
- File variables: ${TM_FILENAME}, ${TM_DIRECTORY}
- Date/time variables: ${CURRENT_YEAR}, ${CURRENT_DATE}
- Clipboard: ${CLIPBOARD}

### Commands

| Command | Description |
|---------|-------------|
| `Code Court: Sign In` | Authenticate with Code Court |
| `Code Court: Sign Out` | Sign out and clear session |
| `Code Court: Create Snippet from Selection` | Create snippet from code |
| `Code Court: Search Snippets` | Filter snippets in sidebar |
| `Code Court: Clear Filter` | Remove active filter |
| `Code Court: Refresh Snippets` | Reload from server |
| `Code Court: Insert Snippet` | Insert at cursor (context menu) |
| `Code Court: Edit Snippet` | Edit snippet metadata (context menu) |
| `Code Court: Delete Snippet` | Delete with confirmation (context menu) |
| `Code Court: Open in Browser` | View on Code Court website (context menu) |

### Configuration

- `codecourt.apiUrl` - API endpoint (default: `https://www.codecourt.dev`)
- `codecourt.insertMode` - Insert behavior (`cursor` or `replace`)

### Technical Details

- **Minimum VS Code Version:** 1.95.0
- **Node.js Version:** 20.9+
- **Languages Supported:** All (auto-detection from file extension)
- **Bundle Size:** 258 KiB (optimized production build)
- **Dependencies:** 
  - axios 1.7.9 (HTTP client)
  - VS Code API (built-in)

### Known Limitations

- Requires internet connection for all operations
- No offline mode (planned for future release)
- Maximum 50 snippets per page (pagination support coming)

---

## [Unreleased]

### Planned Features
- Keyboard shortcuts for common actions
- Snippet templates
- Bulk operations (delete multiple, export)
- GitHub Gist integration
- Offline mode with sync
- Team/workspace snippets
- Snippet versioning
- AI-powered features (description generation, tag suggestions)

---

**Note:** This is the first public release. Future versions will follow semantic versioning:
- **MAJOR** version for incompatible API changes
- **MINOR** version for new functionality in a backward compatible manner  
- **PATCH** version for backward compatible bug fixes
