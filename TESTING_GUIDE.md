# 🧪 Testing Guide for Beginners - Code Court Extension

## 📋 Prerequisites

Before testing, make sure:
- ✅ You have VS Code installed
- ✅ You've run `npm install` in the extension folder
- ✅ The extension compiled successfully (`npm run compile`)

---

## 🚀 Method 1: Debug Mode (Recommended for Development)

This is the **easiest way** to test your extension during development.

### Step 1: Open Extension Project in VS Code

```bash
# Open the extension folder in VS Code
cd "E:\My Projects\codecourt-vscode"
code .
```

### Step 2: Start Watch Mode (Optional but Recommended)

Open terminal in VS Code (`Ctrl+``) and run:

```bash
npm run watch
```

This will automatically recompile when you make changes.

### Step 3: Press F5 to Launch Extension

1. **Press `F5`** (or go to Run > Start Debugging)
2. A **new VS Code window** will open with `[Extension Development Host]` in the title
3. Your extension is now running in this window!

### Step 4: Test the Extension

In the Extension Development Host window:

**A. Check Extension Activated:**
1. Open Output panel: `View > Output`
2. Select `Code Court` from dropdown
3. You should see: `[INFO] Code Court extension is activating...`

**B. Check Sidebar Icon:**
1. Look at the Activity Bar (left side)
2. You should see a Code Court icon (code brackets)
3. Click it to open the sidebar

**C. Test Commands:**
1. Open Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`)
2. Type "Code Court"
3. You should see all 7 commands:
   - Code Court: Sign In
   - Code Court: Sign Out
   - Code Court: Refresh Snippets
   - Code Court: Create Snippet from Selection
   - Code Court: Search Snippets
   - Code Court: Open in Browser

**D. Check Settings:**
1. Go to `File > Preferences > Settings`
2. Search for "Code Court"
3. You should see:
   - Code Court: Api Url
   - Code Court: Auto Refresh
   - Code Court: Insert Mode

### Step 5: Test with Breakpoints (Advanced)

1. Set a breakpoint in `src/extension.ts` (click left of line number)
2. Press `F5` to restart debugging
3. Extension will pause at your breakpoint
4. Use Debug Console to inspect variables

### Step 6: Reload Extension After Changes

When you make changes to code:
1. In Extension Development Host window
2. Press `Ctrl+R` (or `Cmd+R` on Mac)
3. Or run command: `Developer: Reload Window`

---

## 🎯 Method 2: Install as .vsix (Production Testing)

This tests the extension **exactly as users will install it**.

### Step 1: Package the Extension

```bash
cd "E:\My Projects\codecourt-vscode"
npm run package
```

This creates `codecourt-0.1.0.vsix` file.

### Step 2: Install in VS Code

**Option A: Via Command Line**
```bash
code --install-extension codecourt-0.1.0.vsix
```

**Option B: Via VS Code UI**
1. Open VS Code
2. Go to Extensions (`Ctrl+Shift+X`)
3. Click `...` (three dots) at top
4. Choose `Install from VSIX...`
5. Select `codecourt-0.1.0.vsix`

### Step 3: Restart VS Code

After installation, restart VS Code completely.

### Step 4: Test Installed Extension

Now test exactly like Method 1, but this is the **production version**.

### Step 5: Uninstall When Done Testing

```bash
code --uninstall-extension codecourt.codecourt
```

Or via Extensions panel > Right-click > Uninstall.

---

## 🔌 API Configuration: Local vs Production

### Current Setup (in package.json)

```json
"codecourt.apiUrl": {
  "default": "https://www.codecourt.dev"
}
```

**This means:** Extension is configured to use **LIVE API** by default.

### To Test with Local CodeCourt API

If you want to test with local backend (`http://localhost:3000`):

1. Open VS Code Settings (`Ctrl+,`)
2. Search for "Code Court: Api Url"
3. Change to: `http://localhost:3000`
4. Reload extension (`Ctrl+R` in Extension Host)

**When to use Local API:**
- Testing new backend endpoints
- Developing authentication flow
- Testing with test data

