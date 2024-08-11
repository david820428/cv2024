window.onload = function() {
    console.log("Page loaded, starting to fetch stock data...");

    const apiUrl = "https://cors-anywhere.herokuapp.com/https://mis.twse.com.tw/stock/api/getStockInfo.jsp?ex_ch=tse_2330.tw|tse_0050.tw";
    
    console.log("API URL set to:", apiUrl);

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log("API response data received:", data);

            const stock2330 = data.msgArray.find(stock => stock.ch === "2330.tw").pz;
            const stock0050 = data.msgArray.find(stock => stock.ch === "0050.tw").pz;

            console.log("Extracted stock price for 2330.TW:", stock2330);
            console.log("Extracted stock price for 0050.TW:", stock0050);

            document.getElementById("stockPrice1").textContent = stock2330;
            document.getElementById("stockPrice2").textContent = stock0050;
        })
        .catch(error => {
            console.error('Error occurred during fetch:', error);
            document.getElementById("stockPrice1").textContent = "Error loading data";
            document.getElementById("stockPrice2").textContent = "Error loading data";
        });
};