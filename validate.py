#!/usr/bin/env python3
"""
AI Technology Radar - Markdown File Validator

This script validates markdown files in the radar-data directory
to ensure they follow the correct format and contain all required fields.

Usage:
    python validate.py
    python validate.py --fix  # Auto-fix some common issues
"""

import os
import sys
import yaml
import re
from pathlib import Path
from datetime import datetime
from typing import Dict, List, Tuple

# Valid values for each field
VALID_RINGS = ['adopt', 'trial', 'assess', 'hold']
VALID_QUADRANTS = ['techniques', 'tools', 'platforms', 'languages-frameworks']

class Colors:
    """ANSI color codes for terminal output"""
    RED = '\033[91m'
    GREEN = '\033[92m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    RESET = '\033[0m'
    BOLD = '\033[1m'

def parse_markdown_file(filepath: Path) -> Tuple[Dict, str, List[str]]:
    """
    Parse a markdown file and extract frontmatter and content.
    
    Returns:
        Tuple of (frontmatter_dict, content_str, errors_list)
    """
    errors = []
    
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        errors.append(f"Failed to read file: {e}")
        return {}, "", errors
    
    # Extract frontmatter
    frontmatter_pattern = r'^---\s*\n(.*?)\n---\s*\n(.*)$'
    match = re.match(frontmatter_pattern, content, re.DOTALL)
    
    if not match:
        errors.append("No valid frontmatter found (should be between --- markers)")
        return {}, content, errors
    
    try:
        frontmatter = yaml.safe_load(match.group(1))
        body = match.group(2)
    except yaml.YAMLError as e:
        errors.append(f"Invalid YAML in frontmatter: {e}")
        return {}, "", errors
    
    if frontmatter is None:
        frontmatter = {}
    
    return frontmatter, body, errors

def validate_frontmatter(frontmatter: Dict, filepath: Path) -> List[str]:
    """Validate frontmatter fields."""
    errors = []
    warnings = []
    
    # Required fields
    if 'name' not in frontmatter or not frontmatter['name']:
        errors.append("Missing required field: 'name'")
    
    if 'ring' not in frontmatter:
        errors.append("Missing required field: 'ring'")
    elif frontmatter['ring'].lower() not in VALID_RINGS:
        errors.append(f"Invalid ring: '{frontmatter['ring']}'. Must be one of: {', '.join(VALID_RINGS)}")
    
    if 'quadrant' not in frontmatter:
        errors.append("Missing required field: 'quadrant'")
    elif frontmatter['quadrant'].lower() not in VALID_QUADRANTS:
        errors.append(f"Invalid quadrant: '{frontmatter['quadrant']}'. Must be one of: {', '.join(VALID_QUADRANTS)}")
    
    # Check quadrant matches directory
    expected_quadrant = filepath.parent.name
    if 'quadrant' in frontmatter and frontmatter['quadrant'] != expected_quadrant:
        warnings.append(f"Quadrant '{frontmatter['quadrant']}' doesn't match directory '{expected_quadrant}'")
    
    # Optional but recommended fields
    if 'tags' not in frontmatter or not frontmatter['tags']:
        warnings.append("Missing recommended field: 'tags'")
    elif not isinstance(frontmatter['tags'], list):
        errors.append("Field 'tags' must be an array")
    
    if 'date' not in frontmatter:
        warnings.append("Missing recommended field: 'date'")
    else:
        # Validate date format
        try:
            datetime.strptime(frontmatter['date'], '%Y-%m-%d')
        except ValueError:
            errors.append(f"Invalid date format: '{frontmatter['date']}'. Should be YYYY-MM-DD")
    
    if 'featured' not in frontmatter:
        warnings.append("Missing field: 'featured' (defaults to false)")
    elif not isinstance(frontmatter['featured'], bool):
        errors.append("Field 'featured' must be boolean (true/false)")
    
    return errors, warnings

def validate_content(content: str) -> List[str]:
    """Validate markdown content."""
    warnings = []
    
    if not content.strip():
        warnings.append("Content is empty")
        return warnings
    
    # Check for basic sections
    required_sections = ['## Overview', '## Key Benefits', '## When to Use']
    for section in required_sections:
        if section not in content:
            warnings.append(f"Missing recommended section: '{section}'")
    
    # Check for resources
    if '## Resources' not in content or '[' not in content:
        warnings.append("No resource links found")
    
    return warnings

def validate_file(filepath: Path, verbose: bool = False) -> Tuple[bool, List[str], List[str]]:
    """
    Validate a single markdown file.
    
    Returns:
        Tuple of (is_valid, errors, warnings)
    """
    frontmatter, content, parse_errors = parse_markdown_file(filepath)
    
    if parse_errors:
        return False, parse_errors, []
    
    fm_errors, fm_warnings = validate_frontmatter(frontmatter, filepath)
    content_warnings = validate_content(content)
    
    all_errors = fm_errors
    all_warnings = fm_warnings + content_warnings
    
    is_valid = len(all_errors) == 0
    
    return is_valid, all_errors, all_warnings

def find_markdown_files(base_path: Path) -> List[Path]:
    """Find all markdown files in the radar-data directory."""
    md_files = []
    
    for quadrant in VALID_QUADRANTS:
        quadrant_path = base_path / quadrant
        if quadrant_path.exists():
            md_files.extend(quadrant_path.glob('*.md'))
    
    return sorted(md_files)

def print_results(filepath: Path, is_valid: bool, errors: List[str], warnings: List[str]):
    """Print validation results with colors."""
    relative_path = filepath.relative_to(Path.cwd())
    
    if is_valid and not warnings:
        print(f"{Colors.GREEN}✓{Colors.RESET} {relative_path}")
    elif is_valid:
        print(f"{Colors.YELLOW}⚠{Colors.RESET} {relative_path}")
    else:
        print(f"{Colors.RED}✗{Colors.RESET} {relative_path}")
    
    for error in errors:
        print(f"  {Colors.RED}ERROR:{Colors.RESET} {error}")
    
    for warning in warnings:
        print(f"  {Colors.YELLOW}WARNING:{Colors.RESET} {warning}")

def main():
    """Main validation function."""
    print(f"\n{Colors.BOLD}AI Technology Radar - Markdown Validator{Colors.RESET}\n")
    
    # Find radar-data directory
    base_path = Path(__file__).parent / 'radar-data'
    
    if not base_path.exists():
        print(f"{Colors.RED}Error: radar-data directory not found{Colors.RESET}")
        sys.exit(1)
    
    # Find all markdown files
    md_files = find_markdown_files(base_path)
    
    if not md_files:
        print(f"{Colors.YELLOW}No markdown files found in radar-data/{Colors.RESET}")
        sys.exit(0)
    
    print(f"Found {len(md_files)} markdown files\n")
    
    # Validate each file
    total_valid = 0
    total_errors = 0
    total_warnings = 0
    
    for filepath in md_files:
        is_valid, errors, warnings = validate_file(filepath)
        print_results(filepath, is_valid, errors, warnings)
        
        if is_valid:
            total_valid += 1
        total_errors += len(errors)
        total_warnings += len(warnings)
    
    # Print summary
    print(f"\n{Colors.BOLD}Summary:{Colors.RESET}")
    print(f"  Total files: {len(md_files)}")
    print(f"  {Colors.GREEN}Valid: {total_valid}{Colors.RESET}")
    print(f"  {Colors.RED}With errors: {len(md_files) - total_valid}{Colors.RESET}")
    print(f"  Total errors: {total_errors}")
    print(f"  Total warnings: {total_warnings}")
    
    if total_errors > 0:
        print(f"\n{Colors.RED}Validation failed!{Colors.RESET}")
        sys.exit(1)
    elif total_warnings > 0:
        print(f"\n{Colors.YELLOW}Validation passed with warnings{Colors.RESET}")
        sys.exit(0)
    else:
        print(f"\n{Colors.GREEN}All files valid!{Colors.RESET}")
        sys.exit(0)

if __name__ == '__main__':
    main()
