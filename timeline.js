// --- Main script to create the D3.js visualization ---

document.addEventListener('DOMContentLoaded', async () => {

    const csvData = `Country,Official Name,UN Membership Date
Afghanistan,Islamic Republic of Afghanistan,1946-11-19
Albania,Republic of Albania,1955-12-14
Algeria,People's Democratic Republic of Algeria,1962-10-08
Andorra,Principality of Andorra,1993-07-28
Angola,Republic of Angola,1976-12-01
Antigua and Barbuda,Antigua and Barbuda,1981-11-11
Argentina,Argentine Republic,1945-10-24
Armenia,Republic of Armenia,1992-03-02
Australia,Commonwealth of Australia,1945-11-01
Austria,Republic of Austria,1955-12-14
Azerbaijan,Republic of Azerbaijan,1992-03-02
Bahamas,Commonwealth of the Bahamas,1973-09-18
Bahrain,Kingdom of Bahrain,1971-09-21
Bangladesh,People's Republic of Bangladesh,1974-09-17
Barbados,Barbados,1966-12-09
Belarus,Republic of Belarus,1945-10-24
Belgium,Kingdom of Belgium,1945-12-27
Belize,Belize,1981-09-25
Benin,Republic of Benin,1960-09-20
Bhutan,Kingdom of Bhutan,1971-09-21
Bolivia,Plurinational State of Bolivia,1945-11-14
Bosnia and Herzegovina,Bosnia and Herzegovina,1992-05-22
Botswana,Republic of Botswana,1966-10-17
Brazil,Federative Republic of Brazil,1945-10-24
Brunei Darussalam,Brunei Darussalam,1984-09-21
Bulgaria,Republic of Bulgaria,1955-12-14
Burkina Faso,Burkina Faso,1960-09-20
Burundi,Republic of Burundi,1962-09-18
Cabo Verde,Republic of Cabo Verde,1975-09-16
Cambodia,Kingdom of Cambodia,1955-12-14
Cameroon,Republic of Cameroon,1960-09-20
Canada,Canada,1945-11-09
Central African Republic,Central African Republic,1960-09-20
Chad,Republic of Chad,1960-09-20
Chile,Republic of Chile,1945-10-24
China,People's Republic of China,1945-10-24
Colombia,Republic of Colombia,1945-11-05
Comoros,Union of the Comoros,1975-11-12
Congo,Republic of the Congo,1960-09-20
Costa Rica,Republic of Costa Rica,1945-11-02
Côte d'Ivoire,Republic of Côte d'Ivoire,1960-09-20
Croatia,Republic of Croatia,1992-05-22
Cuba,Republic of Cuba,1945-10-24
Cyprus,Republic of Cyprus,1960-09-20
Czech Republic,Czech Republic,1993-01-19
Democratic People's Republic of Korea,Democratic People's Republic of Korea,1991-09-17
Democratic Republic of the Congo,Democratic Republic of the Congo,1960-09-20
Denmark,Kingdom of Denmark,1945-10-24
Djibouti,Republic of Djibouti,1977-09-20
Dominica,Commonwealth of Dominica,1978-12-18
Dominican Republic,Dominican Republic,1945-10-24
Ecuador,Republic of Ecuador,1945-12-21
Egypt,Arab Republic of Egypt,1945-10-24
El Salvador,Republic of El Salvador,1945-10-24
Equatorial Guinea,Republic of Equatorial Guinea,1968-11-12
Eritrea,State of Eritrea,1993-05-28
Estonia,Republic of Estonia,1991-09-17
Eswatini,Kingdom of Eswatini,1968-09-24
Ethiopia,Federal Democratic Republic of Ethiopia,1945-11-13
Fiji,Republic of Fiji,1970-10-13
Finland,Republic of Finland,1955-12-14
France,French Republic,1945-10-24
Gabon,Gabonese Republic,1960-09-20
Gambia,Republic of the Gambia,1965-09-21
Georgia,Georgia,1992-07-31
Germany,Federal Republic of Germany,1973-09-18
Ghana,Republic of Ghana,1957-03-08
Greece,Hellenic Republic,1945-10-25
Grenada,Grenada,1974-09-17
Guatemala,Republic of Guatemala,1945-11-21
Guinea,Republic of Guinea,1958-12-12
Guinea-Bissau,Republic of Guinea-Bissau,1974-09-17
Guyana,Co-operative Republic of Guyana,1966-09-20
Haiti,Republic of Haiti,1945-10-24
Honduras,Republic of Honduras,1945-12-17
Hungary,Hungary,1955-12-14
Iceland,Republic of Iceland,1946-11-19
India,Republic of India,1945-10-30
Indonesia,Republic of Indonesia,1950-09-28
Iran,Islamic Republic of Iran,1945-10-24
Iraq,Republic of Iraq,1945-12-21
Ireland,Ireland,1955-12-14
Israel,State of Israel,1949-05-11
Italy,Italian Republic,1955-12-14
Jamaica,Jamaica,1962-09-18
Japan,Japan,1956-12-18
Jordan,Hashemite Kingdom of Jordan,1955-12-14
Kazakhstan,Republic of Kazakhstan,1992-03-02
Kenya,Republic of Kenya,1963-12-16
Kiribati,Republic of Kiribati,1999-09-14
Kuwait,State of Kuwait,1963-05-14
Kyrgyzstan,Kyrgyz Republic,1992-03-02
"Lao People's Democratic Republic","Lao People's Democratic Republic",1955-12-14
Latvia,Republic of Latvia,1991-09-17
Lebanon,Lebanese Republic,1945-10-24
Lesotho,Kingdom of Lesotho,1966-10-17
Liberia,Republic of Liberia,1945-11-02
Libya,State of Libya,1955-12-14
Liechtenstein,Principality of Liechtenstein,1990-09-18
Lithuania,Republic of Lithuania,1991-09-17
Luxembourg,Grand Duchy of Luxembourg,1945-10-24
Madagascar,Republic of Madagascar,1960-09-20
Malawi,Republic of Malawi,1964-12-01
Malaysia,Malaysia,1957-09-17
Maldives,Republic of Maldives,1965-09-21
Mali,Republic of Mali,1960-09-28
Malta,Republic of Malta,1964-12-01
"Marshall Islands","Republic of the Marshall Islands",1991-09-17
Mauritania,Islamic Republic of Mauritania,1961-10-27
Mauritius,Republic of Mauritius,1968-04-24
Mexico,United Mexican States,1945-11-07
Micronesia,"Federated States of Micronesia",1991-09-17
Monaco,Principality of Monaco,1993-05-28
Mongolia,Mongolia,1961-10-27
Montenegro,Montenegro,2006-06-28
Morocco,Kingdom of Morocco,1956-11-12
Mozambique,Republic of Mozambique,1975-09-16
Myanmar,Republic of the Union of Myanmar,1948-04-19
Namibia,Republic of Namibia,1990-04-23
Nauru,Republic of Nauru,1999-09-14
Nepal,Federal Democratic Republic of Nepal,1955-12-14
Netherlands,Kingdom of the Netherlands,1945-12-10
"New Zealand","New Zealand",1945-10-24
Nicaragua,Republic of Nicaragua,1945-10-24
Niger,Republic of the Niger,1960-09-20
Nigeria,Federal Republic of Nigeria,1960-10-07
"North Macedonia","Republic of North Macedonia",1993-04-08
Norway,Kingdom of Norway,1945-11-27
Oman,Sultanate of Oman,1971-10-07
Pakistan,Islamic Republic of Pakistan,1947-09-30
Palau,Republic of Palau,1994-12-15
Panama,Republic of Panama,1945-11-13
"Papua New Guinea","Independent State of Papua New Guinea",1975-10-10
Paraguay,Republic of Paraguay,1945-10-24
Peru,Republic of Peru,1945-10-31
Philippines,Republic of the Philippines,1945-10-24
Poland,Republic of Poland,1945-10-24
Portugal,Portuguese Republic,1955-12-14
Qatar,State of Qatar,1971-09-21
"Republic of Korea","Republic of Korea",1991-09-17
"Republic of Moldova","Republic of Moldova",1992-03-02
Romania,Romania,1955-12-14
"Russian Federation","Russian Federation",1945-10-24
Rwanda,Republic of Rwanda,1962-09-18
"Saint Kitts and Nevis","Federation of Saint Kitts and Nevis",1983-09-23
"Saint Lucia","Saint Lucia",1979-09-18
"Saint Vincent and the Grenadines","Saint Vincent and the Grenadines",1980-09-16
Samoa,Independent State of Samoa,1976-12-15
"San Marino","Republic of San Marino",1992-03-02
"Sao Tome and Principe","Democratic Republic of Sao Tome and Principe",1975-09-16
"Saudi Arabia","Kingdom of Saudi Arabia",1945-10-24
Senegal,Republic of Senegal,1960-09-28
Serbia,Republic of Serbia,2000-11-01
Seychelles,Republic of Seychelles,1976-09-21
"Sierra Leone","Republic of Sierra Leone",1961-09-27
Singapore,Republic of Singapore,1965-09-21
Slovakia,Slovak Republic,1993-01-19
Slovenia,Republic of Slovenia,1992-05-22
"Solomon Islands","Solomon Islands",1978-09-19
Somalia,Federal Republic of Somalia,1960-09-20
"South Africa","Republic of South Africa",1945-11-07
"South Sudan","Republic of South Sudan",2011-07-14
Spain,Kingdom of Spain,1955-12-14
"Sri Lanka","Democratic Socialist Republic of Sri Lanka",1955-12-14
Sudan,Republic of the Sudan,1956-11-12
Suriname,Republic of Suriname,1975-12-04
Sweden,Kingdom of Sweden,1946-11-19
Switzerland,Swiss Confederation,2002-09-10
"Syrian Arab Republic","Syrian Arab Republic",1945-10-24
Tajikistan,Republic of Tajikistan,1992-03-02
Thailand,Kingdom of Thailand,1946-12-16
"Timor-Leste","Democratic Republic of Timor-Leste",2002-09-27
Togo,Togolese Republic,1960-09-20
Tonga,Kingdom of Tonga,1999-09-14
"Trinidad and Tobago","Republic of Trinidad and Tobago",1962-09-18
Tunisia,Republic of Tunisia,1956-11-12
Turkey,Republic of Turkey,1945-10-24
Turkmenistan,Turkmenistan,1992-03-02
Tuvalu,Tuvalu,2000-09-05
Uganda,Republic of Uganda,1962-10-25
Ukraine,Ukraine,1945-10-24
"United Arab Emirates","United Arab Emirates",1971-12-09
"United Kingdom","United Kingdom of Great Britain and Northern Ireland",1945-10-24
"United Republic of Tanzania","United Republic of Tanzania",1961-12-14
"United States of America","United States of America",1945-10-24
Uruguay,Eastern Republic of Uruguay,1945-12-18
Uzbekistan,Republic of Uzbekistan,1992-03-02
Vanuatu,Republic of Vanuatu,1981-09-15
Venezuela,Bolivarian Republic of Venezuela,1945-11-15
"Viet Nam","Socialist Republic of Viet Nam",1977-09-20
Yemen,Republic of Yemen,1947-09-30
Zambia,Republic of Zambia,1964-12-01
Zimbabwe,Republic of Zimbabwe,1980-08-25`;

    let activeChartMode = 'cumulative'; // 'cumulative' or 'perYear'
    let fullData;

    const margin = { top: 20, right: 60, bottom: 50, left: 80 };
    const chartContainer = d3.select("#timeline-chart");
    const width = chartContainer.node().getBoundingClientRect().width - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;

    const svg = chartContainer.append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
    
    // Define scales and axes globally within the scope
    const x = d3.scaleLinear().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);
    const r = d3.scaleSqrt().range([5, 15]);

    const xAxis = d3.axisBottom(x).tickFormat(d3.format("d"));
    const yAxis = d3.axisLeft(y);

    const xAxisGroup = svg.append("g").attr("transform", `translate(0,${height})`).attr("class", "axis");
    const yAxisGroup = svg.append("g").attr("class", "axis");
    const gridlineGroup = svg.append("g").attr("class", "gridline");
    const yAxisLabel = svg.append("text").attr("text-anchor", "middle").attr("transform", "rotate(-90)").attr("y", -margin.left + 20).attr("x", -height / 2).attr("class", "text-gray-700 font-medium");
    svg.append("text").attr("text-anchor", "middle").attr("x", width / 2).attr("y", height + margin.bottom - 10).attr("class", "text-gray-700 font-medium").text("Year of Admission");

    // Define gradient for the area chart
    const gradient = svg.append("defs").append("linearGradient")
        .attr("id", "area-gradient")
        .attr("x1", "0%").attr("y1", "0%").attr("x2", "0%").attr("y2", "100%");
    gradient.append("stop").attr("offset", "0%").attr("stop-color", "#3b82f6").attr("stop-opacity", 0.4);
    gradient.append("stop").attr("offset", "100%").attr("stop-color", "#3b82f6").attr("stop-opacity", 0);

    const tooltip = d3.select("#tooltip");
    const selectedInfoPanel = d3.select("#selected-info-panel");

    function processData(csv) {
        const data = d3.csvParse(csv);
        const parseDate = d3.timeParse("%Y-%m-%d");
        const processed = data.map(d => ({
            country: d['Country'],
            joinDate: parseDate(d['UN Membership Date']) 
        })).filter(d => d.country && d.joinDate);
        
        const dataByYear = d3.group(processed, d => d.joinDate.getFullYear());
        const years = Array.from(dataByYear.keys()).sort((a, b) => a - b);

        let cumulativeCount = 0;
        return years.map(year => {
            const countriesInYear = dataByYear.get(year);
            cumulativeCount += countriesInYear.length;
            return {
                year: year,
                newMembersCount: countriesInYear.length,
                countries: countriesInYear.map(c => c.country).sort(),
                cumulativeCount: cumulativeCount
            };
        });
    }

    function updateChart(mode) {
        activeChartMode = mode;
        const yValue = d => (mode === 'cumulative') ? d.cumulativeCount : d.newMembersCount;
        const yLabel = (mode === 'cumulative') ? "Cumulative Number of UN Members" : "New Members Per Year";

        y.domain([0, d3.max(fullData, yValue)]).nice();
        r.domain([1, d3.max(fullData, d => d.newMembersCount)]);

        yAxisGroup.transition().duration(750).call(yAxis);
        gridlineGroup.transition().duration(750).call(d3.axisLeft(y).tickSize(-width).tickFormat(""));
        yAxisLabel.text(yLabel);

        const area = d3.area().x(d => x(d.year)).y0(height).y1(d => y(yValue(d))).curve(d3.curveMonotoneX);

        svg.select(".chart-body .area")
            .transition().duration(750)
            .attr("d", area);

        svg.select(".chart-body").selectAll(".timeline-dot")
            .transition().duration(750)
            .attr("cy", d => y(yValue(d)))
            .attr("r", d => r(d.newMembersCount));
    }

    function drawChart() {
        document.getElementById('loading-message').remove();
        
        x.domain(d3.extent(fullData, d => d.year)).nice();
        xAxisGroup.call(xAxis);

        // Set initial y-axis for cumulative view
        y.domain([0, d3.max(fullData, d => d.cumulativeCount)]).nice();
        yAxisGroup.call(yAxis);
        gridlineGroup.call(d3.axisLeft(y).tickSize(-width).tickFormat(""));
        yAxisLabel.text("Cumulative Number of UN Members");

        // Define the clip path for the animation
        svg.append("defs").append("clipPath")
            .attr("id", "chart-clip")
            .append("rect")
            .attr("width", 0)
            .attr("height", height);

        // Create a group for the elements that will be animated
        const chartBody = svg.append("g")
            .attr("class", "chart-body")
            .attr("clip-path", "url(#chart-clip)");

        // Draw the initial state of the area and dots
        const initialYValue = d => d.cumulativeCount;
        const areaGenerator = d3.area().x(d => x(d.year)).y0(height).y1(d => y(initialYValue(d))).curve(d3.curveMonotoneX);
        
        chartBody.append("path")
            .datum(fullData)
            .attr("class", "area")
            .attr("d", areaGenerator);

        r.domain([1, d3.max(fullData, d => d.newMembersCount)]);

        const dots = chartBody.selectAll(".timeline-dot")
            .data(fullData)
            .enter().append("circle")
            .attr("class", "timeline-dot")
            .attr("cx", d => x(d.year))
            .attr("cy", d => y(initialYValue(d)))
            .attr("r", d => r(d.newMembersCount));
            
        // Start the reveal animation
        svg.select("#chart-clip rect")
            .transition()
            .duration(3000) // 3-second animation duration
            .ease(d3.easeLinear)
            .attr("width", width);
            
        // Setup event handlers for dots
        dots.on("mouseover", function(event, d) {
            d3.select(this).raise();
            if (!d3.select(this).classed("selected")) {
                d3.select(this).transition().duration(150).attr('r', r(d.newMembersCount) + 5);
            }
            const tooltipHtml = getTooltipHtml(d);
            tooltip.style("visibility", "visible").html(tooltipHtml);
        })
        .on("mousemove", (event) => {
            tooltip.style("top", (event.pageY - 10) + "px").style("left", (event.pageX + 15) + "px");
        })
        .on("mouseout", function(event, d) {
            if (!d3.select(this).classed("selected")) {
                d3.select(this).transition().duration(150).attr('r', r(d.newMembersCount));
            }
            tooltip.style("visibility", "hidden");
        })
        .on("click", function(event, d) {
            svg.selectAll('.timeline-dot').classed("selected", false).attr("r", d => r(d.newMembersCount));
            d3.select(this).classed("selected", true).attr('r', r(d.newMembersCount) + 5).raise();
            
            const infoHtml = getTooltipHtmlDetails(d);
            selectedInfoPanel.html(infoHtml).classed("hidden", false);
            
            fetchAndDisplayInsights(d);
        });
    }

    function getTooltipHtml(d) {
        const titleColor = activeChartMode === 'cumulative' ? 'text-blue-500' : 'text-green-500';
        return `
            <div class="font-bold text-xl mb-2 ${titleColor}">${d.year}</div>
            <hr class="my-2 border-gray-300 dark:border-gray-600">
            <p><strong>New Members:</strong> ${d.newMembersCount}</p>
            <p><strong>Total Members by end of year:</strong> ${d.cumulativeCount}</p>
        `;
    }

    function getTooltipHtmlDetails(d) {
        const titleColor = activeChartMode === 'cumulative' ? 'text-blue-500' : 'text-green-500';
        return `
            <div class="font-bold text-xl mb-2 ${titleColor}">${d.year}</div>
            <hr class="my-2 border-gray-300 dark:border-gray-600">
            <p><strong>New Members:</strong> ${d.newMembersCount}</p>
            <p><strong>Total Members by end of year:</strong> ${d.cumulativeCount}</p>
            <p class="font-semibold mt-3 mb-1">Countries Admitted:</p>
            <ul class="list-disc list-inside max-h-48 overflow-y-auto text-sm text-gray-700 dark:text-gray-300">
                ${d.countries.map(c => `<li>${c}</li>`).join('')}
            </ul>
        `;
    }

    async function fetchAndDisplayInsights(d) {
        const insightsContainer = document.getElementById('insights-container');
        insightsContainer.classList.remove('hidden');
        document.getElementById('insights-year').textContent = d.year;
        document.getElementById('insights-placeholder').classList.add('hidden');
        document.getElementById('insights-loading').classList.remove('hidden');
        document.getElementById('insights-content').innerHTML = '';
        document.getElementById('insights-error').classList.add('hidden');
        
        insightsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        await fetchGeopoliticalInsights(d.year, d.countries);
    }
    
    // Setup controls
    d3.select('#cumulative-btn').on('click', function() {
        d3.select(this).classed('active', true);
        d3.select('#per-year-btn').classed('active', false);
        updateChart('cumulative');
    });

    d3.select('#per-year-btn').on('click', function() {
        d3.select(this).classed('active', true);
        d3.select('#cumulative-btn').classed('active', false);
        updateChart('perYear');
    });

    d3.select('#search-input').on('keyup', function(event) {
        const searchTerm = event.target.value.trim().toLowerCase();
        svg.selectAll('.timeline-dot').classed("highlighted", false);

        if (searchTerm.length > 2) {
            const matchedYear = fullData.find(d => d.countries.some(c => c.toLowerCase().includes(searchTerm)));
            if (matchedYear) {
                svg.selectAll('.timeline-dot')
                    .filter(d => d.year === matchedYear.year)
                    .classed("highlighted", true)
                    .raise();
            }
        }
    });

    // --- Initial Load ---
    try {
        fullData = processData(csvData);
        drawChart();
    } catch (error) {
        console.error("Error loading or processing data:", error);
        document.getElementById('timeline-chart').innerHTML = `<p class="text-red-500 text-center">An unexpected error occurred. Please check the console for details.</p>`;
    }
});


