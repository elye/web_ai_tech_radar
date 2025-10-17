#!/usr/bin/env python3
"""Generate sample-data.js from markdown files"""

import os
import json
from pathlib import Path

def read_markdown_file(filepath):
    """Read a markdown file and return its content"""
    with open(filepath, 'r', encoding='utf-8') as f:
        return f.read()

def generate_sample_data():
    """Generate SAMPLE_DATA array from radar-data directory"""
    
    radar_data_dir = Path('radar-data')
    entries = []
    
    # Walk through all subdirectories
    for quadrant_dir in sorted(radar_data_dir.iterdir()):
        if not quadrant_dir.is_dir():
            continue
            
        # Get all .md files in this quadrant
        md_files = sorted(quadrant_dir.glob('*.md'))
        
        for md_file in md_files:
            content = read_markdown_file(md_file)
            filename = md_file.name
            
            entries.append({
                'name': filename,
                'content': content
            })
    
    return entries

def main():
    entries = generate_sample_data()
    
    # Generate JavaScript file
    js_content = """/**
 * Sample data for AI Technology Radar
 * Auto-generated from radar-data/ markdown files
 */

const SAMPLE_DATA = [
"""
    
    for i, entry in enumerate(entries):
        # Escape backticks and backslashes in content
        content = entry['content'].replace('\\', '\\\\').replace('`', '\\`').replace('${', '\\${')
        
        js_content += f"""    {{
        name: "{entry['name']}",
        content: `{content}`
    }}"""
        
        if i < len(entries) - 1:
            js_content += ","
        js_content += "\n"
    
    js_content += """];

// Export for use in app
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SAMPLE_DATA };
}
"""
    
    # Write to file
    with open('sample-data.js', 'w', encoding='utf-8') as f:
        f.write(js_content)
    
    print(f"✅ Generated sample-data.js with {len(entries)} entries")
    print(f"   File size: {len(js_content) / 1024:.1f} KB")

if __name__ == '__main__':
    main()
