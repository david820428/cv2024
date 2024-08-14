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
