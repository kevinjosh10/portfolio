const btn = document.getElementById("knowBtn");
const content = document.querySelector(".content");

btn.addEventListener("click", () => {
  content.classList.remove("hidden");
  content.scrollIntoView({ behavior: "smooth" });
});
