/* ================= DARK MODE ================= */
const darkToggle = document.getElementById("darkToggle");

darkToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
});

// Load saved theme
window.addEventListener("load", () => {
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark");
    }
});

/* ================= PRELOADER ================= */
window.addEventListener("load", () => {
    setTimeout(() => {
        document.getElementById("preloader").style.display = "none";
    }, 900);
});

/* ================= GALLERY AUTO LOAD ================= */
/* List all your gallery image names EXACTLY as they appear in assets/gallery/ */

const galleryImages = [
    "img1.jpg",
    "img2.jpg",
    "img3.jpg",
    "img4.jpg"
];

const galleryBox = document.getElementById("galleryBox");

galleryImages.forEach(img => {
    const imageURL = `assets/gallery/${img}`;
    const imgTag = document.createElement("img");
    imgTag.src = imageURL;
    imgTag.alt = img;
    galleryBox.appendChild(imgTag);
});

/* ================= ACHIEVEMENT COUNTERS ================= */
const counters = document.querySelectorAll(".counter");
let counterStarted = false;

window.addEventListener("scroll", () => {
    const section = document.getElementById("achievements");
    const position = section.getBoundingClientRect().top;

    if (!counterStarted && position < window.innerHeight - 50) {
        counterStarted = true;

        counters.forEach(counter => {
            let target = +counter.dataset.target;
            let count = 0;
            let speed = target / 60;

            function updateCounter() {
                if (count < target) {
                    count += speed;
                    counter.textContent = Math.floor(count);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            }

            updateCounter();
        });
    }
});

/* ================= FADE-IN ON SCROLL ================= */
const fadeSections = document.querySelectorAll(".fade-in");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
    });
}, { threshold: 0.3 });

fadeSections.forEach(section => {
    observer.observe(section);
});

