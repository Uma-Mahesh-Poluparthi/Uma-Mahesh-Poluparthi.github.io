/* ===================================================================
   LOADING SCREEN
=================================================================== */
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");

    setTimeout(() => {
        loader.style.opacity = "0";
        setTimeout(() => loader.style.display = "none", 600);
    }, 400);
});


/* ===================================================================
   MOBILE MENU — FULL-SCREEN GLASS (Option C)
=================================================================== */
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
const menuClose = document.getElementById("menuClose");

hamburger.addEventListener("click", () => {
    mobileMenu.style.display = "flex";
    document.body.style.overflow = "hidden"; // prevent scrolling
});

function closeMenu() {
    mobileMenu.style.display = "none";
    document.body.style.overflow = "auto";
}

menuClose.addEventListener("click", closeMenu);


/* ===================================================================
   TYPING ANIMATION — SMOOTHER VERSION
=================================================================== */
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

    let text = typingTexts[typingIndex];

    typingEl.textContent = text.slice(0, charIndex);

    if (charIndex < text.length) {
        charIndex++;
    } else {
        setTimeout(() => {
            charIndex = 0;
            typingIndex = (typingIndex + 1) % typingTexts.length;
        }, 900); // Soft pause
    }

    setTimeout(typingEffect, 80);
}

typingEffect();


/* ===================================================================
   COUNTERS — USING INTERSECTION OBSERVER
=================================================================== */
const counterElements = document.querySelectorAll(".count");

const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = +counter.dataset.val;
            let start = 0;

            const increment = target / 80;

            const update = () => {
                start += increment;
                counter.textContent = Math.floor(start);

                if (start < target) {
                    requestAnimationFrame(update);
                } else {
                    counter.textContent = target;
                }
            };

            update();
            counterObserver.unobserve(counter);
        }
    });
}, { threshold: 0.4 });

counterElements.forEach(el => counterObserver.observe(el));


/* ===================================================================
   SMOOTH FADE-IN SCROLL ANIMATIONS (Soft)
=================================================================== */
const fadeElements = document.querySelectorAll(".fade");

const fadeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = "running";
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

fadeElements.forEach(el => fadeObserver.observe(el));


/* ===================================================================
   LIGHTBOX GALLERY
=================================================================== */
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


/* ===================================================================
   CERTIFICATE PDF VIEWER
=================================================================== */
function openPDF(file) {
    const pdfViewer = document.getElementById("pdf-viewer");
    const pdfFrame = document.getElementById("pdf-frame");

    pdfViewer.style.display = "flex";
    pdfFrame.src = file;
}
window.openPDF = openPDF;

document.getElementById("pdf-close").addEventListener("click", () => {
    document.getElementById("pdf-viewer").style.display = "none";
    document.getElementById("pdf-frame").src = "";
});


/* ===================================================================
   PROJECT ACCORDION
=================================================================== */
document.querySelectorAll(".project-item").forEach(item => {
    const header = item.querySelector(".project-header");

    header.addEventListener("click", () => {
        const openItem = document.querySelector(".project-item.active");

        if (openItem && openItem !== item) {
            openItem.classList.remove("active");
        }

        item.classList.toggle("active");
    });
});


/* ===================================================================
   FEEDBACK POPUP
=================================================================== */
const feedbackForm = document.getElementById("feedbackForm");
const popup = document.getElementById("popup");

if (feedbackForm) {
    feedbackForm.addEventListener("submit", () => {
        popup.classList.add("show");
        setTimeout(() => popup.classList.remove("show"), 2300);
    });
}


/* ===================================================================
   BACK TO TOP BUTTON
=================================================================== */
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
        backToTop.style.display = "flex";
    } else {
        backToTop.style.display = "none";
    }
});

backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});


/* ===================================================================
   CERTIFICATE CAROUSEL
=================================================================== */
const certCarousel = document.getElementById("certCarousel");
const certNext = document.getElementById("certNext");
const certPrev = document.getElementById("certPrev");

certNext.addEventListener("click", () => {
    certCarousel.scrollBy({ left: 220, behavior: "smooth" });
});

certPrev.addEventListener("click", () => {
    certCarousel.scrollBy({ left: -220, behavior: "smooth" });
});


/* ===================================================================
   HIRE ME BUTTON → Scroll to Contact
=================================================================== */
function scrollToContact() {
    document.querySelector("#contact")
        .scrollIntoView({ behavior: "smooth" });
}


/* ===================================================================
   COPY EMAIL + POPUP
=================================================================== */
function copyEmail() {
    navigator.clipboard.writeText("umamahe113@gmail.com");

    const popup = document.getElementById("copyPopup");
    popup.classList.add("show");

    setTimeout(() => popup.classList.remove("show"), 2000);
}

window.copyEmail = copyEmail;


/* ===================================================================
   VIEW CV SCROLL
=================================================================== */
function openCV() {
    document.querySelector("#cv")
        .scrollIntoView({ behavior: "smooth" });
}

window.openCV = openCV;
