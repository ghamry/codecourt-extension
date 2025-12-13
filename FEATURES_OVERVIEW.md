# 📋 Features Overview - Code Court VS Code Extension

## 🎯 Business Value Proposition

**For Developers:**
"Access your Code Court snippets without leaving VS Code. Streamline your workflow with one-click integration."

**Key Benefits:**
- ⚡ **Faster Development** - No context switching to browser
- 🔍 **Quick Search** - Find snippets instantly
- ✨ **Seamless Insert** - One click to insert code
- 🚀 **Productivity Boost** - Create snippets from your editor

---

## ✅ MVP Features (Version 0.1.0)

These are the **core features** that make the extension valuable:

### 1. 🔐 **Authentication** (Phase 2)
**Status:** Planned
**User Story:** As a developer, I want to sign in to Code Court from VS Code so I can access my snippets.

**Features:**
- Sign in with Code Court account (OAuth2)
- Secure token storage (VS Code SecretStorage)
- Sign out functionality
- Session persistence (30-day token)

**UX:**
- Click "Sign In" button in sidebar
- Browser opens for authentication
- Automatic redirect back to VS Code
- "Signed in as [name]" confirmation

---

### 2. 📚 **Browse Snippets** (Phase 3-4)
**Status:** Partially implemented (structure ready)
**User Story:** As a developer, I want to see all my snippets in VS Code sidebar so I can quickly find what I need.

**Features:**
- ✅ Tree view in sidebar (structure ready)
- ✅ Grouped by language (code ready)
- ✅ Show snippet title and description
- ✅ Icons for different languages
- ✅ Refresh button
- Auto-refresh on startup (optional setting)

**UX:**
```
Code Court Sidebar
├── 🔄 Refresh
├── 🔍 Search
├── ➕ Create
│
├── 📁 JavaScript (5)
│   ├── 📄 Debounce Function
│   ├── 📄 Array Helper Utils
│   └── ...
├── 📁 Python (3)
│   ├── 📄 Django Auth Decorator
│   └── ...
```

---

### 3. ⚡ **Insert Snippet** (Phase 5) - **KEY FEATURE**
**Status:** Planned
**User Story:** As a developer, I want to insert a snippet at my cursor position so I can quickly use code I've saved.

**Features:**
- One-click insert from tree view
- Insert at cursor position
- OR replace selected text (setting)
- Keyboard shortcut support
- Toast notification on success

**UX Flow:**
1. User clicks snippet in sidebar
2. Snippet code inserted at cursor in active editor
3. Notification: "✅ Inserted: [Snippet Title]"

**Implementation:**
```typescript
// Already in commands/index.ts
async function insertSnippetCommand(item: SnippetTreeItem): Promise<void> {
  const editor = vscode.window.activeTextEditor;
  await editor.edit((editBuilder) => {
    editBuilder.insert(editor.selection.active, snippet.code);
  });
}
```

**Settings:**
- `codecourt.insertMode`: "cursor" or "replace"

---

### 4. ➕ **Create Snippet** (Phase 5)
**Status:** Planned
**User Story:** As a developer, I want to create snippets from code I'm working on so I can save useful patterns.

**Features:**
- Create from selected code
- Right-click context menu
- Auto-detect language from file
- Form to enter: title, description, tags, visibility
- Auto-refresh tree view after creation

**UX Flow:**
1. User selects code in editor
2. Right-click > "Code Court: Create Snippet from Selection"
3. Dialog appears with pre-filled code and language
4. User enters title, description, tags
5. Click "Create"
6. Snippet appears in tree view
7. Notification: "✅ Created: [Snippet Title]"

**Implementation:**
```typescript
async function createSnippetCommand() {
  const editor = vscode.window.activeTextEditor;
  const selectedCode = editor.document.getText(editor.selection);
  const language = editor.document.languageId;

  // Show input boxes for metadata
  const title = await vscode.window.showInputBox({
    prompt: "Snippet Title"
  });

  // Create via API
  await apiClient.createSnippet({ title, code, language, ... });

  // Refresh tree view
  await snippetsProvider.refresh();
}
```

---

### 5. 🔍 **Search Snippets** (Phase 5)
**Status:** Planned
**User Story:** As a developer, I want to search my snippets by title, language, or tags so I can find what I need quickly.

**Features:**
- Quick search box
- Filter by: title, language, tags
- Real-time results
- Select from results to insert

**UX Flow:**
1. User clicks 🔍 Search button in sidebar
2. Quick pick input appears
3. User types search query
4. Results update in real-time
5. Select snippet to insert OR view details

**Implementation:**
```typescript
async function searchSnippetsCommand() {
  const query = await vscode.window.showInputBox({
    prompt: "Search snippets...",
    placeHolder: "Enter title, language, or tag"
  });

  const results = await apiClient.searchSnippets({ query });

  // Show quick pick with results
  const selected = await vscode.window.showQuickPick(
    results.map(s => ({ label: s.title, snippet: s }))
  );

  if (selected) {
    await insertSnippetCommand(selected.snippet);
  }
}
```

---

