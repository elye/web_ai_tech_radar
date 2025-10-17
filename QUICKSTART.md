# 🚀 Quick Start Guide

Get your AI Technology Radar running in 60 seconds!

## ⚡ Fastest Start

### macOS / Linux
```bash
cd ai-tech-radar
./start.sh
```

### Windows
```cmd
cd ai-tech-radar
python -m http.server 8000
```

Then open: **http://localhost:8000**

---

## 📱 First Steps

### 1. Explore the Radar (30 seconds)
- 👆 **Click** any colored blip to see technology details
- 🎨 Four quadrants: Models, Techniques, Tools, Platforms
- 🎯 Four rings: Adopt (green), Trial (blue), Assess (yellow), Hold (red)
- ⭐ Star icon = Featured technology

### 2. Use Filters (30 seconds)
- 🔍 **Search box** - Type to find technologies
- 📊 **Quadrant filter** - Show only one category
- 🎯 **Ring filter** - Show only one ring
- ⭐ **Featured button** - Show starred technologies only
- 🌙 **Theme toggle** - Switch between light/dark mode

### 3. Try Keyboard Shortcuts (30 seconds)
- Press **?** for help
- Press **/** to search
- Press **T** to toggle theme
- Press **Esc** to close panels
- Press **A** to toggle admin mode

---

## ✏️ Add Your First Technology

### Method 1: Using the UI (Easiest - 2 minutes)

1. Click **⚙️** (top right) to enable Admin Mode
2. Click **➕** (bottom right) floating button
3. Fill in the form:
   - **Name**: "Your Technology"
   - **Quadrant**: Choose one (models/techniques/tools/platforms)
   - **Ring**: Choose one (adopt/trial/assess/hold)
   - **Tags**: "tag1, tag2, tag3"
   - **Featured**: Check if you want a star
   - **Content**: Write description in markdown
4. Click **Save**
5. Done! Your technology appears on the radar

### Method 2: Create Markdown File (Advanced - 5 minutes)

1. Copy `TEMPLATE.md`:
   ```bash
   cp TEMPLATE.md radar-data/tools/my-tech.md
   ```

2. Edit the file:
   ```markdown
   ---
   name: "My Amazing AI Tool"
   ring: "trial"
   quadrant: "tools"
   tags: ["ai", "productivity"]
   date: "2024-10-17"
   featured: true
   ---
   
   # My Amazing AI Tool
   
   ## Overview
   This tool does amazing things with AI...
   
   ## Key Benefits
   - Benefit 1
   - Benefit 2
   ```

3. Import via UI:
   - Click "Import Data" (footer)
   - Select your file
   - Done!

---

## 📊 Understanding the Radar

### Quadrants (WHAT type?)

```
     TECHNIQUES        |       MODELS
    (Methods)          |   (LLMs & AI Models)
                       |
─────────────────────────────────────────
                       |
       TOOLS           |     PLATFORMS
  (Dev Tools)          |    (APIs & Cloud)
```

**Models** = LLMs and AI models (GPT-4, Claude, Llama, Gemini)  
**Techniques** = Methods and approaches (RAG, Prompt Engineering, Fine-tuning)  
**Tools** = Development tools (LangChain, PyTorch, GitHub Copilot)  
**Platforms** = APIs and infrastructure (OpenAI API, AWS Bedrock, Azure)

### Rings (RECOMMENDATION level?)

```
        🟢 ADOPT (Use it!)
          🔵 TRIAL (Try it)
            🟡 ASSESS (Explore it)
              🔴 HOLD (Careful!)
```

**ADOPT** = Production ready, proven, recommended  
**TRIAL** = Ready for projects, monitor closely  
**ASSESS** = Worth exploring, experimental  
**HOLD** = Proceed with caution, may have issues

---

## 🎨 Customization

### Change Colors
Edit `styles.css`:
```css
:root {
    --ring-adopt: #10b981;   /* Your color */
    --ring-trial: #3b82f6;   /* Your color */
    --ring-assess: #f59e0b;  /* Your color */
    --ring-hold: #ef4444;    /* Your color */
}
```

### Change Title
Edit `index.html`:
```html
<h1>🎯 Your Company's Tech Radar</h1>
```

### Add Logo
Edit `index.html` in navbar:
```html
<img src="your-logo.png" alt="Logo" />
```

---

## 💾 Backup & Share

### Export All Data
1. Click **Export Data** (footer)
2. Save JSON file
3. Store in safe place

### Import Data
1. Click **Import Data** (footer)
2. Select JSON or .md files
3. Data merges with existing

### Share with Team
1. Export data
2. Send JSON file
3. They import it
4. Everyone in sync!

---

## 🚀 Deploy Online

### GitHub Pages (Free, 5 minutes)
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/you/ai-tech-radar.git
git push -u origin main
```
Enable GitHub Pages in Settings → Pages → Select main branch

Your radar: `https://you.github.io/ai-tech-radar`

