# Phase 3 & 4 Implementation Plan

## ✅ What's Already Working

### Phase 2: Authentication - COMPLETE
- Modern OAuth flow with automatic callback
- Secure token storage in VS Code SecretStorage  
- Silent error handling on sign out
- 11 snippets successfully loaded

### Existing Snippet Features
- ✅ Snippet insertion into editor (working)
- ✅ Refresh snippets command (working)
- ✅ Open snippet in browser (working)
- ✅ Auto-language detection (working)

---

## 🚀 Phase 3: Snippet Management (Ready to Implement)

### 1. Create Snippet from Selection ⏳
**Feature:** Convert selected code or entire file into a Code Court snippet

**User Flow:**
1. User opens a file or selects code
2. `Ctrl+Shift+P` > `Code Court: Create Snippet`
3. Wizard prompts for:
   - Title (required, min 3 chars)
   - Description (optional)
   - Tags (comma-separated, optional)
   - Visibility (Public/Protected/Private)
4. Progress indicator shows "Creating snippet..."
5. Success message with actions: "View in Browser" or "Create Another"
6. Snippets list automatically refreshes

**Features:**
- Auto-detect language from file extension
- Use selection if present, otherwise entire document
- Validation for required fields
- Progress indicators for better UX
- Action buttons for next steps

---

### 2. Search Snippets ⏳
**Feature:** Quick search through your snippets

**User Flow:**
1. `Ctrl+Shift+P` > `Code Court: Search Snippets`
2. Enter search query (keywords, tags, or language)
3. Results shown in quick pick menu
4. Select snippet to insert into active editor
5. Success message confirms insertion

**Features:**
- Search by title, description, tags, or language
- Results displayed with title, language, and description
- Direct insertion from search results
- Graceful handling when no results found

---

### 3. Delete Snippet ⏳
**Feature:** Remove snippets with confirmation

**User Flow:**
1. Right-click snippet in sidebar
2. Select "Delete Snippet"
3. Confirmation modal: "Are you sure you want to delete "{title}"?"
4. Progress indicator shows "Deleting..."
5. Success message confirms deletion
6. Snippets list automatically refreshes

**Features:**
- Modal confirmation to prevent accidents
- Progress indicators
- Automatic refresh after deletion
- Error handling with clear messages

---

## 🎨 Phase 4: Enhanced UX (Future)

### 1. Snippet Preview on Hover
- Show code preview in tooltip when hovering over snippet
- Display metadata (language, tags, created date)

### 2. Keyboard Shortcuts
- Quick insert: `Ctrl+Alt+S`
- Quick create: `Ctrl+Alt+C`
- Search snippets: `Ctrl+Alt+F`

### 3. Advanced Filtering
- Filter by language in sidebar
- Filter by tags
- Sort options (newest, oldest, most used)

---

## 📋 Implementation Checklist

### Backend API Endpoints (Already Available)
- ✅ `POST /api/vscode/snippets` - Create snippet
- ✅ `GET /api/vscode/snippets?search=...` - Search snippets
- ✅ `DELETE /api/vscode/snippets/:id` - Delete snippet

### Extension Commands to Update
- ✅ `codecourt.createSnippet` - Needs full implementation
- ✅ `codecourt.searchSnippets` - Needs full implementation
- ⏳ `codecourt.deleteSnippet` - Needs registration + implementation

### Files to Modify
1. `src/commands/index.ts` - Add implementations
2. `package.json` - Add delete command to context menu
3. Compile and test

---

## 🧪 Testing Plan

###  1. Create Snippet
- [ ] Create from selected code
- [ ] Create from entire file
- [ ] Cancel at each prompt step
- [ ] Validation for title length
- [ ] Tags parsing (comma-separated)
- [ ] All visibility options
- [ ] "View in Browser" action
- [ ] "Create Another" action
- [ ] Refresh after creation

### 2. Search Snippets
- [ ] Search by title
- [ ] Search by tags
- [ ] Search by language
- [ ] No results message
- [ ] Insert from results
- [ ] Cancel search
- [ ] Multiple results handling

### 3. Delete Snippet
- [ ] Right-click context menu
- [ ] Confirmation modal shows
- [ ] Cancel deletion
- [ ] Confirm deletion
- [ ] Progress indicator
- [ ] Success message
- [ ] Refresh after deletion
- [ ] Error handling

---

## 📊 Current Status

**Extension State:**
- Compiled successfully ✅
- No TypeScript errors ✅
- Modern OAuth working ✅
- 11 snippets loaded ✅

**Next Steps:**
1. Implement `createSnippetCommand()` with full wizard
2. Implement `searchSnippetsCommand()` with quick pick
3. Implement `deleteSnippetCommand()` with confirmation
4. Add delete command to package.json context menu
5. Compile and test all features
6. Update documentation

---

**Ready to proceed with implementation!** 🚀
