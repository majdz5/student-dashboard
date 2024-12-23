// Display current date
const dateElement = document.getElementById('date');
const today = new Date();
dateElement.textContent = today.toLocaleDateString();

const floatingBtn = document.querySelector('.floating-btn');
const sidebar = document.querySelector('.sidebar');
const plussign = document.querySelector('.plus-icon');

floatingBtn.addEventListener('click', () => {
  sidebar.classList.toggle('open');
  floatingBtn.classList.toggle('open');
  plussign.classList.toggle('clicked');

});