### Netlify (Free, 2 minutes)
1. Go to [netlify.com/drop](https://app.netlify.com/drop)
2. Drag project folder
3. Done! You get a URL instantly

### More Options
See `DEPLOYMENT.md` for:
- Vercel
- AWS S3
- Azure Static Web Apps
- Cloudflare Pages
- Custom domain setup

---

## 🔧 Common Tasks

### Update a Technology
1. Enable admin mode (⚙️ button)
2. Click the technology blip
3. Click "Edit" button
4. Make changes
5. Click "Save"

### Delete a Technology
1. Enable admin mode
2. Click the technology blip
3. Click "Delete" button
4. Confirm deletion

### Move to Different Ring
1. Edit the technology
2. Change "Ring" dropdown
3. Save
4. Blip moves to new ring!

### Make Technology Featured
1. Edit the technology
2. Check "Featured" box
3. Save
4. Gets ⭐ star icon

---

## 🐛 Troubleshooting

### Radar Not Loading?
- ✅ Running a web server? (not just opening file://)
- ✅ Check browser console (F12) for errors
- ✅ Try different browser

### Changes Not Saving?
- ✅ Admin mode enabled?
- ✅ localStorage enabled in browser?
- ✅ Enough storage space?

### Blips Not Showing?
- ✅ Check filters (clear all filters)
- ✅ Verify markdown file format
- ✅ Run `python validate.py`

### Import Not Working?
- ✅ Valid JSON or markdown file?
- ✅ Check file format against TEMPLATE.md
- ✅ Look for console errors

---

## 📚 File Reference

```
📄 index.html          Main application
🎨 styles.css          All styles
⚙️ app.js              Application logic
📝 markdown-parser.js  Parsing utilities
💾 sample-data.js      Sample technologies

📂 radar-data/         Your content here!
  ├── models/         LLMs & AI models
  ├── techniques/     AI methods
  ├── tools/         Dev tools & frameworks
  └── platforms/     Cloud & APIs

📋 TEMPLATE.md         Copy this for new tech
📖 README.md           Full documentation
🤝 CONTRIBUTING.md     How to contribute
🚀 DEPLOYMENT.md       Deploy guides
🔍 validate.py         Validate files
```

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| **?** | Show shortcuts help |
| **/** | Focus search box |
| **Esc** | Close panel/modal |
| **A** | Toggle admin mode |
| **T** | Toggle theme |
| **N** | New technology (admin mode) |

---

## 🎯 Best Practices

### Adding Technologies
- ✅ Use the TEMPLATE.md format
- ✅ Write 2-3 sentence overview
- ✅ Include 3-5 benefits
- ✅ Add considerations/limitations
- ✅ Link to 2+ resources
- ✅ Justify ring placement

### Ring Selection
- 🟢 **ADOPT** if: Proven in production, recommended
- 🔵 **TRIAL** if: Ready but newer, worth trying
- 🟡 **ASSESS** if: Experimental, learn about it
- 🔴 **HOLD** if: Has issues, better alternatives

### Tags
- Use 3-6 relevant tags
- Be consistent (lowercase)
- Mix types (tech type + use case)
- Example: `["llm", "python", "opensource", "rag"]`

---

## 📈 Growth Path

### Week 1: Learn
- Explore sample technologies
- Try filters and search
- Read documentation
- Understand quadrants/rings

### Week 2: Customize
- Add your technologies
- Edit existing entries
- Customize colors/branding
- Set up backups

### Week 3: Share
- Deploy online
- Share with team
- Get feedback
- Refine content

### Week 4+: Maintain
- Regular updates
- Add new technologies
- Archive outdated ones
- Export backups monthly

---

## 🎓 Learning Resources

### In This Project
- `README.md` - Full documentation
- `TEMPLATE.md` - Technology template
- `CONTRIBUTING.md` - How to contribute
- `DEPLOYMENT.md` - Deploy anywhere
- `PROJECT_SUMMARY.md` - What's included

### External
- [D3.js Docs](https://d3js.org/) - Visualization library
- [Markdown Guide](https://www.markdownguide.org/) - Markdown syntax
- [ThoughtWorks Radar](https://www.thoughtworks.com/radar) - Original inspiration

---

## ✅ Daily Checklist

### Using the Radar
- [ ] Search for specific technology
- [ ] Filter by your interest area
- [ ] Click blips to learn more
- [ ] Share interesting finds

### Maintaining the Radar
- [ ] Add new technologies as you discover them
- [ ] Update ring placements as tech matures
- [ ] Fix any outdated information
- [ ] Export backup (weekly)

---

## 🎉 Quick Wins

### In 5 Minutes
- ✅ Add one new technology
- ✅ Update one existing entry
- ✅ Export a backup
- ✅ Share radar with colleague

### In 15 Minutes
- ✅ Add 3-5 technologies
- ✅ Customize colors/branding
- ✅ Deploy to GitHub Pages
- ✅ Create sharing process

### In 1 Hour
- ✅ Add 10+ technologies
- ✅ Deploy to production
- ✅ Document team process
- ✅ Train team members

---

## 🆘 Get Help

### Issues?
1. Check `README.md` troubleshooting section
2. Check browser console (F12)
3. Search existing GitHub issues
4. Open new issue with details

### Questions?
1. Read full documentation
2. Check `CONTRIBUTING.md`
3. Look at sample files
4. Ask in discussions

---

## 🎯 Success Metrics

You'll know it's working when:
- ✅ Radar loads in browser
- ✅ Can click blips and see details
- ✅ Can add/edit/delete technologies
- ✅ Changes persist after refresh
- ✅ Can export and import data
- ✅ Team is using it regularly

---

## 🌟 Pro Tips

1. **Start small** - Add 5-10 technologies first
2. **Be consistent** - Use templates for consistency
3. **Regular updates** - Review monthly
4. **Team input** - Get multiple perspectives
5. **Document decisions** - Why technologies move rings
6. **Export often** - Backups prevent data loss
7. **Version control** - Keep radar in Git
8. **Share publicly** - Or keep internal, your choice
9. **Iterate** - Radar evolves with your team
10. **Have fun!** - Make it your own

---

**Need more detail? Check the full `README.md`!**

**Ready to start? Run `./start.sh` and go! 🚀**
