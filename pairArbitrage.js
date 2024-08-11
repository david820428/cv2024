window.onload = function() {
    console.log("Page loaded, starting to fetch stock data...");

    const apiUrl = "https://cors-anywhere.herokuapp.com/http://mis.twse.com.tw/stock/api/getStockInfo.jsp?ex_ch=tse_2330.tw";
    
    console.log("API URL set to:", apiUrl);

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log("API response data received:", data);
            const stockInfo = data.msgArray[0].pz; 
            console.log("Extracted stock price (pz):", stockInfo);
            document.getElementById("stockPrice").textContent = stockInfo;
        })
        .catch(error => {
            console.error('Error occurred during fetch:', error);
            document.getElementById("stockPrice").textContent = "Error loading data";
        });
};