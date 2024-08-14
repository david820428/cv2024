function getCurrentTimestamp() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

window.onload = function() {
    console.log("Page loaded, starting to fetch stock data...");

    const apiUrl = "https://cors-anywhere.herokuapp.com/https://mis.twse.com.tw/stock/api/getStockInfo.jsp?ex_ch=tse_1229.tw|tse_2355.tw|tse_1605.tw|tse_3059.tw|tse_6202.tw|tse_2376.tw|tse_2034.tw|tse_2002.tw|tse_1210.tw|tse_1307.tw|tse_2441.tw|tse_2387.tw|tse_2103.tw|tse_3532.tw|tse_8341.tw|tse_6770.tw|tse_2421.tw|tse_2498.tw|tse_9930.tw";
    
    console.log("API URL set to:", apiUrl);

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log("API response data received:", data);

            const stockSymbols = ["1229.tw", "2355.tw", "1605.tw", "3059.tw", "6202.tw", "2376.tw", "2034.tw", "2002.tw", "1210.tw", "1307.tw", "2441.tw", "2387.tw", "2103.tw", "3532.tw", "8341.tw", "6770.tw", "2421.tw", "2498.tw", "9930.tw"];
            
            let stockPrices = [];

            stockSymbols.forEach((symbol, index) => {
                const stockPrice_raw = data.msgArray.find(stock => stock.ch === symbol) ;            
                const stockPrice = ((parseFloat(stockPrice_raw.a.split('_')[0]) + parseFloat(stockPrice_raw.b.split('_')[0]))/2).toFixed(2) || "N/A";
                stockPrices[index] = stockPrice;
                console.log(`Extracted stock price for ${symbol}:`, stockPrice);
                document.getElementById(`stockPrice${index + 1}`).textContent = stockPrice;
            });

            //group a
            document.getElementById(`stock1a-price`).textContent = stockPrices[0];
            document.getElementById(`stock2a-price`).textContent = stockPrices[10];
            const marginA = (0.5823*stockPrices[0]+22.1117-stockPrices[10]).toFixed(2);
            document.getElementById(`stock1a-stock2a-margin`).textContent = marginA;
            const minA = parseFloat(document.getElementById('stock1a-stock2a-min').dataset.min);
            const maxA = parseFloat(document.getElementById('stock1a-stock2a-max').dataset.max);
    
            const widthA = ((marginA - minA) / (maxA - minA)) * 100;
            const minProximityA = ((marginA - minA) / (maxA - minA)) * 100;
            const maxProximityA = 100 - minProximityA;
            let colorA = "green";
    
            if (minProximityA <= 10 || maxProximityA <= 10) {
                colorA = "red";
            } else if (minProximityA <= 20 || maxProximityA <= 20) {
                colorA = "yellow";
            }            
            document.getElementById('stock1a-stock2a-bar').style.width = `${widthA}%`;            
            document.getElementById('stock1a-stock2a-bar').style.height = "20px";
            document.getElementById('stock1a-stock2a-bar').style.backgroundColor = colorA;
            document.getElementById('timestamp').textContent = getCurrentTimestamp();

            //group b

            document.getElementById(`stock1b-price`).textContent = stockPrices[1];
            document.getElementById(`stock2b-price`).textContent = stockPrices[11];
            const marginB = (0.9569*stockPrices[1]+11.2938-stockPrices[11]).toFixed(2);
            document.getElementById(`stock1b-stock2b-margin`).textContent = marginB;
            const minB = parseFloat(document.getElementById('stock1b-stock2b-min').dataset.min);
            const maxB = parseFloat(document.getElementById('stock1b-stock2b-max').dataset.max);
    
            const widthB = ((marginB - minB) / (maxB - minB)) * 100;
            const minProximityB = ((marginB - minB) / (maxB - minB)) * 100;
            const maxProximityB = 100 - minProximityB;
            let colorB = "green";
    
            if (minProximityB <= 10 || maxProximityB <= 10) {
                colorB = "red";
            } else if (minProximityB <= 20 || maxProximityB <= 20) {
                colorB = "yellow";
            }            
            document.getElementById('stock1b-stock2b-bar').style.width = `${widthB}%`;            
            document.getElementById('stock1b-stock2b-bar').style.height = "20px";
            document.getElementById('stock1b-stock2b-bar').style.backgroundColor = colorB;
            
            // Group C
            document.getElementById(`stock1c-price`).textContent = stockPrices[2];
            document.getElementById(`stock2c-price`).textContent = stockPrices[12];
            const marginC = (0.3069 * stockPrices[2] + 12.4167 - stockPrices[12]).toFixed(2);
            document.getElementById(`stock1c-stock2c-margin`).textContent = marginC;
            const minC = parseFloat(document.getElementById('stock1c-stock2c-min').dataset.min);
            const maxC = parseFloat(document.getElementById('stock1c-stock2c-max').dataset.max);
            const widthC = ((marginC - minC) / (maxC - minC)) * 100;
            const minProximityC = ((marginC - minC) / (maxC - minC)) * 100;
            const maxProximityC = 100 - minProximityC;
            let colorC = "green";

            if (minProximityC <= 10 || maxProximityC <= 10) {
                colorC = "red";
            } else if (minProximityC <= 20 || maxProximityC <= 20) {
                colorC = "yellow";
            }            
            document.getElementById('stock1c-stock2c-bar').style.width = `${widthC}%`;            
            document.getElementById('stock1c-stock2c-bar').style.height = "20px";
            document.getElementById('stock1c-stock2c-bar').style.backgroundColor = colorC;


            // Group D
            document.getElementById(`stock1d-price`).textContent = stockPrices[3];
            document.getElementById(`stock2d-price`).textContent = stockPrices[13];
            const marginD = (4.1011 * stockPrices[3] + 13.1052 - stockPrices[13]).toFixed(2);
            document.getElementById(`stock1d-stock2d-margin`).textContent = marginD;
            const minD = parseFloat(document.getElementById('stock1d-stock2d-min').dataset.min);
            const maxD = parseFloat(document.getElementById('stock1d-stock2d-max').dataset.max);
            const widthD = ((marginD - minD) / (maxD - minD)) * 100;
            const minProximityD = ((marginD - minD) / (maxD - minD)) * 100;
            const maxProximityD = 100 - minProximityD;
            let colorD = "green";

            if (minProximityD <= 10 || maxProximityD <= 10) {
                colorD = "red";
            } else if (minProximityD <= 20 || maxProximityD <= 20) {
                colorD = "yellow";
            }            
            document.getElementById('stock1d-stock2d-bar').style.width = `${widthD}%`;            
            document.getElementById('stock1d-stock2d-bar').style.height = "20px";
            document.getElementById('stock1d-stock2d-bar').style.backgroundColor = colorD;


            // Group E
            document.getElementById(`stock1e-price`).textContent = stockPrices[4];
            document.getElementById(`stock2e-price`).textContent = stockPrices[14];
            const marginE = (4.4548 * stockPrices[4] - 162.3678 - stockPrices[14]).toFixed(2);
            document.getElementById(`stock1e-stock2e-margin`).textContent = marginE;
            const minE = parseFloat(document.getElementById('stock1e-stock2e-min').dataset.min);
            const maxE = parseFloat(document.getElementById('stock1e-stock2e-max').dataset.max);
            const widthE = ((marginE - minE) / (maxE - minE)) * 100;
            const minProximityE = ((marginE - minE) / (maxE - minE)) * 100;
            const maxProximityE = 100 - minProximityE;
            let colorE = "green";

            if (minProximityE <= 10 || maxProximityE <= 10) {
                colorE = "red";
            } else if (minProximityE <= 20 || maxProximityE <= 20) {
                colorE = "yellow";
            }            
            document.getElementById('stock1e-stock2e-bar').style.width = `${widthE}%`;            
            document.getElementById('stock1e-stock2e-bar').style.height = "20px";
            document.getElementById('stock1e-stock2e-bar').style.backgroundColor = colorE;


            // Group F
            document.getElementById(`stock1f-price`).textContent = stockPrices[4];
            document.getElementById(`stock2f-price`).textContent = stockPrices[15];
            const marginF = (0.4993 * stockPrices[4] - 3.411 - stockPrices[15]).toFixed(2);
            document.getElementById(`stock1f-stock2f-margin`).textContent = marginF;
            const minF = parseFloat(document.getElementById('stock1f-stock2f-min').dataset.min);
            const maxF = parseFloat(document.getElementById('stock1f-stock2f-max').dataset.max);
            const widthF = ((marginF - minF) / (maxF - minF)) * 100;
            const minProximityF = ((marginF - minF) / (maxF - minF)) * 100;
            const maxProximityF = 100 - minProximityF;
            let colorF = "green";

            if (minProximityF <= 10 || maxProximityF <= 10) {
                colorF = "red";
            } else if (minProximityF <= 20 || maxProximityF <= 20) {
                colorF = "yellow";
            }            
            document.getElementById('stock1f-stock2f-bar').style.width = `${widthF}%`;            
            document.getElementById('stock1f-stock2f-bar').style.height = "20px";
            document.getElementById('stock1f-stock2f-bar').style.backgroundColor = colorF;


            // Group G
            document.getElementById(`stock1g-price`).textContent = stockPrices[5];
            document.getElementById(`stock2g-price`).textContent = stockPrices[16];
            const marginG = (0.3764 * stockPrices[5] + 5.2874 - stockPrices[16]).toFixed(2);
            document.getElementById(`stock1g-stock2g-margin`).textContent = marginG;
            const minG = parseFloat(document.getElementById('stock1g-stock2g-min').dataset.min);
            const maxG = parseFloat(document.getElementById('stock1g-stock2g-max').dataset.max);
            const widthG = ((marginG - minG) / (maxG - minG)) * 100;
            const minProximityG = ((marginG - minG) / (maxG - minG)) * 100;
            const maxProximityG = 100 - minProximityG;
            let colorG = "green";

            if (minProximityG <= 10 || maxProximityG <= 10) {
                colorG = "red";
            } else if (minProximityG <= 20 || maxProximityG <= 20) {
                colorG = "yellow";
            }            
            document.getElementById('stock1g-stock2g-bar').style.width = `${widthG}%`;            
            document.getElementById('stock1g-stock2g-bar').style.height = "20px";
            document.getElementById('stock1g-stock2g-bar').style.backgroundColor = colorG;


            // Group H
            document.getElementById(`stock1h-price`).textContent = stockPrices[6];
            document.getElementById(`stock2h-price`).textContent = stockPrices[17];
            const marginH = (3.3903 * stockPrices[6] - 39.6536 - stockPrices[17]).toFixed(2);
            document.getElementById(`stock1h-stock2h-margin`).textContent = marginH;
            const minH = parseFloat(document.getElementById('stock1h-stock2h-min').dataset.min);
            const maxH = parseFloat(document.getElementById('stock1h-stock2h-max').dataset.max);
            const widthH = ((marginH - minH) / (maxH - minH)) * 100;
            const minProximityH = ((marginH - minH) / (maxH - minH)) * 100;
            const maxProximityH = 100 - minProximityH;
            let colorH = "green";

            if (minProximityH <= 10 || maxProximityH <= 10) {
                colorH = "red";
            } else if (minProximityH <= 20 || maxProximityH <= 20) {
                colorH = "yellow";
            }            
            document.getElementById('stock1h-stock2h-bar').style.width = `${widthH}%`;            
            document.getElementById('stock1h-stock2h-bar').style.height = "20px";
            document.getElementById('stock1h-stock2h-bar').style.backgroundColor = colorH;


            // Group I
            document.getElementById(`stock1i-price`).textContent = stockPrices[7];
            document.getElementById(`stock2i-price`).textContent = stockPrices[17];
            const marginI = (2.2956 * stockPrices[7] - 9.0379 - stockPrices[17]).toFixed(2);
            document.getElementById(`stock1i-stock2i-margin`).textContent = marginI;
            const minI = parseFloat(document.getElementById('stock1i-stock2i-min').dataset.min);
            const maxI = parseFloat(document.getElementById('stock1i-stock2i-max').dataset.max);
            const widthI = ((marginI - minI) / (maxI - minI)) * 100;
            const minProximityI = ((marginI - minI) / (maxI - minI)) * 100;
            const maxProximityI = 100 - minProximityI;
            let colorI = "green";

            if (minProximityI <= 10 || maxProximityI <= 10) {
                colorI = "red";
            } else if (minProximityI <= 20 || maxProximityI <= 20) {
                colorI = "yellow";
            }            
            document.getElementById('stock1i-stock2i-bar').style.width = `${widthI}%`;            
            document.getElementById('stock1i-stock2i-bar').style.height = "20px";
            document.getElementById('stock1i-stock2i-bar').style.backgroundColor = colorI;


            // Group J
            document.getElementById(`stock1j-price`).textContent = stockPrices[8];
            document.getElementById(`stock2j-price`).textContent = stockPrices[10];
            const marginJ = (0.8536 * stockPrices[8] + 11.3958 - stockPrices[10]).toFixed(2);
            document.getElementById(`stock1j-stock2j-margin`).textContent = marginJ;
            const minJ = parseFloat(document.getElementById('stock1j-stock2j-min').dataset.min);
            const maxJ = parseFloat(document.getElementById('stock1j-stock2j-max').dataset.max);
            const widthJ = ((marginJ - minJ) / (maxJ - minJ)) * 100;
            const minProximityJ = ((marginJ - minJ) / (maxJ - minJ)) * 100;
            const maxProximityJ = 100 - minProximityJ;
            let colorJ = "green";

            if (minProximityJ <= 10 || maxProximityJ <= 10) {
                colorJ = "red";
            } else if (minProximityJ <= 20 || maxProximityJ <= 20) {
                colorJ = "yellow";
            }            
            document.getElementById('stock1j-stock2j-bar').style.width = `${widthJ}%`;            
            document.getElementById('stock1j-stock2j-bar').style.height = "20px";
            document.getElementById('stock1j-stock2j-bar').style.backgroundColor = colorJ;


            // Group K
            document.getElementById(`stock1k-price`).textContent = stockPrices[9];
            document.getElementById(`stock2k-price`).textContent = stockPrices[18];
            const marginK = (1.8797 * stockPrices[9] + 7.9394 - stockPrices[18]).toFixed(2);
            document.getElementById(`stock1k-stock2k-margin`).textContent = marginK;
            const minK = parseFloat(document.getElementById('stock1k-stock2k-min').dataset.min);
            const maxK = parseFloat(document.getElementById('stock1k-stock2k-max').dataset.max);
            const widthK = ((marginK - minK) / (maxK - minK)) * 100;
            const minProximityK = ((marginK - minK) / (maxK - minK)) * 100;
            const maxProximityK = 100 - minProximityK;
            let colorK = "green";

            if (minProximityK <= 10 || maxProximityK <= 10) {
                colorK = "red";
            } else if (minProximityK <= 20 || maxProximityK <= 20) {
                colorK = "yellow";
            }            
            document.getElementById('stock1k-stock2k-bar').style.width = `${widthK}%`;            
            document.getElementById('stock1k-stock2k-bar').style.height = "20px";
            document.getElementById('stock1k-stock2k-bar').style.backgroundColor = colorK;
            

        })
        .catch(error => {
            console.error('Error occurred during fetch:', error);
            stockSymbols.forEach((_, index) => {
                document.getElementById(`stockPrice${index + 1}`).textContent = "Error loading data";
            });
        });  

};


document.addEventListener("DOMContentLoaded", function() {
    const rows = document.querySelectorAll("tbody tr");
    

    rows.forEach(row => {       
        const min = parseFloat(row.getElementById('stock1a-stock2a-min').dataset.min);
        const max = parseFloat(row.getElementById('stock1a-stock2a-max').dataset.max);
        const bar = row.getElementById('stock1a-stock2a-bar');        
        console.log(min)

        // Calculate the width of the bar as a percentage of the range between min and max
        const width = ((margin - min) / (max - min)) * 100;

        // Calculate the percentage distance from the minimum and maximum
        const minProximity = ((margin - min) / (max - min)) * 100;
        const maxProximity = 100 - minProximity;

        // Determine the color based on proximity to min or max
        let color = "green"; // Default color

        if (minProximity <= 10 || maxProximity <= 10) {
            color = "red"; // Close to min or max
        } else if (minProximity <= 20 || maxProximity <= 20) {
            color = "yellow"; // Near to min or max
        }

        // Set the style for the bar
        bar.style.width = `${width}%`;
        bar.style.height = "20px"; // Adjust the height as needed
        bar.style.backgroundColor = color; // Set the determined color
    });
});
