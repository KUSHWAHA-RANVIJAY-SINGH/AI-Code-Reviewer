# 🚀 Quick Start Guide

## ⚡ 60-Second Setup

### 1. Install & Start (Copy & Paste)

```bash
# Terminal 1: Backend
cd /home/ranvijay/Project/code-review-main/BackEnd
npm install
node server.js

# Terminal 2: Frontend
cd /home/ranvijay/Project/code-review-main/Frontend
npm install
npm run dev
```

### 2. Open Browser
Visit: **http://localhost:5175**

### 3. Try It Out
1. Click on Language dropdown → Select **Python**
2. Paste this code:
```python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)
```
3. Click **🚀 Review Code** or press **Ctrl+Enter**
4. Get AI-powered review!

---

## ✨ Key Features to Explore

### 1. Theme Toggle
Click ☀️/🌙 in header to switch between dark and light themes

### 2. Multi-Language Support
Try different languages:
- JavaScript, Python, Java, C++, C#, TypeScript, Go, Rust

### 3. Keyboard Shortcut
**Ctrl+Enter** or **Cmd+Enter** (Mac) to instantly review

### 4. Review History
After a review, you'll see recent reviews in the right panel

### 5. Clear Button
Click 🗑️ to reset everything

---

## 📊 What's New vs Before

| Feature | Before | Now |
|---------|--------|-----|
| Languages | 1 (JS) | 8 languages |
| Themes | Dark only | Dark & Light |
| Editor | Basic | Monaco (Pro) |
| Errors | Generic | Detailed + Retry |
| History | None | Last 10 saved |
| Shortcuts | None | Ctrl+Enter |
| Mobile | ❌ | ✅ Optimized |
| Welcome | None | ✅ With tips |

---

## 🎨 UI Highlights

### Header
- 🤖 Modern branding
- ☀️/🌙 Theme toggle
- Professional styling

### Code Editor
- Monaco Editor (industry standard)
- Syntax highlighting for 8 languages
- Keyboard shortcuts support

### Review Panel
- 👋 Welcome message with tips
- ⏳ Animated loading spinner
- ❌ Detailed error messages with retry
- 📋 Markdown formatting
- 📜 Recent reviews history

---

## 🛠️ Troubleshooting

### Frontend won't load?
```bash
# Check backend is running
curl http://localhost:3000

# If error, restart backend
# Terminal 1:
cd BackEnd
node server.js
```

### Port conflicts?
```bash
# Kill process on port 5173/5175
lsof -i :5173
kill -9 <PID>

# Kill process on port 3000
lsof -i :3000
kill -9 <PID>

# Restart
npm run dev  # Frontend
node server.js  # Backend
```

### Dependencies missing?
```bash
cd Frontend && npm install
cd BackEnd && npm install
```

---

## 📚 Documentation Files

- **ENHANCEMENT_GUIDE.md** - Detailed setup & features
- **BEFORE_AND_AFTER.md** - Visual comparison
- **UI_ENHANCEMENTS_SUMMARY.md** - Complete feature list
- **CHANGES_LOG.md** - Technical changes
- **README.md** (in Frontend/Backend) - Project info

---

## 🎯 Example Workflows

### Example 1: Review Python Code
```
1. Language: [Select Python 🐍]
2. Code: Paste Python script
3. Button: Click 🚀 Review Code
4. Result: Get suggestions in markdown
5. History: Auto-saved!
```

### Example 2: Use Keyboard Shortcut
```
1. Language: [Select JavaScript 📜]
2. Code: Type or paste JS
3. Keyboard: Press Ctrl+Enter
4. Result: Instant review!
```

### Example 3: Switch Theme
```
1. Default: Dark theme
2. Click: ☀️ sun icon in header
3. Result: Light theme instantly
4. Reload: Theme remembered!
```

### Example 4: Load from History
```
1. Make a review (auto-saved)
2. Clear editor
3. See "Recent Reviews" list
4. Click: Any previous review
5. Result: Code reloaded!
```

---

## 💡 Pro Tips

✅ **Use Keyboard Shortcut**: Ctrl+Enter is faster than clicking
✅ **Select Language First**: Ensures proper syntax highlighting
✅ **Check Error Details**: Better error messages help fix issues
✅ **History Feature**: Great for comparing multiple reviews
✅ **Toggle Theme**: Dark for night, Light for day
✅ **Mobile**: Try on phone - fully responsive!

---

## 🔗 API Endpoints

### Frontend Uses
```
POST http://localhost:3000/api/review

Request:
{
  "code": "function hello() { return 'world'; }",
  "language": "javascript"
}

Response:
{
  "review": "# Code Review\n\n## Analysis\n..."
}
```

### Also Supported
```
POST http://localhost:3000/ai/get-review
(Legacy endpoint - still works)
```

---

## 📱 Mobile Testing

### On Same Device
```bash
npm run dev  # Already running

# No extra steps needed!
Visit: http://localhost:5175
```

### On Different Device (Phone/Tablet)
```bash
# Get your machine IP
ifconfig | grep inet
# Example: 192.168.1.100

# Restart frontend with host flag
cd Frontend
npm run dev -- --host 0.0.0.0

# On phone browser:
http://192.168.1.100:5175
```

---

## ⚙️ Configuration

### Backend Port
File: `BackEnd/server.js`
```javascript
app.listen(3000, () => { ... })
// Change 3000 to different port if needed
```

### Frontend Port
File: `Frontend/vite.config.js`
```javascript
server: {
  port: 5175  // Change port here if needed
}
```

### API Endpoint
File: `Frontend/src/App.jsx`
```javascript
axios.post('http://localhost:3000/api/review', { ... })
// Change localhost:3000 to your backend URL
```

---

## 🎓 Learning Resources

### For Features
- Read: `UI_ENHANCEMENTS_SUMMARY.md`
- See: Feature comparison table

### For Setup
- Read: `ENHANCEMENT_GUIDE.md`
- Section: "Getting Started"

### For Code Changes
- Read: `CHANGES_LOG.md`
- See: Detailed modifications

### For Architecture
- Read: `BEFORE_AND_AFTER.md`
- Section: "Architecture Overview"

---

## ✅ Verification

**Checklist after starting app:**
- [ ] Frontend loads at http://localhost:5175
- [ ] Header shows with theme toggle
- [ ] Language dropdown works
- [ ] Code editor is interactive
- [ ] Review button is clickable
- [ ] Backend connection works
- [ ] Theme toggle switches instantly
- [ ] Mobile layout responsive

---

## 🆘 Getting Help

1. **Common Issues**: See Troubleshooting section
2. **Feature Details**: Check ENHANCEMENT_GUIDE.md
3. **Code Changes**: Review CHANGES_LOG.md
4. **Visual Guide**: See BEFORE_AND_AFTER.md
5. **Browser Console**: Check for error messages
6. **Terminal Output**: Check backend logs

---

## 🎉 You're All Set!

Your AI Code Reviewer is now:
- ✅ Modern and beautiful
- ✅ Multi-language enabled
- ✅ Fully responsive
- ✅ Theme-switchable
- ✅ Production-ready

**Happy reviewing! 🚀**

---

**Version**: 2.0 Enhanced
**Last Updated**: November 30, 2025
**Status**: ✅ Ready to Use