**When to use Live API:**
- Testing real snippets
- Testing production environment
- Final testing before release

---

## ✅ Phase 1 Testing Checklist

Since we're in **Phase 1** (Foundation), here's what **should work** now:

### Extension Basics
- [ ] Extension activates without errors
- [ ] Code Court icon appears in Activity Bar
- [ ] Sidebar opens when clicking icon
- [ ] Output channel shows "Code Court extension is activating..."

### Commands Registered
- [ ] All 7 commands appear in Command Palette
- [ ] Commands show category "Code Court: "
- [ ] Commands execute without crashing (show placeholder messages)

### Settings
- [ ] Settings appear in VS Code Settings
- [ ] Default values are correct
- [ ] Changing settings doesn't crash extension

### What **Won't Work Yet**
- ❌ Authentication (Phase 2)
- ❌ Viewing snippets in tree view (Phase 2-3)
- ❌ Inserting snippets (Phase 5)
- ❌ Creating snippets (Phase 5)
- ❌ Searching snippets (Phase 5)

**This is expected!** Phase 1 only sets up the foundation.

---

## 🐛 Common Issues & Solutions

### Issue 1: Extension doesn't activate
**Solution:**
1. Check Output panel (`Code Court` channel)
2. Look for error messages
3. Check Developer Tools: `Help > Toggle Developer Tools`
4. Look for errors in Console tab

### Issue 2: "Cannot find module" error
**Solution:**
```bash
npm install
npm run compile
```

### Issue 3: Changes not appearing
**Solution:**
- If in debug mode: Press `Ctrl+R` in Extension Host
- If installed: Uninstall and reinstall .vsix

### Issue 4: Commands not appearing
**Solution:**
1. Check `package.json` > `contributes.commands`
2. Reload window: `Developer: Reload Window`
3. Check if extension activated (Output panel)

### Issue 5: Can't see sidebar icon
**Solution:**
1. Make sure `assets/sidebar-icon.svg` exists
2. Check Activity Bar is visible (`View > Appearance > Activity Bar`)
3. Try reloading window

---

## 📊 What to Expect in Each Phase

### Phase 1 (Current) - Foundation
✅ Extension structure
✅ Commands registered (placeholders)
✅ Sidebar appears (empty)
✅ Settings work

### Phase 2 - Authentication
✅ Sign In button works
✅ OAuth flow opens browser
✅ Token stored securely
✅ "Signed in as..." message

### Phase 3 - API Integration
✅ Fetch snippets from API
✅ Display in tree view
✅ Refresh button works

### Phase 4 - Core UI
✅ Tree view shows snippets nicely
✅ Icons for languages
✅ Grouped by language

### Phase 5 - Core Features
✅ Insert snippet at cursor
✅ Create snippet from selection
✅ Search functionality
✅ Delete snippet (if owner)

---

## 🎓 Learning Resources

### VS Code Extension Development
- [VS Code Extension API](https://code.visualstudio.com/api)
- [Extension Samples](https://github.com/microsoft/vscode-extension-samples)
- [Publishing Extensions](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)

### Debugging Tips
- Use `console.log()` - appears in Debug Console
- Use `Logger.info()` - appears in Output channel
- Set breakpoints for step-through debugging
- Check `Help > Toggle Developer Tools` for browser console

---

## 🚀 Next Steps After Phase 1 Testing

Once you verify Phase 1 works:

1. **Backend Changes** (CodeCourt app)
   - Add `vscodeToken` field to User model
   - Create `/api/auth/vscode-token` endpoint
   - Create `/vscode-auth` callback page

2. **Phase 2 Implementation** (Extension)
   - Implement OAuth2 flow in AuthManager
   - Test authentication end-to-end
   - Verify token storage

3. **Test Each Phase Individually**
   - Don't move to Phase 3 until Phase 2 works
   - Test thoroughly at each stage
   - Keep notes of what works/doesn't work

---

**Ready to test?** Start with Method 1 (Debug Mode) and go through the Phase 1 checklist!
