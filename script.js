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
   MOBILE NAVBAR AUTO-CLOSE ON LINK CLICK
============================================================ */
document.querySelectorAll("#navMenu a").forEach(link => {
    link.addEventListener("click", () => {
        const nav = document.getElementById("navMenu");
        if (nav.classList.contains("show")) {
            nav.classList.remove("show");
        }
    });
});

document.querySelectorAll("#navMenu a").forEach(link => {
    link.addEventListener("click", () => {
        if (window.innerWidth <= 900) {
            document.getElementById("navMenu")?.classList.remove("show");
        }
    });
});

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
   AI CHATBOT ENGINE — v3.0 (SMART UX BOT)
============================================================ */

let chatOpen = false;
let greeted = false;
let lastTopic = "";
let typingTimer;

/* ------------------ TOGGLE ------------------ */
function toggleChatbot() {
    const win = document.getElementById("chatWindow");
    if (!win) return;

    chatOpen = !chatOpen;
    win.style.display = chatOpen ? "flex" : "none";

    if (chatOpen && !greeted) {
        botTyping(() => {
            addBot(
                "👋 Hi! I’m Uma Mahesh’s assistant.<br><br>" +
                "You can ask about:<br>" +
                "• Skills<br>" +
                "• Certifications<br>" +
                "• Experience<br>" +
                "• Projects<br>" +
                "• CV / Resume<br>" +
                "• Contact details"
            );
            showQuickReplies(["Skills", "Certifications", "Experience", "Projects", "Contact"]);
        });
        greeted = true;
    }
}

function closeChatbot() {
    const win = document.getElementById("chatWindow");
    if (win) win.style.display = "none";
    chatOpen = false;
}

/* ------------------ MESSAGE HELPERS ------------------ */
function addUser(msg) {
    const box = document.getElementById("chatBody");
    box.innerHTML += `<div class="chat-msg user-msg">${msg}</div>`;
    box.scrollTop = box.scrollHeight;
}

function addBot(msg) {
    const box = document.getElementById("chatBody");
    box.innerHTML += `<div class="chat-msg bot-msg">${msg}</div>`;
    box.scrollTop = box.scrollHeight;
}

function botTyping(callback) {
    const box = document.getElementById("chatBody");
    const typing = document.createElement("div");
    typing.className = "chat-msg bot-msg typing";
    typing.textContent = "Typing...";
    box.appendChild(typing);
    box.scrollTop = box.scrollHeight;

    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
        typing.remove();
        callback();
    }, 600);
}

/* ------------------ INPUT ------------------ */
function sendChat() {
    const input = document.getElementById("chatInput");
    if (!input.value.trim()) return;

    const msg = input.value.trim();
    addUser(msg);
    input.value = "";

    botTyping(() => respond(msg.toLowerCase()));
}

function chatKey(e) {
    if (e.key === "Enter") sendChat();
}

/* ------------------ RESPONSE ENGINE ------------------ */
function respond(msg) {
    let reply = "";

    if (contains(msg, ["hi", "hello", "hey"])) {
        reply = "Hello 👋 How can I help you today?";
        showQuickReplies(["Skills", "Experience", "Contact"]);
    }

    else if (contains(msg, ["skill"])) {
        lastTopic = "skills";
        reply = `
        <strong>Core Skills:</strong><br>
        • RTFI Level II<br>
        • MT Level II<br>
        • PT Level II<br>
        • Defect Identification<br>
        • Welding & Radiography Inspection<br>
        • ASME & Safety Compliance
        `;
        showQuickReplies(["Certifications", "Experience"]);
    }

    else if (contains(msg, ["cert"])) {
        lastTopic = "certifications";
        reply = `
        <strong>Certifications:</strong><br>
        • RTFI Level II<br>
        • MT Level II<br>
        • PT Level II<br>
        • CS / CSOC / OPSOC<br>
        • WAH
        `;
        showQuickReplies(["Experience", "Projects"]);
    }

    else if (contains(msg, ["experience", "work"])) {
        lastTopic = "experience";
        reply = `
        <strong>Experience:</strong><br>
        3+ years in industrial NDT inspection covering:<br>
        • Pressure Vessels<br>
        • Pipelines<br>
        • Structural Steel<br>
        • Shutdown & Live Plants
        `;
        showQuickReplies(["Projects", "Contact"]);
    }

    else if (contains(msg, ["project"])) {
        lastTopic = "projects";
        reply = `
        <strong>Key Projects:</strong><br>
        • Pressure Vessel Radiographic Inspection<br>
        • MT & PT Surface Crack Detection<br>
        • Structural Steel RT Evaluation
        `;
        showQuickReplies(["Experience", "Contact"]);
    }

    else if (contains(msg, ["cv", "resume"])) {
        reply = `
        📄 You can view or download the CV from the <strong>CV section</strong>.<br>
        Would you like a short professional summary?
        `;
        lastTopic = "cv";
        showQuickReplies(["Yes", "Contact"]);
    }

    else if (contains(msg, ["yes"]) && lastTopic === "cv") {
        reply = `
        ✨ <strong>Professional Summary:</strong><br>
        Certified Multi-NDT Technician with 3+ years of experience in RTFI, MT & PT inspections,
        defect evaluation, ASME-compliant reporting, and industrial safety execution.
        `;
        lastTopic = "";
        showQuickReplies(["Contact"]);
    }

    else if (contains(msg, ["contact", "email", "phone", "whatsapp"])) {
        reply = `
        <strong>Contact Details:</strong><br>
        📧 Email: umamahe113@gmail.com<br>
        💬 WhatsApp: +91 6304202170<br>
        🔗 LinkedIn available in Contact section
        `;
        showQuickReplies(["Email", "LinkedIn"]);
    }

    else {
        reply =
        "🤖 I can help with skills, certifications, experience, projects, CV, or contact info.";
        showQuickReplies(["Skills", "Experience", "Contact"]);
    }

    addBot(reply);
}

/* ------------------ QUICK REPLIES ------------------ */
function showQuickReplies(items) {
    const box = document.getElementById("chatBody");

    const wrap = document.createElement("div");
    wrap.className = "chat-quick";

    items.forEach(text => {
        const btn = document.createElement("button");
        btn.textContent = text;
        btn.onclick = () => {
            addUser(text);
            botTyping(() => respond(text.toLowerCase()));
        };
        wrap.appendChild(btn);
    });

    box.appendChild(wrap);
    box.scrollTop = box.scrollHeight;
}

/* ------------------ UTIL ------------------ */
function contains(text, keys) {
    return keys.some(k => text.includes(k));
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




