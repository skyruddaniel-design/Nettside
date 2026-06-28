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

  const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    entry.target.classList.toggle("show", entry.isIntersecting);
  });
}, {
  threshold: 0,
  rootMargin: "0px 0px -15% 0px"
});

  sections.forEach((section) => observer.observe(section));
});
const video = document.getElementById("heroVideo");
const btn = document.getElementById("soundBtn");
const icon = document.getElementById("soundIcon");

let muted = true;

function renderIcon() {
  icon.innerHTML = muted
    ? `
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M11 5L6 9H2v6h4l5 4V5z" fill="white"/>
        <path d="M16 9l5 6M21 9l-5 6" stroke="white" stroke-width="2"/>
      </svg>
    `
    : `
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M11 5L6 9H2v6h4l5 4V5z" fill="white"/>
        <path d="M15 9a4 4 0 010 6" stroke="white" stroke-width="2"/>
        <path d="M17 7a7 7 0 010 10" stroke="white" stroke-width="2"/>
      </svg>
    `;
}

btn.addEventListener("click", async () => {
  muted = !muted;
  video.muted = muted;

  if (!muted) await video.play();

  renderIcon();
});

// initial state
renderIcon();
