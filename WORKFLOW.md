# Development Workflow

## Quick Start

The easiest way to run the application is:

```bash
./start.sh
```

This script will:
1. ✅ Check for Python 3 installation
2. 📝 Update the manifest file (`radar-data/manifest.json`)
3. 🚀 Start a local web server on http://localhost:8000

---

## Adding New Technologies

### Step 1: Create Markdown File

Create a new markdown file in the appropriate quadrant directory:

```bash
# Example: Adding GPT-5 model
touch radar-data/models/chatgpt-gpt5.md
```

### Step 2: Add Content

Edit the file with the required YAML frontmatter and markdown content:

```markdown
---
name: "ChatGPT GPT-5"
quadrant: "models"
ring: "assess"
featured: true
tags:
  - llm
  - openai
  - multimodal
---

# ChatGPT GPT-5

## Overview
GPT-5 is the next generation language model from OpenAI...

## Key Features
- Enhanced reasoning capabilities
- Improved multimodal understanding
- Better context handling

## When to Use
- Complex reasoning tasks
- Advanced content generation
- Multimodal applications

## Considerations
- Still in early access
- Higher cost than GPT-4
- API availability limited
```

### Step 3: Run the Start Script

```bash
./start.sh
```

The script will **automatically update the manifest** with your new technology!

### Step 4: Refresh Browser

Open http://localhost:8000 in your browser. The new technology will appear automatically.

---

## Manual Manifest Update (Alternative)

If you prefer to update the manifest manually without restarting the server:

```bash
# Update manifest.json
python3 update-manifest.py

# Then refresh your browser
```

---

## Validation

Before committing changes, validate your markdown files:

```bash
# Validate all files
python3 validate.py

# Expected output:
# ✓ All 40 files are valid!
```

---

## File Structure

```
radar-data/
├── models/              # AI models (GPT-4, Claude, Llama, etc.)
├── techniques/          # AI techniques (RAG, fine-tuning, etc.)
├── tools/              # Development tools (Cursor, Aider, etc.)
└── platforms/          # Cloud platforms (OpenAI API, Azure, etc.)
```

---

## How It Works

### Data Flow

1. **Source of Truth**: Markdown files in `radar-data/`
2. **Manifest**: `radar-data/manifest.json` lists all markdown files
3. **Runtime**: App fetches manifest, then loads each markdown file listed
4. **Compatibility**: Works on both local servers and static hosts (Cloudflare Pages, Netlify, etc.)

---

## Common Tasks

### Add a New Technology
```bash
# 1. Create file
vim radar-data/models/new-tech.md

# 2. Update manifest
python3 update-manifest.py

# 3. Refresh browser - new tech appears!
```

### Edit Existing Technology
```bash
# 1. Edit file
vim radar-data/models/gpt-4o.md

# 2. No need to update manifest (file list unchanged)

# 3. Refresh browser - changes appear!
```

### Move Technology to Different Ring
```bash
# 1. Edit frontmatter
vim radar-data/tools/cursor.md
# Change: ring: "trial" → ring: "adopt"

# 2. No need to update manifest (file list unchanged)

# 3. Refresh browser - position updated!
```

### Change Quadrant
```bash
# 1. Move file to new directory
mv radar-data/tools/some-tool.md radar-data/platforms/

# 2. Update frontmatter
vim radar-data/platforms/some-tool.md
# Change: quadrant: "tools" → quadrant: "platforms"

# 3. Update manifest (file moved to different directory)
python3 update-manifest.py

# 4. Refresh browser - quadrant updated!
```

---

## Development Tips

### Keep Server Running
If you're making many changes, you can:
1. Keep the server running
2. Update manifest when you add/remove files:
   ```bash
   python3 update-manifest.py
   ```
3. Refresh browser

### Clear Browser Cache
If you see stale data:
1. Open browser DevTools (F12)
2. Go to Application → Storage → Local Storage
3. Delete `ai-tech-radar-data`
4. Refresh page

Or use the helper page:
```
http://localhost:8000/force-refresh.html
```

### Check Console Logs
Open browser console to see:
```
🔍 Loading radar data from manifest...
  Loading 7 files from models/
  Loading 8 files from platforms/
  Loading 8 files from techniques/
  Loading 18 files from tools/
✅ Loaded 41 technologies total
```

---

## Troubleshooting

### "Technology not showing up"
- ✅ Did you update the manifest with `python3 update-manifest.py`?
- ✅ Did the script run successfully?
- ✅ Check browser console for errors
- ✅ Try hard refresh (Cmd+Shift+R or Ctrl+Shift+R)

### "Validation errors"
```bash
python3 validate.py
```
Check output for specific errors in your markdown files.

### "Wrong quadrant/ring"
- Check YAML frontmatter matches intended position
- Quadrant values: `models`, `techniques`, `tools`, `platforms`
- Ring values: `adopt`, `trial`, `assess`, `hold`

### "Port 8000 already in use"
```bash
# Find and kill process using port 8000
lsof -ti:8000 | xargs kill -9

# Or use different port
python3 -m http.server 8001
```

---

## Best Practices

### Commit Often
```bash
git add radar-data/
git commit -m "Add GPT-5 to models quadrant"
```

### Validate Before Commit
```bash
python3 validate.py && git commit
```

### Keep Markdown Clean
- Use consistent formatting
- Include all required frontmatter fields
- Add meaningful descriptions
- Tag appropriately for searchability

### Version Control
- Commit markdown files (source of truth)
- Commit `sample-data.js` (generated, but useful for deployment)
- Don't commit `node_modules/` or temporary files

---

## CI/CD Integration

For automated deployments, add this to your build script:

```bash
#!/bin/bash
# build.sh

# Validate all files
python3 validate.py || exit 1

# Update manifest
python3 update-manifest.py || exit 1

# Deploy (example)
# rsync -avz . user@server:/var/www/radar/
```

---

## Summary

**Key insight**: The app loads markdown files using a manifest (`radar-data/manifest.json`) that lists all files. This works on both local servers and static hosting platforms.

**When to update manifest**: 
- ✅ When you add new markdown files
- ✅ When you delete markdown files  
- ✅ When you move files between quadrants
- ❌ NOT needed when just editing file content

**The solution**: Run `python3 update-manifest.py` after adding/removing/moving files, or use `./start.sh` which does it automatically!

🎯 **Happy radar building!**
