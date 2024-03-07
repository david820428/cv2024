const form = document.getElementById("accountForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const messageInput = document.getElementById("message");

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const data = {
    name: nameInput.value,
    email: emailInput.value,
    phone: phoneInput.value,
    message: messageInput.value
  };

  // Save data to JSON file (replace with your actual saving logic)
  saveData(data);

  // Clear form after submission
  form.reset();
});

// Function to save data to a JSON file in the "/json" folder
function saveData(data) {
  try {
    const fs = require('fs'); // Import the Node.js file system module
    const directoryPath = './json'; // Path to the directory where you want to save the file
    const fileName = 'account.json'; // Name of the file

    // Write the data to the JSON file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2)); // Indent for readability

    console.log('Data saved successfully to:', filePath);
  } catch (error) {
    console.error('Error saving data:', error);
    // Handle any errors appropriately, e.g., send error notifications
  }
}