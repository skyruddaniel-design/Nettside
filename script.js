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

// Karusell-scrolling (Blaer hele visningen videre)
// const track = document.getElementById('carouselTrack');
// const leftBtn = document.getElementById('slideLeft');
// const rightBtn = document.getElementById('slideRight');

// if (track && leftBtn && rightBtn) {
//   leftBtn.addEventListener('click', () => {
//     track.scrollBy({ left: -track.clientWidth, behavior: 'smooth' });
//   });

//   rightBtn.addEventListener('click', () => {
//     track.scrollBy({ left: track.clientWidth, behavior: 'smooth' });
//   });
// }

const root = document.documentElement;

let targetAngle = 0;
let currentAngle = 0;

window.addEventListener("pointermove", (event) => {
  if (event.pointerType !== "mouse") return;

  const lensX = window.innerWidth / 2;

  const lensY =
    parseFloat(
      getComputedStyle(root).getPropertyValue("--lens-y")
    ) || 100;

  const dx = event.clientX - lensX;
  const dy = event.clientY - lensY;

  // 0° = rett ned
  // positiv = høyre
  // negativ = venstre
  let angle = Math.atan2(dx, dy) * (180 / Math.PI);

  // Maksimal svinging
  angle = Math.max(-25, Math.min(25, angle));

  targetAngle = angle;
});

function animateProjector() {
  currentAngle += (targetAngle - currentAngle) * 0.08;

  root.style.setProperty(
    "--projector-angle",
    `${-currentAngle}deg`
  );

  root.style.setProperty(
    "--beam-angle",
    `${-currentAngle}deg`
  );

  requestAnimationFrame(animateProjector);
}

animateProjector();

/* =========================================================
   UENDELIG FILMRULL
   ========================================================= */

const carouselTrack = document.querySelector(".carousel-track");

if (carouselTrack) {
  const groups = carouselTrack.querySelectorAll(".carousel-group");

  if (groups.length >= 2) {
    const firstGroup = groups[0];

    let position = 0;
    let lastTime = performance.now();

    const speed = 36; // piksler per sekund

    function getGroupWidth() {
      return firstGroup.getBoundingClientRect().width;
    }

    function animateCarousel(time) {
      const delta = Math.min(time - lastTime, 50);
      lastTime = time;

      const groupWidth = getGroupWidth();

      if (groupWidth > 0) {
        position -= speed * (delta / 1000);

        /*
         * Når gruppe 1 er helt borte,
         * flytter vi den nøyaktig én gruppebredde tilbake.
         *
         * Gruppe 2 ligger allerede bak den,
         * så dette er usynlig.
         */
        if (position <= -groupWidth) {
          position += groupWidth;
        }

        carouselTrack.style.transform =
          `translate3d(${position}px, 0, 0)`;
      }

      requestAnimationFrame(animateCarousel);
    }

    /*
     * Start først etter at siden er lastet.
     * Da har bildene fått riktig størrelse.
     */
    window.addEventListener("load", () => {
      position = 0;
      lastTime = performance.now();
      requestAnimationFrame(animateCarousel);
    });
  }
}
