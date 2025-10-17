/**
 * AI Technology Radar - Main Application
 * A markdown-based technology radar visualization tool
 */

class TechnologyRadar {
    constructor() {
        this.technologies = [];
        this.filteredTechnologies = [];
        this.selectedTech = null;
        this.adminMode = false;
        this.theme = 'light';
        this.filters = {
            search: '',
            quadrant: '',
            ring: '',
            featured: false
        };
        
        // Storage key for local data
        this.STORAGE_KEY = 'ai-tech-radar-data';
        
        this.init();
    }
    
    async init() {
        // Load sample data or from localStorage
        await this.loadData();
        
        // Show the app first so container has dimensions
        document.getElementById('app').style.display = 'none';
        document.getElementById('navbar').style.display = 'flex';
        document.getElementById('mainContainer').style.display = 'flex';
        document.getElementById('footer').style.display = 'block';
        
        // Initialize UI
        this.setupEventListeners();
        this.setupKeyboardShortcuts();
        this.loadTheme();
        
        // Render after UI is visible (so container has dimensions)
        setTimeout(() => {
            this.renderRadar();
            this.updateStats();
        }, 0);
    }
    
    async loadData() {
        // Try to load from localStorage first
        const stored = localStorage.getItem(this.STORAGE_KEY);
        
        if (stored) {
            try {
                const data = JSON.parse(stored);
                this.technologies = data.technologies || [];
            } catch (error) {
                console.error('Error loading from localStorage:', error);
                await this.loadSampleData();
            }
        } else {
            await this.loadSampleData();
        }
        
        this.filteredTechnologies = [...this.technologies];
    }
    
    async loadSampleData() {
        // Sample data embedded in the app
        const sampleFiles = this.getSampleData();
        
        this.technologies = sampleFiles.map(file => {
            try {
                return MarkdownParser.parse(file.content);
            } catch (error) {
                console.error(`Error parsing ${file.name}:`, error);
                return null;
            }
        }).filter(tech => tech && !tech.draft);
        
        // Save to localStorage
        this.saveData();
    }
    
    saveData() {
        const data = {
            technologies: this.technologies,
            lastUpdated: new Date().toISOString()
        };
        
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    }
    
