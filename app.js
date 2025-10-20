/**
 * AI Technology Radar - Main Application
 * A markdown-based technology radar visualization tool
 */

class TechnologyRadar {
    constructor() {
        this.technologies = [];
        this.filteredTechnologies = [];
        this.selectedTech = null;
        this.theme = 'light';
        this.showLabels = false;
        this.filters = {
            search: '',
            quadrant: '',
            ring: '',
            featured: false
        };
        
        this.init();
    }
    
    async init() {
        // Load markdown files directly from server
        await this.loadMarkdownFiles();
        
        // Ensure filteredTechnologies is set before rendering
        if (this.filteredTechnologies.length === 0 && this.technologies.length > 0) {
            this.filteredTechnologies = [...this.technologies];
        }
        
        console.log(`Init: ${this.technologies.length} total, ${this.filteredTechnologies.length} filtered`);
        
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
    
    async loadMarkdownFiles() {
        const technologies = [];
        
        console.log('🔍 Loading radar data from manifest...');
        
        try {
            // Fetch the manifest file that lists all markdown files
            const manifestResponse = await fetch('radar-data/manifest.json');
            const manifest = await manifestResponse.json();
            
            // Load all markdown files from each quadrant
            for (const [quadrant, filenames] of Object.entries(manifest)) {
                console.log(`  Loading ${filenames.length} files from ${quadrant}/`);
                
                // Load each markdown file
                for (const filename of filenames) {
                    try {
                        const fileResponse = await fetch(`radar-data/${quadrant}/${filename}`);
                        const content = await fileResponse.text();
                        const tech = MarkdownParser.parse(content);
                        
                        if (tech && !tech.draft) {
                            technologies.push(tech);
                        }
                    } catch (error) {
                        console.error(`  ⚠️  Error loading ${quadrant}/${filename}:`, error);
                    }
                }
            }
        } catch (error) {
            console.error('❌ Error loading manifest:', error);
        }
        
        this.technologies = technologies;
        this.filteredTechnologies = [...this.technologies];
        
        console.log(`✅ Loaded ${this.technologies.length} technologies total`);
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
        
        document.getElementById('costFilter').addEventListener('change', (e) => {
            this.filters.cost = e.target.value;
            this.applyFilters();
        });
        
        document.getElementById('featuredFilter').addEventListener('click', (e) => {
            this.filters.featured = !this.filters.featured;
            e.target.classList.toggle('active');
            this.applyFilters();
        });
        
        // Label toggle
        document.getElementById('labelToggle').addEventListener('click', (e) => {
            this.showLabels = !this.showLabels;
            e.target.classList.toggle('active');
            this.renderRadar();
        });
        
        // Theme toggle
        document.getElementById('themeToggle').addEventListener('click', () => {
            this.toggleTheme();
        });
        
        // Help button
        document.getElementById('helpButton').addEventListener('click', () => {
            this.showHelp();
        });
        
        // Panel close
        document.getElementById('closePanel').addEventListener('click', () => {
            this.closePanel();
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
                case 't':
                case 'T':
                    this.toggleTheme();
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
            
            // Quadrant filter - only apply if a specific quadrant is selected (not empty string)
            const quadrantFilter = this.filters.quadrant?.trim();
            if (quadrantFilter) {
                // Normalize both values to lowercase for case-insensitive comparison
                const techQuadrant = (tech.quadrant || '').toLowerCase();
                const filterQuadrant = quadrantFilter.toLowerCase();
                if (techQuadrant !== filterQuadrant) {
                    return false;
                }
            }
            
            // Ring filter - only apply if a specific ring is selected (not empty string)
            const ringFilter = this.filters.ring?.trim();
            if (ringFilter) {
                // Normalize both values to lowercase for case-insensitive comparison
                const techRing = (tech.ring || '').toLowerCase();
                const filterRing = ringFilter.toLowerCase();
                if (techRing !== filterRing) {
                    return false;
                }
            }
            
            // Cost filter - only apply if a specific cost type is selected (not empty string)
            const costFilter = this.filters.cost?.trim();
            if (costFilter) {
                // Normalize both values to lowercase for case-insensitive comparison
                const techCost = (tech.cost || '').toLowerCase();
                const filterCost = costFilter.toLowerCase();
                if (techCost !== filterCost) {
                    return false;
                }
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
            'models': { x: radius / 2, y: -radius / 2, label: 'MODELS' },
            'techniques': { x: -radius / 2, y: -radius / 2, label: 'TECHNIQUES' },
            'tools': { x: -radius / 2, y: radius / 2, label: 'TOOLS' },
            'platforms': { x: radius / 2, y: radius / 2, label: 'PLATFORMS' }
        };
        
        Object.entries(quadrantLabels).forEach(([key, pos]) => {
            g.append('text')
                .attr('x', pos.x)
                .attr('y', pos.y)
                .attr('class', 'quadrant-label')
                .text(pos.label);
        });
        
        // Plot blips
        console.log(`Rendering ${this.filteredTechnologies.length} blips...`);
        this.filteredTechnologies.forEach((tech, index) => {
            const position = this.calculateBlipPosition(tech, radius);
            
            const blipGroup = g.append('g')
                .attr('class', 'blip blip-enter')
                .attr('transform', `translate(${position.x},${position.y})`)
                .attr('data-x', position.x)
                .attr('data-y', position.y)
                .style('cursor', 'pointer')
                .on('click', () => this.showTechnologyDetails(tech))
                .on('mouseenter', function(event) {
                    const currentBlip = d3.select(this);
                    
                    // Create a duplicate group at the root level for the hover effect
                    const x = parseFloat(this.getAttribute('data-x'));
                    const y = parseFloat(this.getAttribute('data-y'));
                    
                    // Create hover group at parent level (will be on top)
                    const hoverGroup = d3.select(this.parentNode)
                        .append('g')
                        .attr('class', 'blip-hover-clone')
                        .attr('transform', `translate(${x},${y})`)
                        .style('pointer-events', 'none');
                    
                    // Clone the circle
                    hoverGroup.append('circle')
                        .attr('r', 16)
                        .attr('fill', ringColors[tech.ring])
                        .attr('opacity', 0.8);
                    
                    // Clone the number
                    hoverGroup.append('text')
                        .attr('class', 'blip-number')
                        .attr('dy', '0.35em')
                        .style('pointer-events', 'none')
                        .text(index + 1);
                    
                    // Hide original blip's static label if enabled
                    currentBlip.select('.blip-label').style('opacity', 0);
                    
                    // Hide original blip content (but keep it for mouse events)
                    currentBlip.select('circle').style('opacity', 0);
                    currentBlip.select('.blip-number').style('opacity', 0);
                    
                    // Add hover label
                    const hoverLabel = hoverGroup.append('g')
                        .attr('class', 'hover-label');
                    
                    const text = hoverLabel.append('text')
                        .attr('dy', '2.8em')
                        .attr('pointer-events', 'none')
                        .style('font-size', '13px')
                        .style('font-weight', 'bold')
                        .style('text-anchor', 'middle')
                        .style('fill', '#000')
                        .text(tech.name);
                    
                    const bbox = text.node().getBBox();
                    
                    hoverLabel.insert('rect', 'text')
                        .attr('x', bbox.x - 6)
                        .attr('y', bbox.y - 3)
                        .attr('width', bbox.width + 12)
                        .attr('height', bbox.height + 6)
                        .attr('rx', 4)
                        .attr('pointer-events', 'none')
                        .style('fill', 'white')
                        .style('stroke', ringColors[tech.ring])
                        .style('stroke-width', 2)
                        .style('opacity', 0.98);
                })
                .on('mouseleave', function(event) {
                    const currentBlip = d3.select(this);
                    
                    // Show static label again if labels are enabled
                    currentBlip.select('.blip-label').style('opacity', 1);
                    
                    // Show original blip content again
                    currentBlip.select('circle').style('opacity', 0.8);
                    currentBlip.select('.blip-number').style('opacity', 1);
                    
                    // Remove the hover clone
                    d3.select(this.parentNode).select('.blip-hover-clone').remove();
                });
            
            // Draw blip circle
            blipGroup.append('circle')
                .attr('r', 10)
                .attr('fill', ringColors[tech.ring])
                .attr('opacity', 0.8)
                .style('pointer-events', 'all');
            
            // Add number
            blipGroup.append('text')
                .attr('class', 'blip-number')
                .attr('dy', '0.35em')
                .attr('pointer-events', 'none')
                .text(index + 1);
            
            // Add label if enabled
            if (this.showLabels) {
                blipGroup.append('text')
                    .attr('class', 'blip-label')
                    .attr('dy', '1.8em')
                    .attr('pointer-events', 'none')
                    .text(tech.name)
                    .style('font-size', '11px')
                    .style('fill', 'var(--text-primary)')
                    .style('text-anchor', 'middle')
                    .style('font-weight', '500');
            }
        });
    }
    
    calculateBlipPosition(tech, radius) {
        // Quadrant angles (SVG coordinates: 0° = right, 90° = down, 180° = left, 270° = up)
        // Top-right quadrant: 270° to 360° (or -90° to 0°)
        // Top-left quadrant: 180° to 270°
        // Bottom-left quadrant: 90° to 180°
        // Bottom-right quadrant: 0° to 90°
        const quadrantAngles = {
            'models': { start: 270, end: 360 },      // Top-right: models
            'platforms': { start: 0, end: 90 },      // Bottom-right: platforms  
            'tools': { start: 90, end: 180 },        // Bottom-left: tools
            'techniques': { start: 180, end: 270 }   // Top-left: techniques
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
        

        // Build metadata badges, now including organization
        const costIcon = tech.cost === 'free' ? '💚' : tech.cost === 'freemium' ? '💙' : '💰';
        const costLabel = tech.cost ? tech.cost.charAt(0).toUpperCase() + tech.cost.slice(1) : 'Unknown';
        const metadata = `
            <div class="tech-metadata">
                <span class="tech-badge badge-ring ${tech.ring}">${tech.ring.toUpperCase()}</span>
                <span class="tech-badge badge-tag">${this.formatQuadrant(tech.quadrant)}</span>
                ${tech.organization ? `<span class="tech-badge badge-organization">🏢 ${tech.organization}</span>` : ''}
                ${tech.cost ? `<span class="tech-badge badge-cost badge-cost-${tech.cost}">${costIcon} ${costLabel}</span>` : ''}
                ${tech.featured ? '<span class="tech-badge badge-featured">⭐ Featured</span>' : ''}
                <span class="tech-badge badge-date">📅 ${tech.date}</span>
                ${tech.tags.map(tag => `<span class="tech-badge badge-tag">#${tag}</span>`).join('')}
            </div>
        `;

        content.innerHTML = metadata + tech.content;
        
        panel.classList.remove('collapsed');
    }
    
    closePanel() {
        document.getElementById('sidePanel').classList.add('collapsed');
        this.selectedTech = null;
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
}

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.radar = new TechnologyRadar();
});
