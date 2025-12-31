
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

const contactButton = document.getElementById("contactButton");
if (contactButton) {
  contactButton.addEventListener("click", () => {
    window.location.hash = "#socials";
  });
}

// const resumeButton = document.getElementById("resumeButton");
// if (resumeButton) {
//   resumeButton.addEventListener("click", (e) => {
//     e.preventDefault();
//     // Placeholder for resume link - user will add their resume PDF link
//     // resumeButton.href = "path/to/resume.pdf";
//     alert("Resume download link will be added here. Please update the href in the HTML.");
//   });
// }
