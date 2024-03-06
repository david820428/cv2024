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

function saveData(data) {
  // Replace this with your actual logic to save data to a JSON file
  // This example just shows a basic structure for demonstration
  console.log("Saving data:", data);
}