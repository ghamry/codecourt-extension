# 🎬 Creating the Perfect Demo GIF for VS Code Marketplace

## 🎯 Goal
Create a 10-15 second looping GIF showing the core value: "Search → Insert → Done in 3 seconds"

---

## 📹 Recommended Tools

### Option 1: ScreenToGif (Windows - FREE & BEST)
**Download:** https://www.screentogif.com/

**Why:**
- Free and open source
- Built-in editor (trim, resize, optimize)
- Exports optimized GIFs
- Records at 60 FPS
- Easy to use

**Steps:**
1. Download and install ScreenToGif
2. Click "Recorder"
3. Position window over VS Code
4. Click "Record" (F7)
5. Perform the demo
6. Click "Stop" (F8)
7. Edit in built-in editor
8. Export as GIF

---

### Option 2: LICEcap (Cross-platform - FREE)
**Download:** https://www.cockos.com/licecap/

Simple and lightweight, less features but works well.

---

### Option 3: Kap (Mac - FREE)
**Download:** https://getkap.co/

Beautiful UI, exports to GIF/MP4/WebM.

---

## 🎬 Demo Script (3 scenarios)

### GIF 1: Search → Insert (10 seconds)
**The Hero Shot**

**What to show:**
1. VS Code open with empty TypeScript file
2. Cursor blinking
3. `Ctrl+Shift+P` pressed
4. Type "Code Court: Search"
5. Type "auth" in search box
6. Select "JWT Authentication Middleware"
7. Code instantly appears with proper indentation
8. Success notification: "Inserted: JWT Authentication Middleware"

**Settings:**
- Window size: 1280x720
- FPS: 30 (smooth but small file size)
- Duration: 8-10 seconds
- Loop: Yes

---

### GIF 2: Create from Selection (12 seconds)
**Show the Creation Flow**

**What to show:**
1. VS Code with React component code
2. Select 10-15 lines of code (highlight)
3. Right-click → "Code Court: Create Snippet from Selection"
4. Wizard appears
5. Type title: "React useState Hook"
6. Type description: "State management example"
7. Select visibility: "Private"
8. Progress: "Creating snippet..."
9. Success: "Snippet created successfully!"
10. Sidebar refreshes, new snippet appears

**Settings:**
- Window size: 1280x720
- FPS: 30
- Duration: 10-12 seconds
- Loop: Yes

---

### GIF 3: Filter in Sidebar (8 seconds)
**Show the Speed**

**What to show:**
1. Sidebar with 10+ snippets visible
2. Click filter icon (search icon in toolbar)
3. Type "react"
4. Sidebar instantly filters to show only React snippets
5. Shows "Found 3 snippet(s)"
6. Click clear filter icon
7. All snippets return

**Settings:**
- Window size: 800x600 (sidebar focus)
- FPS: 30
- Duration: 6-8 seconds
- Loop: Yes

---

## 🎨 Visual Best Practices

