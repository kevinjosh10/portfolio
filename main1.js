const knowBtn = document.getElementById("know-btn");
const sections = document.querySelectorAll(".about, .skills, .projects, .roadmap, .future, .contact");

knowBtn.addEventListener("click", () => {
  const zoomLetter = document.querySelector(".zoom-letter");
  zoomLetter.style.transition = "transform 1s ease";
  zoomLetter.style.transform = "scale(8) translateZ(50px)";

  setTimeout(() => {
    sections.forEach(sec => sec.classList.remove("hidden"));
    zoomLetter.style.transform = "scale(1) translateZ(0)";
  }, 1000);
});
