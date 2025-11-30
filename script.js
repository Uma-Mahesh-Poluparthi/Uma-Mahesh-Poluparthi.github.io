/* ---------------------------------------------
   SCROLL PROGRESS BAR
---------------------------------------------- */
window.addEventListener("scroll", () => {
    const scrollTop = document.documentElement.scrollTop;
    const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const progress = (scrollTop / height) * 100;

    document.getElementById("scroll-progress").style.width = progress + "%";
});

/* ---------------------------------------------
   DARK MODE TOGGLE
---------------------------------------------- */
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    themeToggle.textContent = document.body.classList.contains("dark")
        ? "☀️"
        : "🌙";
});

/* ---------------------------------------------
   TYPING EFFECT
---------------------------------------------- */
const typingElement = document.getElementById("typing");
const typingText = "Multi-NDT PCN Level II Technician";
let typingIndex = 0;

function typingEffect() {
    typingElement.textContent = typingText.slice(0, typingIndex++);

    if (typingIndex <= typingText.length) {
        setTimeout(typingEffect, 70);
    }
}

typingEffect();

/* ---------------------------------------------
   COUNTERS
---------------------------------------------- */
const counters = document.querySelectorAll(".counter");
let counterStarted = false;

function startCounters() {
    counters.forEach(counter => {
        let target = +counter.getAttribute("data-target");
        let current = 0;

        function update() {
            if (current < target) {
                current += target / 70;
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(update);
            } else {
                counter.textContent = target;
            }
        }

        update();
    });
}

window.addEventListener("scroll", () => {
    const hero = document.querySelector(".counter-row");
    const rect = hero.getBoundingClientRect();

    if (rect.top < window.innerHeight - 100 && !counterStarted) {
        counterStarted = true;
        startCounters();
    }
});

/* ---------------------------------------------
   GALLERY AUTO-LOAD
---------------------------------------------- */
const galleryImages = ["img1.jpg", "img2.jpg", "img3.jpg", "img4.jpg"];
const galleryGrid = document.getElementById("gallery-grid");

galleryImages.forEach(name => {
    const img = document.createElement("img");
    img.src = `assets/gallery/${name}`;
    img.classList.add("gallery-img");

    img.onclick = () => openLightbox(img.src);

    galleryGrid.appendChild(img);
});

/* ---------------------------------------------
   LIGHTBOX
---------------------------------------------- */
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

function openLightbox(src) {
    lightboxImg.src = src;
    lightbox.style.display = "flex";
}

lightbox.addEventListener("click", () => {
    lightbox.style.display = "none";
});
