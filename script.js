/* DARK MODE */
const darkToggle = document.getElementById("darkToggle");

darkToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
});

/* PRELOADER */
window.onload = () => {
    setTimeout(() => {
        document.getElementById("preloader").style.display = "none";
    }, 800);
};

/* GALLERY AUTO-LOAD FROM GITHUB */
const galleryImages = [
    "IMG_20221001_223833.jpg",
    "IMG_20221018_091641.jpg",
    "IMG_20240805_203613.jpg",
    "IMG_20250526_222652.jpg"
];

const galleryBox = document.getElementById("galleryBox");

galleryImages.forEach(img => {
    const imageURL =
        `https://raw.githubusercontent.com/Uma-Mahesh-Poluparthi/Uma-Mahesh-Poluparthi.github.io/main/assets/${img}`;

    const imgTag = document.createElement("img");
    imgTag.src = imageURL;
    galleryBox.appendChild(imgTag);
});

