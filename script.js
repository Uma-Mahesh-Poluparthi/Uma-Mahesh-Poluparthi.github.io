/* ============================================================
   Remove index.html from URL (GitHub Pages clean URL fix)
============================================================ */
if (window.location.pathname.endsWith("index.html")) {
  window.location.replace(
    window.location.origin + window.location.pathname.replace("index.html", "")
  );
}


/* ============================================================
   PAGE LOAD + FADE-IN + THEME RESTORE (v1.0.4 FIXED)
============================================================ */
window.addEventListener("load", () => {
    document.body.classList.add("fade-in");
    applySavedTheme();

    const loader = document.getElementById("loader");
    if (loader) {
        setTimeout(() => loader.style.display = "none", 1200);
    }

    typeEffect();
    revealSections();
});


/* ============================================================
   MOBILE NAVBAR
============================================================ */
function toggleNav() {
    const nav = document.getElementById("navMenu");
    if (nav) nav.classList.toggle("show");
}


/* ============================================================
   THEME TOGGLE SYSTEM
============================================================ */
function applySavedTheme() {
    const saved = localStorage.getItem("theme");
    const toggleBtn = document.querySelector(".theme-toggle");
    if (!toggleBtn) return;

    if (saved === "light") {
        document.body.classList.add("light-mode");
        toggleBtn.textContent = "☀️";
    } else {
        toggleBtn.textContent = "🌙";
    }
}

function toggleTheme() {
    const toggleBtn = document.querySelector(".theme-toggle");
    if (!toggleBtn) return;

    const isLight = document.body.classList.toggle("light-mode");
    toggleBtn.textContent = isLight ? "☀️" : "🌙";
    localStorage.setItem("theme", isLight ? "light" : "dark");
}


/* ============================================================
   NAVBAR ACTIVE LINK HIGHLIGHT
============================================================ */
const navLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(sec => {
        if (scrollY >= sec.offsetTop - 160) current = sec.id;
    });

    navLinks.forEach(a => {
        a.classList.toggle(
            "active",
            a.getAttribute("href") === `#${current}`
        );
    });

    revealSections();
});


/* ============================================================
   SCROLL REVEAL ANIMATION
============================================================ */
function revealSections() {
    document.querySelectorAll(".section").forEach(sec => {
        if (sec.getBoundingClientRect().top < innerHeight - 120) {
            sec.classList.add("visible");
        }
    });
}


/* ============================================================
   TYPING EFFECT (STABLE)
============================================================ */
const typingTexts = [
    "Multi-NDT Technician",
    "RTFI Level II Specialist",
    "MT & PT Level II Technician",
    "Industrial Inspection Expert",
    "Quality & Safety Focused"
];

let tIndex = 0, cIndex = 0, deleting = false;

function typeEffect() {
    const el = document.getElementById("typing");
    if (!el) return;

    const text = typingTexts[tIndex];

    if (!deleting) {
        el.textContent = text.substring(0, cIndex++);
        if (cIndex > text.length) {
            deleting = true;
            setTimeout(typeEffect, 900);
            return;
        }
    } else {
        el.textContent = text.substring(0, cIndex--);
        if (cIndex < 0) {
            deleting = false;
            tIndex = (tIndex + 1) % typingTexts.length;
        }
    }

    setTimeout(typeEffect, deleting ? 55 : 85);
}


/* ============================================================
   CERTIFICATION SLIDER + AUTOSCROLL
============================================================ */
const certCarousel = document.getElementById("certCarousel");
let autoCert;

function slideCerts(dir) {
    if (!certCarousel) return;
    certCarousel.scrollBy({ left: dir * 350, behavior: "smooth" });
}

function autoSlideCerts() {
    if (!certCarousel) return;

    autoCert = setInterval(() => {
        certCarousel.scrollBy({ left: 300, behavior: "smooth" });

        if (certCarousel.scrollLeft + certCarousel.clientWidth >= certCarousel.scrollWidth - 5) {
            certCarousel.scrollTo({ left: 0, behavior: "smooth" });
        }
    }, 7000);
}

if (certCarousel) {
    autoSlideCerts();
    certCarousel.addEventListener("mouseenter", () => clearInterval(autoCert));
    certCarousel.addEventListener("mouseleave", autoSlideCerts);
}


/* ============================================================
   PROJECT MODAL SYSTEM
============================================================ */
const projectData = {
    1: {
        title: "Pressure Vessel Radiographic Inspection",
        description: `
            • Conducted full RT inspection on vessel weld joints.<br>
            • Evaluated radiographs & located defects.<br>
            • Ensured ASME compliance.<br>
            • Delivered high-accuracy defect reporting.
        `
    },
    2: {
        title: "MT & PT Surface Crack Detection",
        description: `
            • Surface crack testing on industrial components.<br>
            • MT & PT Level II evaluation and reporting.<br>
            • Worked in active industrial environments.<br>
            • Classified defect indications accurately.
        `
    },
    3: {
        title: "Structural Steel Radiographic Testing",
        description: `
            • RT testing for steel fabrication structures.<br>
            • Film exposure setup and RTFI evaluation.<br>
            • Delivered weld quality acceptance reports.
        `
    }
};

function openProject(id) {
    const modal = document.getElementById("projectModal");
    if (!modal) return;

    document.getElementById("projectTitle").textContent = projectData[id].title;
    document.getElementById("projectDescription").innerHTML = projectData[id].description;
    modal.style.display = "flex";
}

function closeProject() {
    const modal = document.getElementById("projectModal");
    if (modal) modal.style.display = "none";
}