async function fetchGeopoliticalInsights(year, countries) {
    const prompt = `Assume the persona of a historian. For the year ${year}, provide a concise summary of major geopolitical events and the global climate. The following countries joined the United Nations this year: ${countries.join(', ')}. Situate their admission within the broader historical context by analyzing the key global trends that influenced them joining. Keep the summary concise and accessible. Format the key points in markdown.`;
    
    const chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
    const payload = { contents: chatHistory };
    const apiKey = "%%API_KEY%%";
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`API request failed with status ${response.status}. Response: ${errorBody}`);
        }
        
        const result = await response.json();

        let text = 'No content received from the API.';
        if (result.candidates && result.candidates[0]?.content?.parts?.[0]) {
            text = result.candidates[0].content.parts[0].text;
        } else {
            console.warn("Unexpected API response structure:", result);
            if(result.error) throw new Error(result.error.message);
        }
        
        const formattedText = text
            .split('\n')
            .filter(p => p.trim() !== '')
            .map(p => `<p class="mb-4">${p.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>')}</p>`)
            .join('');

        document.getElementById('insights-content').innerHTML = formattedText;
        
    } catch (error) {
        console.error("Error fetching Gemini insights:", error);
        const errorElement = document.getElementById('insights-error');
        errorElement.classList.remove('hidden');
        errorElement.querySelector('p').textContent = `Sorry, an error occurred while generating insights: ${error.message}. Please check the browser console for more details.`;
        document.getElementById('insights-content').innerHTML = '';
    } finally {
        document.getElementById('insights-loading').classList.add('hidden');
    }
}
