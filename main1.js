const btn = document.getElementById("knowBtn");
const about = document.getElementById("about");
const sections = document.querySelectorAll(".section");

btn.addEventListener("click", () => {
  about.scrollIntoView({ behavior: "smooth" });
});

window.addEventListener("scroll", () => {
  sections.forEach(sec => {
    const rect = sec.getBoundingClientRect();
    if (rect.top < window.innerHeight - 120) {
      sec.classList.add("show");
    }
  });
});