/* ============================================================
   PDF VIEWER (MOBILE SAFE)
============================================================ */
function openPDF(path) {
    if (window.innerWidth <= 900) {
        window.open(path, "_blank");
        return;
    }

    const overlay = document.getElementById("pdfOverlay");
    const frame = document.getElementById("pdfFrame");
    if (!overlay || !frame) return;

    overlay.style.display = "flex";
    frame.src = path;
}

function closePDF() {
    const overlay = document.getElementById("pdfOverlay");
    const frame = document.getElementById("pdfFrame");
    if (!overlay || !frame) return;

    overlay.style.display = "none";
    frame.src = "";
}


/* ============================================================
   IMAGE ZOOM
============================================================ */
const zoomOverlay = document.getElementById("imageZoom");
const zoomImage = document.getElementById("zoomImage");

document.querySelectorAll(".zoomable").forEach(img => {
    img.addEventListener("click", () => {
        if (!zoomOverlay || !zoomImage) return;
        zoomImage.src = img.src;
        zoomOverlay.style.display = "flex";
    });
});

function closeZoom() {
    if (!zoomOverlay || !zoomImage) return;
    zoomOverlay.style.display = "none";
    zoomImage.src = "";
}


/* ============================================================
   FEEDBACK MESSAGE
============================================================ */
function feedbackSubmit(e) {
    e.preventDefault();

    const msg = document.getElementById("feedbackMsg");
    if (!msg) return;

    msg.classList.add("show");

    setTimeout(() => {
        msg.classList.remove("show");
        e.target.submit();
    }, 900);
}


/* ============================================================
   PARTICLE BACKGROUND
============================================================ */
const canvas = document.getElementById("particleCanvas");
const ctx = canvas ? canvas.getContext("2d") : null;
let particles = [];

function resizeCanvas() {
    if (!canvas) return;
    canvas.width = innerWidth;
    canvas.height = innerHeight;
}

class Particle {
    constructor() { this.reset(); }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.y < 0 || this.x > canvas.width || this.y > canvas.height) {
            this.reset();
        }
    }
    draw() {
        ctx.beginPath();
        ctx.fillStyle = "rgba(0,255,180,0.75)";
        ctx.shadowBlur = 12;
        ctx.shadowColor = "#00ffb3";
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    const count = Math.floor((canvas.width * canvas.height) / 16000);
    for (let i = 0; i < count; i++) particles.push(new Particle());
}

function animateParticles() {
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animateParticles);
}

if (canvas && ctx) {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    initParticles();
    animateParticles();
}


/* ============================================================
   ESC KEY CLOSES ALL MODALS
============================================================ */
document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
        closeZoom();
        closePDF();
        closeProject();
        closeChatbot();
    }
});


/* ============================================================
   AI CHATBOT ENGINE
============================================================ */
let chatOpen = false;

function toggleChatbot() {
    const win = document.getElementById("chatWindow");
    if (!win) return;

    chatOpen = !chatOpen;
    win.style.display = chatOpen ? "flex" : "none";

    if (chatOpen) {
        addBot("Hello! I'm your AI assistant. Ask me anything about Uma Mahesh — skills, certifications, experience, projects, CV, or contact info.");
    }
}

function closeChatbot() {
    const win = document.getElementById("chatWindow");
    if (win) win.style.display = "none";
    chatOpen = false;
}

function addUser(msg) {
    const box = document.getElementById("chatBody");
    if (!box) return;
    box.innerHTML += `<div class="chat-msg user-msg">${msg}</div>`;
    box.scrollTop = box.scrollHeight;
}

function addBot(msg) {
    const box = document.getElementById("chatBody");
    if (!box) return;
    box.innerHTML += `<div class="chat-msg bot-msg">${msg}</div>`;
    box.scrollTop = box.scrollHeight;
}

function sendChat() {
    const input = document.getElementById("chatInput");
    if (!input || !input.value.trim()) return;

    addUser(input.value);
    respond(input.value.toLowerCase());
    input.value = "";
}

function chatKey(e) {
    if (e.key === "Enter") sendChat();
}

function respond(msg) {
    let reply = "I'm here to assist! Could you ask in another way?";

    if (msg.includes("hello") || msg.includes("hi")) reply = "Hello! How can I help you today?";
    if (msg.includes("skills")) reply = "Key skills: RTFI Level II, MT Level II, PT Level II, Defect Evaluation, Welding Inspection, Safety Compliance.";
    if (msg.includes("cert")) reply = "Certifications: RTFI Level II, MT Level II, PT Level II, CS, CSOC, OPSOC, WAH.";
    if (msg.includes("experience")) reply = "Experience: 3+ years in industrial NDT (pressure vessels, pipelines, structural steel).";
    if (msg.includes("project")) reply = "Projects: Pressure Vessel RT, MT/PT Crack Detection, Structural Steel RT.";
    if (msg.includes("contact")) reply = "Email: umamahe113@gmail.com | WhatsApp: +91 6304202170.";
    if (msg.includes("cv") || msg.includes("resume")) reply = "You can download the CV or view it in the CV section.";

    addBot(reply);
}


/* ============================================================
   AI RESUME ENHANCER
============================================================ */
function generateResume() {
    toggleChatbot();
    addBot(`
        ✨ <strong>AI-Optimized Resume Summary:</strong><br><br>
        Certified Multi-NDT Technician with 3+ years of experience in RTFI, MT & PT inspections,
        defect evaluation, ASME-compliant reporting, and industrial safety execution.<br><br>
        Want the AI to rewrite your resume completely?
    `);
}

