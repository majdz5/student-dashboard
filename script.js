const toggleBtn = document.getElementById("toggleBtn");
const sidePanel = document.getElementById("sidePanel");

toggleBtn.addEventListener("click", () => {
    // Toggle the 'expanded' class
    sidePanel.classList.toggle("expanded");

    // Change arrow direction
    const isExpanded = sidePanel.classList.contains("expanded");
    toggleBtn.innerHTML = isExpanded ? "&#9654;" : "&#9664;";
});
