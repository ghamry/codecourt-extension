# 🌍 Environment Configuration Guide

## Overview

The Code Court extension uses **environment variables** for configuration that needs to be set at build time. This provides flexibility for development, testing, and production environments.

---

## 📂 Environment Files

### `.env` (Local Configuration)
- **Location:** Root of extension project
- **Purpose:** Your personal development settings
- **Git:** **NOT committed** (in .gitignore)
- **When to edit:** When you want to change API URL or other settings locally

### `.env.example` (Template)
- **Location:** Root of extension project
- **Purpose:** Template showing all available variables
- **Git:** **Committed** (shared with team)
- **When to edit:** When adding new environment variables to the project

---

## 🔧 Available Environment Variables

### 1. `CODECOURT_API_URL`
**Purpose:** URL of Code Court backend API

**Default:** `https://www.codecourt.dev`

**When to change:**
- Testing with local backend: `http://localhost:3000`
- Testing on staging: `https://staging.codecourt.dev`
- Production: `https://www.codecourt.dev` (default)

**Example:**
```bash
# .env
CODECOURT_API_URL=http://localhost:3000
```

### 2. `NODE_ENV`
**Purpose:** Environment mode (development or production)

**Default:** `development`

**Values:**
- `development` - Shows debug logs, extra error details
- `production` - Minimal logging, optimized build

**Example:**
```bash
# .env
NODE_ENV=development
```

### 3. `EXTENSION_ID`
**Purpose:** VS Code extension identifier

**Default:** `codecourt.codecourt`

**When to change:** Rarely (only if publishing under different name)

**Example:**
```bash
# .env
EXTENSION_ID=codecourt.codecourt
```

### 4. `CODECOURT_CLIENT_ID` (Phase 2)
**Purpose:** OAuth2 client ID for authentication

**Default:** None (will be added in Phase 2)

**Example:**
```bash
# .env (Phase 2)
CODECOURT_CLIENT_ID=vscode_client_abc123
```

### 5. `CODECOURT_CLIENT_SECRET` (Phase 2)
**Purpose:** OAuth2 client secret for authentication

**Default:** None (will be added in Phase 2)

**Example:**
```bash
# .env (Phase 2)
CODECOURT_CLIENT_SECRET=secret_xyz789
```

---

## 🚀 Quick Setup

### First Time Setup

1. **Copy the template:**
```bash
cd "E:\My Projects\codecourt-vscode"
copy .env.example .env
```

2. **Edit `.env` file:**
```bash
# Open in your editor
code .env
```

3. **Set your values:**
```bash
# For local development with local CodeCourt backend:
CODECOURT_API_URL=http://localhost:3000
NODE_ENV=development

# For testing with live API:
CODECOURT_API_URL=https://www.codecourt.dev
NODE_ENV=development
```

4. **Rebuild extension:**
```bash
npm run compile
```

5. **Test (F5 in VS Code)**

---

## 🔄 Configuration Priority

The extension uses a **3-level priority system**:

### Priority 1: VS Code Settings (Highest)
User can override in VS Code Settings UI:
```
File > Preferences > Settings > Code Court: Api Url
```

### Priority 2: Environment Variables
Set in `.env` file (build time):
```bash
CODECOURT_API_URL=http://localhost:3000
```

### Priority 3: Defaults (Lowest)
Hardcoded fallbacks in code:
```typescript
'https://www.codecourt.dev'
```

**Example Flow:**
```
User doesn't change VS Code setting
  ↓
Extension checks .env variable → http://localhost:3000 ✅
  ↓
If .env not set, uses default → https://www.codecourt.dev
```

---

## 🧪 Testing Different Configurations

### Scenario 1: Test with Local Backend

**Setup:**
```bash
# .env
CODECOURT_API_URL=http://localhost:3000
NODE_ENV=development
```

**Start local CodeCourt:**
```bash
cd "E:\My Projects\CodeCourtV0"
npm run dev
```

**Build and test extension:**
```bash
cd "E:\My Projects\codecourt-vscode"
npm run compile
# Press F5 in VS Code
```

**Verify:**
- Open Output panel > Code Court
- Look for: `[DEBUG] Environment: { API_URL: "http://localhost:3000" }`

---

### Scenario 2: Test with Live API

**Setup:**
```bash
# .env
CODECOURT_API_URL=https://www.codecourt.dev
NODE_ENV=development
```

**Build and test:**
```bash
npm run compile
# Press F5 in VS Code
```

---

### Scenario 3: Production Build