### Before Recording:
1. **Clean workspace**
   - Close unnecessary tabs
   - Hide file explorer (Ctrl+B)
   - Hide terminal (Ctrl+`)
   - Full screen (F11)

2. **Theme**
   - Use popular theme (Dark+ or One Dark Pro)
   - High contrast for readability
   - Disable unnecessary extensions

3. **Font size**
   - Increase to 16-18px (File → Preferences → Settings → Font Size)
   - Makes code readable in GIF

4. **Cursor**
   - Enable cursor animation: "Smooth Caret Animation"
   - Makes movements obvious

### During Recording:
1. **Move slowly**
   - Wait 1 second between actions
   - Let viewers see what's happening

2. **Keep it focused**
   - Only show relevant area
   - Don't record full screen if not needed

3. **Show keyboard shortcuts**
   - VS Code setting: "screencast mode"
   - Shows keys being pressed

### After Recording:
1. **Trim**
   - Remove first/last 2 seconds
   - Remove pauses and mistakes

2. **Optimize**
   - Target: Under 5MB
   - Reduce colors if needed (256 is fine)
   - Remove duplicate frames

3. **Add loop point**
   - Make sure it loops seamlessly
   - Fade or pause at end

---

## 📏 Technical Specs for VS Code Marketplace

**Requirements:**
- **Format:** GIF, PNG, or JPEG
- **Max file size:** 10MB (but smaller is better)
- **Recommended size:** 1280x720 or 800x600
- **Max dimensions:** 1920x1080

**Optimization Tips:**
- Use 256 colors (GIF limitation, but fine for demos)
- 20-30 FPS (60 FPS is overkill for GIFs)
- Remove metadata
- Compress with tools like:
  - https://ezgif.com/optimize (online)
  - https://gifski.app/ (desktop)

---

## 🎯 Step-by-Step Recording Guide

### Preparation (5 minutes):
1. **Set up VS Code:**
   ```
   - Font size: 16px
   - Theme: Dark+
   - Hide sidebar (Ctrl+B)
   - Hide terminal (Ctrl+`)
   - Enable screencast mode (shows keystrokes)
   - Create demo files with realistic code
   ```

2. **Create test snippets:**
   - Have 5-10 snippets in your account
   - Include variety: React, Node, Python, etc.
   - Tag them properly
   - Use realistic names

3. **Practice the flow:**
   - Do a dry run 2-3 times
   - Smooth out timing
   - Memorize the steps

### Recording (10 minutes):
1. **Launch ScreenToGif**
2. **Position recording area over VS Code**
3. **Start recording (F7)**
4. **Wait 2 seconds (buffer)**
5. **Perform demo slowly and deliberately**
6. **Wait 2 seconds (buffer)**
7. **Stop recording (F8)**

### Editing (5 minutes):
1. **Delete first 2 seconds**
2. **Delete last 2 seconds**
3. **Remove any mistakes/pauses**
4. **Add title frame (optional):**
   - "Code Court Extension Demo"
   - 2 seconds at start
5. **Preview loop**
6. **Adjust speed if needed** (1.2x is good)

### Exporting (2 minutes):
1. **File → Save As → GIF**
2. **Settings:**
   - Encoder: FFmpeg or System
   - Quality: 80-90
   - FPS: 30
   - Loop: Forever
3. **Save**
4. **Check file size** (under 5MB ideal)

---

## 🎨 Alternative: Create with Code

If you want programmatic control, use this approach:

### Using Puppeteer (Headless Chrome):
```javascript
// Record VS Code interactions
// Export as video
// Convert to GIF with ffmpeg
```

### Using OBS Studio (Advanced):
1. Record in 1080p 60fps
2. Export to MP4
3. Convert to GIF with ffmpeg:
```bash
ffmpeg -i demo.mp4 -vf "fps=30,scale=1280:-1:flags=lanczos" -loop 0 output.gif
```

---

## 📦 What to Create

**Minimum (1 GIF):**
- Hero demo: Search → Insert (main feature)

**Recommended (3 GIFs):**
1. Search and insert snippet
2. Create snippet from selection
3. Filter sidebar

**Ideal (5 GIFs):**
1. Search and insert snippet
2. Create snippet from selection
3. Filter sidebar
4. Edit snippet
5. Before/After comparison (split screen)

---

## ✅ Checklist Before Publishing

GIF Quality:
- [ ] File size under 5MB
- [ ] Resolution 1280x720 or 800x600
- [ ] Loops seamlessly
- [ ] Text is readable
- [ ] Actions are clear
- [ ] No personal info visible
- [ ] No error messages shown
- [ ] Smooth playback

Content:
- [ ] Shows clear value proposition
- [ ] Demonstrates key feature
- [ ] Takes less than 15 seconds
- [ ] Easy to understand
- [ ] Looks professional

---

## 🎬 Quick Start (Right Now!)

**5-Minute Demo GIF:**

1. **Download ScreenToGif** (2 min)
   - https://www.screentogif.com/

2. **Set up VS Code** (1 min)
   - Increase font to 16px
   - Hide sidebars
   - Open empty file

3. **Record** (1 min)
   - Start ScreenToGif recorder
   - Do: Ctrl+Shift+P → Search "auth" → Insert snippet
   - Stop recorder

4. **Export** (1 min)
   - Delete first/last 2 seconds
   - File → Save As GIF
   - Done!

**You now have a demo GIF ready for the marketplace!** 🎉

---

## 📚 Resources

**Tools:**
- ScreenToGif: https://www.screentogif.com/
- LICEcap: https://www.cockos.com/licecap/
- Kap (Mac): https://getkap.co/
- GIF optimizer: https://ezgif.com/optimize

**VS Code Settings:**
- Enable screencast mode: `Developer: Toggle Screencast Mode`
- Increase font: `Editor: Font Size`
- Hide UI: `View → Appearance`

**Inspiration:**
- Check other VS Code extensions for GIF examples
- Keep it simple and focused
- Show the magic moment

---

**Ready to record? Let's make that GIF!** 🎬
