/* ============================================================
   PAGE TRANSITION — FADE IN EFFECT
============================================================ */
window.addEventListener("load", () => {
    document.body.classList.add("fade-in");
});

/* ============================================================
   NAVBAR MOBILE TOGGLE
============================================================ */

/* ============================================================
   THEME SYSTEM (LIGHT / DARK MODE)
============================================================ */

function applySavedTheme() {
    const saved = localStorage.getItem("theme");

    if (saved === "light") {
        document.body.classList.add("light-mode");
        document.querySelector(".theme-toggle").textContent = "☀️";
    }
}
applySavedTheme();

function toggleTheme() {
    document.body.classList.toggle("light-mode");

    const isLight = document.body.classList.contains("light-mode");

    document.querySelector(".theme-toggle").textContent = isLight ? "☀️" : "🌙";

    localStorage.setItem("theme", isLight ? "light" : "dark");
}

function toggleNav() {
    document.getElementById("navMenu").classList.toggle("show");
}

/* ============================================================
   ACTIVE NAV HIGHLIGHT ON SCROLL
============================================================ */
const navLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(sec => {
        const secTop = sec.offsetTop;
        if (scrollY >= secTop - 120) current = sec.id;
    });

    navLinks.forEach(a => {
        a.classList.remove("active");
        if (a.getAttribute("href") === `#${current}`) {
            a.classList.add("active");
        }
    });
});

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
    document.getElementById("pdfOverlay").style.display = "flex";
    document.getElementById("pdfFrame").src = path;
}

function closePDF() {
    document.getElementById("pdfOverlay").style.display = "none";
    document.getElementById("pdfFrame").src = "";
}

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closePDF();
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
   TYPING ANIMATION
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

    if (!isDeleting) {
        el.textContent = text.substring(0, cIndex++);
        if (cIndex > text.length) {
            isDeleting = true;
            setTimeout(typeEffect, 1100);
            return;
        }
    } else {
        el.textContent = text.substring(0, cIndex--);
        if (cIndex < 0) {
            isDeleting = false;
            tIndex = (tIndex + 1) % typingText.length;
        }
    }

    setTimeout(typeEffect, isDeleting ? 60 : 90);
}

window.addEventListener("load", typeEffect);

/* ============================================================
   SCROLL REVEAL ANIMATIONS
============================================================ */
const revealSections = document.querySelectorAll('.section');

function reveal() {
    revealSections.forEach(sec => {
        const top = sec.getBoundingClientRect().top;
        if (top < window.innerHeight - 80) {
            sec.classList.add("visible");
        }
    });
}

window.addEventListener("scroll", reveal);
window.addEventListener("load", reveal);

/* ============================================================
   HORIZONTAL SCROLL FOR GALLERY
============================================================ */
const galleryScroll = document.querySelector(".gallery-scroll");
if (galleryScroll) {
    galleryScroll.addEventListener("wheel", (evt) => {
        evt.preventDefault();
        galleryScroll.scrollLeft += evt.deltaY * 1.2;
    });
}

/* ============================================================
   AUTO-SCROLL CERTIFICATION SLIDER
============================================================ */

let certInterval;
const certCarousel = document.getElementById("certCarousel");

function autoSlideCerts() {
    certInterval = setInterval(() => {
        certCarousel.scrollBy({ left: 300, behavior: "smooth" });

        // If reached end → go back to start
        if (certCarousel.scrollLeft + certCarousel.clientWidth >= certCarousel.scrollWidth - 5) {
            certCarousel.scrollTo({ left: 0, behavior: "smooth" });
        }
    }, 7000); // 7 seconds per slide
}

// Start auto scroll
autoSlideCerts();

// Pause on hover
certCarousel.addEventListener("mouseenter", () => clearInterval(certInterval));
certCarousel.addEventListener("mouseleave", autoSlideCerts);

// Swipe support (mobile)
let startX = 0;

certCarousel.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
});

certCarousel.addEventListener("touchend", (e) => {
    let endX = e.changedTouches[0].clientX;

    if (startX - endX > 50) {
        // Swipe left
        certCarousel.scrollBy({ left: 300, behavior: "smooth" });
    }
    if (endX - startX > 50) {
        // Swipe right
        certCarousel.scrollBy({ left: -300, behavior: "smooth" });
    }
});

/* ============================================================
   ADVANCED HERO INTERACTION (3D FLOAT + TILT EFFECT)
============================================================ */

const heroImgContainer = document.querySelector(".profile-glow");

