# 🧪 Testing Checklist - Code Court VS Code Extension

## Quick Start
1. Press **F5** in VS Code to launch Extension Development Host
2. In the new window, `Ctrl+R` to reload if already running
3. Open **Output Panel**: `Ctrl+Shift+P` > `View: Show Output` > Select "Code Court"

---

## ✅ Phase 2: Authentication

### Test Sign In
- [ ] `Ctrl+Shift+P` > `Code Court: Sign In`
- [ ] Browser opens to Code Court auth page
- [ ] Page shows "Redirecting back to VS Code..."
- [ ] VS Code receives callback automatically
- [ ] Welcome message appears: "Successfully signed in to Code Court!"
- [ ] Snippets load in sidebar (11 snippets)
- [ ] Output log shows: `[INFO] User authenticated: ghamry648@gmail.com`

### Test Sign Out
- [ ] `Ctrl+Shift+P` > `Code Court: Sign Out`
- [ ] Confirmation dialog appears
- [ ] Click "Sign Out"
- [ ] Success message: "Signed out successfully"
- [ ] Snippets clear from sidebar (no errors!)
- [ ] Output log shows: `[INFO] User signed out`

---

## ✅ Phase 3: Snippet Management

### Test Create Snippet

#### From Selection
- [ ] Open any code file (JavaScript, TypeScript, Python, etc.)
- [ ] Select 5-10 lines of code
- [ ] `Ctrl+Shift+P` > `Code Court: Create Snippet from Selection`
- [ ] Wizard Step 1: Title prompt appears
  - [ ] Try entering "ab" (too short) - validation error shows
  - [ ] Enter valid title: "Test Snippet from Selection"
- [ ] Wizard Step 2: Description prompt
  - [ ] Enter: "Testing snippet creation from VS Code"
  - [ ] OR press Escape to skip (optional field)
- [ ] Wizard Step 3: Tags prompt
  - [ ] Enter: "test, vscode, automation"
  - [ ] OR press Escape to skip (optional field)
- [ ] Wizard Step 4: Visibility dropdown
  - [ ] Select "Private" (safer for testing)
- [ ] Progress indicator shows: "Creating snippet..."
- [ ] Success message: "Snippet "Test Snippet from Selection" created successfully!"
  - [ ] Click "View in Browser" - Opens snippet in Code Court
  - [ ] OR click "Create Another" - Wizard starts again
- [ ] Snippets list refreshes automatically
- [ ] New snippet appears in sidebar (now 12 snippets)

#### From Entire File
- [ ] Open a code file (don't select anything)
- [ ] `Ctrl+Shift+P` > `Code Court: Create Snippet from Selection`
- [ ] Follow wizard (entire file code used)
- [ ] Verify snippet created with full file content

#### Error Handling
- [ ] Open non-code file or empty file
- [ ] Try creating snippet
- [ ] Warning: "No code to create snippet from."

---

### Test Search Snippets
- [ ] `Ctrl+Shift+P` > `Code Court: Search Snippets`
- [ ] Search input appears
- [ ] Enter: "test" (or any keyword you have)
- [ ] Progress: "Searching snippets..."
- [ ] Results appear in quick pick dropdown
- [ ] Each result shows:
  - Label: Snippet title
  - Description: Language (e.g., "typescript")
  - Detail: Snippet description
- [ ] Select a snippet from results
- [ ] Opens active editor
- [ ] Snippet code inserts at cursor
- [ ] Success message: "Inserted: [snippet title]"

#### No Results
- [ ] Search for: "xyzabc123nonexistent"
- [ ] Message: "No snippets found for "xyzabc123nonexistent""

#### Cancel Search
- [ ] Start search
- [ ] Press Escape at input
- [ ] Nothing happens (graceful cancel)

---

### Test Delete Snippet
- [ ] Open Code Court sidebar (Activity Bar icon)
- [ ] Find the test snippet you just created
- [ ] Right-click on it
- [ ] Context menu shows: "Delete Snippet"
- [ ] Click "Delete Snippet"
- [ ] Modal confirmation appears:
  - Title: "Are you sure you want to delete "Test Snippet from Selection"?"
  - Buttons: "Delete" and "Cancel"
- [ ] Click "Cancel" first
- [ ] Nothing happens (snippet still there)
- [ ] Right-click again > "Delete Snippet"
- [ ] Click "Delete" this time
- [ ] Progress: "Deleting snippet..."
- [ ] Success message: "Deleted: Test Snippet from Selection"
- [ ] Snippets list refreshes
- [ ] Deleted snippet removed (back to 11 snippets)

---

## ✅ Existing Features (Regression Testing)

### Test Insert Snippet
- [ ] Click any snippet in sidebar
- [ ] Opens active editor
- [ ] Snippet code inserts at cursor
- [ ] Success message: "Inserted: [snippet title]"

### Test Refresh Snippets
- [ ] Click refresh icon in sidebar toolbar
- [ ] Progress: "Refreshing Code Court snippets..."
- [ ] Snippets reload
- [ ] Output log: `[INFO] Fetched X snippets`

### Test Open in Browser
- [ ] Right-click any snippet
- [ ] Click "Open in Browser"
- [ ] Browser opens to: `https://www.codecourt.dev/snippets/[id]`
- [ ] Snippet page loads on Code Court website

---

## 🐛 Error Scenarios

### Network Errors
- [ ] Disconnect internet
- [ ] Try any command (create, search, delete)
- [ ] Error message shows: "Failed to [action]. Please try again."
- [ ] Output log shows error details

### Unauthenticated State
- [ ] Sign out
- [ ] Try: `Code Court: Create Snippet from Selection`
- [ ] Warning: "Please sign in to create snippets"
- [ ] Same for other authenticated commands

---

## 📊 Expected Output Logs

### Successful Authentication
```
[INFO] Starting modern OAuth authentication flow...
[DEBUG] Auth URL { authUrl: '...', callbackUri: 'vscode://...' }
[INFO] Received URI callback: vscode://...
[INFO] User authenticated: ghamry648@gmail.com
[INFO] Fetched 11 snippets
```

### Successful Snippet Creation
```
[INFO] Snippet created: [snippet-id]
[INFO] Fetched 12 snippets
```

### Successful Search
```
[INFO] Inserted snippet from search: [snippet-title] ([snippet-id])
```

### Successful Deletion
```
[INFO] Snippet deleted successfully: [snippet-id]
[INFO] Fetched 11 snippets
```

---

## ✅ Final Verification

After all tests:
- [ ] All 11 original snippets still present
- [ ] No error messages in Output panel
- [ ] No TypeScript errors
- [ ] Extension still responsive
- [ ] Can sign out and sign in again successfully

---

## 🎉 Success Criteria

**All features working if:**
- ✅ Authentication (sign in/out) works flawlessly
- ✅ Create snippet wizard completes successfully
- ✅ Search returns results and inserts correctly
- ✅ Delete removes snippet with confirmation
- ✅ No errors in Output panel
- ✅ All user actions have clear feedback

---

**Happy Testing!** 🚀

If any issues arise, check:
1. Output panel (`Ctrl+Shift+P` > View: Show Output > Code Court)
2. Developer Tools (`Help > Toggle Developer Tools`)
3. Network connection
4. Authentication status

