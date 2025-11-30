/* ---------------------------------------------------
   COUNTERS
---------------------------------------------------- */
let counters = document.querySelectorAll(".count");
let started = false;

function startCounter() {
    if (started) return;

    const firstCounter = counters[0];
    if (!firstCounter) return;

    if (window.scrollY + window.innerHeight > firstCounter.offsetTop) {
        counters.forEach(counter => {
            let target = +counter.dataset.val;
            let current = 0;
            let step = target / 80;

            let update = setInterval(() => {
                current += step;
                counter.textContent = Math.floor(current);
                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(update);
                }
            }, 20);
        });

        started = true;
    }
}

window.addEventListener("scroll", startCounter);


/* ---------------------------------------------------
   DARK / LIGHT MODE TOGGLE
---------------------------------------------------- */
const toggle = document.getElementById("theme-toggle");

toggle.onclick = () => {
    document.body.classList.toggle("light");

    if (document.body.classList.contains("light")) {
        toggle.textContent = "☀️";
    } else {
        toggle.textContent = "🌙";
    }
};


/* ---------------------------------------------------
   TESTIMONIAL SLIDER (Sample Text)
---------------------------------------------------- */
const testimonials = [
    "“Uma is a highly disciplined and technically strong NDT technician with excellent interpretation skills.”",
    "“He consistently delivers accurate inspection results and maintains high safety standards.”",
    "“Professional, reliable, and precise in radiographic interpretation and NDT work.”"
];

let tIndex = 0;
const tBox = document.getElementById("testimonial-text");

function showTestimonial(idx) {
    if (!tBox) return;
    tBox.style.opacity = 0;

    setTimeout(() => {
        tBox.textContent = testimonials[idx];
        tBox.style.opacity = 1;
    }, 300);
}

const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");

if (nextBtn) {
    nextBtn.onclick = () => {
        tIndex = (tIndex + 1) % testimonials.length;
        showTestimonial(tIndex);
    };
}

if (prevBtn) {
    prevBtn.onclick = () => {
        tIndex = (tIndex - 1 + testimonials.length) % testimonials.length;
        showTestimonial(tIndex);
    };
}

// Auto-slide every 5 seconds
setInterval(() => {
    tIndex = (tIndex + 1) % testimonials.length;
    showTestimonial(tIndex);
}, 5000);


/* ---------------------------------------------------
   PARTICLE BACKGROUND (White / Grey Particles)
---------------------------------------------------- */
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

let particlesArray = [];

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = 1.4;
        this.speedX = (Math.random() - 0.5) * 0.25;
        this.speedY = (Math.random() - 0.5) * 0.25;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
        ctx.fillStyle = "rgba(220,220,220,0.6)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particlesArray = [];
    for (let i = 0; i < 60; i++) {
        particlesArray.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();


/* ---------------------------------------------------
   FADE-UP SCROLL REVEAL
---------------------------------------------------- */
const fadeItems = document.querySelectorAll(".fade");

function revealFade() {
    fadeItems.forEach(el => {
        const rect = el.getBoundingClientRect().top;
        if (rect < window.innerHeight - 60) {
            el.style.animationPlayState = "running";
        }
    });
}

window.addEventListener("scroll", revealFade);
window.addEventListener("load", revealFade);
