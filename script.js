/* ======================================================
   SUPABASE v2 INITIALIZATION
   ====================================================== */
const { createClient } = supabase;

const client = createClient(
    "https://xzatttpouvlhqzbuwgmc.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6YXR0dHBvdXZsaHF6YnV3Z21jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0MDIyMDQsImV4cCI6MjA3OTk3ODIwNH0.b_21iJwV6QrZ87xEVCxZxhwYGqvhBHMbm-W9Chu9RnE"
);

/* ======================================================
   PRELOADER HIDE
   ====================================================== */
window.addEventListener("load", () => {
    const loader = document.getElementById("preloader");
    if (loader) loader.style.display = "none";
});

/* ======================================================
   DARK MODE TOGGLE
   ====================================================== */

// Auto-detect device theme
if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.body.classList.add("dark");
}

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
}

function toggleDarkMode() {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
}

/* ======================================================
   LIGHTBOX CODE
   ====================================================== */
function openLightbox(src) {
    document.getElementById("lightbox-img").src = src;
    document.getElementById("lightbox").style.display = "flex";
}

function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";
}

/* ======================================================
   LOAD GALLERY FROM SUPABASE (photos bucket)
   ====================================================== */
async function loadGallery() {
    let { data, error } = await client.storage.from("photos").list("", { limit: 200 });

    const gallery = document.getElementById("gallery");
    if (!gallery || error) return;

    gallery.innerHTML = "";

    data.forEach(file => {
        if (file.name === "certificates") return; // skip folder

        const url = client.storage.from("photos").getPublicUrl(file.name).data.publicUrl;

        gallery.innerHTML += `
            <div class="gallery-item" onclick="openLightbox('${url}')">
                <img src="${url}">
            </div>
        `;
    });
}

loadGallery();

/* ======================================================
   LOAD CERTIFICATES FROM SUPABASE (photos/certificates)
   ====================================================== */
async function loadCertificates() {
    let { data, error } = await client.storage
        .from("photos")
        .list("certificates", { limit: 200 });

    const box = document.getElementById("certificates");
    if (!box || error) return;

    box.innerHTML = "";

    data.forEach(file => {
        const url = client.storage
            .from("photos")
            .getPublicUrl(`certificates/${file.name}`).data.publicUrl;

        box.innerHTML += `
            <div class="certificate-item">
                <img src="${url}">
            </div>
        `;
    });
}

loadCertificates();

/* ======================================================
   LOAD ACHIEVEMENTS FROM TABLE
   ====================================================== */
async function loadAchievements() {
    let { data, error } = await client.from("achievements").select("*");

    const box = document.getElementById("achievements");
    if (!box || error) return;

    box.innerHTML = data
        .map(a => `<p class="achievement-item">• ${a.text}</p>`)
        .join("");
}

loadAchievements();

/* ======================================================
   STATS ANIMATION
   ====================================================== */
function animateStats() {
    document.querySelectorAll(".stat-num").forEach(num => {
        let end = parseInt(num.getAttribute("data-count"));
        let value = 0;

        let counter = setInterval(() => {
            value += Math.ceil(end / 60);
            num.textContent = value;

            if (value >= end) {
                num.textContent = end;
                clearInterval(counter);
            }
        }, 25);
    });
}

setTimeout(animateStats, 1200);
