#!/usr/bin/env python3
"""
Update the radar-data manifest.json file with all markdown files.
This ensures Cloudflare Pages deployment works correctly.
"""

import os
import json
from pathlib import Path

def update_manifest():
    """Generate manifest.json from radar-data directory structure."""
    radar_data_dir = Path(__file__).parent / 'radar-data'
    manifest = {}
    
    # Scan each quadrant directory
    quadrants = ['models', 'platforms', 'techniques', 'tools']
    
    for quadrant in quadrants:
        quadrant_dir = radar_data_dir / quadrant
        if quadrant_dir.exists():
            # Find all .md files
            md_files = sorted([
                f.name for f in quadrant_dir.glob('*.md')
                if f.is_file() and not f.name.startswith('.')
            ])
            manifest[quadrant] = md_files
            print(f"✓ {quadrant}: {len(md_files)} files")
    
    # Write manifest.json
    manifest_path = radar_data_dir / 'manifest.json'
    with open(manifest_path, 'w', encoding='utf-8') as f:
        json.dump(manifest, f, indent=2, ensure_ascii=False)
    
    total_files = sum(len(files) for files in manifest.values())
    print(f"\n✅ Manifest updated: {total_files} total files")
    print(f"📝 Written to: {manifest_path}")

if __name__ == '__main__':
    update_manifest()