    setupEventListeners() {
        // Search
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.filters.search = e.target.value.toLowerCase();
            this.applyFilters();
        });
        
        // Filters
        document.getElementById('quadrantFilter').addEventListener('change', (e) => {
            this.filters.quadrant = e.target.value;
            this.applyFilters();
        });
        
        document.getElementById('ringFilter').addEventListener('change', (e) => {
            this.filters.ring = e.target.value;
            this.applyFilters();
        });
        
        document.getElementById('featuredFilter').addEventListener('click', (e) => {
            this.filters.featured = !this.filters.featured;
            e.target.classList.toggle('active');
            this.applyFilters();
        });
        
        // Theme toggle
        document.getElementById('themeToggle').addEventListener('click', () => {
            this.toggleTheme();
        });
        
        // Admin mode
        document.getElementById('adminToggle').addEventListener('click', () => {
            this.toggleAdminMode();
        });
        
        // Help button
        document.getElementById('helpButton').addEventListener('click', () => {
            this.showHelp();
        });
        
        // Panel close
        document.getElementById('closePanel').addEventListener('click', () => {
            this.closePanel();
        });
        
        // FAB - Add new technology
        document.getElementById('fabAdd').addEventListener('click', () => {
            this.showAddTechnologyModal();
        });
        
        // Modal close
        document.getElementById('closeModal').addEventListener('click', () => {
            this.closeModal();
        });
        
        document.querySelectorAll('.close-help').forEach(btn => {
            btn.addEventListener('click', () => {
                document.getElementById('helpModal').classList.remove('active');
            });
        });
        
        // Form handlers
        document.getElementById('techForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveTechnology();
        });
        
        document.getElementById('cancelForm').addEventListener('click', () => {
            this.closeModal();
        });
        
        // Edit/Delete buttons
        document.getElementById('editButton').addEventListener('click', () => {
            this.editTechnology(this.selectedTech);
        });
        
        document.getElementById('deleteButton').addEventListener('click', () => {
            this.deleteTechnology(this.selectedTech);
        });
        
        // Export/Import
        document.getElementById('exportData').addEventListener('click', () => {
            this.exportData();
        });
        
        document.getElementById('importData').addEventListener('click', () => {
            document.getElementById('fileInput').click();
        });
        
        document.getElementById('fileInput').addEventListener('change', (e) => {
            this.importData(e.target.files);
        });
        
        // Click outside modal to close
        document.getElementById('modal').addEventListener('click', (e) => {
            if (e.target.id === 'modal') {
                this.closeModal();
            }
        });
        
        document.getElementById('helpModal').addEventListener('click', (e) => {
            if (e.target.id === 'helpModal') {
                document.getElementById('helpModal').classList.remove('active');
            }
        });
    }
    
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ignore if typing in input
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                if (e.key === 'Escape') {
                    e.target.blur();
                }
                return;
            }
            
            switch (e.key) {
                case '?':
                    this.showHelp();
                    break;
                case '/':
                    e.preventDefault();
                    document.getElementById('searchInput').focus();
                    break;
                case 'Escape':
                    this.closePanel();
                    this.closeModal();
                    document.getElementById('helpModal').classList.remove('active');
                    break;
                case 'a':
                case 'A':
                    this.toggleAdminMode();
                    break;
                case 't':
                case 'T':
                    this.toggleTheme();
                    break;
                case 'n':
                case 'N':
                    if (this.adminMode) {
                        this.showAddTechnologyModal();
                    }
                    break;
            }
        });
    }
    
    applyFilters() {
        this.filteredTechnologies = this.technologies.filter(tech => {
            // Search filter - only apply if search text exists
            if (this.filters.search && this.filters.search.trim()) {
                const searchText = MarkdownParser.extractSearchText(tech);
                if (!searchText.includes(this.filters.search)) {
                    return false;
                }
            }
            
            // Quadrant filter - only apply if a specific quadrant is selected
            if (this.filters.quadrant && this.filters.quadrant.trim() && tech.quadrant !== this.filters.quadrant) {
                return false;
            }
            
            // Ring filter - only apply if a specific ring is selected
            if (this.filters.ring && this.filters.ring.trim() && tech.ring !== this.filters.ring) {
                return false;
            }
            
            // Featured filter - only apply if featured is explicitly enabled
            if (this.filters.featured && !tech.featured) {
                return false;
            }
            
            return true;
        });
        
        this.renderRadar();
    }
    
    renderRadar() {
        const container = document.getElementById('radarChart');
        if (!container) {
            console.error('radarChart container not found!');
            return;
        }
        
        container.innerHTML = '';
        
        const width = container.clientWidth;
        const height = container.clientHeight;
        
        // Handle zero dimensions (container not yet visible)
        if (width === 0 || height === 0) {
            setTimeout(() => this.renderRadar(), 100);
            return;
        }
        
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(width, height) / 2 - 50;
        
        const svg = d3.select(container)
            .append('svg')
            .attr('width', width)
            .attr('height', height);
        
        const g = svg.append('g')
            .attr('transform', `translate(${centerX},${centerY})`);
        
        // Draw rings
        const rings = ['adopt', 'trial', 'assess', 'hold'];
        const ringColors = {
            'adopt': 'var(--ring-adopt)',
            'trial': 'var(--ring-trial)',
            'assess': 'var(--ring-assess)',
            'hold': 'var(--ring-hold)'
        };
        
        rings.forEach((ring, i) => {
            const ringRadius = radius * (i + 1) / 4;
            g.append('circle')
                .attr('cx', 0)
                .attr('cy', 0)
                .attr('r', ringRadius)
                .attr('fill', 'none')
                .attr('stroke', ringColors[ring])
                .attr('stroke-width', 2)
                .attr('opacity', 0.3);
        });
        
        // Draw quadrant lines
        g.append('line')
            .attr('x1', -radius)
            .attr('y1', 0)
            .attr('x2', radius)
            .attr('y2', 0)
            .attr('stroke', 'var(--border-color)')
            .attr('stroke-width', 2);
        
        g.append('line')
            .attr('x1', 0)
            .attr('y1', -radius)
            .attr('x2', 0)
            .attr('y2', radius)
            .attr('stroke', 'var(--border-color)')
            .attr('stroke-width', 2);
        
        // Add quadrant labels
        const quadrantLabels = {
            'techniques': { x: radius / 2, y: -radius / 2, label: 'TECHNIQUES' },
            'tools': { x: -radius / 2, y: -radius / 2, label: 'TOOLS' },
            'platforms': { x: -radius / 2, y: radius / 2, label: 'PLATFORMS' },
            'languages-frameworks': { x: radius / 2, y: radius / 2, label: 'LANGUAGES & FRAMEWORKS' }
        };
        
        Object.entries(quadrantLabels).forEach(([key, pos]) => {
            g.append('text')
                .attr('x', pos.x)
                .attr('y', pos.y)
                .attr('class', 'quadrant-label')
                .text(pos.label);
        });
        
        // Plot blips
        this.filteredTechnologies.forEach((tech, index) => {
            const position = this.calculateBlipPosition(tech, radius);
            
            const blipGroup = g.append('g')
                .attr('class', 'blip blip-enter')
                .attr('transform', `translate(${position.x},${position.y})`)
                .style('cursor', 'pointer')
                .on('click', () => this.showTechnologyDetails(tech))
                .on('mouseenter', function(event) {
                    // Grow the blip on hover
                    d3.select(this).select('circle')
                        .transition()
                        .duration(200)
                        .attr('r', tech.featured ? 16 : 14);
                })
                .on('mouseleave', function(event) {
                    // Shrink back to normal size
                    d3.select(this).select('circle')
                        .transition()
                        .duration(200)
                        .attr('r', tech.featured ? 12 : 10);
                });
            
            // Draw blip circle
            blipGroup.append('circle')
                .attr('r', tech.featured ? 12 : 10)
                .attr('fill', ringColors[tech.ring])
                .attr('opacity', 0.8);
            
            // Add number or icon
            if (tech.featured) {
                blipGroup.append('text')
                    .attr('class', 'blip-number')
                    .attr('dy', '0.35em')
                    .text('⭐')
                    .style('font-size', '16px');
            } else {
                blipGroup.append('text')
                    .attr('class', 'blip-number')
                    .attr('dy', '0.35em')
                    .text(index + 1);
            }
        });
    }
    
    calculateBlipPosition(tech, radius) {
        // Quadrant angles
        const quadrantAngles = {
            'techniques': { start: 0, end: 90 },
            'tools': { start: 90, end: 180 },
            'platforms': { start: 180, end: 270 },
            'languages-frameworks': { start: 270, end: 360 }
        };
        
        // Ring radii
        const ringRadii = {
            'adopt': { min: 0, max: radius * 0.25 },
            'trial': { min: radius * 0.25, max: radius * 0.5 },
            'assess': { min: radius * 0.5, max: radius * 0.75 },
            'hold': { min: radius * 0.75, max: radius }
        };
        
        const quadrant = quadrantAngles[tech.quadrant] || quadrantAngles.techniques;
        const ring = ringRadii[tech.ring] || ringRadii.assess;
        
        // Generate semi-random but consistent position
        const hash = this.hashCode(tech.name);
        const angle = quadrant.start + (hash % (quadrant.end - quadrant.start));
        const r = ring.min + ((hash * 13) % (ring.max - ring.min));
        
        const rad = (angle * Math.PI) / 180;
        const x = r * Math.cos(rad);
        const y = r * Math.sin(rad);
        
        return { x, y };
    }
    
    hashCode(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return Math.abs(hash);
    }
    
    showTechnologyDetails(tech) {
        this.selectedTech = tech;
        
        const panel = document.getElementById('sidePanel');
        const content = document.getElementById('panelContent');
        const title = document.getElementById('panelTitle');
        const actions = document.getElementById('panelActions');
        
        title.textContent = tech.name;
        
        // Build metadata badges
        const metadata = `
            <div class="tech-metadata">
                <span class="tech-badge badge-ring ${tech.ring}">${tech.ring.toUpperCase()}</span>
                <span class="tech-badge badge-tag">${this.formatQuadrant(tech.quadrant)}</span>
                ${tech.featured ? '<span class="tech-badge badge-featured">⭐ Featured</span>' : ''}
                <span class="tech-badge badge-date">📅 ${tech.date}</span>
                ${tech.tags.map(tag => `<span class="tech-badge badge-tag">#${tag}</span>`).join('')}
            </div>
        `;
        
        content.innerHTML = metadata + tech.content;
        
        // Show/hide action buttons based on admin mode
        if (this.adminMode) {
            actions.style.display = 'flex';
        } else {
            actions.style.display = 'none';
        }
        
        panel.classList.remove('collapsed');
    }
    
    closePanel() {
        document.getElementById('sidePanel').classList.add('collapsed');
        this.selectedTech = null;
    }
    
    showTooltip(event, tech) {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = tech.name;
        tooltip.style.left = event.pageX + 10 + 'px';
        tooltip.style.top = event.pageY + 10 + 'px';
        tooltip.id = 'blip-tooltip';
        document.body.appendChild(tooltip);
    }
    
    hideTooltip() {
        const tooltip = document.getElementById('blip-tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    }
    
    showAddTechnologyModal() {
        document.getElementById('modalTitle').textContent = 'Add Technology';
        document.getElementById('techForm').reset();
        document.getElementById('modal').classList.add('active');
        
        // Pre-fill with template
        const template = MarkdownParser.generateTemplate();
        const parsed = MarkdownParser.parse(template);
        document.getElementById('techContent').value = parsed.rawContent;
    }
    
    editTechnology(tech) {
        if (!tech) return;
        
        document.getElementById('modalTitle').textContent = 'Edit Technology';
        document.getElementById('techName').value = tech.name;
        document.getElementById('techQuadrant').value = tech.quadrant;
        document.getElementById('techRing').value = tech.ring;
        document.getElementById('techTags').value = tech.tags.join(', ');
        document.getElementById('techFeatured').checked = tech.featured;
        document.getElementById('techContent').value = tech.rawContent || '';
        
        document.getElementById('modal').classList.add('active');
    }
    
    saveTechnology() {
        const name = document.getElementById('techName').value.trim();
        const quadrant = document.getElementById('techQuadrant').value;
        const ring = document.getElementById('techRing').value;
        const tags = document.getElementById('techTags').value.split(',').map(t => t.trim()).filter(t => t);
        const featured = document.getElementById('techFeatured').checked;
        const content = document.getElementById('techContent').value;
        
        if (!name) {
            alert('Please enter a technology name');
            return;
        }
        
        const tech = {
            name,
            quadrant,
            ring,
            tags,
            featured,
            rawContent: content,
            date: new Date().toISOString().split('T')[0]
        };
        
        // Parse the content to get HTML
        const fullMarkdown = MarkdownParser.serialize(tech);
        const parsed = MarkdownParser.parse(fullMarkdown);
        
        // Check if editing existing or adding new
        const existingIndex = this.technologies.findIndex(t => t.name === this.selectedTech?.name);
        
        if (existingIndex >= 0) {
            // Update existing
            this.technologies[existingIndex] = parsed;
        } else {
            // Add new
            this.technologies.push(parsed);
        }
        
        this.saveData();
        this.applyFilters();
        this.closeModal();
        this.updateStats();
        
        // Show success message
        this.showNotification('Technology saved successfully!');
    }
    
    deleteTechnology(tech) {
        if (!tech) return;
        
        if (!confirm(`Are you sure you want to delete "${tech.name}"?`)) {
            return;
        }
        
        const index = this.technologies.findIndex(t => t.name === tech.name);
        if (index >= 0) {
            this.technologies.splice(index, 1);
            this.saveData();
            this.applyFilters();
            this.closePanel();
            this.updateStats();
            
            this.showNotification('Technology deleted successfully!');
        }
    }
    
    closeModal() {
        document.getElementById('modal').classList.remove('active');
        this.selectedTech = null;
    }
    
    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', this.theme);
        document.getElementById('themeToggle').textContent = this.theme === 'light' ? '🌙' : '☀️';
        localStorage.setItem('theme', this.theme);
    }
    
    loadTheme() {
        const saved = localStorage.getItem('theme');
        if (saved) {
            this.theme = saved;
            document.documentElement.setAttribute('data-theme', this.theme);
            document.getElementById('themeToggle').textContent = this.theme === 'light' ? '🌙' : '☀️';
        }
    }
    
    toggleAdminMode() {
        this.adminMode = !this.adminMode;
        const fab = document.getElementById('fabAdd');
        const adminBtn = document.getElementById('adminToggle');
        
        if (this.adminMode) {
            fab.style.display = 'block';
            adminBtn.style.background = 'var(--ring-trial)';
            adminBtn.style.color = 'white';
            this.showNotification('Admin mode enabled');
        } else {
            fab.style.display = 'none';
            adminBtn.style.background = '';
            adminBtn.style.color = '';
            this.closePanel();
            this.showNotification('Admin mode disabled');
        }
    }
    
    showHelp() {
        document.getElementById('helpModal').classList.add('active');
    }
    
    updateStats() {
        const count = this.technologies.length;
        const lastUpdated = this.getLatestDate();
        
        document.getElementById('techCount').textContent = `${count} technologies`;
        document.getElementById('lastUpdated').textContent = `Last updated: ${lastUpdated}`;
    }
    
    getLatestDate() {
        if (this.technologies.length === 0) return 'N/A';
        
        const dates = this.technologies
            .map(t => new Date(t.date))
            .filter(d => !isNaN(d));
        
        if (dates.length === 0) return 'N/A';
        
        const latest = new Date(Math.max(...dates));
        return latest.toLocaleDateString();
    }
    
    formatQuadrant(quadrant) {
        return quadrant.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    }
    
    showNotification(message) {
        // Simple notification (could be enhanced with a toast library)
        const notification = document.createElement('div');
        notification.style.position = 'fixed';
        notification.style.top = '80px';
        notification.style.right = '20px';
        notification.style.background = 'var(--ring-trial)';
        notification.style.color = 'white';
        notification.style.padding = '1rem 2rem';
        notification.style.borderRadius = '8px';
        notification.style.boxShadow = 'var(--shadow-lg)';
        notification.style.zIndex = '1000';
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transition = 'opacity 0.3s';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    exportData() {
        const dataStr = JSON.stringify({
            technologies: this.technologies,
            exportDate: new Date().toISOString(),
            version: '1.0'
        }, null, 2);
        
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ai-tech-radar-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
        
        this.showNotification('Data exported successfully!');
    }
    
    async importData(files) {
        if (!files || files.length === 0) return;
        
        for (const file of files) {
            try {
                const content = await this.readFileContent(file);
                
                if (file.name.endsWith('.json')) {
                    const data = JSON.parse(content);
                    if (data.technologies) {
                        this.technologies = data.technologies;
                        this.saveData();
                        this.applyFilters();
                        this.updateStats();
                        this.showNotification('Data imported successfully!');
                    }
                } else if (file.name.endsWith('.md')) {
                    const tech = MarkdownParser.parse(content);
                    if (!tech.draft) {
                        this.technologies.push(tech);
                    }
                }
            } catch (error) {
                console.error('Error importing file:', error);
                alert(`Error importing ${file.name}: ${error.message}`);
            }
        }
        
        this.saveData();
        this.applyFilters();
        this.updateStats();
    }
    
    readFileContent(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = reject;
            reader.readAsText(file);
        });
    }
    
    getSampleData() {
        // This will be populated with sample markdown files
        return SAMPLE_DATA;
    }
}

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.radar = new TechnologyRadar();
});
