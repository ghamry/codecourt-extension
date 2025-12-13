# 🔧 Troubleshooting Guide

## Where to Find Code Court Logs

### ❌ Wrong Place: Debug Console
The debug console shows VS Code's internal logs, not extension logs.

### ✅ Correct Place: Output Panel

**How to access:**
1. In the Extension Development Host window
2. Go to `View > Output` (or press `Ctrl+Shift+U`)
3. In the dropdown at the top-right, select **"Code Court"**

**Expected logs:**
```
[INFO 2024-12-13T...] Code Court extension is activating...
[DEBUG 2024-12-13T...] Environment
  Data: {
    "NODE_ENV": "development",
    "API_URL": "https://www.codecourt.dev",
    "EXTENSION_ID": "codecourt.codecourt"
  }
[INFO 2024-12-13T...] All commands registered successfully
[INFO 2024-12-13T...] Code Court extension activated successfully
```

---

## Quick Verification Checklist

### 1. Extension Activated?

**Check Output Panel:**
- View > Output
- Select "Code Court" from dropdown
- Should see activation logs

**If no logs appear:**
- Extension might not have activated
- Check for errors in Debug Console
- Try reloading: `Ctrl+R` in Extension Development Host

---

### 2. Icon in Activity Bar?

**Look at the left sidebar for:**
- Code brackets icon (Code Court)

**If icon missing:**
- Check `assets/sidebar-icon.svg` exists
- Rebuild: `npm run compile`
- Restart debugging (F5)

---

### 3. Commands Available?

**Test:**
1. Press `Ctrl+Shift+P`
2. Type "Code Court"
3. Should see 7 commands

**If commands missing:**
- Extension didn't activate
- Check Output panel for errors
- Check Debug Console for activation errors

---

## Common Issues

### Issue: "Code Court" not in Output dropdown

**Cause:** Extension didn't activate

**Solution:**
1. Check Debug Console for errors
2. Press `F5` again to restart
3. If still fails, rebuild:
```bash
cd "E:\My Projects\codecourt-vscode"
npm run compile
```

---

### Issue: Extension loads but no environment logs

**Cause:** NODE_ENV might be 'production'

**Solution:**
```bash
# Edit .env
NODE_ENV=development

# Rebuild
npm run compile

# Test again (F5)
```

---

### Issue: Build errors

**Solution:**
```bash
cd "E:\My Projects\codecourt-vscode"
npm install
npm run compile
```

---

## How to See All Extension Info

### 1. Output Panel (Extension Logs)
```
View > Output > "Code Court"
```
Shows: Info, debug, warnings, errors from extension

### 2. Debug Console (VS Code Internal)
```
View > Debug Console
```
Shows: VS Code's internal logs, all extensions

### 3. Developer Tools (Browser Console)
```
Help > Toggle Developer Tools > Console
```
Shows: JavaScript errors, console.log from extension

---

## Step-by-Step Debugging

### If extension isn't working:

**Step 1: Check Build**
```bash
npm run compile
```
Should finish with: "webpack compiled successfully"

**Step 2: Check Errors**
In Extension Development Host:
- `Help > Toggle Developer Tools`
- Look at Console tab
- Any red errors?

**Step 3: Check Output Panel**
- `View > Output`
- Select "Code Court"
- Any error messages?

**Step 4: Reload**
In Extension Development Host window:
- Press `Ctrl+R`
- Or run: `Developer: Reload Window`

**Step 5: Full Restart**
- Stop debugging (red square or Shift+F5)
- Press F5 again

---

## Environment Variable Debugging

### Verify environment loaded:

**Expected in Output panel:**
```
[DEBUG] Environment
  Data: {
    "NODE_ENV": "development",
    "API_URL": "https://www.codecourt.dev",
    "EXTENSION_ID": "codecourt.codecourt"
  }
```

**If environment not showing:**

1. Check `.env` file exists:
```bash
dir .env
```

2. Rebuild (environment is build-time):
```bash
npm run compile
```

3. Verify NODE_ENV=development in `.env`

---

## Getting Help

If you're still stuck:

1. **Check Output panel first** - Most errors show here
2. **Check Developer Tools console** - JavaScript errors here
3. **Share error messages** - Copy exact error text
4. **Share Output panel logs** - Copy all logs from Code Court channel

---

## Quick Reference

| What | Where | How |
|------|-------|-----|
| Extension logs | Output panel | View > Output > "Code Court" |
| VS Code logs | Debug Console | View > Debug Console |
| JS errors | Developer Tools | Help > Toggle Developer Tools |
| Rebuild | Terminal | `npm run compile` |
| Reload | Extension Host | `Ctrl+R` |
| Restart debug | Main VS Code | `F5` |

---

**Most common fix:** Check Output panel for logs first!
