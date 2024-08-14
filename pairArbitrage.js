window.onload = function() {
    console.log("Page loaded, starting to fetch stock data...");

    const apiUrl = "https://cors-anywhere.herokuapp.com/https://mis.twse.com.tw/stock/api/getStockInfo.jsp?ex_ch=tse_1229.tw|tse_2355.tw|tse_1605.tw|tse_3059.tw|tse_6202.tw|tse_2376.tw|tse_2034.tw|tse_2002.tw|tse_1210.tw|tse_1307.tw|tse_2441.tw|tse_2387.tw|tse_2103.tw|tse_3532.tw|tse_8341.tw|tse_6770.tw|tse_2421.tw|tse_2498.tw|tse_9930.tw";
    
    console.log("API URL set to:", apiUrl);

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log("API response data received:", data);

            const stockSymbols = ["1229.tw", "2355.tw", "1605.tw", "3059.tw", "6202.tw", "2376.tw", "2034.tw", "2002.tw", "1210.tw", "1307.tw", "2441.tw", "2387.tw", "2103.tw", "3532.tw", "8341.tw", "6770.tw", "2421.tw", "2498.tw", "9930.tw"];
            
            stockSymbols.forEach((symbol, index) => {
                const stockPrice_raw = data.msgArray.find(stock => stock.ch === symbol) ;
                console.log(stockPrice_raw);
                console.log(stockPrice_raw.a.split('_')[0]);                
                const stockPrice = ((parseFloat(stockPrice_raw.a.split('_')[0]) + parseFloat(stockPrice_raw.b.split('_')[0]))/2).toFixed(2) || "N/A";
                console.log(`Extracted stock price for ${symbol}:`, stockPrice);
                document.getElementById(`stockPrice${index + 1}`).textContent = stockPrice;
            });
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
        const stock1Price = parseFloat(row.querySelector('td:nth-child(3)').dataset.price);
        const stock2Price = parseFloat(row.querySelector('td:nth-child(4)').dataset.price);
        const margin = Math.abs(stock1Price - stock2Price);
        const min = parseFloat(row.querySelector('td:nth-child(6)').dataset.min);
        const max = parseFloat(row.querySelector('td:nth-child(7)').dataset.max);
        const bar = row.querySelector('.bar');
        const marginCell = row.querySelector('.current-margin');

        // Set the margin value in the margin cell
        marginCell.textContent = margin.toFixed(2);

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
