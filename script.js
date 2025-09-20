
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

const contactButton = document.getElementById("contactButton");
contactButton.addEventListener("click", () => {
  window.location.hash = "#experience";
});
