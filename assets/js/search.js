// Site Search functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.querySelector('.search-btn');
    
    if (!searchInput) return;
    
    let searchIndex = [];
    let searchResults = null;
    
    // Initialize search
    initializeSearch();
    
    function initializeSearch() {
        // Build search index when page loads
        buildSearchIndex();
        
        // Bind events
        searchInput.addEventListener('input', AppUtils.debounce(handleSearch, 300));
        searchInput.addEventListener('keydown', handleKeydown);
        searchInput.addEventListener('focus', showSearchResults);
        
        if (searchBtn) {
            searchBtn.addEventListener('click', performSearch);
        }
        
        // Close search results when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.search-container')) {
                hideSearchResults();
            }
        });
    }
    
    function buildSearchIndex() {
        // Get all searchable content from the current page
        const searchableElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, .content, .feature-card, .stat-description');
        
        searchIndex = [];
        
        searchableElements.forEach((element, index) => {
            const text = element.textContent.trim();
            if (text.length > 0) {
                searchIndex.push({
                    id: index,
                    title: getElementTitle(element),
                    content: text,
                    element: element,
                    url: window.location.href,
                    type: getElementType(element)
                });
            }
        });
        
        // Add static page content to index
        addStaticPagesToIndex();
    }
    
    function addStaticPagesToIndex() {
        const staticPages = [
            {
                title: 'About Us',
                content: 'MissionsPerformance.org evaluating diplomatic efforts Permanent Missions United Nations voting influence gender parity co-sponsorship resolutions engagement improvement diplomatic practice showcase work 193 member states motivating increase contribution global multilateralism respect UN Charter enhance efficiency United Nations create better world',
                url: 'about-us.html',
                type: 'page'
            },
            {
                title: 'Our Team',
                content: 'team members staff researchers analysts diplomatic experts United Nations specialists',
                url: 'our-team.html',
                type: 'page'
            },
            {
                title: 'Contact',
                content: 'contact us get in touch email phone address office location support help inquiry',
                url: 'contact.html',
                type: 'page'
            },
            {
                title: 'Come Join Us',
                content: 'join team careers opportunities work with us volunteer participate contribute',
                url: 'join-us.html',
                type: 'page'
            },
            {
                title: 'Resources',
                content: 'resources documents reports research data statistics UN Charter information links',
                url: 'resources.html',
                type: 'page'
            },
            {
                title: 'Sign Up',
                content: 'sign up register newsletter updates subscription membership account',
                url: 'signup.html',
                type: 'page'
            },
            {
                title: 'Thematic and General Issues',
                content: 'thematic issues general issues topics subjects areas focus research analysis',
                url: 'thematic-issues.html',
                type: 'page'
            },
            {
                title: 'Countries and Regional Groups',
                content: 'countries regional groups nations states regions geographic areas analysis',
                url: 'countries-regions.html',
                type: 'page'
            },
            {
                title: 'Reports',
                content: 'reports analysis studies research findings data publications documents',
                url: 'reports.html',
                type: 'page'
            },
            {
                title: 'How can the United Nations Improve?',
                content: 'UN improvement suggestions recommendations feedback reform enhancement effectiveness',
                url: 'improve-un.html',
                type: 'page'
            },
            {
                title: 'Donate',
                content: 'donate support contribution funding help financial assistance',
                url: 'donate.html',
                type: 'page'
            }
        ];
        
        staticPages.forEach((page, index) => {
            searchIndex.push({
                id: searchIndex.length + index,
                title: page.title,
                content: page.content,
                url: page.url,
                type: page.type
            });
        });
    }
    
    function getElementTitle(element) {
        // Try to find a meaningful title for the element
        if (element.tagName.match(/^H[1-6]$/)) {
            return element.textContent.trim();
        }
        
        // Look for a parent with a heading
        let parent = element.parentElement;
        while (parent) {
            const heading = parent.querySelector('h1, h2, h3, h4, h5, h6');
            if (heading) {
                return heading.textContent.trim();
            }
            parent = parent.parentElement;
        }
        
        // Look for nearby headings
        const previousHeading = findPreviousHeading(element);
        if (previousHeading) {
            return previousHeading.textContent.trim();
        }
        
        return 'Page Content';
    }
    
    function findPreviousHeading(element) {
        let current = element.previousElementSibling;
        while (current) {
            if (current.tagName.match(/^H[1-6]$/)) {
                return current;
            }
            current = current.previousElementSibling;
        }
        return null;
    }
    
    function getElementType(element) {
        if (element.tagName.match(/^H[1-6]$/)) {
            return 'heading';
        }
        if (element.classList.contains('feature-card')) {
            return 'feature';
        }
        if (element.classList.contains('stat-description')) {
            return 'statistic';
        }
        return 'content';
    }
    
    function handleSearch(event) {
        const query = event.target.value.trim().toLowerCase();
        
        if (query.length < 2) {
            hideSearchResults();
            return;
        }
        
        const results = performSearchQuery(query);
        displaySearchResults(results, query);
    }
    
    function handleKeydown(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            performSearch();
        } else if (event.key === 'Escape') {
            hideSearchResults();
            searchInput.blur();
        } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            navigateSearchResults(event.key === 'ArrowDown' ? 1 : -1);
        }
    }
    
    function performSearchQuery(query) {
        const words = query.split(/\s+/).filter(word => word.length > 1);
        const results = [];
        
        searchIndex.forEach(item => {
            let score = 0;
            const titleLower = item.title.toLowerCase();
            const contentLower = item.content.toLowerCase();
            
            words.forEach(word => {
                // Higher score for title matches
                if (titleLower.includes(word)) {
                    score += titleLower === word ? 10 : 5;
                }
                
                // Lower score for content matches
                if (contentLower.includes(word)) {
                    score += 1;
                }
            });
            
            if (score > 0) {
                const snippet = generateSnippet(item.content, words);
                results.push({
                    ...item,
                    score,
                    snippet
                });
            }
        });
        
        // Sort by score (highest first) and limit results
        return results.sort((a, b) => b.score - a.score).slice(0, 8);
    }
    
    function generateSnippet(content, words) {
        const maxLength = 120;
        let snippet = content;
        
        // Find the first occurrence of any search word
        let firstIndex = content.length;
        words.forEach(word => {
            const index = content.toLowerCase().indexOf(word.toLowerCase());
            if (index !== -1 && index < firstIndex) {
                firstIndex = index;
            }
        });
        
        if (firstIndex < content.length) {
            const start = Math.max(0, firstIndex - 30);
            const end = Math.min(content.length, start + maxLength);
            snippet = content.substring(start, end);
            
            if (start > 0) snippet = '...' + snippet;
            if (end < content.length) snippet = snippet + '...';
        } else if (content.length > maxLength) {
            snippet = content.substring(0, maxLength) + '...';
        }
        
        // Highlight search terms
        words.forEach(word => {
            const regex = new RegExp(`(${word})`, 'gi');
            snippet = snippet.replace(regex, '<mark>$1</mark>');
        });
        
        return snippet;
    }
    
    function displaySearchResults(results, query) {
        if (!searchResults) {
            createSearchResultsContainer();
        }
        
        if (results.length === 0) {
            searchResults.innerHTML = '<div class="no-results">No results found</div>';
        } else {
            const resultsHTML = results.map((result, index) => `
                <div class="search-result-item" data-index="${index}" data-url="${result.url || '#'}">
                    <div class="search-result-title">${result.title}</div>
                    <div class="search-result-snippet">${result.snippet}</div>
                </div>
            `).join('');
            
            searchResults.innerHTML = resultsHTML;
            
            // Bind click events to results
            searchResults.querySelectorAll('.search-result-item').forEach(item => {
                item.addEventListener('click', function() {
                    const url = this.dataset.url;
                    if (url && url !== '#') {
                        window.location.href = url;
                    } else if (result.element) {
                        // Scroll to element on current page
                        result.element.scrollIntoView({ behavior: 'smooth' });
                        hideSearchResults();
                        searchInput.blur();
                    }
                });
            });
        }
        
        showSearchResults();
    }
    
    function createSearchResultsContainer() {
        searchResults = document.createElement('div');
        searchResults.className = 'search-results';
        searchResults.style.display = 'none';
        
        const searchContainer = searchInput.closest('.search-container');
        if (searchContainer) {
            searchContainer.style.position = 'relative';
            searchContainer.appendChild(searchResults);
        }
    }
    
    function showSearchResults() {
        if (searchResults) {
            searchResults.style.display = 'block';
        }
    }
    
    function hideSearchResults() {
        if (searchResults) {
            searchResults.style.display = 'none';
        }
    }
    
    function navigateSearchResults(direction) {
        if (!searchResults || searchResults.style.display === 'none') return;
        
        const items = searchResults.querySelectorAll('.search-result-item');
        if (items.length === 0) return;
        
        const currentActive = searchResults.querySelector('.search-result-item.active');
        let newIndex = 0;
        
        if (currentActive) {
            const currentIndex = parseInt(currentActive.dataset.index);
            newIndex = currentIndex + direction;
            currentActive.classList.remove('active');
        }
        
        // Wrap around
        if (newIndex < 0) newIndex = items.length - 1;
        if (newIndex >= items.length) newIndex = 0;
        
        items[newIndex].classList.add('active');
        items[newIndex].scrollIntoView({ block: 'nearest' });
    }
    
    function performSearch() {
        const query = searchInput.value.trim();
        if (query.length < 2) return;
        
        const results = performSearchQuery(query.toLowerCase());
        
        if (results.length > 0) {
            const firstResult = results[0];
            if (firstResult.url && firstResult.url !== window.location.pathname) {
                window.location.href = firstResult.url;
            } else if (firstResult.element) {
                firstResult.element.scrollIntoView({ behavior: 'smooth' });
                hideSearchResults();
                searchInput.blur();
            }
        }
    }
    
    // Public API
    window.SiteSearch = {
        search: performSearchQuery,
        buildIndex: buildSearchIndex
    };
});
