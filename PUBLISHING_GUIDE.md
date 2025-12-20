# 📦 Publishing to VS Code Marketplace - Step by Step Guide

## ✅ Pre-Publishing Checklist

### Files Ready
- [x] README.md - Comprehensive documentation with features
- [x] CHANGELOG.md - Release notes for v0.1.0
- [x] LICENSE - MIT License
- [x] icon.svg - Professional 128x128 icon
- [x] package.json - Updated with all marketplace metadata

### Code Ready
- [x] Extension compiled successfully
- [x] All features tested and working
- [x] No TypeScript errors
- [x] Production build optimized (258 KiB)

---

## 📝 Step 1: Create Demo Assets

### 1.1 Generate Extension GIF
To create a professional GIF for the marketplace:
1.  **Download [ScreenToGif](https://www.screentogif.com/)**.
2.  Follow the **[Demo Script](file:///C:/Users/ghamr/.gemini/antigravity/brain/2e497d1f-c9e4-49ac-a41c-8a35752490d2/DEMO_SCRIPT.md)** included in this project.
3.  Save as `demo.gif` in `assets/`.
4.  Add to `README.md`: `![Demo](assets/demo.gif)`

## 📝 Step 2: Create VS Code Marketplace Publisher Account

### 1.1 Create Microsoft/Azure Account
1. Go to [Azure DevOps](https://dev.azure.com)
2. Sign in with Microsoft account (or create one)
3. Accept terms and conditions

### 1.2 Create Publisher
1. Go to [VS Code Marketplace Publisher Management](https://marketplace.visualstudio.com/manage)
2. Click "Create publisher"
3. Fill in details:
   - **Publisher ID:** `codecourt` (must be unique, lowercase, no spaces)
   - **Publisher Name:** `Code Court`
   - **Email:** your@email.com

4. Verify email address

### 1.3 Get Personal Access Token (PAT)
1. Go to [Azure DevOps](https://dev.azure.com)
2. Click user settings (top right) > Personal Access Tokens
3. Click "+ New Token"
4. Configure:
   - **Name:** VS Code Marketplace Publishing
   - **Organization:** All accessible organizations
   - **Expiration:** 90 days (or custom)
   - **Scopes:** Select "Marketplace" > "Manage"
5. Click "Create"
6. **IMPORTANT:** Copy the token immediately (you won't see it again!)
7. Save it securely (password manager recommended)

---

## 🛠️ Step 2: Install and Configure VSCE

### 2.1 Install VSCE (VS Code Extension Manager)
```bash
cd "E:/My Projects/codecourt-vscode"
npm install -g @vscode/vsce
```

### 2.2 Verify Installation
```bash
vsce --version
```

### 2.3 Login to Publisher
```bash
vsce login codecourt
```
- Enter your Personal Access Token when prompted
- Token is stored securely for future publishes

---

## 📦 Step 3: Package the Extension

### 3.1 Clean Build
```bash
# Remove old builds
rm -rf dist/
rm -f *.vsix

# Fresh compile
npm run compile
```

### 3.2 Create .vscodeignore File
Make sure `.vscodeignore` exists and excludes unnecessary files:

```
.vscode/
.gitignore
.env
.env.*
node_modules/
src/
*.ts
*.map
tsconfig.json
webpack.config.js
.eslintrc.json
*.md
!README.md
!CHANGELOG.md
!LICENSE
.git/
.github/
*.log
```

### 3.3 Package the Extension
```bash
vsce package
```

This creates: `codecourt-0.1.0.vsix`

### 3.4 Test the Package Locally
```bash
code --install-extension codecourt-0.1.0.vsix
```

Test all features:
- Sign in/out
- Create snippet
- Search/filter
- Edit snippet
- Delete snippet
- Insert snippet

---

## 🚀 Step 4: Publish to Marketplace

### 4.1 First-Time Publish
```bash
vsce publish
```

This will:
1. Validate package.json
2. Check for required files (README, LICENSE, icon)
3. Compile TypeScript
4. Create .vsix package
5. Upload to marketplace
6. Validate extension

### 4.2 Specific Version Publish
```bash
# Publish current version
vsce publish

# OR increment patch version and publish
vsce publish patch

# OR increment minor version and publish
vsce publish minor

# OR increment major version and publish
vsce publish major
```

### 4.3 Publish with Pre-Release Flag
```bash
vsce publish --pre-release
```

---

## 🎨 Step 5: Post-Publishing Setup

### 5.1 Add Screenshots
1. Take screenshots of key features:
   - Sidebar with snippets
   - Create snippet wizard
   - Hover preview
   - Search/filter
   - Edit dialog

2. Upload to marketplace:
   - Go to [Publisher Management](https://marketplace.visualstudio.com/manage)
   - Click your extension
   - Upload screenshots (max 5, recommended 1280x720)

### 5.2 Update README with Marketplace Link
```markdown
## Installation

Install directly from [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=codecourt.codecourt)

Or search "Code Court" in VS Code Extensions panel.
```

### 5.3 Add Badges to README
```markdown
[![VS Code Marketplace](https://img.shields.io/visual-studio-marketplace/v/codecourt.codecourt)](https://marketplace.visualstudio.com/items?itemName=codecourt.codecourt)
[![Installs](https://img.shields.io/visual-studio-marketplace/i/codecourt.codecourt)](https://marketplace.visualstudio.com/items?itemName=codecourt.codecourt)
[![Rating](https://img.shields.io/visual-studio-marketplace/r/codecourt.codecourt)](https://marketplace.visualstudio.com/items?itemName=codecourt.codecourt)
```

---

## 🔄 Step 6: Update/Patch Process

### 6.1 Make Changes
1. Fix bugs or add features
2. Update version in package.json
3. Update CHANGELOG.md with new changes
4. Compile: `npm run compile`
5. Test thoroughly

### 6.2 Publish Update
```bash
# Auto-increment patch (0.1.0 → 0.1.1)
vsce publish patch

# OR auto-increment minor (0.1.0 → 0.2.0)
vsce publish minor

# OR manually set version
vsce publish 0.1.1
```

---

## 📊 Step 7: Monitor and Maintain

### 7.1 Track Statistics
- Go to [Publisher Management](https://marketplace.visualstudio.com/manage)
- View:
  - Install count
  - Ratings/reviews
  - Page views
  - Acquisition trends

### 7.2 Respond to Reviews
- Read user feedback
- Fix reported bugs
- Add requested features
- Update regularly

### 7.3 Security Updates
- Monitor dependencies for vulnerabilities
- Run `npm audit` regularly
- Update dependencies: `npm update`
- Re-publish with security fixes

---

## 🐛 Troubleshooting

### Error: "Publisher not found"
- Make sure you created publisher account
- Run `vsce login codecourt` with correct publisher ID
- Check Personal Access Token is valid
- **CRITICAL**: Ensure PAT has "Organization: **All accessible organizations**" (not a specific one)
- Ensure Scopes are "Marketplace > Manage"

### Error: "Access Denied: ... View user permissions"
- This means your PAT is scoped to a specific organization.
- **Fix**: Create a new PAT and select **"All accessible organizations"** in the Organization dropdown.

### Error: "Missing required files"
- Ensure README.md exists in root
- Ensure LICENSE file exists
- Ensure icon file exists and path is correct in package.json

### Error: "Icon must be 128x128"
- Resize icon to exactly 128x128 pixels
- Use PNG or SVG format
- Update path in package.json

### Error: "Invalid version"
- Version must be semantic: MAJOR.MINOR.PATCH
- Example: 0.1.0, 1.0.0, 1.2.3
- Update in package.json

---

## 🎯 Quick Reference Commands

```bash
# Login to publisher
vsce login codecourt

# Package extension (create .vsix)
vsce package

# Publish extension
vsce publish

# Publish with version bump
vsce publish patch   # 0.1.0 → 0.1.1
vsce publish minor   # 0.1.0 → 0.2.0
vsce publish major   # 0.1.0 → 1.0.0

# Unpublish extension (careful!)
vsce unpublish codecourt.codecourt

# Show extension info
vsce show codecourt.codecourt

# List your extensions
vsce ls-publishers
```

---

## ✅ Publishing Checklist

Before running `vsce publish`, verify:

- [ ] All features tested and working
- [ ] No console errors or warnings
- [ ] TypeScript compiles without errors
- [ ] README.md is comprehensive and accurate
- [ ] CHANGELOG.md updated with current version
- [ ] LICENSE file exists
- [ ] Icon is 128x128 and looks good
- [ ] package.json has all required fields
- [ ] Version number is correct
- [ ] Repository URL is correct
- [ ] Keywords are relevant
- [ ] Categories are appropriate
- [ ] Extension tested locally from .vsix
- [ ] Personal Access Token is ready
- [ ] Publisher account is created

---

## 🎊 After Publishing

Congratulations! Your extension is now live on VS Code Marketplace!

**Next Steps:**
1. Share on social media
2. Add to your portfolio
3. Monitor user feedback
4. Plan next version
5. Engage with users

**Links:**
- [Your Extension](https://marketplace.visualstudio.com/items?itemName=codecourt.codecourt)
- [Publisher Page](https://marketplace.visualstudio.com/manage)
- [Azure DevOps](https://dev.azure.com)

---

**Good luck! 🚀**