document.addEventListener("mousemove", (e) => {
    if (!heroImgContainer) return;

    const x = (window.innerWidth / 2 - e.clientX) / 40;
    const y = (window.innerHeight / 2 - e.clientY) / 40;

    heroImgContainer.style.transform = `translateY(-10px) rotateY(${x}deg) rotateX(${y}deg)`;
});

// Reset tilt smoothly
document.addEventListener("mouseleave", () => {
    if (heroImgContainer) {
        heroImgContainer.style.transform = "translateY(-10px) rotateY(0deg) rotateX(0deg)";
    }
});

/* ============================================================
   FULLSCREEN IMAGE ZOOM VIEWER
============================================================ */

const zoomOverlay = document.getElementById("imageZoom");
const zoomImage = document.getElementById("zoomImage");

// Open on click
document.querySelectorAll(".zoomable").forEach(img => {
    img.addEventListener("click", () => {
        zoomImage.src = img.src;
        zoomOverlay.style.display = "flex";
    });
});

// Close functions
function closeZoom() {
    zoomOverlay.style.display = "none";
    zoomImage.src = "";
}

// Close on background click
zoomOverlay.addEventListener("click", (e) => {
    if (e.target.id === "imageZoom") closeZoom();
});

// Close with ESC key
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeZoom();
});

// Mobile pinch zoom support
zoomImage.addEventListener("touchmove", (event) => {
    event.preventDefault();
    let scale = 1 + (event.touches.length - 1) * 0.5;
    zoomImage.style.transform = `scale(${scale})`;
}, { passive: false });

// Reset zoom after close
zoomOverlay.addEventListener("touchend", () => {
    zoomImage.style.transform = "scale(1)";
});


/* ============================================================
   NEON PARTICLES BACKGROUND ENGINE
============================================================ */

const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");

let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.6;
        this.speedY = (Math.random() - 0.5) * 0.6;
        this.glow = Math.random() * 12 + 8;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width ||
            this.y < 0 || this.y > canvas.height) {
            this.reset();
        }
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = "rgba(0,255,180,0.8)";
        ctx.shadowBlur = this.glow;
        ctx.shadowColor = "#00ffb3";
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    let count = Math.floor((canvas.width * canvas.height) / 9000); // auto density

    for (let i = 0; i < count; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        p.update();
        p.draw();
    });

    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();
window.addEventListener("resize", initParticles);

/* ============================================================
   PROJECT MODAL SYSTEM
============================================================ */

// Project Data (You can expand anytime)
const projectData = {
    1: {
        title: "Pressure Vessel Radiographic Inspection",
        description: `
            Performed complete RT inspection of weld joints on large industrial pressure vessels.
            Responsibilities included:
            • Film Interpretation (RTFI Level II)
            • Finding internal discontinuities
            • Preparing inspection reports
            • Client communication & safety compliance
        `
    },

    2: {
        title: "MT & PT Surface Crack Inspection",
        description: `
            Executed MT and PT inspections on structural components.
            • Surface crack detection
            • Indication classification
            • Written reports and documentation
            • Work performed in live industrial sites
        `
    },

    3: {
        title: "Structural Steel Radiographic Testing",
        description: `
            Performed radiographic testing on multi-story steel structures.
            • RT exposure setup
            • Film development & evaluation
            • Reporting weld acceptance per ASME standards
        `
    }
};

function openProject(id) {
    const modal = document.getElementById("projectModal");
    const title = document.getElementById("projectTitle");
    const desc = document.getElementById("projectDescription");

    title.textContent = projectData[id].title;
    desc.innerHTML = projectData[id].description.replace(/\n/g, "<br>");

    modal.style.display = "flex";
}

function closeProject() {
    document.getElementById("projectModal").style.display = "none";
}

// Close on background click
document.getElementById("projectModal").addEventListener("click", (e) => {
    if (e.target.id === "projectModal") {
        closeProject();
    }
});

// Close with ESC key
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeProject();
    }
});

/* ============================================================
   REAL-TIME VISITOR COUNTER
============================================================ */

const COUNTER_API = "https://api.countapi.xyz/hit/umamahesh-portfolio.com/visits";

async function loadVisitorCount() {
    try {
        const response = await fetch(COUNTER_API);
        const data = await response.json();
        document.getElementById("visitorCount").textContent = data.value;
    }
    catch (err) {
        document.getElementById("visitorCount").textContent = "Error";
        console.error(err);
    }
}

loadVisitorCount();



