document.addEventListener('DOMContentLoaded', () => {
    // --- Global State & Elements ---
    let allData = [];
    let representativesData = [];
    let filteredData = [];
    const ALL_METRICS = ['Female Count', 'Male Count', 'Total Count', 'Female Percent', 'Male Percent'];
    let plotlyListenerAttached = false;
    
    // --- Country Name to ISO Code Mapping ---
    const countryCodeMap = {
        'Afghanistan': 'af', 'Albania': 'al', 'Algeria': 'dz', 'Andorra': 'ad', 'Angola': 'ao',
        'Antigua and Barbuda': 'ag', 'Argentina': 'ar', 'Armenia': 'am', 'Australia': 'au', 'Austria': 'at',
        'Azerbaijan': 'az', 'Bahamas': 'bs', 'Bahrain': 'bh', 'Bangladesh': 'bd', 'Barbados': 'bb',
        'Belarus': 'by', 'Belgium': 'be', 'Belize': 'bz', 'Benin': 'bj', 'Bhutan': 'bt',
        'Bolivia (Plurinational State of)': 'bo', 'Bosnia and Herzegovina': 'ba', 'Botswana': 'bw',
        'Brazil': 'br', 'Brunei Darussalam': 'bn', 'Bulgaria': 'bg', 'Burkina Faso': 'bf', 'Burundi': 'bi',
        'Cabo Verde': 'cv', 'Cambodia': 'kh', 'Cameroon': 'cm', 'Canada': 'ca', 'Central African Republic': 'cf',
        'Chad': 'td', 'Chile': 'cl', 'China': 'cn', 'Colombia': 'co', 'Comoros': 'km', 'Congo': 'cg',
        'Costa Rica': 'cr', "Côte d'Ivoire": 'ci', 'Croatia': 'hr', 'Cuba': 'cu', 'Cyprus': 'cy',
        'Czechia': 'cz', "Democratic People's Republic of Korea": 'kp', 'Democratic Republic of the Congo': 'cd',
        'Denmark': 'dk', 'Djibouti': 'dj', 'Dominica': 'dm', 'Dominican Republic': 'do', 'Ecuador': 'ec',
        'Egypt': 'eg', 'El Salvador': 'sv', 'Equatorial Guinea': 'gq', 'Eritrea': 'er', 'Estonia': 'ee',
        'Eswatini': 'sz', 'Ethiopia': 'et', 'Fiji': 'fj', 'Finland': 'fi', 'France': 'fr', 'Gabon': 'ga',
        'Gambia': 'gm', 'Georgia': 'ge', 'Germany': 'de', 'Ghana': 'gh', 'Greece': 'gr', 'Grenada': 'gd',
        'Guatemala': 'gt', 'Guinea': 'gn', 'Guinea-Bissau': 'gw', 'Guyana': 'gy', 'Haiti': 'ht',
        'Honduras': 'hn', 'Hungary': 'hu', 'Iceland': 'is', 'India': 'in', 'Indonesia': 'id',
        'Iran (Islamic Republic of)': 'ir', 'Iraq': 'iq', 'Ireland': 'ie', 'Israel': 'il', 'Italy': 'it',
        'Jamaica': 'jm', 'Japan': 'jp', 'Jordan': 'jo', 'Kazakhstan': 'kz', 'Kenya': 'ke', 'Kiribati': 'ki',
        'Kuwait': 'kw', 'Kyrgyzstan': 'kg', "Lao People's Democratic Republic": 'la', 'Latvia': 'lv',
        'Lebanon': 'lb', 'Lesotho': 'ls', 'Liberia': 'lr', 'Libya': 'ly', 'Liechtenstein': 'li',
        'Lithuania': 'lt', 'Luxembourg': 'lu', 'Madagascar': 'mg', 'Malawi': 'mw', 'Malaysia': 'my',
        'Maldives': 'mv', 'Mali': 'ml', 'Malta': 'mt', 'Marshall Islands': 'mh', 'Mauritania': 'mr',
        'Mauritius': 'mu', 'Mexico': 'mx', 'Micronesia (Federated States of)': 'fm', 'Monaco': 'mc',
        'Mongolia': 'mn', 'Montenegro': 'me', 'Morocco': 'ma', 'Mozambique': 'mz', 'Myanmar': 'mm',
        'Namibia': 'na', 'Nauru': 'nr', 'Nepal': 'np', 'Netherlands (Kingdom of the)': 'nl', 'New Zealand': 'nz',
        'Nicaragua': 'ni', 'Niger': 'ne', 'Nigeria': 'ng', 'North Macedonia': 'mk', 'Norway': 'no',
        'Oman': 'om', 'Pakistan': 'pk', 'Palau': 'pw', 'Panama': 'pa', 'Papua New Guinea': 'pg',
        'Paraguay': 'py', 'Peru': 'pe', 'Philippines': 'ph', 'Poland': 'pl', 'Portugal': 'pt',
        'Qatar': 'qa', 'Republic of Korea': 'kr', 'Republic of Moldova': 'md', 'Romania': 'ro',
        'Russian Federation': 'ru', 'Rwanda': 'rw', 'Saint Kitts and Nevis': 'kn', 'Saint Lucia': 'lc',
        'Saint Vincent and the Grenadines': 'vc', 'Samoa': 'ws', 'San Marino': 'sm',
        'Sao Tome and Principe': 'st', 'Saudi Arabia': 'sa', 'Senegal': 'sn', 'Serbia': 'rs',
        'Seychelles': 'sc', 'Sierra Leone': 'sl', 'Singapore': 'sg', 'Slovakia': 'sk', 'Slovenia': 'si',
        'Solomon Islands': 'sb', 'Somalia': 'so', 'South Africa': 'za', 'South Sudan': 'ss', 'Spain': 'es',
        'Sri Lanka': 'lk', 'Sudan': 'sd', 'Suriname': 'sr', 'Sweden': 'se', 'Switzerland': 'ch',
        'Syrian Arab Republic': 'sy', 'Tajikistan': 'tj', 'Thailand': 'th', 'Timor-Leste': 'tl',
        'Togo': 'tg', 'Tonga': 'to', 'Trinidad and Tobago': 'tt', 'Tunisia': 'tn', 'Türkiye': 'tr',
        'Turkmenistan': 'tm', 'Tuvalu': 'tv', 'Uganda': 'ug', 'Ukraine': 'ua',
        'United Arab Emirates': 'ae', 'United Kingdom': 'gb', 'United Kingdom of Great Britain and Northern Ireland': 'gb',
        'United Republic of Tanzania': 'tz', 'United States of America': 'us', 'Uruguay': 'uy',
        'Uzbekistan': 'uz', 'Vanuatu': 'vu', 'Venezuela (Bolivarian Republic of)': 've', 'Viet Nam': 'vn',
        'Yemen': 'ye', 'Zambia': 'zm', 'Zimbabwe': 'zw'
    };

    let defaultState = {
        selectedMetrics: ['Female Count', 'Male Count'],
        metricColors: {
            'Female Count': '#ff69b4',
            'Male Count': '#1f77b4',
            'Total Count': '#ff7f0e',
            'Female Percent': '#2ca02c',
            'Male Percent': '#d62728'
        },
        chartType: 'stack',
        region: 'All',
        displayMode: 'Top',
        nValue: 15,
        searchTerm: '',
        activeTab: 'Chart',
        tableSort: { key: 'Total Count', direction: 'desc' }
    };

    let state = {};

    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const nRangeContainer = document.getElementById('n-range-container');
    const spotlightModal = document.getElementById('spotlight-modal');

    // --- Main Setup Function ---
    async function initializeApp() {
        loadStateFromLocalStorage();
        lucide.createIcons(); // Initialize icons
        setupEventListeners();
        renderFiltersFromState();

        try {
            // Load both data files
            const [countryData, repsData] = await Promise.all([
                d3.csv('./UN_Bluebook_Data_rich.csv'),
                d3.csv('./UN_Bluebook_Data_reps.csv')
            ]);
            
            representativesData = repsData;

            // Group representatives by country
            const repsByCountry = d3.group(representativesData, d => d.Country);

            allData = countryData.map(d => {
                const femaleCount = +d['Female Count'] || 0;
                const totalCount = +d['Total Count'] || 0;
                const maleCount = totalCount - femaleCount; // Calculate male count
                const femalePercent = totalCount > 0 ? (femaleCount / totalCount) * 100 : 0;
                const malePercent = totalCount > 0 ? (maleCount / totalCount) * 100 : 0;
                
                return {
                    ...d,
                    'Female Count': femaleCount,
                    'Male Count': maleCount,
                    'Total Count': totalCount,
                    'Female Percent': femalePercent,
                    'Male Percent': malePercent,
                    'Population': +d['Population'] || 0,
                    representatives: repsByCountry.get(d.Country) || []
                };
            });
            
            populateRegionSelect();
            document.getElementById('nRange').max = allData.length;
            document.getElementById('loading').classList.add('hidden');
            updateVisualizations();
            handleUrlHashOnLoad(); // Check URL for deep links after data is loaded
            
        } catch (error) {
            console.error("Error loading data:", error);
            document.getElementById('loading').textContent = "Error loading data. Please check the console.";
        }
    }
    
    // --- UI Setup & Event Listeners ---
    function setupEventListeners() {
        // Sidebar toggles
        document.getElementById('sidebar-toggle').addEventListener('click', toggleSidebar);
        document.getElementById('sidebar-close').addEventListener('click', toggleSidebar);
        sidebarOverlay.addEventListener('click', toggleSidebar);

        // Filter controls
        document.getElementById('chartTypeSelect').addEventListener('change', (e) => handleStateChange('chartType', e.target.value));
        document.getElementById('regionSelect').addEventListener('change', (e) => handleStateChange('region', e.target.value));
        document.getElementById('nRange').addEventListener('input', (e) => {
            document.getElementById('nValue').textContent = e.target.value;
        });
        document.getElementById('nRange').addEventListener('change', (e) => handleStateChange('nValue', Number(e.target.value)));
        document.getElementById('searchInput').addEventListener('input', (e) => handleStateChange('searchTerm', e.target.value));
        document.getElementById('download-csv').addEventListener('click', downloadCSV);

        // Display mode buttons
        document.getElementById('displayModeContainer').addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') {
                handleStateChange('displayMode', e.target.dataset.mode);
            }
        });

        // Main content tabs
        document.getElementById('tabs').addEventListener('click', (e) => {
            if (e.target.classList.contains('tab-button')) {
                handleStateChange('activeTab', e.target.dataset.tab);
            }
        });
        
            // Modal tabs
        document.getElementById('modal-tabs').addEventListener('click', (e) => {
            if(e.target.classList.contains('modal-tab-button')) {
                const tabId = e.target.dataset.tab;
                const currentCountry = document.getElementById('spotlight-title').dataset.country;
                updateUrlHash(currentCountry, tabId);
                
                document.querySelectorAll('.modal-tab-button').forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
                document.querySelectorAll('.modal-panel').forEach(panel => panel.classList.add('hidden'));
                document.getElementById(`modal-panel-${tabId}`).classList.remove('hidden');
            }
        });
        
        // Spotlight Modal close events
        document.getElementById('spotlight-close').addEventListener('click', hideSpotlight);
        spotlightModal.addEventListener('click', (e) => {
            if (e.target === spotlightModal) {
                hideSpotlight();
            }
        });
        
        // Share button
        document.getElementById('share-button').addEventListener('click', (e) => {
            const urlToCopy = window.location.href;
            navigator.clipboard.writeText(urlToCopy).then(() => {
                e.currentTarget.innerHTML = '<i data-lucide="check" class="w-5 h-5 text-green-500"></i>';
                lucide.createIcons();
                setTimeout(() => {
                    e.currentTarget.innerHTML = '<i data-lucide="share-2" class="w-5 h-5"></i>';
                    lucide.createIcons();
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy: ', err);
            });
        });
    }
    
    function renderFiltersFromState() {
        // Set initial values from state
        document.getElementById('chartTypeSelect').value = state.chartType;
        document.getElementById('regionSelect').value = state.region;
        document.getElementById('nRange').value = state.nValue;
        document.getElementById('nValue').textContent = state.nValue;
        document.getElementById('searchInput').value = state.searchTerm;
        
        // Set display mode button active state
        document.querySelectorAll('#displayModeContainer button').forEach(btn => {
            btn.className = `w-full py-1 text-sm rounded-md transition-colors ${state.displayMode === btn.dataset.mode ? 'bg-white text-blue-600 shadow' : 'bg-transparent text-gray-600 hover:bg-gray-200'}`;
        });
        nRangeContainer.classList.toggle('hidden', state.displayMode === 'All');
        
            // Set active tab for main content
        document.querySelectorAll('#tabs .tab-button').forEach(btn => {
            const isActive = btn.dataset.tab === state.activeTab;
            btn.classList.toggle('active', isActive);
            btn.classList.toggle('border-blue-500', isActive);
            btn.classList.toggle('text-blue-600', isActive);
            btn.classList.toggle('border-transparent', !isActive);
            btn.classList.toggle('text-gray-500', !isActive);
        });

        document.querySelectorAll('.panel').forEach(panel => panel.classList.add('hidden'));
        const activePanel = document.getElementById(`${state.activeTab.toLowerCase()}-panel`);
        if(activePanel) activePanel.classList.remove('hidden');

        renderMetricsCheckboxes();
        renderColorPickers();
    }

    function handleStateChange(key, value) {
        state[key] = value;
        saveStateToLocalStorage();
        updateVisualizations();
        renderFiltersFromState(); // Re-render filters to reflect state
    }
    
    function loadStateFromLocalStorage() {
        try {
            const savedState = localStorage.getItem('unBluebookState');
            state = savedState ? JSON.parse(savedState) : { ...defaultState };
            if (!state.tableSort) {
                state.tableSort = { ...defaultState.tableSort };
            }
        } catch (e) {
            console.error("Could not load state from local storage", e);
            state = { ...defaultState };
        }
    }

    function saveStateToLocalStorage() {
        try {
            localStorage.setItem('unBluebookState', JSON.stringify(state));
        } catch (e) {
            console.error("Could not save state to local storage", e);
        }
    }
    
    function updateUrlHash(country, tab) {
        if (country) {
            history.pushState(null, '', `#country=${encodeURIComponent(country)}&tab=${tab || 'overview'}`);
        } else {
            history.pushState(null, '', window.location.pathname + window.location.search);
        }
    }
    
    function handleUrlHashOnLoad() {
        const params = new URLSearchParams(window.location.hash.substring(1));
        const country = params.get('country');
        const tab = params.get('tab');
        if (country) {
            const countryExists = allData.some(d => d.Country === country);
            if (countryExists) {
                showSpotlight(country, tab);
            }
        }
    }

    function toggleSidebar() {
        sidebar.classList.toggle('-translate-x-full');
        sidebarOverlay.classList.toggle('opacity-0');
        sidebarOverlay.classList.toggle('pointer-events-none');
    }

    // --- Data Processing & Rendering ---
    function filterAndSortData() {
        let data = [...allData];
        if (state.region !== 'All') {
            data = data.filter(d => d.Group === state.region);
        }
        if (state.searchTerm) {
            data = data.filter(d => d.Country.toLowerCase().includes(state.searchTerm.toLowerCase()));
        }
        
        // Apply sorting
        const sortKey = state.tableSort.key;
        const sortDir = state.tableSort.direction;
        data.sort((a,b) => {
            let valA = a[sortKey];
            let valB = b[sortKey];
            if(typeof valA === 'string') {
                valA = valA.toLowerCase();
                valB = valB.toLowerCase();
            }
            if(valA < valB) return sortDir === 'asc' ? -1 : 1;
            if(valA > valB) return sortDir === 'asc' ? 1 : -1;
            return 0;
        });
        
        if (state.displayMode === 'Top') {
            data.sort((a, b) => b['Total Count'] - a['Total Count']);
            data = data.slice(0, state.nValue);
        } else if (state.displayMode === 'Bottom') {
            data.sort((a, b) => a['Total Count'] - b['Total Count']);
            data = data.slice(0, state.nValue);
        }
        filteredData = data;
    }

    function updateVisualizations() {
        filterAndSortData();
        updateInsights();
        drawChart();
        drawTable();
    }

    function populateRegionSelect() {
        const regions = Array.from(new Set(allData.map(d => d.Group))).sort();
        const select = document.getElementById('regionSelect');
        regions.forEach(region => {
            const option = document.createElement('option');
            option.value = region;
            option.textContent = region;
            select.appendChild(option);
        });
    }
    
    function renderMetricsCheckboxes() {
            const container = document.getElementById('metrics-container');
            container.innerHTML = '';
            ALL_METRICS.forEach(metric => {
            const id = `metric-${metric.replace(/\s/g, '-')}`;
            const isChecked = state.selectedMetrics.includes(metric);
            const label = document.createElement('label');
            label.htmlFor = id;
            label.className = "flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors";
            label.innerHTML = `
                <input id="${id}" type="checkbox" ${isChecked ? 'checked' : ''} class="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                <span class="text-gray-800">${metric}</span>
            `;
            label.querySelector('input').addEventListener('change', () => {
                    if (state.selectedMetrics.includes(metric)) {
                    state.selectedMetrics = state.selectedMetrics.filter(m => m !== metric);
                    } else {
                    state.selectedMetrics.push(metric);
                    }
                    renderColorPickers();
                    handleStateChange('selectedMetrics', state.selectedMetrics);
            });
            container.appendChild(label);
            });
    }

    function renderColorPickers() {
        const container = document.getElementById('color-pickers-container');
        container.innerHTML = '';
        state.selectedMetrics.forEach(metric => {
            const id = `color-${metric.replace(/\s/g, '-')}`;
            const color = state.metricColors[metric];

            const wrapper = document.createElement('div');
            wrapper.className = "flex items-center justify-between p-1";

            const label = document.createElement('label');
            label.htmlFor = id;
            label.textContent = metric;
            label.className = "text-sm text-gray-700";

            const input = document.createElement('input');
            input.id = id;
            input.type = 'color';
            input.value = color;
            
            input.addEventListener('change', (e) => {
                state.metricColors[metric] = e.target.value;
                saveStateToLocalStorage();
                if(state.activeTab === 'Chart') {
                    drawChart();
                }
            });

            wrapper.appendChild(label);
            wrapper.appendChild(input);
            container.appendChild(wrapper);
        });
    }

    function drawChart() {
        const panel = document.getElementById('chart-panel');
        if (!filteredData.length || !state.selectedMetrics.length) {
            panel.innerHTML = `<div class="text-center text-gray-500 p-10">Select metrics and filters to see the chart.</div>`;
            return;
        }
        
        const layout = {
            title: { text: `${state.selectedMetrics.join(' & ')} by Country`, font: { size: 20, color: '#333' }, x: 0.05 },
            height: 500,
            autosize: true,
            margin: { l: 150, r: 40, b: 50, t: 80 },
            legend: { orientation: 'h', y: -0.2, x: 0.5, xanchor: 'center' },
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
        };
        const config = { responsive: true, displaylogo: false };

        let plotData, plotLayout;

        if (state.chartType === 'pie') {
            plotData = [{
                labels: filteredData.map(d => d.Country),
                values: filteredData.map(d => d['Total Count']),
                type: 'pie',
                hole: .4,
                hoverinfo: 'label+percent+value', textinfo: 'label+percent', textposition: 'inside',
                pull: filteredData.map(d => d.Country.toLowerCase().includes(state.searchTerm.toLowerCase()) && state.searchTerm ? 0.1 : 0)
            }];
            plotLayout = { ...layout, title: { ...layout.title, text: 'Total Count Distribution'} };
        } else {
            const yCategories = filteredData.map(d => d.Country).reverse();
            plotData = state.selectedMetrics.map(metric => ({
                x: filteredData.map(d => d[metric]).reverse(),
                y: yCategories, name: metric, type: 'bar', orientation: 'h',
                marker: {
                    color: state.metricColors[metric],
                    line: {
                        color: 'rgba(0,0,0,0.8)',
                        width: filteredData.map(d => d.Country.toLowerCase().includes(state.searchTerm.toLowerCase()) && state.searchTerm ? 2 : 0)
                    }
                }
            }));
            plotLayout = {
                ...layout,
                barmode: state.chartType === 'percent' ? 'stack' : state.chartType,
                barnorm: state.chartType === 'percent' ? 'percent' : '',
                yaxis: { categoryorder: 'array', categoryarray: yCategories }
            };
        }

        Plotly.react(panel, plotData, plotLayout, config);
        
        // Attach click listener once after chart is drawn
        if (!plotlyListenerAttached) {
            panel.on('plotly_click', (data) => {
                if (data.points.length > 0) {
                    const country = state.chartType === 'pie' ? data.points[0].label : data.points[0].y;
                    showSpotlight(country);
                }
            });
            plotlyListenerAttached = true;
        }
    }

    function drawTable() {
        const panel = document.getElementById('table-panel');
        if (!filteredData.length) {
            panel.innerHTML = `<div class="text-center text-gray-500 p-10">No data available.</div>`;
            return;
        }
        
        const columns = [
            { key: '', label: '' },
            { key: 'Country', label: 'Country' },
            { key: 'Group', label: 'Group' },
            { key: 'Female Count', label: 'Female' },
            { key: 'Male Count', label: 'Male' },
            { key: 'Total Count', label: 'Total' }
        ];

        const header = `<thead><tr class="bg-gray-50">${columns.map(c => {
            const isSortable = c.key !== '';
            let sortIndicator = '';
            if(isSortable && state.tableSort.key === c.key){
                sortIndicator = state.tableSort.direction === 'asc' ? '<i data-lucide="arrow-up" class="w-4 h-4 ml-1"></i>' : '<i data-lucide="arrow-down" class="w-4 h-4 ml-1"></i>';
            }
            return `<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${isSortable ? 'sortable-header' : ''}" data-sort-key="${c.key}">
                <span class="flex items-center">${c.label}${sortIndicator}</span>
            </th>`
        }).join('')}</tr></thead>`;
        
        const body = `<tbody>${filteredData.map(row => {
            const countryCode = countryCodeMap[row.Country] || '';
            const flagHtml = countryCode ? `<span class="fi fi-${countryCode} fis rounded-sm shadow-sm" style="width: 32px; height: 24px; display: inline-block;"></span>` : '<div class="w-8 h-6 bg-gray-200 rounded-sm"></div>';
            const isHighlighted = state.searchTerm && row.Country.toLowerCase().includes(state.searchTerm.toLowerCase());
            return `
            <tr class="hover:bg-gray-100 cursor-pointer ${isHighlighted ? 'bg-blue-100' : ''}" data-country="${row.Country}">
                <td class="px-6 py-4">${flagHtml}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-bold">${row.Country}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${row.Group}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-right">${row['Female Count'].toLocaleString()}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-right">${row['Male Count'].toLocaleString()}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-right font-bold">${row['Total Count'].toLocaleString()}</td>
            </tr>`
        }).join('')}</tbody>`;
        
        panel.innerHTML = `<table class="min-w-full divide-y divide-gray-200">${header}${body}</table>`;
        lucide.createIcons();

        panel.querySelectorAll('.sortable-header').forEach(header => {
            header.addEventListener('click', (e) => {
                const newSortKey = e.currentTarget.dataset.sortKey;
                let newSortDir = 'desc';
                if(state.tableSort.key === newSortKey && state.tableSort.direction === 'desc'){
                    newSortDir = 'asc';
                }
                handleStateChange('tableSort', { key: newSortKey, direction: newSortDir });
            });
        });

        panel.querySelectorAll('tbody tr').forEach(row => {
            row.addEventListener('click', () => {
                    const country = row.dataset.country;
                    showSpotlight(country);
            });
        });
    }

    function downloadCSV() {
        const csv = d3.csvFormat(filteredData);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "un_bluebook_filtered_data.csv");
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    
    // --- Spotlight Modal Functions ---
    function createStatRow(label, value, icon = null) {
        if (!value || String(value).trim() === '') return '';
        const iconHtml = icon ? `<i data-lucide="${icon}" class="w-4 h-4 mr-2 text-gray-500"></i>` : '';
        return `
            <div class="flex justify-between items-start text-sm py-1">
                <span class="font-semibold text-gray-600 flex items-center shrink-0">${iconHtml}${label}:</span>
                <span class="font-mono text-gray-800 text-right ml-4">${value}</span>
            </div>
        `;
    }
    
    function createLinkRow(label, value, href, icon = null) {
        if (!value || value.trim() === '') return '';
        const iconHtml = icon ? `<i data-lucide="${icon}" class="w-4 h-4 mr-2 text-gray-500"></i>` : '';
        return `
                <div class="flex justify-between items-start text-sm py-1">
                <span class="font-semibold text-gray-600 flex items-center shrink-0">${iconHtml}${label}:</span>
                <a href="${href}" target="_blank" rel="noopener noreferrer" class="font-mono text-blue-600 hover:underline truncate ml-4 text-right">${value}</a>
            </div>
        `;
    }

    function showSpotlight(countryName, activeTab = 'overview') {
        const countryData = allData.find(d => d.Country === countryName);
        if (!countryData) return;
        
        updateUrlHash(countryName, activeTab);

        const titleElement = document.getElementById('spotlight-title');
        titleElement.dataset.country = countryName;

        const countryCode = countryCodeMap[countryData.Country] || '';
        const flagHtml = countryCode ? `<span class="fi fi-${countryCode} fis rounded-md shadow-md mr-4" style="width: 40px; height: 30px; display: inline-block;"></span>` : '';
        titleElement.innerHTML = `${flagHtml}<span>${countryData.Country}</span>`;
        
        // Helper to format URLs for external links
        const formatExternalUrl = (url) => {
            if (!url || url.trim() === '') return '#';
            if (url.startsWith('http://') || url.startsWith('https://')) {
                return url;
            }
            return `https://${url}`;
        }
        
        // --- Populate Overview Tab ---
        const statsUnContainer = document.getElementById('spotlight-stats-un');
        statsUnContainer.innerHTML = `
            <h3 class="text-xl font-semibold text-gray-700 border-b pb-1 mb-2">UN Contribution</h3>
            ${createStatRow('Total Personnel', countryData['Total Count'].toLocaleString())}
            ${createStatRow('Female Personnel', `${countryData['Female Count'].toLocaleString()} (${countryData['Female Percent'].toFixed(1)}%)`)}
            ${createStatRow('Male Personnel', `${countryData['Male Count'].toLocaleString()} (${countryData['Male Percent'].toFixed(1)}%)`)}
        `;

        const statsCountryContainer = document.getElementById('spotlight-stats-country');
        statsCountryContainer.innerHTML = `
                <h3 class="text-xl font-semibold text-gray-700 border-b pb-1 mb-2">Country Information</h3>
            ${createStatRow('Capital', countryData.Capital, 'map-pin')}
            ${createStatRow('Region', countryData.Region, 'globe-2')}
            ${createStatRow('Subregion', countryData['Sub-region'], 'map')}
            ${createStatRow('Population', countryData.Population > 0 ? countryData.Population.toLocaleString() : 'N/A', 'users')}
        `;
        
        const missionContainer = document.getElementById('spotlight-stats-mission');
        missionContainer.innerHTML = `
            <h3 class="text-xl font-semibold text-gray-700 border-b pb-1 mb-2">Mission Contact</h3>
            ${createStatRow('Entity', countryData.MC_EntityShort)}
            ${createStatRow('Full Entity Name', countryData.MC_EntityLong)}
            ${createStatRow('Address', countryData.MC_Address, 'building')}
            ${createStatRow('Telephone', countryData.MC_Telephone, 'phone')}
            ${createStatRow('Fax', countryData.MC_Telefax, 'printer')}
            ${createStatRow('Membership Date', countryData.MC_MembershipDate, 'calendar')}
            ${createStatRow('National Holiday', countryData.MC_Holiday, 'cake')}
            ${createLinkRow('Website', countryData.MC_WebSite, formatExternalUrl(countryData.MC_WebSite), 'external-link')}
            ${createLinkRow('Social Media', countryData.MC_SocialMedia, formatExternalUrl(countryData.MC_SocialMedia), 'at-sign')}
            ${createLinkRow('Email', countryData.MC_eMail, `mailto:${countryData.MC_eMail}`, 'mail')}
            ${createStatRow('UN Correspondence', countryData.MC_UNCorrespondenceLanguage, 'languages')}
        `;

        const spotlightChart = document.getElementById('spotlight-chart');
        const pieData = [{
            values: [countryData['Female Count'], countryData['Male Count']],
            labels: ['Female', 'Male'],
            type: 'pie', hole: .4,
            marker: { colors: [state.metricColors['Female Count'], state.metricColors['Male Count']] },
            textinfo: 'label+percent', textposition: 'inside', hoverinfo: 'label+value'
        }];
        const pieLayout = {
            title: 'Gender Distribution of Deployed Personnel',
            height: 280, margin: { t: 50, b: 20, l: 20, r: 20 }, showlegend: true,
            legend: { x: 0.5, y: -0.1, xanchor: 'center', orientation: 'h'},
            paper_bgcolor: 'rgba(0,0,0,0)', plot_bgcolor: 'rgba(0,0,0,0)',
        };
        Plotly.newPlot(spotlightChart, pieData, pieLayout, {staticPlot: true, displaylogo: false});

        // --- Populate Representatives Tab ---
        const repsContainer = document.getElementById('reps-container');
        repsContainer.innerHTML = '';
        if (countryData.representatives && countryData.representatives.length > 0) {
            const repsHtml = countryData.representatives.map(rep => `
                <div class="p-4 border rounded-lg shadow-sm bg-gray-50">
                    <p class="font-bold text-lg text-gray-800">${rep['Full Name'] || 'N/A'}</p>
                    <p class="text-md text-blue-600">${rep.Title || 'N/A'}</p>
                    <div class="text-sm text-gray-600 mt-2 space-y-1">
                        ${createStatRow('Gender', rep.Gender, 'user')}
                        ${createStatRow('Appointment', rep['bluebooks/BB_Appointment'] ? new Date(rep['bluebooks/BB_Appointment']).toLocaleDateString() : 'N/A', 'calendar-check')}
                        ${createLinkRow('Email', rep['bluebooks/BB_Email'], 'mailto:' + rep['bluebooks/BB_Email'], 'mail')}
                        ${createStatRow('Phone', rep['bluebooks/BB_PhnNumber'], 'phone')}
                    </div>
                </div>
            `).join('');
            repsContainer.innerHTML = repsHtml;
        } else {
            repsContainer.innerHTML = `<p class="text-center text-gray-500">No representative data available for this country.</p>`;
        }

        // Show modal and set active tab
        spotlightModal.classList.remove('hidden');
        document.querySelector(`.modal-tab-button[data-tab="${activeTab}"]`).click();
        lucide.createIcons();
    }

    function hideSpotlight() {
        spotlightModal.classList.add('hidden');
        updateUrlHash(null); // Clear hash from URL
    }
    
    // --- Insights Function ---
    function updateInsights() {
        if (allData.length === 0) return;
        const insights = [];
        const activeCountries = allData.filter(d => d['Total Count'] > 0);
        if(activeCountries.length === 0) { document.getElementById('insight-text').innerHTML = "No personnel data to generate insights."; return; }
        const personnelByRegion = d3.rollup(activeCountries, v => d3.sum(v, d => d['Total Count']), d => d.Group);
        const topRegion = Array.from(personnelByRegion.entries()).sort((a,b) => b[1] - a[1])[0];
        insights.push(`The <strong>${topRegion[0]}</strong> region contributes the most personnel, with a total of <strong>${topRegion[1].toLocaleString()}</strong>.`);
        const topFemalePercent = activeCountries.reduce((prev, current) => (prev['Female Percent'] > current['Female Percent']) ? prev : current);
        if(topFemalePercent) insights.push(`<strong>${topFemalePercent.Country}</strong> has one of the highest percentages of female contributors, at <strong>${topFemalePercent['Female Percent'].toFixed(1)}%</strong>.`);
        const topContributor = activeCountries.reduce((prev, current) => (prev['Total Count'] > current['Total Count']) ? prev : current);
        insights.push(`<strong>${topContributor.Country}</strong> is the largest single contributor, with <strong>${topContributor['Total Count'].toLocaleString()}</strong> personnel.`);
        
        // New Insights
        const perCapitaData = activeCountries.filter(d => d.Population > 0);
        if (perCapitaData.length > 0) {
            const topPerCapita = perCapitaData.reduce((prev, current) => ((prev['Total Count']/prev.Population) > (current['Total Count']/current.Population)) ? prev : current);
            insights.push(`<strong>${topPerCapita.Country}</strong> contributes the most personnel per capita.`);
        }
        
        const foundingMembers = allData.filter(d => d.MC_MembershipDate && new Date(d.MC_MembershipDate).getFullYear() === 1945);
        if(foundingMembers.length > 0) insights.push(`There were <strong>${foundingMembers.length}</strong> founding members of the UN in 1945.`);
        
        const femaleRepsByCountry = d3.rollup(representativesData.filter(r => r.Gender === 'Female'), v => v.length, d => d.Country);
        if(femaleRepsByCountry.size > 0) {
            const topFemaleReps = Array.from(femaleRepsByCountry.entries()).sort((a,b) => b[1] - a[1])[0];
            insights.push(`<strong>${topFemaleReps[0]}</strong> has the most female representatives, with <strong>${topFemaleReps[1]}</strong>.`);
        }

        document.getElementById('insight-text').innerHTML = insights[Math.floor(Math.random() * insights.length)];
    }


    // --- Start the App ---
    initializeApp();
});