# 🔧 Fixing Publishing Network Error

## ❌ Error: read ECONNRESET

This is a network connection error during upload. Here are solutions:

---

## ✅ Solution 1: Package First, Then Publish

Instead of publishing directly, create the package first:

```bash
cd "E:/My Projects/codecourt-vscode"

# Create package locally
vsce package

# This creates: codecourt-0.1.0.vsix
```

**Then manually upload:**
1. Go to https://marketplace.visualstudio.com/manage
2. Click your publisher (codecourt)
3. Click "New extension" > "Upload"
4. Select the .vsix file
5. Done!

---

## ✅ Solution 2: Retry Publishing with Verbose Mode

```bash
cd "E:/My Projects/codecourt-vscode"

# Retry with verbose logging
vsce publish --verbose
```

This shows more details about what's failing.

---

## ✅ Solution 3: Check Network/Firewall

Common causes:
- VPN blocking connection
- Firewall blocking upload
- Antivirus interfering
- Unstable internet

**Try:**
1. Disable VPN temporarily
2. Disable firewall temporarily
3. Switch to different network
4. Use mobile hotspot

---

## ✅ Solution 4: Use Pre-Release Flag

Sometimes helps with upload:

```bash
vsce publish --pre-release
```

Then you can mark it as stable later in the marketplace.

---

## 🎯 Recommended: Package + Manual Upload

This is the most reliable method:

### Step 1: Create Package
```bash
cd "E:/My Projects/codecourt-vscode"
vsce package
```

### Step 2: Upload Manually
1. Go to https://marketplace.visualstudio.com/manage
2. Find your publisher "codecourt"
3. Click "+ New extension"
4. Click "Upload extension"
5. Browse and select: codecourt-0.1.0.vsix
6. Fill in any additional info
7. Click "Upload"

**This bypasses the network issue completely!**

---

## 🔍 Verify Package Before Upload

```bash
# List contents of package
vsce ls

# Test package locally
code --install-extension codecourt-0.1.0.vsix
```

