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

/* =========================================================
   UTVALGTE PROSJEKTER – SLIDESHOW
   ========================================================= */

const projects = [
  {
    title: "Det Siste Stykket - Kortfilm",
    description:
      "Adrian fyller tjue år og ønsker en hyggelig og avslappet feiring, men bursdagsønsket hans går raskt i knus. Filmen er regissert, skrevet og klippet av meg.",
    image: "assets/poster 2.0.jpg",
    alt: "Forhåndsvisning av Det siste stykket",
    link: "https://youtu.be/gF-GDMJKbxg?si=iU4TXom2twHANo7O"
  },
  {
    title: "Better Call Saul - Edit",
    description:
      "En avansert edit med fokus på motion graphics og lyddesign.",
    image: "assets/Saul edit 2.0.png",
    alt: "Forhåndsvisning av Better Call Saul Edit",
    link: "https://www.youtube.com/shorts/bmN7Iz0Ii8Y"
  },
  {
    title: "Better Call Saul - Edit",
    description:
      "En edit jeg lagde nylig som jeg ble svært fornøyd med.",
    image: "assets/Saul Poster.png",
    alt: "Forhåndsvisning av Better Call Saul Edit",
    link: "https://www.youtube.com/shorts/VQuHyTOxk5s"
  }
];

const featuredSlider = document.querySelector("[data-featured-slider]");

if (featuredSlider) {
  const image = featuredSlider.querySelector("[data-project-image]");
  const link = featuredSlider.querySelector("[data-project-link]");
  const title = featuredSlider.querySelector("[data-project-title]");
  const description = featuredSlider.querySelector(
    "[data-project-description]"
  );

  const prevButton = featuredSlider.querySelector("[data-slider-prev]");
  const nextButton = featuredSlider.querySelector("[data-slider-next]");
  const dotsContainer = document.querySelector("[data-slider-dots]");
  const sliderContent = featuredSlider.querySelector(".slider-content");

  let currentProject = 0;

  function updateProject(index, direction = 1) {
    currentProject =
      (index + projects.length) % projects.length;

    const project = projects[currentProject];

    // Oppdater innhold
    image.src = project.image;
    image.alt = project.alt;

    link.href = project.link;

    title.textContent = project.title;
    description.textContent = project.description;

    // Animasjon
    sliderContent.style.animation = "none";
    sliderContent.offsetHeight;

    sliderContent.style.animation =
      direction >= 0
        ? "featured-slide-in 0.45s ease"
        : "featured-slide-in-reverse 0.45s ease";

    // Oppdater aktive prikker
    const dots = dotsContainer.querySelectorAll(".slider-dot");

    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle(
        "is-active",
        dotIndex === currentProject
      );

      dot.setAttribute(
        "aria-current",
        dotIndex === currentProject ? "true" : "false"
      );
    });
  }

  // Lag prikker
  projects.forEach((project, index) => {
    const dot = document.createElement("button");

    dot.type = "button";
    dot.className = "slider-dot";
    dot.setAttribute(
      "aria-label",
      `Vis prosjekt ${index + 1}: ${project.title}`
    );

    dot.addEventListener("click", () => {
      const direction =
        index >= currentProject ? 1 : -1;

      updateProject(index, direction);
    });

    dotsContainer.appendChild(dot);
  });

  // Forrige
  prevButton.addEventListener("click", () => {
    updateProject(currentProject - 1, -1);
  });

  // Neste
  nextButton.addEventListener("click", () => {
    updateProject(currentProject + 1, 1);
  });

  // Tastatur
  document.addEventListener("keydown", (event) => {
    // Ikke bruk piltastene hvis brukeren skriver i et felt
    const activeElement = document.activeElement;

    if (
      activeElement &&
      (
        activeElement.tagName === "INPUT" ||
        activeElement.tagName === "TEXTAREA" ||
        activeElement.tagName === "SELECT"
      )
    ) {
      return;
    }

    if (event.key === "ArrowLeft") {
      updateProject(currentProject - 1, -1);
    }

    if (event.key === "ArrowRight") {
      updateProject(currentProject + 1, 1);
    }
  });

  // Touch / swipe på mobil
  let touchStartX = 0;
  let touchEndX = 0;

  featuredSlider.addEventListener(
    "touchstart",
    (event) => {
      touchStartX = event.changedTouches[0].screenX;
    },
    { passive: true }
  );

  featuredSlider.addEventListener(
    "touchend",
    (event) => {
      touchEndX = event.changedTouches[0].screenX;

      const swipeDistance =
        touchEndX - touchStartX;

      if (Math.abs(swipeDistance) < 50) {
        return;
      }

      if (swipeDistance < 0) {
        // Sveip venstre → neste
        updateProject(currentProject + 1, 1);
      } else {
        // Sveip høyre → forrige
        updateProject(currentProject - 1, -1);
      }
    },
    { passive: true }
  );

  // Start på første prosjekt
  updateProject(0, 1);
}

/* =========================================================
   ØVRIG ARBEID – PORTFØLJE
   ========================================================= */

