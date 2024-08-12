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
                const stockPrice = data.msgArray.find(stock => stock.ch === symbol)?.pz || "N/A";
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