**Setup:**
```bash
# .env
CODECOURT_API_URL=https://www.codecourt.dev
NODE_ENV=production
```

**Build:**
```bash
npm run compile
```

**Result:**
- Debug logs disabled
- Optimized bundle
- Production API URL

---

## 🔍 Debugging Environment Variables

### View Current Configuration

When extension activates, check Output panel:

1. Open `View > Output`
2. Select `Code Court` from dropdown
3. Look for debug logs (only in development mode):

```
[INFO 2024-12-13T...] Code Court extension is activating...
[DEBUG 2024-12-13T...] Environment
  Data: {
    "NODE_ENV": "development",
    "API_URL": "http://localhost:3000",
    "EXTENSION_ID": "codecourt.codecourt"
  }
[INFO 2024-12-13T...] Code Court extension activated successfully
```

### Verify Build-Time Injection

Check webpack output when running `npm run compile`:

```bash
> webpack --mode production

[dotenv@17.2.3] injecting env (3) from .env ✅
```

This confirms `.env` was loaded.

---

## 🐛 Troubleshooting

### Problem: Environment variables not loading

**Symptoms:**
- Extension uses default values instead of .env values
- Debug logs don't show your API URL

**Solutions:**

1. **Check .env file exists:**
```bash
cd "E:\My Projects\codecourt-vscode"
dir .env
```

2. **Rebuild after changing .env:**
```bash
npm run compile
```
Environment variables are injected at **build time**, not runtime!

3. **Check .env syntax:**
```bash
# Good ✅
CODECOURT_API_URL=http://localhost:3000

# Bad ❌ (no quotes for strings)
CODECOURT_API_URL="http://localhost:3000"

# Bad ❌ (spaces around =)
CODECOURT_API_URL = http://localhost:3000
```

---

### Problem: Still using old API URL

**Solution:**
1. Check VS Code Settings didn't override:
   - Open Settings (`Ctrl+,`)
   - Search "Code Court: Api Url"
   - Should be empty or match your desired URL

2. Clear extension state:
   - Reload window: `Developer: Reload Window`
   - Or restart VS Code

---

### Problem: Debug logs not showing

**Solution:**
Make sure `NODE_ENV=development` in `.env`, then rebuild:
```bash
npm run compile
```

---

## 📝 Best Practices

### 1. Never Commit .env
✅ **Always** in `.gitignore`
```
.env
```

### 2. Always Update .env.example
When adding new variable:
```bash
# Update .env.example with placeholder
CODECOURT_NEW_VAR=your_value_here
```

### 3. Document New Variables
Add to this file (ENVIRONMENT.md) when creating new variables.

### 4. Rebuild After Changes
Environment variables are **build-time**, not **runtime**:
```bash
npm run compile  # Always after changing .env
```

### 5. Use Descriptive Names
```bash
# Good ✅
CODECOURT_API_URL=...
CODECOURT_CLIENT_ID=...

# Bad ❌
API=...
CLIENT=...
```

---

## 🔐 Security Notes

### Don't Store Secrets in .env (for published extensions)

When publishing to marketplace, `.env` is **not included** in .vsix package.

**For OAuth secrets (Phase 2):**
- Store in backend server
- Extension gets temporary tokens only
- Never hardcode secrets in code

### Environment Variables vs VS Code Settings

| Feature | Environment Variables | VS Code Settings |
|---------|----------------------|------------------|
| Set at | Build time | Runtime |
| User can change | No | Yes |
| Committed | No (.env) | No (user local) |
| Use for | Build config | User preferences |

---

## 📚 Code References

### Reading Environment Variables

**Location:** [src/utils/config.ts](src/utils/config.ts)

```typescript
function getDefaultApiUrl(): string {
  return process.env.CODECOURT_API_URL || 'https://www.codecourt.dev';
}
```

### Webpack Injection

**Location:** [webpack.config.js](webpack.config.js:36-45)

```javascript
plugins: [
  new webpack.DefinePlugin({
    'process.env.CODECOURT_API_URL': JSON.stringify(
      process.env.CODECOURT_API_URL || 'https://www.codecourt.dev'
    ),
  }),
],
```

---

## 🎯 Summary

✅ **Environment variables** = Build-time configuration
✅ **VS Code settings** = Runtime user preferences
✅ **`.env`** = Local, not committed
✅ **`.env.example`** = Template, committed
✅ **Rebuild required** after `.env` changes

**Common workflow:**
```bash
1. Edit .env
2. npm run compile
3. Press F5 to test
4. Check Output panel for environment values
```

---

**Need help?** Check DEVELOPMENT.md for more debugging tips!
