const bioInput = document.getElementById("bio-input");
const saveBioBtn = document.getElementById("save-bio-btn");
const changeBioBtn = document.getElementById("change-bio-btn");

// Load saved bio and buttons
const savedBio = localStorage.getItem("studentBio");

  bioInput.value = savedBio;
  bioInput.disabled = true;
  saveBioBtn.style.display = "none";
  changeBioBtn.style.display = "inline-block";

// Takes Bio input 
bioInput.addEventListener("input", () => {
  const bio = bioInput.value.trim();
});

saveBioBtn.addEventListener("click", () => {
  const bio = bioInput.value.trim();
  
 
    localStorage.setItem("studentBio", bio);
    bioInput.disabled = true;
    bioInput.style.border = "1px solid rgba(255, 255, 255, 0.1)";
    saveBioBtn.style.display = "none";
    changeBioBtn.style.display = "inline-block";
    alert("Bio saved!");

});

// Enable input for editing on Change button click
changeBioBtn.addEventListener("click", () => {
  bioInput.disabled = false;
  bioInput.style.border = "1px solid rgba(255, 255, 255, 0.6)";
  saveBioBtn.style.display = "inline-block";
  changeBioBtn.style.display = "none";
  saveBioBtn.disabled = false;
});
