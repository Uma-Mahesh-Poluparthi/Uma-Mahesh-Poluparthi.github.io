/* ============================================================
   ACTIVE SIDEBAR LINK ON SCROLL
============================================================ */
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 180;

        if (scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");

        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
});


/* ============================================================
   MOBILE SIDEBAR TOGGLE
============================================================ */
function toggleMenu() {
    document.getElementById("sidebar").classList.toggle("show");
}


/* ============================================================
   CERTIFICATE CAROUSEL
============================================================ */
function moveCert(direction) {
    const carousel = document.getElementById("certCarousel");
    carousel.scrollBy({
        left: direction * 350,
        behavior: "smooth"
    });
}


/* ============================================================
   PDF VIEWER
============================================================ */
function openPDF(path) {
    const overlay = document.getElementById("pdfOverlay");
    const frame = document.getElementById("pdfFrame");

    frame.src = path;
    overlay.style.display = "flex";
}

function closePDF() {
    const overlay = document.getElementById("pdfOverlay");
    const frame = document.getElementById("pdfFrame");

    overlay.style.display = "none";
    frame.src = "";
}

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closePDF();
    }
});


/* ============================================================
   FEEDBACK SUBMISSION MESSAGE
============================================================ */
function feedbackSubmit(event) {
    event.preventDefault();

    const msg = document.getElementById("feedbackMsg");
    msg.classList.add("show");

    setTimeout(() => {
        msg.classList.remove("show");
        event.target.submit();
    }, 1500);
}


/* ============================================================
   TYPING ANIMATION (Smooth, No Flicker)
============================================================ */
const typingText = [
    "Multi-NDT Technician",
    "RTFI Level II",
    "MT Level II",
    "PT Level II",
    "Quality Inspection Specialist"
];

let tIndex = 0;
let cIndex = 0;
let isDeleting = false;

function typeEffect() {
    const el = document.getElementById("typing");
    const text = typingText[tIndex];

    if (!el) return;

    if (!isDeleting) {
        el.textContent = text.substring(0, cIndex++);
        if (cIndex > text.length) {
            isDeleting = true;
            setTimeout(typeEffect, 1200);
            return;
        }
    } else {
        el.textContent = text.substring(0, cIndex--);
        if (cIndex < 0) {
            isDeleting = false;
            tIndex = (tIndex + 1) % typingText.length;
        }
    }

    setTimeout(typeEffect, isDeleting ? 50 : 90);
}

window.addEventListener("load", typeEffect);


/* ============================================================
   GALLERY HORIZONTAL SCROLL
============================================================ */
const gallery = document.querySelector(".gallery-scroll");

if (gallery) {
    gallery.addEventListener("wheel", (evt) => {
        evt.preventDefault();
        gallery.scrollLeft += evt.deltaY * 1.2;
    });
}


/* ============================================================
   SMOOTH SCROLL FOR NAVIGATION
============================================================ */
document.querySelectorAll("a[href^='#']").forEach(anchor => {
    anchor.addEventListener("click", function(event) {
        const target = document.querySelector(this.getAttribute("href"));
        if (!target) return;

        event.preventDefault();

        window.scrollTo({
            top: target.offsetTop - 20,
            behavior: "smooth"
        });
    });
});

/* Scroll Reveal Animation */
const revealElements = document.querySelectorAll('.section');

function reveal() {
  revealElements.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      el.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', reveal);
window.addEventListener('load', reveal);

