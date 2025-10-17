# Contributing to AI Technology Radar

Thank you for your interest in contributing! This document provides guidelines for contributing to the AI Technology Radar project.

## 🎯 Ways to Contribute

### 1. Adding New Technologies

The easiest and most valuable contribution is adding new AI technologies to the radar.

**Steps:**
1. Copy `TEMPLATE.md` to the appropriate quadrant folder
2. Fill in all sections with accurate, concise information
3. Choose the appropriate ring based on maturity and recommendation
4. Add 2-3 high-quality resource links
5. Submit a pull request

**Quality Guidelines:**
- Keep descriptions under 500 words
- Focus on practical, actionable information
- Be objective - avoid marketing language
- Include both benefits AND considerations
- Cite authoritative sources

### 2. Updating Existing Technologies

Technology moves fast! Help keep the radar current by:
- Updating ring placements based on maturity changes
- Adding new resources and links
- Correcting inaccuracies
- Expanding sparse descriptions
- Updating dates

### 3. Improving Documentation

- Fix typos or unclear instructions
- Add examples
- Improve the README or guides
- Create tutorials or videos

### 4. Reporting Issues

Found a bug or have a suggestion? [Open an issue](https://github.com/yourusername/ai-tech-radar/issues) with:
- Clear description
- Steps to reproduce (for bugs)
- Expected vs actual behavior
- Browser/environment details

### 5. Enhancing Features

Before starting work on new features:
1. Check existing issues and PRs
2. Open an issue to discuss your idea
3. Wait for maintainer feedback
4. Submit a PR when approved

## 📝 Markdown File Guidelines

### Required Fields

```yaml
---
name: "Technology Name"           # Exact name, with proper capitalization
ring: "adopt"                     # adopt, trial, assess, or hold
quadrant: "techniques"            # matches folder name
tags: ["tag1", "tag2"]           # At least 2 relevant tags
date: "2024-10-17"               # ISO format YYYY-MM-DD
featured: false                   # true only for exceptional technologies
---
```

### Content Structure

Every technology should have:

1. **Overview** (2-3 sentences)
   - What is it?
   - What problem does it solve?
   - Why is it significant?

2. **Key Benefits** (3-5 bullet points)
   - Concrete, measurable advantages
   - Focus on user/developer benefits

3. **When to Use** (3-4 use cases)
   - Specific scenarios
   - Context matters

4. **Considerations** (3-4 items)
   - Limitations
   - Challenges
   - Prerequisites
   - Learning curve

5. **Recommended Tools** (Optional)
   - Complementary technologies
   - Integration options

6. **Resources** (2-4 links minimum)
   - Official documentation
   - Tutorials
   - GitHub repositories
   - Research papers

7. **Status** (1-2 sentences)
   - Justify ring placement
   - Current state and trajectory

8. **Last Updated** (ISO date)

### Ring Selection Criteria

**ADOPT** - Use it now
- Widely adopted in production
- Stable and mature
- Strong community support
- Well-documented
- Clear best practices

**TRIAL** - Try it carefully
- Production-ready but newer
- Growing adoption
- Some production case studies
- Active development
- Suitable for new projects

**ASSESS** - Explore and learn
- Promising but early
- Limited production use
- Worth understanding
- May become significant
- Good for R&D projects

**HOLD** - Proceed with caution
- Has significant issues
- Better alternatives exist
- Being phased out
- Not recommended for new work

### Tag Guidelines

Use clear, consistent tags:

**Good tags:**
- `llm`, `deep-learning`, `nlp`
- `python`, `typescript`, `rust`
- `cloud`, `api`, `opensource`
- `production`, `research`, `experimental`

**Avoid:**
- Overly generic tags (`ai`, `ml`)
- Company names as tags (use in content instead)
- Too many tags (3-6 is ideal)

## 🔍 Pull Request Process

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b add-technology-name
   ```
3. **Make your changes**
   - Add/edit markdown files
   - Run validation: `python validate.py`
   - Test in browser
4. **Commit with clear messages**
   ```bash
   git commit -m "Add: LangGraph to tools quadrant"
   git commit -m "Update: OpenAI API ring from trial to adopt"
   git commit -m "Fix: Typo in RAG description"
   ```
5. **Push to your fork**
   ```bash
   git push origin add-technology-name
   ```
6. **Open a Pull Request**
   - Use a descriptive title
   - Explain what and why
   - Reference any issues

### PR Title Format

- `Add: Technology Name` - New technology
- `Update: Technology Name` - Changes to existing
- `Fix: Description of fix` - Bug fixes
- `Docs: Description` - Documentation changes
- `Feature: Description` - New features

## ✅ Validation

Before submitting, run the validator:

```bash
python validate.py
```

All files must pass validation (errors = 0).

Warnings are acceptable but should be minimized.

## 🎨 Code Style

### JavaScript
- ES6+ syntax
- Clear variable names
- Comment complex logic
- Keep functions focused

### CSS
- Use CSS variables for colors
- Mobile-first approach
- Consistent naming

### Markdown
- One sentence per line (easier diffs)
- Use proper markdown syntax
- Include alt text for images

## 🤝 Code of Conduct

- Be respectful and inclusive
- Assume good intentions
- Provide constructive feedback
- Focus on the technology, not personalities
- Help newcomers

## 📋 Issue Labels

- `bug` - Something isn't working
- `enhancement` - New feature request
- `documentation` - Documentation improvements
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention needed
- `question` - Further information requested
- `technology-addition` - New technology proposal

## 🚀 Development Setup

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/ai-tech-radar.git
   cd ai-tech-radar
   ```

2. Start local server
   ```bash
   python3 -m http.server 8000
   # or
   npm start
   ```

3. Open in browser
   ```
   http://localhost:8000
   ```

4. Make changes and refresh to see updates

## 📦 Dependencies

The project intentionally has minimal dependencies:
- D3.js (CDN)
- marked.js (CDN)
- js-yaml (CDN)

For validation:
- Python 3.x
- PyYAML (`pip install pyyaml`)

## 🎯 Technology Selection Criteria

When proposing new technologies, consider:

1. **Relevance to AI** - Is it specifically for AI/ML use cases?
2. **Maturity** - Is there enough information to evaluate it?
3. **Availability** - Can people actually use it?
4. **Differentiation** - Is it meaningfully different from existing entries?
5. **Impact** - Is it significant enough to warrant inclusion?

## 📧 Questions?

- Open an issue for general questions
- Tag maintainers with `@username`
- Be patient - we're volunteers!

## 🙏 Thank You

Your contributions make this project better for everyone. We appreciate your time and effort!

---

**Remember:** Quality over quantity. One well-researched, accurate entry is better than many incomplete ones.
