// COUNTERS
let counters = document.querySelectorAll(".count");
let started = false;

function startCounter() {
    if (started) return;
    if (window.scrollY + window.innerHeight > counters[0].offsetTop) {
        counters.forEach(counter => {
            let target = +counter.dataset.val;
            let current = 0;
            let speed = target / 80;

            let update = setInterval(() => {
                current += speed;
                counter.textContent = Math.floor(current);
                if (current >= target) clearInterval(update);
            }, 20);
        });

        started = true;
    }
}
window.addEventListener("scroll", startCounter);

// DARK MODE TOGGLE
const toggle = document.getElementById("theme-toggle");
toggle.onclick = () => {
    document.body.classList.toggle("light");

    if (document.body.classList.contains("light")) {
        toggle.textContent = "☀️";
        document.body.style.background = "#fafafa";
        document.body.style.color = "#000";
    } else {
        toggle.textContent = "🌙";
        document.body.style.background = "#0d0d0d";
        document.body.style.color = "#fff";
    }
};

// PARTICLE BACKGROUND
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

let particlesArray = [];

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = 1.5;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw() {
        ctx.fillStyle = "rgba(0,150,255,0.6)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particlesArray = [];
    for (let i = 0; i < 60; i++) particlesArray.push(new Particle());
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
