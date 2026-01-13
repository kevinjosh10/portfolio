const btn = document.getElementById("knowBtn");
const aboutSection = document.getElementById("about");
const sections = document.querySelectorAll(".section");

btn.addEventListener("click", () => {
  aboutSection.scrollIntoView({ behavior: "smooth" });

  sections.forEach((sec, i) => {
    setTimeout(() => {
      sec.classList.add("show");
    }, i * 200);
  });
});

// Reveal on scroll
window.addEventListener("scroll", () => {
  sections.forEach(sec => {
    const rect = sec.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      sec.classList.add("show");
    }
  });
});
