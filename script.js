// Display current date
const dateElement = document.getElementById('date');
const today = new Date();
dateElement.textContent = today.toLocaleDateString();
