/**
 * Markdown Parser for AI Technology Radar
 * Handles parsing of markdown files with YAML frontmatter
 */

class MarkdownParser {
    /**
     * Parse a markdown file with YAML frontmatter
     * @param {string} content - Raw markdown content with frontmatter
     * @returns {Object} Parsed technology object
     */
    static parse(content) {
        const parsed = this.parseFrontmatter(content);
        
        if (!parsed) {
            throw new Error('Failed to parse markdown content');
        }
        
        const { frontmatter, body } = parsed;
        
        // Convert markdown body to HTML
        const htmlContent = marked.parse(body);
        
        // Create technology object
        const technology = {
            name: frontmatter.name || 'Untitled',
            organization: frontmatter.organization || '',
            ring: (frontmatter.ring || 'assess').toLowerCase(),
            quadrant: (frontmatter.quadrant || 'techniques').toLowerCase(),
            tags: this.parseTags(frontmatter.tags),
            date: frontmatter.date || new Date().toISOString().split('T')[0],
            featured: frontmatter.featured === true || frontmatter.featured === 'true',
            draft: frontmatter.draft === true || frontmatter.draft === 'true',
            cost: (frontmatter.cost || '').toLowerCase() || null,
            content: htmlContent,
            rawContent: body,
            frontmatter: frontmatter
        };

        return technology;
    }
    
    /**
     * Parse YAML frontmatter from markdown content
     * @param {string} content - Raw markdown content
     * @returns {Object|null} Object with frontmatter and body
     */
    static parseFrontmatter(content) {
        const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
        const match = content.match(frontmatterRegex);
        
        if (!match) {
            // No frontmatter found, treat entire content as body
            return {
                frontmatter: {},
                body: content
            };
        }
        
        try {
            const frontmatter = jsyaml.load(match[1]) || {};
            const body = match[2] || '';
            
            return { frontmatter, body };
        } catch (error) {
            console.error('Error parsing YAML frontmatter:', error);
            return {
                frontmatter: {},
                body: content
            };
        }
    }
    
    /**
     * Parse tags from various formats
     * @param {string|Array} tags - Tags in string or array format
     * @returns {Array} Array of tag strings
     */
    static parseTags(tags) {
        if (!tags) return [];
        
        if (Array.isArray(tags)) {
            return tags.map(tag => String(tag).trim());
        }
        
        if (typeof tags === 'string') {
            return tags.split(',').map(tag => tag.trim()).filter(tag => tag);
        }
        
        return [];
    }
    
    /**
     * Generate markdown content from technology object
     * @param {Object} tech - Technology object
     * @returns {string} Markdown content with frontmatter
     */
    static serialize(tech) {
        const frontmatter = {
            name: tech.name,
            ring: tech.ring,
            quadrant: tech.quadrant,
            tags: tech.tags || [],
            date: tech.date || new Date().toISOString().split('T')[0],
            featured: tech.featured || false
        };
        
        if (tech.draft) {
            frontmatter.draft = true;
        }
        
        const yamlContent = jsyaml.dump(frontmatter, {
            indent: 2,
            lineWidth: -1,
            noRefs: true
        });
        
        const body = tech.rawContent || tech.content || '';
        
        return `---\n${yamlContent}---\n\n${body}`;
    }
    
    /**
     * Generate a filename from technology name
     * @param {string} name - Technology name
     * @param {string} quadrant - Quadrant name
     * @returns {string} Filename
     */
    static generateFilename(name, quadrant) {
        const slug = name
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();
        
        return `${quadrant}/${slug}.md`;
    }
    
    /**
     * Validate technology object
     * @param {Object} tech - Technology object
     * @returns {Object} Validation result
     */
    static validate(tech) {
        const errors = [];
        const warnings = [];
        
        // Required fields
        if (!tech.name || tech.name.trim() === '') {
            errors.push('Name is required');
        }
        
        // Validate ring
        const validRings = ['adopt', 'trial', 'assess', 'hold'];
        if (!validRings.includes(tech.ring)) {
            errors.push(`Invalid ring: ${tech.ring}. Must be one of: ${validRings.join(', ')}`);
        }
        
        // Validate quadrant
        const validQuadrants = ['techniques', 'tools', 'platforms', 'languages-frameworks'];
        if (!validQuadrants.includes(tech.quadrant)) {
            errors.push(`Invalid quadrant: ${tech.quadrant}. Must be one of: ${validQuadrants.join(', ')}`);
        }
        
        // Warnings
        if (!tech.content || tech.content.trim() === '') {
            warnings.push('Content is empty');
        }
        
        if (!tech.tags || tech.tags.length === 0) {
            warnings.push('No tags specified');
        }
        
        if (!tech.date) {
            warnings.push('No date specified');
        }
        
        return {
            valid: errors.length === 0,
            errors,
            warnings
        };
    }
    
    /**
     * Extract metadata for search indexing
     * @param {Object} tech - Technology object
     * @returns {string} Searchable text
     */
    static extractSearchText(tech) {
        const parts = [
            tech.name,
            tech.organization,
            tech.quadrant,
            tech.ring,
            ...(tech.tags || []),
            tech.rawContent || ''
        ];
        return parts.join(' ').toLowerCase();
    }
    
    /**
     * Generate a template for new technology
     * @param {Object} defaults - Default values
     * @returns {string} Markdown template
     */
    static generateTemplate(defaults = {}) {
        const name = defaults.name || 'Technology Name';
        const ring = defaults.ring || 'assess';
        const quadrant = defaults.quadrant || 'techniques';
        const tags = defaults.tags || ['tag1', 'tag2'];
        const date = new Date().toISOString().split('T')[0];
        
        return `---
name: "${name}"
ring: "${ring}"
quadrant: "${quadrant}"
tags: ${JSON.stringify(tags)}
date: "${date}"
featured: false
---

# ${name}

## Overview
Brief description of the technology and what it does.

## Key Benefits
- Benefit 1
- Benefit 2
- Benefit 3

## When to Use
Describe ideal use cases and scenarios where this technology excels.

## Considerations
- Consideration 1
- Consideration 2
- Important limitations or challenges

## Recommended Tools
List complementary tools, libraries, or frameworks.

## Resources
- [Documentation](https://example.com)
- [Tutorial](https://example.com)
- [GitHub](https://example.com)

## Status
**Ring: ${ring.toUpperCase()}** - Brief justification for this ring placement

## Last Updated
${date}
`;
    }
}

// Configure marked options for better rendering
if (typeof marked !== 'undefined') {
    marked.setOptions({
        breaks: true,
        gfm: true,
        headerIds: true,
        mangle: false,
        sanitize: false,
        smartLists: true,
        smartypants: true
    });
}
