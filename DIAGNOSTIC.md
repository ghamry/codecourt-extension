# 🔍 Extension Not Loading - Diagnostic Steps

## Issue

Extension Development Host opens but "Code Court" doesn't appear in Output dropdown.

## Step-by-Step Diagnostic

### Step 1: Check You're in the Right Folder

**In your main VS Code window (not Extension Host):**

```
File > Open Folder > E:\My Projects\codecourt-vscode
```

Make sure you see `codecourt-vscode` files in the Explorer sidebar.

---

### Step 2: Close Extension Host

If Extension Development Host is open:
- Close it completely
- Back to main VS Code window

---

### Step 3: Fresh Start

1. **In main VS Code** (with codecourt-vscode folder open):
2. Press **F5**
3. Wait for Extension Development Host to open

---

### Step 4: Check Developer Tools

**In Extension Development Host window:**

1. `Help > Toggle Developer Tools`
2. Click **Console** tab
3. Look for errors (red text)

**Common errors and fixes:**

#### Error: "Cannot find module"
**Fix:**
```bash
cd "E:\My Projects\codecourt-vscode"
npm install
npm run compile
```

#### Error: "Extension host terminated unexpectedly"
**Fix:**
Check if dist/extension.js exists:
```bash
ls dist/extension.js
```

If missing:
```bash
npm run compile
```

---

### Step 5: Manual Check - Is Extension Loaded?

**In Extension Development Host:**

1. Press `Ctrl+Shift+P`
2. Type: `Developer: Show Running Extensions`
3. Look for "Code Court" in the list

**If Code Court is NOT in the list:**
- Extension didn't load
- Check Console for errors

**If Code Court IS in the list:**
- Extension loaded!
- Output channel should exist
- Try `View > Output > Code Court`

---

### Step 6: Verify Build

```bash
cd "E:\My Projects\codecourt-vscode"

# Check extension is built
ls -lh dist/extension.js
# Should show ~450KB file

# Verify our code is in there
grep "Code Court extension is activating" dist/extension.js
# Should find the text

# Check package.json
grep '"name"' package.json
# Should show: "name": "codecourt",
```

---

### Step 7: Try Simple Extension Test

**Add console.log to see if code runs:**

Create test file:
```bash
# This is temporary just for testing
echo 'console.log("CODECOURT: Extension file loaded!");' > dist/test.js
```

Then check Console in Extension Host for "CODECOURT" message.

---

## Quick Fixes to Try

### Fix 1: Remove preLaunchTask (Already Done!)

I already fixed this in `.vscode/launch.json`

### Fix 2: Ensure Extension is Built

```bash
npm run compile
```

### Fix 3: Check activationEvents

package.json should have:
```json
"activationEvents": ["*"]
```

### Fix 4: Reload VS Code

Close everything and reopen:
```bash
code "E:\My Projects\codecourt-vscode"
# Press F5
```

---

## What to Report

If still not working, please tell me:

1. **In Extension Development Host > Help > Toggle Developer Tools > Console:**
   - Any red errors? (copy and paste them)

2. **In Extension Development Host > Ctrl+Shift+P > "Developer: Show Running Extensions":**
   - Is "Code Court" in the list?

3. **File check:**
   ```bash
   ls -lh dist/extension.js
   ```
   - What size is the file?

---

## Expected Working State

✅ Main VS Code window has codecourt-vscode folder open
✅ Press F5 → Extension Development Host opens
✅ In Extension Host > Help > Toggle Developer Tools > Console: No errors
✅ In Extension Host > Ctrl+Shift+P > "Show Running Extensions" > Code Court listed
✅ In Extension Host > View > Output > "Code Court" in dropdown
✅ Logs appear in Output panel

---

**Next: Try pressing F5 again and check Developer Tools Console for errors!**
