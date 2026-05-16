const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");

const setHeaderState = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 12);
};

navToggle.addEventListener("click", () => {
  nav.classList.toggle("is-open");
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
  });
});

window.addEventListener("scroll", setHeaderState, { passive: true });
setHeaderState();

const form = document.querySelector(".contact-form");

const result = document.getElementById("result");

form.addEventListener("submit", async function(e) {

  e.preventDefault();

  const formData = new FormData(form);

  const response = await fetch(form.action, {

    method: "POST",

    body: formData

  });

  const data = await response.json();

  if (data.success) {

    result.innerHTML = "Meldingen ble sendt!";

    form.reset();

  } else {

    result.innerHTML = "Noe gikk galt.";

  }

});

document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".section");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("show", entry.isIntersecting);
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -20% 0px"
    }
  );

  sections.forEach((section) => observer.observe(section));
});