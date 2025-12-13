# 🚀 Test Phase 2 Authentication - Quick Start

## Prerequisites ✅
- [x] Backend running or using https://www.codecourt.dev
- [x] Extension built (`npm run compile` ✅ done)
- [x] Dependencies installed (`npm install` ✅ done)

---

## Test in 5 Steps (2 minutes)

### 1. Start Extension (10 seconds)

**In VS Code with codecourt-vscode folder open:**
```
Press F5
```

**Extension Development Host opens**

---

### 2. Check Output Panel (10 seconds)

**In Extension Development Host:**
```
View > Output
Select "Code Court" from dropdown
```

**You should see:**
```
[INFO] Code Court extension is activating...
[DEBUG] Environment { NODE_ENV: 'development', API_URL: 'https://www.codecourt.dev' }
[INFO] All commands registered successfully
[INFO] Code Court extension activated successfully
```

✅ **Output panel working!**

---

### 3. Sign In (30 seconds)

**In Extension Development Host:**
```
Ctrl+Shift+P
Type: Code Court: Sign In
Press Enter
```

**Browser opens to:**
```
https://www.codecourt.dev/vscode-auth
```

**If not signed in:**
- Click "Sign In to Code Court"
- Sign in with Google/GitHub/LinkedIn

**After sign in:**
- Token auto-generates
- Click "Copy Token to Clipboard"

✅ **Token copied!**

---

### 4. Paste Token (15 seconds)

**Return to VS Code Extension Development Host**

**Input box appears:**
```
"Paste your VS Code authentication token here"
```

**Paste token (Ctrl+V) and press Enter**

**You should see:**
```
Welcome to Code Court, [Your Name]!
```

✅ **Authentication successful!**

---

### 5. Verify (5 seconds)

**Check Output panel:**
```
[INFO] Starting authentication flow...
[INFO] User authenticated: your-email@example.com
```

**Check Code Court sidebar:**
```
Click Code Court icon in Activity Bar (left sidebar)
```

If you have snippets, they'll load.
If no snippets, you'll see "No snippets found" (normal!)

✅ **Phase 2 Complete!**

---

## 🎊 Success Checklist

After completing the 5 steps above, you should have:

- [x] Output panel shows "Code Court" in dropdown
- [x] Extension activated successfully
- [x] Browser opened to /vscode-auth
- [x] Token generated and copied
- [x] Token pasted in VS Code
- [x] Welcome message appeared
- [x] User authenticated in logs

**All checked?** → **Phase 2 is working perfectly!** 🚀

---

## 🐛 Troubleshooting

### "Code Court" not in Output dropdown
```bash
# Close Extension Development Host
# Rebuild
cd "E:\My Projects\codecourt-vscode"
npm run compile
# Press F5 again
```

### Browser doesn't open
**Manually open:**
```
https://www.codecourt.dev/vscode-auth
```

### "Unauthorized" error
**Causes:**
- Not signed in to Code Court web
- Session expired

**Fix:**
- Sign in to Code Court first
- Try sign in command again

### Token verification fails
**Check:**
- Backend is running
- API URL correct (.env)
- Token not expired (90 days)

---

## 📋 Quick Reference

**Commands:**
```
Ctrl+Shift+P > Code Court: Sign In
Ctrl+Shift+P > Code Court: Sign Out
Ctrl+Shift+P > Code Court: Refresh Snippets
```

**Output Panel:**
```
View > Output > Select "Code Court"
```

**Developer Tools:**
```
Help > Toggle Developer Tools
```

**Reload Extension:**
```
Ctrl+R (in Extension Development Host)
```

---

## 🎯 What's Next?

After successful testing, we move to **Phase 3**:

- Build snippet tree view UI
- Implement insert snippet command
- Add create snippet form
- Search and filter functionality

---

## 📝 Notes

### Token Lifespan
- 90 days from generation
- Stored securely in VS Code
- Persists across VS Code restarts

### API Endpoints Used
```
GET  https://www.codecourt.dev/vscode-auth (browser)
POST https://www.codecourt.dev/api/auth/vscode-verify (extension)
GET  https://www.codecourt.dev/api/vscode/snippets (extension)
```

### Local Testing
**If testing with local backend:**

1. Edit `.env`:
   ```bash
   CODECOURT_API_URL=http://localhost:3000
   ```

2. Rebuild:
   ```bash
   npm run compile
   ```

3. Start backend:
   ```bash
   cd "E:\My Projects\CodeCourtV0"
   npm run dev
   ```

4. Press F5 in extension

---

**Ready? Press F5 and follow the 5 steps above!** 🚀
