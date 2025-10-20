---
name: "Technology Name"
organization: "Company or Organization Name"
ring: "assess"
quadrant: "techniques"
tags: ["tag1", "tag2", "tag3"]
date: "2024-10-17"
featured: false
cost: "free"
---

# Technology Name

## Overview
Brief description of the technology and what it does. Explain its purpose and main value proposition in 2-3 sentences.

## Key Benefits
- Key benefit 1
- Key benefit 2
- Key benefit 3
- Key benefit 4

## When to Use
Describe the ideal use cases and scenarios where this technology excels:
- Use case 1
- Use case 2
- Use case 3

## Considerations
Important things to know before adopting:
- Consideration or limitation 1
- Consideration or limitation 2
- Consideration or limitation 3
- Learning curve or complexity notes

## Cost
**[Free | Paid | Freemium]** - Brief description of pricing model

*Examples:*
- **Free**: "Fully open source with no usage costs"
- **Paid**: "Commercial license required, starts at $X/month"
- **Freemium**: "Free tier with X requests/month, paid plans start at $Y"

## Recommended Tools
List complementary tools, libraries, or frameworks that work well with this technology:
- Tool 1
- Tool 2
- Tool 3

## Resources
- [Official Documentation](https://example.com)
- [Getting Started Tutorial](https://example.com)
- [GitHub Repository](https://example.com)
- [Community/Forum](https://example.com)

## Status
**Ring: ASSESS** - Brief justification for why this technology is in this ring

*Example status descriptions by ring:*
- **ADOPT**: "Production-ready, widely proven, strongly recommend for appropriate use cases"
- **TRIAL**: "Ready for use in projects that can handle the risk and are comfortable with some uncertainty"
- **ASSESS**: "Worth exploring with the goal of understanding how it will affect your organization"
- **HOLD**: "Proceed with caution. May be worth exploring in specific contexts but not recommended for most teams"

## Last Updated
2024-10-17

---

## Instructions for Using This Template

1. **Copy this file** to the appropriate quadrant folder:
   - `radar-data/models/` - for LLMs and AI models
   - `radar-data/techniques/` - for methodologies, practices, approaches
   - `radar-data/tools/` - for development tools, frameworks, libraries
   - `radar-data/platforms/` - for cloud services, APIs, infrastructure

2. **Rename the file** using lowercase with hyphens (e.g., `my-technology.md`)

3. **Update the frontmatter** (the section between `---` markers):
   - `name`: The display name of the technology
   - `ring`: One of: `adopt`, `trial`, `assess`, or `hold`
   - `quadrant`: One of: `models`, `techniques`, `tools`, or `platforms`
   - `tags`: Array of relevant tags for filtering (use brackets and quotes)
   - `date`: Today's date in YYYY-MM-DD format
   - `featured`: Set to `true` to highlight on the radar, `false` otherwise

4. **Fill in all sections** with relevant content
   - Keep it concise and actionable
   - Focus on practical information
   - Include real-world examples where helpful

5. **Add at least 2-3 resource links** to help readers learn more

6. **Choose the appropriate ring** based on your recommendation:
   - **ADOPT** = Use it, it's proven
   - **TRIAL** = Try it on appropriate projects
   - **ASSESS** = Learn about it, experiment
   - **HOLD** = Be cautious, may have issues

7. **Save the file** and either:
   - Import it via the UI (Import Data button)
   - Reload the page if you're loading from the radar-data folder

## Markdown Tips

- Use `#` for headings (already in template)
- Use `-` for bullet lists
- Use `[text](url)` for links
- Use `**text**` for bold
- Use `*text*` for italic
- Use `` `code` `` for inline code
- Use triple backticks for code blocks:

```python
def example():
    return "code block"
```

## Frontmatter Field Reference

```yaml
---
name: "string"              # Required - Display name
organization: "string"      # Required - Company or organization behind the tech
ring: "string"              # Required - adopt|trial|assess|hold
quadrant: "string"          # Required - models|techniques|tools|platforms
tags: ["string", "string"]  # Recommended - Array of tags
date: "YYYY-MM-DD"         # Recommended - ISO date format
featured: boolean           # Optional - true|false
cost: "string"              # Required - free|paid|freemium
draft: boolean             # Optional - true to hide from radar
---
```

## Example Tags

Choose relevant tags from these categories or create your own:

**Technology Type:**
- llm, ml, ai, deep-learning, nlp, computer-vision, multimodal

**Programming:**
- python, javascript, rust, java, go, typescript

**Domain:**
- cloud, edge, mobile, web, backend, frontend, data

**Characteristics:**
- opensource, enterprise, research, production, experimental

**Provider:**
- openai, google, microsoft, aws, anthropic, meta

**Use Case:**
- chatbot, generation, analysis, automation, monitoring
