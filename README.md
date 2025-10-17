# AI Technology Radar 🎯

A fully functional, markdown-based Technology Radar web application for tracking and visualizing AI technologies. Built with a file-based architecture that makes it easy for non-developers to manage content by simply editing markdown files.

## 🌟 Features

- **Interactive Radar Visualization** - Beautiful D3.js-powered radar chart with 4 quadrants and 4 rings
- **Markdown-Based Content** - Each technology is a simple markdown file with YAML frontmatter
- **Zero Build Tools** - Runs directly in the browser, no compilation needed
- **Full CRUD Operations** - Add, edit, and delete technologies through the UI (in admin mode)
- **Advanced Filtering** - Search, filter by quadrant/ring/tags, and featured technologies
- **Dark/Light Mode** - Beautiful themes for any preference
- **Responsive Design** - Works great on desktop and mobile
- **Import/Export** - Backup and share your radar data
- **Keyboard Shortcuts** - Power user features for efficiency
- **Print-Friendly** - Generate reports from your radar

## 🚀 Quick Start

### Running Locally

1. **Clone or download this repository**

2. **Start a local web server** (required for loading external files):

   Using Python 3:
   ```bash
   python3 -m http.server 8000
   ```

   Using Python 2:
   ```bash
   python -m SimpleHTTPServer 8000
   ```

   Using Node.js (with npx):
   ```bash
   npx http-server -p 8000
   ```

   Using PHP:
   ```bash
   php -S localhost:8000
   ```

3. **Open your browser** and navigate to:
   ```
   http://localhost:8000
   ```

4. **Start exploring!** Click on any technology blip to see details.

## 📁 Project Structure

```
ai-tech-radar/
├── index.html                 # Main application file
├── styles.css                 # All styles and themes
├── app.js                     # Main application logic
├── markdown-parser.js         # Markdown parsing utilities
├── sample-data.js            # Embedded sample data
├── radar-data/               # Markdown files for technologies
│   ├── techniques/           # AI techniques and methods
│   ├── tools/                # Tools and applications
│   ├── platforms/            # Cloud platforms and APIs
│   └── languages-frameworks/ # Programming languages & frameworks
├── TEMPLATE.md               # Template for new technologies
└── README.md                 # This file
```

## 📝 Adding a New Technology

### Method 1: Using the UI (Easiest)

1. Click the **⚙️ Admin Mode** button in the top navigation
2. Click the **➕ Floating Action Button** (bottom right)
3. Fill in the form with your technology details
4. Click **Save**

The technology will be saved to browser localStorage and appear on the radar immediately.

### Method 2: Creating a Markdown File

1. Copy the `TEMPLATE.md` file
2. Save it in the appropriate quadrant folder with a descriptive filename:
   - `radar-data/techniques/your-technology.md`
   - `radar-data/tools/your-technology.md`
   - `radar-data/platforms/your-technology.md`
   - `radar-data/languages-frameworks/your-technology.md`

3. Edit the frontmatter (the section between `---` markers):

```markdown
---
name: "Your Technology Name"
ring: "adopt"                    # adopt, trial, assess, or hold
quadrant: "techniques"           # techniques, tools, platforms, or languages-frameworks
tags: ["tag1", "tag2", "tag3"]   # Array of tags
date: "2024-01-15"              # ISO date format
featured: false                  # true for featured technologies
---
```

4. Write your content using standard markdown below the frontmatter

5. Import the file using the **Import Data** button in the footer

## 🎨 Quadrants & Rings

### Quadrants (What type of technology?)

- **Techniques** (Top Right) - Methods, practices, and approaches
- **Tools** (Top Left) - Applications, libraries, and utilities
- **Platforms** (Bottom Left) - Cloud services, APIs, and infrastructure
- **Languages & Frameworks** (Bottom Right) - Programming languages and frameworks

### Rings (What's our recommendation?)

- **Adopt** (Green, Inner) - Production-ready, widely proven, recommended
- **Trial** (Blue) - Worth pursuing, ready for projects that can handle the risk
- **Assess** (Yellow) - Worth exploring to understand potential
- **Hold** (Red, Outer) - Proceed with caution or avoid

## 🎯 Markdown File Format

Each technology is defined in a markdown file with YAML frontmatter:

```markdown
---
name: "Technology Name"
ring: "adopt"
quadrant: "techniques"
tags: ["tag1", "tag2"]
date: "2024-01-15"
featured: true
---

# Technology Name

## Overview
Brief description of the technology.

## Key Benefits
- Benefit 1
- Benefit 2
- Benefit 3

## When to Use
Describe ideal use cases.

## Considerations
- Important consideration 1
- Limitation or challenge

## Recommended Tools
List complementary tools.

## Resources
- [Documentation](https://example.com)
- [Tutorial](https://example.com)

## Status
**Ring: ADOPT** - Brief justification

## Last Updated
2024-01-15
```

