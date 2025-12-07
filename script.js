/* ============================================================
   SIDEBAR ACTIVE LINK HIGHLIGHT ON SCROLL
============================================================ */
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
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
   CERTIFICATE CAROUSEL (LEFT/RIGHT ARROWS)
============================================================ */
function moveCert(direction) {
    const carousel = document.getElementById("certCarousel");
    carousel.scrollBy({
        left: direction * 300,
        behavior: "smooth"
    });
}



/* ============================================================
   PDF VIEWER POPUP
============================================================ */
function openPDF(file) {
    document.getElementById("pdfFrame").src = file;
    document.getElementById("pdfOverlay").classList.add("show");
}

function closePDF() {
    document.getElementById("pdfOverlay").classList.remove("show");
}



/* ============================================================
   FEEDBACK MESSAGE (AUTO HIDE)
============================================================ */
function sendFeedback(event) {
    event.preventDefault();

    const msg = document.getElementById("feedbackMsg");
    msg.classList.add("show");

    setTimeout(() => {
        msg.classList.remove("show");
    }, 3000);
}



/* ============================================================
   TYPING ANIMATION
============================================================ */
const typingText = [
    "Multi-NDT Technician",
    "RTFI Level II",
    "MT Level II",
    "PT Level II",
    "Quality Inspection Specialist"
];

let typingIndex = 0;
let charIndex = 0;

function typeEffect() {
    const typeEl = document.getElementById("typing");
    if (!typeEl) return;

    const text = typingText[typingIndex];

    typeEl.textContent = text.substring(0, charIndex);
    charIndex++;

    if (charIndex > text.length) {
        setTimeout(eraseEffect, 1300);
    } else {
        setTimeout(typeEffect, 100);
    }
}

function eraseEffect() {
    const typeEl = document.getElementById("typing");
    const text = typingText[typingIndex];

    typeEl.textContent = text.substring(0, charIndex);
    charIndex--;

    if (charIndex < 0) {
        typingIndex = (typingIndex + 1) % typingText.length;
        setTimeout(typeEffect, 400);
    } else {
        setTimeout(eraseEffect, 50);
    }
}

window.addEventListener("load", typeEffect);



/* ============================================================
   GALLERY SCROLL (HORIZONTAL)
============================================================ */
const gallery = document.querySelector(".gallery-scroll");

if (gallery) {
    gallery.addEventListener("wheel", (evt) => {
        evt.preventDefault();
        gallery.scrollLeft += evt.deltaY;
    });
}



/* ============================================================
   SMOOTH SCROLL FOR NAVIGATION
============================================================ */
document.querySelectorAll("a[href^='#']").forEach(anchor => {
    anchor.addEventListener("click", function(event) {
        event.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));
        if (!target) return;

        window.scrollTo({
            top: target.offsetTop - 20,
            behavior: "smooth"
        });
    });
});