const portfolioProjects = [
  {
    title: "Ai tar over verden",
    description: "Amandus-nominert kortfilm",
    image: "assets/Ai.png",
    alt: "Ai tar over verden",
    link: "https://www.youtube.com/watch?v=F51tHfCnojc&t=192s"
  },

  {
    title: "Redigeringskonto",
    description: "TikTok-konto hvor jeg publiserer fan edits.",
    image: "assets/PB.png",
    alt: "Redigeringskonto",
    link: "https://www.tiktok.com/@pappaboyz"
  },

  {
    title: "En hvit jul",
    description: "En komedie-kortfilm.",
    image: "assets/Hvit jul.png",
    alt: "En hvit jul",
    link: "https://youtu.be/Zszz-3rVFCc?si=DkiHmW8J5_3hd5F8"
  },

  {
    title: "Manuskriptene mine",
    description: "Noen utvalgte manuskripter jeg har laget.",
    image: "assets/Manus.png",
    alt: "Manuskriptene mine",
    link: "https://drive.google.com/drive/folders/1fmLmk7ubljVRsA1I4ckWvYy8G2GvhHz9?usp=sharing"
  },
   {
    title: "Better Call Saul - Edit",
    description:
      "En edit jeg lagde nylig som jeg ble svært fornøyd med.",
    image: "assets/Saul Poster.png",
    alt: "Forhåndsvisning av Better Call Saul Edit",
    link: "https://www.youtube.com/shorts/VQuHyTOxk5s"
  },
  {
    title: "Det Siste Stykket - Kortfilm",
    description:
      "Kortfilmen jeg er mest stolt av.",
    image: "assets/poster 2.0.jpg",
    alt: "Forhåndsvisning av Det siste stykket",
    link: "https://youtu.be/gF-GDMJKbxg?si=iU4TXom2twHANo7O"
  },
];


const portfolioTrack = document.getElementById("portfolioTrack");


if (portfolioTrack) {

  /*
   * Lager én filmrull-gruppe.
   */
  function createPortfolioGroup() {

    const group = document.createElement("div");

    group.className = "carousel-group";

    // Øvre filmhull
    const topHoles = document.createElement("div");

    topHoles.className =
      "film-holes film-holes-top";

    group.appendChild(topHoles);


    // Lag alle prosjektene
    portfolioProjects.forEach((project) => {

      const card = document.createElement("a");

      card.className = "work-card";

      card.href = project.link;

      card.target = "_blank";

      card.rel = "noopener noreferrer";


      card.innerHTML = `
        <div class="work-thumbnail">

          <img
            src="${project.image}"
            alt="${project.alt}"
          >

          <div class="play-badge">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="#000"
              aria-hidden="true"
            >
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>

        </div>

        <div class="work-info">

          <h3>${project.title}</h3>

          <p>${project.description}</p>

        </div>
      `;


      group.appendChild(card);

    });


    // Nedre filmhull
    const bottomHoles = document.createElement("div");

    bottomHoles.className =
      "film-holes film-holes-bottom";

    group.appendChild(bottomHoles);


    return group;
  }


  /*
   * Vi lager to identiske grupper.
   *
   * Gruppe 2 ligger rett bak gruppe 1,
   * slik at filmrullen kan gå i loop.
   */
  const group1 = createPortfolioGroup();

  const group2 = createPortfolioGroup();


  portfolioTrack.appendChild(group1);
  portfolioTrack.appendChild(group2);


  /* =======================================================
     UENDELIG SCROLL
     ======================================================= */

  let position = 0;
  let lastTime = performance.now();

  const speed = 36;


  function getGroupWidth() {
    return group1.getBoundingClientRect().width;
  }


  function animatePortfolio(time) {

    const delta =
      Math.min(time - lastTime, 50);

    lastTime = time;


    const groupWidth =
      getGroupWidth();


    if (groupWidth > 0) {

      position -=
        speed * (delta / 1000);


      if (position <= -groupWidth) {

        position += groupWidth;

      }


      portfolioTrack.style.transform =
        `translate3d(${position}px, 0, 0)`;

    }


    requestAnimationFrame(
      animatePortfolio
    );
  }


  window.addEventListener("load", () => {

    position = 0;

    lastTime = performance.now();

    requestAnimationFrame(
      animatePortfolio
    );

  });

}

/* =========================================================
   RANDOM KAMERABLITZ – FLERE SAMTIDIG
   ========================================================= */

const cameraFlash = document.querySelector(".camera-flash");

function createFlash() {
  if (!cameraFlash) return;

  const flash = document.createElement("div");
  flash.className = "camera-flash-item";

  // Tilfeldig plassering
  flash.style.left = `${Math.random() * 100}%`;
  flash.style.top = `${Math.random() * 100}%`;

  // Tilfeldig størrelse
  const size = Math.random() * 350 + 1000;
  flash.style.width = `${size}px`;
  flash.style.height = `${size}px`;

  // Litt tilfeldig intensitet
  flash.style.setProperty(
    "--flash-opacity",
    (Math.random() * 0.35 + 0.35).toFixed(2)
  );

  cameraFlash.appendChild(flash);

  // Fjern etter animasjonen
  setTimeout(() => {
    flash.remove();
  }, 280);
}



function burst() {
  // 1–3 blitz samtidig
  const amount = Math.floor(Math.random() * 3) + 1;

  for (let i = 0; i < amount; i++) {
    setTimeout(
      createFlash,
      Math.random() * 250
    );
  }

  // Kortere og jevnere pause
  const next =
    Math.random() * 1200 + 2000;
  setTimeout(burst, next);
}



// Start
setTimeout(burst, 1500);
