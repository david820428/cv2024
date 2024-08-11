window.onload = function() {
    const apiUrl = "http://mis.twse.com.tw/stock/api/getStockInfo.jsp?ex_ch=tse_2330.tw";

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const stockInfo = data.msgArray[0].pz; // Extracting the "pz" value
            document.getElementById("stockPrice").textContent = stockInfo; // Displaying the "pz" value
        })
        .catch(error => {
            console.error('Error fetching the stock data:', error);
            document.getElementById("stockPrice").textContent = "Error loading data";
        });
};