# 👋 START HERE - Quick Reference

## 🚀 Test Your Extension (30 Seconds)

```bash
# 1. Open extension folder
cd "E:\My Projects\codecourt-vscode"
code .

# 2. Press F5
# (That's it! Extension Development Host opens)

# 3. In the new window:
View > Output > Select "Code Court"
```

**You should see:**
```
[INFO] Code Court extension is activating...
[DEBUG] Environment { ... }
[INFO] Code Court extension activated successfully
```

---

## ✅ Phase 1 Complete!

**What works:**
- ✅ Extension loads
- ✅ Icon in sidebar
- ✅ 7 commands registered
- ✅ Environment variables
- ✅ Settings available

**What doesn't work yet (normal!):**
- ❌ Authentication (Phase 2)
- ❌ Viewing snippets (Phase 3)
- ❌ Insert/Create/Search (Phase 5)

---

## 📂 Environment Configuration

**File:** `.env`

```bash
# Change API URL for local testing:
CODECOURT_API_URL=http://localhost:3000

# Or use live API (default):
CODECOURT_API_URL=https://www.codecourt.dev
```

**After changing `.env`:**
```bash
npm run compile  # Rebuild
# Press F5 to test
```

---

## 📚 Documentation Quick Links

| Need Help With | Read This |
|----------------|-----------|
| Testing now | `QUICK_START.md` |
| Detailed testing | `TESTING_GUIDE.md` |
| Features planned | `FEATURES_OVERVIEW.md` |
| Environment vars | `ENVIRONMENT.md` |
| Troubleshooting | `TROUBLESHOOTING.md` |
| Development | `DEVELOPMENT.md` |
| Complete summary | `SESSION_SUMMARY.md` |

---

## 🔧 Common Commands

```bash
npm run watch     # Auto-rebuild (recommended for dev)
npm run compile   # Build for production
npm run lint      # Check code quality
npm run package   # Create .vsix (future)
```

---

## 🐛 Not Working?

**1. Check Output Panel (Not Debug Console!)**
```
View > Output > Select "Code Court"
```

**2. Rebuild and Reload**
```bash
npm run compile
# In Extension Host: Ctrl+R
```

**3. Read Troubleshooting**
See `TROUBLESHOOTING.md` for common issues

---

## 🎯 Next Steps

1. **Test Phase 1** (Press F5, verify logs)
2. **Backend work:** Add vscodeToken to database
3. **Phase 2:** Implement authentication

---

## 💡 Remember

- **Environment = Build Time** → Change .env → Rebuild
- **Output Panel** = Extension logs (our code)
- **Debug Console** = VS Code internals
- **F5** = Start testing
- **Ctrl+R** = Reload after rebuild

---

**Need help?** Check `TROUBLESHOOTING.md` first!

**Ready for Phase 2?** See `SESSION_SUMMARY.md` for roadmap!

---

*Extension Version: 0.1.0-dev*
*Status: Phase 1 Complete ✅*
