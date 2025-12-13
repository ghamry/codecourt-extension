# 🚀 Quick Start - Test Your Extension Now!

## For Complete Beginners to VS Code Extensions

### Step 1: Open Extension Project

```bash
cd "E:\My Projects\codecourt-vscode"
code .
```

Wait for VS Code to open the codecourt-vscode folder.

---

### Step 2: Press F5

That's it! Just press **F5** on your keyboard.

**What happens:**
1. A new VS Code window opens with `[Extension Development Host]` in the title
2. Your extension is now running in this window
3. This is your testing environment

---

### Step 3: Look for Code Court Icon

In the new window (Extension Development Host):

1. Look at the **left sidebar** (Activity Bar)
2. You should see icons for: Explorer, Search, Source Control, etc.
3. **Look for the Code Court icon** (code brackets with gavel)
4. **Click it!**

**Expected Result:** Sidebar opens showing "Code Court" panel (will be empty for now - that's OK!)

---

### Step 4: Open Command Palette

Press: `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac)

Type: `Code Court`

**Expected Result:** You should see 7 commands:
```
> Code Court: Sign In
> Code Court: Sign Out
> Code Court: Refresh Snippets
> Code Court: Create Snippet from Selection
> Code Court: Search Snippets
> Code Court: Open in Browser
```

Try clicking "Code Court: Sign In" - you'll see a placeholder message (Phase 2 will make this work).

---

### Step 5: Check Output Log

In the Extension Development Host window:

1. Go to `View > Output` (or press `Ctrl+Shift+U`)
2. In the dropdown at the top right, select **"Code Court"**
3. You should see logs like:
```
[INFO 2024-12-13T...] Code Court extension is activating...
[INFO 2024-12-13T...] All commands registered successfully
[INFO 2024-12-13T...] Code Court extension activated successfully
```

**Expected Result:** No errors! If you see errors, let me know.

---

### Step 6: Check Settings

In the Extension Development Host window:

1. Go to `File > Preferences > Settings` (or `Ctrl+,`)
2. Search for: `Code Court`
3. You should see 3 settings:
   - **Code Court: Api Url** (default: https://www.codecourt.dev)
   - **Code Court: Auto Refresh** (default: true)
   - **Code Court: Insert Mode** (default: cursor)

**Expected Result:** Settings appear and can be changed.

---

## ✅ Phase 1 Testing Checklist

Run through this checklist:

- [ ] Extension Development Host window opened when pressing F5
- [ ] Code Court icon visible in Activity Bar (left sidebar)
- [ ] Clicking icon opens Code Court sidebar panel
- [ ] All 7 commands appear in Command Palette
- [ ] Commands execute without crashing (show placeholder messages)
- [ ] Output panel shows activation logs with no errors
- [ ] Settings appear in VS Code Settings
- [ ] Changing settings doesn't crash extension

**If all checked:** ✅ **Phase 1 is working!**

---

## 🔄 Making Changes and Testing Again

### If you change code:

1. Save your files (`Ctrl+S`)
2. Go to the Extension Development Host window
3. Press `Ctrl+R` (or `Cmd+R` on Mac)
4. Or run command: `Developer: Reload Window`

The extension will reload with your changes!

### If you want to stop debugging:

- Click the red stop button in the debug toolbar
- Or press `Shift+F5`

### If you want to restart:

- Press `F5` again (make sure you're in the main VS Code window, not Extension Host)

---

## 🆘 Troubleshooting

### Problem: F5 does nothing

**Solution:** Make sure you're in the main VS Code window (the one with codecourt-vscode folder open), not the Extension Development Host.

### Problem: "Cannot find module" error

**Solution:**
```bash
cd "E:\My Projects\codecourt-vscode"
npm install
npm run compile
```

Then press F5 again.

### Problem: Extension doesn't show in Activity Bar

**Solution:**
1. Check Output panel for errors
2. Try: `Help > Toggle Developer Tools` > Console tab for errors
3. Make sure `assets/sidebar-icon.svg` exists

### Problem: Commands don't appear

**Solution:**
1. Check Output panel - did extension activate?
2. Try reloading: `Ctrl+R` in Extension Host
3. Check for errors in Developer Tools

---

## 📍 Current API Configuration

**By default, the extension points to:**
```
https://www.codecourt.dev (LIVE API)
```

**To test with local CodeCourt backend:**

1. Make sure your CodeCourt app is running locally: `npm run dev`
2. In Extension Host, go to Settings
3. Change "Code Court: Api Url" to: `http://localhost:3000`
4. Reload extension (`Ctrl+R`)

**Note:** Authentication won't work yet (Phase 2), so API connection doesn't matter right now.

---

## 🎯 What Should Work Right Now (Phase 1)

✅ **Working:**
- Extension loads without errors
- Icon appears in sidebar
- Commands are registered
- Settings are available
- Logs show in Output panel

❌ **Not Working Yet (Expected):**
- Sign In (Phase 2)
- Viewing snippets (Phase 3)
- Creating snippets (Phase 5)
- Inserting snippets (Phase 5)
- Searching (Phase 5)

**This is normal!** We only built the foundation in Phase 1.

---

## 🚀 Next Steps

Once you confirm Phase 1 works:

1. **Backend Work (CodeCourt app):**
   - Add `vscodeToken` field to database
   - Create `/api/auth/vscode-token` endpoint
   - Create `/vscode-auth` callback page

2. **Phase 2 (Extension):**
   - Implement authentication flow
   - Test sign in/out
   - Store tokens securely

3. **Phase 3-5:**
   - Connect to API
   - Display snippets
   - Implement core features

---

## 💡 Tips for New Extension Developers

1. **Use Output Panel:** Check `Code Court` output channel for logs
2. **Use Developer Tools:** `Help > Toggle Developer Tools` shows console errors
3. **Reload Often:** After changes, reload with `Ctrl+R`
4. **Test Small:** Test each feature individually
5. **Ask Questions:** Extension development has a learning curve - it's OK to ask!

---

**Ready?** Press F5 and let's see your extension in action! 🎉

If you see any errors or issues, let me know and I'll help debug.
