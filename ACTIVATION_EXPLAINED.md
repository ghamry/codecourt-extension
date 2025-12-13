# 🔧 Activation Events Explained

## What We Changed

**Before:**
```json
"activationEvents": ["onStartupFinished"]
```

**After:**
```json
"activationEvents": ["*"]
```

---

## What Does This Mean?

### `"activationEvents": ["*"]` (Current - Auto-Activate)

**Means:** Extension activates **immediately** when VS Code starts

**When it activates:**
- As soon as VS Code opens
- No folder needed
- Instant activation

**Pros:**
- ✅ Easy testing (just press F5)
- ✅ Always available
- ✅ Good for development
- ✅ Works without workspace

**Cons:**
- ⚠️ Uses resources even if not needed
- ⚠️ Not the most efficient for production

**Perfect for:** Development and testing (what we're doing now!)

---

### `"activationEvents": ["onStartupFinished"]` (Previous)

**Means:** Extension activates after VS Code finishes starting **and** a workspace is open

**When it activates:**
- After VS Code fully loads
- Only if a folder/workspace is open
- Delayed activation (better performance)

**Pros:**
- ✅ Better performance
- ✅ Only activates when needed
- ✅ Professional/production approach

**Cons:**
- ❌ Requires folder open for testing
- ❌ Less convenient for development

**Perfect for:** Production release (can change later)

---

## Other Activation Events (For Reference)

### `"onCommand:codecourt.authenticate"`
Activates only when user runs the "Sign In" command
- Most efficient
- Only loads when explicitly needed

### `"onLanguage:javascript"`
Activates when opening a JavaScript file
- Good for language-specific extensions

### `"onView:codecourt.snippetsView"`
Activates when user opens the sidebar view
- Good for UI-focused extensions

---

## Our Strategy

### Phase 1-5 (Development): Use `"*"`
**Why:**
- Easy testing (just F5, no setup)
- Immediate feedback
- No extra steps needed

### Phase 6+ (Production): Consider `"onStartupFinished"` or Command-Based
**Why:**
- Better performance
- Only activates when users need it
- Professional approach

---

## Current Setup (Perfect for Development)

```json
"activationEvents": ["*"]
```

**What this means for you:**
- Press F5 → Extension activates immediately
- No need to open folder
- Logs appear right away
- Easy testing

---

## Testing Now

```bash
# 1. Extension is rebuilt with auto-activation
# (Already done!)

# 2. Press F5 in VS Code
# Extension Development Host opens

# 3. Extension activates IMMEDIATELY
# No folder needed!

# 4. Check logs:
View > Output > "Code Court"
```

**You should see:**
```
[INFO] Code Court extension is activating...
[DEBUG] Environment { ... }
[INFO] All commands registered successfully
[INFO] Code Court extension activated successfully
```

---

## For Production (Future)

When ready to publish, we can optimize by using:

```json
"activationEvents": [
  "onStartupFinished",
  "onCommand:codecourt.authenticate",
  "onView:codecourt.snippetsView"
]
```

This means:
- Activate after startup if workspace open, OR
- Activate when user clicks Sign In, OR
- Activate when user opens Code Court sidebar

**More efficient, but we don't need this now!**

---

## Summary

**Current:** `"*"` = Auto-activate (best for development)
**Future:** Can optimize for production

**Right now:** You can press F5 and extension works immediately! 🚀

---

**Next step:** Press F5 and check Output panel!
