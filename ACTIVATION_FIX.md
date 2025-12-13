# 🔧 Extension Not Activating - Quick Fix

## Problem

Extension shows no logs in Output panel. Only see "Activating task providers npm".

## Root Cause

The extension uses `"activationEvents": ["onStartupFinished"]` which activates when VS Code starts, but **only if there's a workspace folder open**.

## ✅ Solution: Open a Folder in Extension Host

### Method 1: Test with a Folder (Recommended)

1. **Press F5** to start Extension Development Host

2. **In the Extension Development Host window:**
   - Go to `File > Open Folder...`
   - Choose ANY folder (can be empty)
   - Or use: `E:\My Projects\CodeCourtV0` (your main app)

3. **Extension will activate immediately!**

4. **Check logs:**
   - `View > Output`
   - Select "Code Court"
   - You should now see activation logs!

---

### Method 2: Change Activation Event (Alternative)

If you want the extension to activate without a folder:

**Edit `package.json`:**
```json
"activationEvents": [
  "*"
],
```

This activates the extension immediately, even without a workspace.

**Then rebuild:**
```bash
npm run compile
```

**Test again (F5)**

---

## Quick Test Steps

```bash
# 1. Make sure it's built
cd "E:\My Projects\codecourt-vscode"
npm run compile

# 2. Press F5 in VS Code

# 3. In Extension Development Host:
File > Open Folder > Choose any folder

# 4. Check Output:
View > Output > Select "Code Court"
```

**You should see:**
```
[INFO] Code Court extension is activating...
[DEBUG] Environment { ... }
[INFO] All commands registered successfully
[INFO] Code Court extension activated successfully
```

---

## Why This Happens

VS Code extensions with `onStartupFinished` activation only activate when:
1. A workspace folder is open, OR
2. Extension has other activation events that trigger

**Our extension is designed for workspace use** (snippets belong to projects), so opening a folder makes sense!

---

## Recommended Solution

**Use Method 1** - Test with a folder open. This is more realistic:
- Most users work with folders/workspaces
- Tests real-world usage
- No code changes needed

---

## Verify Extension is Working

After opening a folder in Extension Development Host:

### 1. Output Panel Shows Logs
```
View > Output > "Code Court"
```

### 2. Icon in Activity Bar
Look for Code Court icon in left sidebar

### 3. Commands Available
```
Ctrl+Shift+P > Type "Code Court"
```
Should see 7 commands

### 4. Settings Available
```
Ctrl+, > Search "Code Court"
```
Should see 3 settings

---

## Still Not Working?

### Check Developer Tools

1. In Extension Development Host:
   - `Help > Toggle Developer Tools`
   - Check Console tab for errors

2. Look for errors like:
   - "Cannot find module"
   - "Failed to load extension"
   - Any red errors

### Rebuild Extension

```bash
cd "E:\My Projects\codecourt-vscode"
npm run compile
```

Check for compilation errors.

---

## Expected Behavior

**After opening a folder in Extension Host:**

✅ Extension activates immediately
✅ Logs appear in Output panel
✅ Icon appears in Activity Bar
✅ Commands available in Command Palette
✅ Settings available

---

**Quick fix: File > Open Folder in Extension Development Host!**
