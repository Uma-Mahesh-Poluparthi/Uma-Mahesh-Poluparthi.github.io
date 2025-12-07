/* ======================================================
   LOADING SCREEN
====================================================== */
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    setTimeout(() => {
        loader.style.opacity = 0;
        setTimeout(() => loader.style.display = "none", 600);
    }, 400);
});


/* ======================================================
   COUNTERS (HERO STATISTICS)
====================================================== */
let counters = document.querySelectorAll(".count");
let counterStarted = false;

function runCounters() {
    if (counterStarted) return;

    let triggerPoint = window.innerHeight * 0.8;

    counters.forEach(counter => {
        let rect = counter.getBoundingClientRect().top;
        if (rect < triggerPoint) {
            let value = +counter.dataset.val;
            let start = 0;
            let step = value / 70;

            let interval = setInterval(() => {
                start += step;
                counter.textContent = Math.floor(start);
                if (start >= value) {
                    counter.textContent = value;
                    clearInterval(interval);
                }
            }, 20);
        }
    });

    counterStarted = true;
}

window.addEventListener("scroll", runCounters);


/* ======================================================
   LIGHTBOX GALLERY
====================================================== */
const lightbox = document.getElementById("lightbox-viewer");
const lightboxImg = document.getElementById("lightbox-img");
const closeLightbox = document.getElementById("lightbox-close");

document.querySelectorAll(".lightbox").forEach(img => {
    img.addEventListener("click", () => {
        lightboxImg.src = img.src;
        lightbox.style.display = "flex";
    });
});

closeLightbox.addEventListener("click", () => {
    lightbox.style.display = "none";
});


/* ======================================================
   PDF VIEWER (CERTIFICATES)
====================================================== */
function openPDF(file) {
    document.getElementById("pdf-viewer").style.display = "flex";
    document.getElementById("pdf-frame").src = file;
}
window.openPDF = openPDF;

document.getElementById("pdf-close").addEventListener("click", () => {
    document.getElementById("pdf-viewer").style.display = "none";
    document.getElementById("pdf-frame").src = "";
});


/* ======================================================
   PROJECT ACCORDION
====================================================== */
document.querySelectorAll(".project-item").forEach(item => {
    const header = item.querySelector(".project-header");

    header.addEventListener("click", () => {
        let openItem = document.querySelector(".project-item.active");
        if (openItem && openItem !== item) {
            openItem.classList.remove("active");
        }
        item.classList.toggle("active");
    });
});


/* ======================================================
   FEEDBACK POPUP MESSAGE
====================================================== */
const feedbackForm = document.getElementById("feedbackForm");
const popup = document.getElementById("popup");

feedbackForm.addEventListener("submit", () => {
    popup.classList.add("show");
    setTimeout(() => popup.classList.remove("show"), 2500);
});


/* ======================================================
   TYPING ANIMATION
====================================================== */
const typingTexts = [
    "Multi-NDT Specialist",
    "PCN Level II Technician",
    "Industrial Inspector",
    "RT • MT • PT • RTFI"
];

let typingIndex = 0;
let charIndex = 0;
const typingEl = document.getElementById("typing");

function typingEffect() {
    if (!typingEl) return;

    let current = typingTexts[typingIndex];
    typingEl.textContent = current.substring(0, charIndex);

    if (charIndex < current.length) {
        charIndex++;
    } else {
        setTimeout(() => {
            charIndex = 0;
            typingIndex = (typingIndex + 1) % typingTexts.length;
        }, 1000);
    }

    setTimeout(typingEffect, 80);
}

typingEffect();


/* ======================================================
   FADE-IN SCROLL ANIMATION
====================================================== */
const fadeItems = document.querySelectorAll(".fade");

function fadeInOnScroll() {
    fadeItems.forEach(el => {
        const rect = el.getBoundingClientRect().top;
        if (rect < window.innerHeight - 50) {
            el.style.animationPlayState = "running";
        }
    });
}

window.addEventListener("scroll", fadeInOnScroll);
window.addEventListener("load", fadeInOnScroll);

/* ======================================================
   CERTIFICATE CAROUSEL
====================================================== */
const certCarousel = document.getElementById("certCarousel");
const certNext = document.getElementById("certNext");
const certPrev = document.getElementById("certPrev");

certNext.addEventListener("click", () => {
    certCarousel.scrollBy({ left: 220, behavior: "smooth" });
});

certPrev.addEventListener("click", () => {
    certCarousel.scrollBy({ left: -220, behavior: "smooth" });
});


function openCV() {
    document.querySelector("#cv").scrollIntoView({ behavior: "smooth" });
}

/* ==============================
   STATUS CONTROL
================================= */
// Change your status here: "Actively Employed", "Out of Office", "Open to Opportunities"
let currentStatus = "Open to Opportunities";

function updateStatus() {
    const dot = document.querySelector(".status-dot");
    const text = document.getElementById("statusText");

    if (currentStatus === "Actively Employed") {
        text.textContent = "Actively Employed";
        dot.style.background = "#4da3ff";
        dot.style.boxShadow = "0 0 6px #4da3ff";
    }
    else if (currentStatus === "Out of Office") {
        text.textContent = "Out of Office";
        dot.style.background = "#ffc400";
        dot.style.boxShadow = "0 0 6px #ffc400";
    }
    else if (currentStatus === "Open to Opportunities") {
        text.textContent = "Open to Opportunities";
        dot.style.background = "#00ff87";
        dot.style.boxShadow = "0 0 6px #00ff87";
    }
}

updateStatus();

/* ==============================
   HIRE ME → Scroll to Contact
================================= */
function scrollToContact() {
    document.querySelector("#contact").scrollIntoView({ 
        behavior: "smooth" 
    });
}

/* ==============================
   COPY EMAIL with POP UP
================================= */

function copyEmail() {
    navigator.clipboard.writeText("umamahe113@gmail.com");

    const popup = document.getElementById("copyPopup");
    popup.classList.add("show");

    setTimeout(() => {
        popup.classList.remove("show");
    }, 2000);  // hide after 2 seconds
}

