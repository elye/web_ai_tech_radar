# Development Workflow

## Quick Start

The easiest way to run the application is:

```bash
./start.sh
```

This script will:
1. ✅ Check for Python 3 installation
2. 📝 **Automatically regenerate `sample-data.js`** from your markdown files
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

The script will **automatically regenerate `sample-data.js`** with your new technology!

### Step 4: Refresh Browser

Open http://localhost:8000 in your browser. The new technology will appear automatically because:
1. `sample-data.js` was regenerated with the new entry
2. The version number was auto-incremented
3. The app detects the version change and reloads fresh data

---

## Manual Regeneration (Alternative)

If you prefer to regenerate manually without restarting the server:

```bash
# Regenerate sample-data.js
python3 generate-sample-data.py

# Then refresh your browser
# The app will auto-detect the version change
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
2. **Generation**: `generate-sample-data.py` reads all markdown files
3. **Output**: Creates `sample-data.js` with embedded data + version
4. **Runtime**: App loads from `sample-data.js` (not markdown files)
5. **Auto-reload**: Version check triggers fresh data load

### Version Management

Every time `generate-sample-data.py` runs:
- It increments the version in `sample-data.js`
- Format: `YYYY-MM-DD-vN` (e.g., `2024-10-17-v5`)
- App compares stored version vs current version
- If different → reloads data automatically

---

## Common Tasks

### Add a New Technology
```bash
# 1. Create file
vim radar-data/models/new-tech.md

# 2. Run start script (auto-regenerates)
./start.sh

# 3. Refresh browser - new tech appears!
```

### Edit Existing Technology
```bash
# 1. Edit file
vim radar-data/models/gpt-4o.md

# 2. Restart server (auto-regenerates)
# Press Ctrl+C to stop server
./start.sh

# 3. Refresh browser - changes appear!
```

### Move Technology to Different Ring
```bash
# 1. Edit frontmatter
vim radar-data/tools/cursor.md
# Change: ring: "trial" → ring: "adopt"

# 2. Restart server
./start.sh

# 3. Refresh browser - position updated!
```

### Change Quadrant
```bash
# 1. Move file to new directory
mv radar-data/tools/some-tool.md radar-data/platforms/

# 2. Update frontmatter
vim radar-data/platforms/some-tool.md
# Change: quadrant: "tools" → quadrant: "platforms"

# 3. Restart server
./start.sh
```

---

## Development Tips

### Keep Server Running
If you're making many changes, you can:
1. Keep the server running
2. Manually regenerate in another terminal:
   ```bash
   python3 generate-sample-data.py
   ```
3. Refresh browser (auto-detects new version)

### Clear Browser Cache
If you see stale data:
1. Open browser DevTools (F12)
2. Go to Application → Storage → Local Storage
3. Delete `ai-tech-radar-data` and `sample-data-version`
4. Refresh page

Or use the helper page:
```
http://localhost:8000/force-refresh.html
```

### Check Console Logs
Open browser console to see:
```
Sample data version changed, reloading fresh data...
Loaded 40 technologies, 40 filtered
Init: 40 total, 40 filtered
Rendering 40 blips...
```

---

## Troubleshooting

### "Technology not showing up"
- ✅ Did you restart the server with `./start.sh`?
- ✅ Did `generate-sample-data.py` run successfully?
- ✅ Check console for version change message
- ✅ Try force refresh: http://localhost:8000/force-refresh.html

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

# Regenerate sample data
python3 generate-sample-data.py || exit 1

# Deploy (example)
# rsync -avz . user@server:/var/www/radar/
```

---

## Summary

**The key insight**: The app loads from `sample-data.js`, not directly from markdown files. So whenever you add/edit markdown files, you must regenerate `sample-data.js`.

**The solution**: The `start.sh` script now does this automatically! Just run `./start.sh` and it handles everything.

🎯 **Happy radar building!**
