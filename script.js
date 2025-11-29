// Auto-detect dark mode from system
if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.body.classList.add("dark");
}

/* --------------------------- */
/* SUPABASE CLIENT */
/* --------------------------- */
const client = supabase.createClient(
    "https://xzatttpouvlhqzbuwgmc.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6YXR0dHBvdXZsaHF6YnV3Z21jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0MDIyMDQsImV4cCI6MjA3OTk3ODIwNH0.b_21iJwV6QrZ87xEVCxZxhwYGqvhBHMbm-W9Chu9RnE"
);

/* --------------------------- */
/* PRELOADER */
/* --------------------------- */
window.onload = () => {
    document.getElementById("preloader").style.display = "none";
};

/* --------------------------- */
/* DARK MODE */
/* --------------------------- */
function toggleDarkMode() {
    document.body.classList.toggle("dark");

    // Save preference
    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
}

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
}

/* --------------------------- */
/* LOAD GALLERY FROM SUPABASE */
/* --------------------------- */
async function loadGallery() {
    let { data, error } = await client.storage.from("photos").list("", {
        limit: 100,
    });

    const gallery = document.getElementById("gallery");
    gallery.innerHTML = "";

    data.forEach(file => {
        let url = client.storage.from("photos").getPublicUrl(file.name).data.publicUrl;

        gallery.innerHTML += `
            <div class="gallery-item">
                <img src="${url}">
            </div>
        `;
    });
}
loadGallery();

/* --------------------------- */
/* LOAD CERTIFICATES */
/* --------------------------- */
async function loadCertificates() {
    let { data } = await client.storage.from("photos").list("certificates", {
        limit: 100,
    });

    const box = document.getElementById("certificates");
    box.innerHTML = "";

    data.forEach(file => {
        let url = client.storage
            .from("photos")
            .getPublicUrl("certificates/" + file.name).data.publicUrl;

        box.innerHTML += `
            <div class="certificate-item">
                <img src="${url}">
            </div>
        `;
    });
}
loadCertificates();

/* --------------------------- */
/* LOAD ACHIEVEMENTS */
/* --------------------------- */
async function loadAchievements() {
    let { data } = await client.from("achievements").select("*");
    document.getElementById("achievements").innerHTML =
        data.map(a => `<p class="achievement-item">• ${a.text}</p>`).join("");
}
loadAchievements();

function openLightbox(src) {
    document.getElementById("lightbox-img").src = src;
    document.getElementById("lightbox").style.display = "flex";
}
function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";
}