## ⌨️ Keyboard Shortcuts

- `?` - Show keyboard shortcuts help
- `/` - Focus search box
- `Esc` - Close panel or modal
- `A` - Toggle admin mode
- `T` - Toggle theme (dark/light)
- `N` - New technology (admin mode only)

## 🔧 Admin Mode Features

Enable admin mode by clicking the ⚙️ button or pressing `A`:

- **Add Technology** - Create new technologies via the UI
- **Edit Technology** - Modify existing technology details
- **Delete Technology** - Remove technologies from the radar
- **Drag & Drop** - (Coming soon) Move blips between rings

All changes are automatically saved to browser localStorage.

## 💾 Data Management

### Export Data

Click **Export Data** in the footer to download a JSON file containing all your technologies. This is useful for:
- Backing up your data
- Sharing your radar with others
- Version control

### Import Data

Click **Import Data** in the footer to:
- Restore from a backup
- Import individual markdown files
- Load data from another radar

Supports both `.json` (full export) and `.md` (individual files) formats.

## 🌐 Deployment

### GitHub Pages

1. Push this repository to GitHub
2. Go to Settings → Pages
3. Select your main branch
4. Your radar will be available at `https://yourusername.github.io/ai-tech-radar`

### Netlify

1. Drag and drop the project folder to [Netlify Drop](https://app.netlify.com/drop)
2. Your radar is instantly deployed!

### Vercel

```bash
npm install -g vercel
vercel
```

### Any Static Host

Simply upload all files to any static web hosting service (AWS S3, Azure Static Web Apps, etc.)

## 🎨 Customization

### Changing Colors

Edit the CSS variables in `styles.css`:

```css
:root {
    --ring-adopt: #10b981;   /* Green */
    --ring-trial: #3b82f6;   /* Blue */
    --ring-assess: #f59e0b;  /* Yellow */
    --ring-hold: #ef4444;    /* Red */
}
```

### Adding New Quadrants

1. Update the quadrant configuration in `app.js`
2. Add corresponding folder in `radar-data/`
3. Update the filter dropdown in `index.html`

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Add Technologies** - Submit PRs with new markdown files
2. **Improve Existing Entries** - Update outdated information
3. **Fix Bugs** - Report or fix issues
4. **Enhance Features** - Propose new functionality

### Contribution Guidelines

- Use the provided template for new technologies
- Keep descriptions concise and actionable
- Include relevant tags for discoverability
- Add at least one resource link
- Follow the existing markdown structure

## 📋 Validation

The app includes built-in validation for:
- Required fields (name, ring, quadrant)
- Valid ring values
- Valid quadrant values
- Proper markdown formatting

Validation warnings and errors are shown in the console.

## 🔒 Privacy & Data Storage

- All data is stored locally in your browser's localStorage
- No data is sent to external servers
- Export your data regularly to avoid loss
- Clear browser data will reset the radar to sample data

## 📱 Browser Support

- Chrome/Edge (recommended)
- Firefox
- Safari
- Opera

Requires a modern browser with ES6+ support and localStorage.

## 🐛 Troubleshooting

### Radar doesn't load
- Make sure you're running a local web server (not opening `file://` directly)
- Check browser console for errors
- Try clearing browser cache and localStorage

### Changes not saving
- Ensure localStorage is enabled in your browser
- Check available storage space
- Try exporting data as backup

### Markdown not rendering
- Verify YAML frontmatter syntax (proper indentation, quotes)
- Check for special characters that need escaping
- Ensure date is in ISO format (YYYY-MM-DD)

## 📚 Technologies Used

- **D3.js v7** - Radar visualization
- **marked.js v11** - Markdown parsing
- **js-yaml v4** - YAML frontmatter parsing
- **Vanilla JavaScript (ES6+)** - Application logic
- **CSS3 with CSS Variables** - Styling and theming

## 📄 License

MIT License - feel free to use this for your own technology radars!

## 🙏 Acknowledgments

Inspired by the ThoughtWorks Technology Radar and built with ❤️ for the AI community.

## 📞 Support

- **Issues**: Report bugs or request features via GitHub Issues
- **Discussions**: Share your radar or ask questions in Discussions
- **Email**: [Your email for support]

---

**Built with** 🎯 **for easy AI technology tracking** | **No build tools required** | **Markdown-powered**
