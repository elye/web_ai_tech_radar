# AI Technology Radar - AI Agent Instructions

## Project Overview
A vanilla JavaScript web application that creates an interactive D3.js-powered technology radar for AI technologies. The architecture is markdown-file-based with a manifest system for zero-build deployment to static hosts.

## Core Architecture Pattern
- **File-based content**: Technologies are individual `.md` files in `radar-data/{quadrant}/` folders
- **Manifest system**: `radar-data/manifest.json` indexes all files for browser loading
- **Zero build tools**: Direct browser execution, no compilation step required
- **Static-first**: Designed for Cloudflare Pages, Netlify, GitHub Pages deployment

## Critical Developer Workflows

### Adding New Technologies
1. Copy `TEMPLATE.md` to appropriate quadrant folder (`radar-data/{models|techniques|tools|platforms}/`)
2. Name file using lowercase-with-hyphens (e.g., `my-tech.md`)  
3. **Always run `python3 update-manifest.py`** after adding/removing files
4. Refresh browser to see changes

### Local Development
```bash
./start.sh  # Preferred - updates manifest + starts server
# OR manually:
python3 update-manifest.py && python3 -m http.server 8000
```

### Deployment Preparation
**Critical**: Always run `update-manifest.py` before deployment - static hosts can't generate the manifest dynamically.

## Data Structure Conventions

### Frontmatter Schema (YAML)
```yaml
---
name: "Display Name"                    # Required
ring: "adopt|trial|assess|hold"         # Required - recommendation level
quadrant: "models|techniques|tools|platforms"  # Required - category
tags: ["tag1", "tag2"]                 # Array format, used for filtering
date: "2024-10-17"                     # ISO date format
featured: true                         # Boolean for radar highlighting
cost: "free|paid|freemium"             # Pricing model
draft: true                            # Hide from radar if true
---
```

### Ring Semantics
- **adopt**: Production-ready, strongly recommended
- **trial**: Ready for projects that can handle risk
- **assess**: Worth exploring/learning about
- **hold**: Proceed with caution or avoid

### File Organization
```
radar-data/
├── models/      # LLMs, AI models (GPT-4, Claude, etc.)
├── techniques/  # Methods, approaches (RAG, fine-tuning, etc.)
├── tools/       # Dev tools, frameworks (LangChain, PyTorch, etc.)
└── platforms/   # APIs, cloud services (OpenAI API, AWS Bedrock, etc.)
```

## Key Integration Points

### JavaScript Modules
- `MarkdownParser.parse()` - Converts markdown+frontmatter to tech objects
- `TechnologyRadar.loadMarkdownFiles()` - Fetches from manifest, not filesystem
- `app.js` manages D3.js visualization and filtering state
- Search/filtering applies to `filteredTechnologies` array, not DOM

### CSS Architecture
- CSS custom properties for themes (`--ring-adopt`, `--bg-primary`, etc.)
- `[data-theme="dark"]` selector for dark mode
- Ring colors map to CSS variables in both light/dark themes

### Deployment Dependencies
- **Manifest file**: Required for static hosting (browsers can't read directories)
- **CORS headers**: `_headers` file for Cloudflare Pages configuration
- **No build process**: All assets load directly in browser

## Project-Specific Patterns

### Blip Positioning Algorithm
Technologies positioned using consistent hash-based placement:
```javascript
// In calculateBlipPosition() - uses tech.name hash for reproducible positions
const hash = this.hashCode(tech.name);
const angle = quadrant.start + (hash % (quadrant.end - quadrant.start));
const r = ring.min + ((hash * 13) % (ring.max - ring.min));
```

### State Management
- No external state library - vanilla JS with localStorage
- Filters stored in `this.filters` object, applied via `applyFilters()`
- Theme persistence via `localStorage.getItem('theme')`

### Content Loading Pattern
Manifest-driven loading (not directory scanning):
```javascript
const manifestResponse = await fetch('radar-data/manifest.json');
const manifest = await manifestResponse.json();
// Then fetch each file listed in manifest
```

## Common Gotchas

### Must Update Manifest
**Critical**: Static hosts can't dynamically discover files. Always run `update-manifest.py` after adding/removing `.md` files or deployment will be missing technologies.

### YAML Frontmatter Syntax
- Tags must be arrays: `tags: ["ai", "ml"]` not `tags: ai, ml`
- Dates in ISO format: `date: "2024-10-17"` 
- Boolean values: `featured: true` (not `"true"`)

### D3.js Coordinate System  
SVG coordinates: 0° = right, 90° = down (mathematical coords inverted on Y-axis)

### File Naming
Use lowercase-with-hyphens for `.md` filenames to avoid URL encoding issues.

## Testing & Validation
- `python3 validate.py` - Checks frontmatter syntax and required fields
- Browser console shows validation warnings for malformed files
- `MarkdownParser.validate()` function for programmatic validation

## External Dependencies (CDN-loaded)
- D3.js v7 for visualization
- marked.js v11 for markdown parsing  
- js-yaml v4 for frontmatter parsing

When modifying the radar, prefer working with the data structures (`this.technologies`, `this.filteredTechnologies`) rather than directly manipulating the DOM.

## Answering questions about technology
When asked a question relating to a technology, do provide an answer first then also open the relevant technology md file in their respective directory in VSCode using the `code` command.