### 6. 🗑️ **Delete Snippet** (Phase 5) - **BONUS FEATURE**
**Status:** NOT in original plan, but easy to add
**User Story:** As a developer, I want to delete snippets I no longer need directly from VS Code.

**Features:**
- Right-click snippet > "Delete"
- Confirmation dialog
- Same safety checks as web app (can't delete if forked)
- Auto-refresh tree view after deletion

**UX Flow:**
1. User right-clicks snippet in tree view
2. Select "Delete Snippet"
3. Confirmation dialog: "Are you sure you want to delete '[Title]'?"
4. Click "Delete"
5. API call to DELETE endpoint
6. Tree view refreshes
7. Notification: "✅ Deleted: [Snippet Title]"

**Implementation:**
```typescript
async function deleteSnippetCommand(item: SnippetTreeItem) {
  const confirm = await vscode.window.showWarningMessage(
    `Delete "${item.snippet.title}"?`,
    { modal: true },
    'Delete'
  );

  if (confirm === 'Delete') {
    await apiClient.deleteSnippet(item.snippet.id);
    await snippetsProvider.refresh();
    vscode.window.showInformationMessage(`Deleted: ${item.snippet.title}`);
  }
}
```

**Add to package.json:**
```json
{
  "command": "codecourt.deleteSnippet",
  "title": "Delete Snippet",
  "category": "Code Court",
  "icon": "$(trash)"
}
```

---

### 7. 🌐 **Open in Browser** (Phase 5) - **Already Implemented!**
**Status:** ✅ Working
**User Story:** As a developer, I want to open a snippet in the web app to see comments, ratings, and full details.

**Features:**
- ✅ Right-click snippet > "Open in Browser"
- ✅ Opens snippet page in default browser
- ✅ Full context (comments, ratings, forks)

**Already working in:** `commands/index.ts`

---

## 🎯 Feature Priority for MVP

### Must Have (Core Value)
1. ✅ **Authentication** - Can't work without it
2. ✅ **Browse Snippets** - Primary use case
3. ✅ **Insert Snippet** - KEY FEATURE (main value)
4. ✅ **Create Snippet** - Core workflow

### Should Have (Enhanced UX)
5. ✅ **Search Snippets** - Improves findability
6. ✅ **Open in Browser** - Bridge to web app

### Nice to Have (Bonus)
7. 🆕 **Delete Snippet** - Power user feature
8. 🆕 **Edit Snippet** - Could redirect to web app
9. 🆕 **Fork Snippet** - Could redirect to web app

---

## 📊 What's Already Implemented

### ✅ Fully Ready
- Extension structure
- All command registrations
- Sidebar tree view (empty state)
- Settings configuration
- Logger and error handling
- API client structure
- Type definitions

### ⚡ Partially Ready (needs data)
- Tree view provider (needs API integration)
- Insert snippet command (needs authentication)
- Open in browser (works but needs auth check)

### ⏳ Needs Implementation
- Authentication flow (Phase 2)
- API integration (Phase 3)
- Create snippet form (Phase 5)
- Search interface (Phase 5)
- Delete functionality (bonus)

---

## 🚀 Development Roadmap

### Week 1: Phase 2 - Authentication
- Backend: Add vscodeToken to User model
- Backend: Create POST /api/auth/vscode-token
- Extension: Implement OAuth2 flow
- Extension: Test sign in/out

### Week 2: Phase 3 - API Integration
- Extension: Fetch snippets from API
- Extension: Display in tree view
- Extension: Handle errors gracefully
- Extension: Test with real data

### Week 3-4: Phase 4 - Core UI
- Extension: Improve tree view UX
- Extension: Add language icons
- Extension: Group by language/tags
- Extension: Loading states

### Week 5-6: Phase 5 - Core Features
- Extension: Insert snippet command
- Extension: Create snippet form
- Extension: Search interface
- Extension: Delete snippet (bonus)

### Week 7: Phase 6 - Polish
- Testing on Windows/Mac/Linux
- Error handling improvements
- Performance optimization
- Screenshots for marketplace

### Week 8: Launch
- Marketplace listing
- Documentation
- Marketing materials
- Initial release

---

## 💰 Monetization Strategy (Future)

### Free Tier (MVP)
- All core features
- Unlimited snippet access
- All CRUD operations

### Premium Features (Future)
- Team snippet sharing
- Advanced search filters
- Snippet analytics
- VS Code themes integration
- AI-powered snippet suggestions

---

## ✅ Summary: What We Have Now

**Working:**
- ✅ Extension activates
- ✅ Sidebar appears
- ✅ Commands registered
- ✅ Settings work
- ✅ Build system ready
- ✅ Code architecture clean

**Needs Phase 2+ (Authentication & Integration):**
- ❌ Actual sign in
- ❌ Viewing snippets
- ❌ Inserting snippets
- ❌ Creating snippets
- ❌ Searching snippets
- ❌ Deleting snippets

**This is normal!** Phase 1 = foundation. Now we build features on top.

---

**Ready to test Phase 1 and then move to Phase 2?** Let's verify the foundation works before building authentication!
