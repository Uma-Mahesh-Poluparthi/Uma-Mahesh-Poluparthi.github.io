// --- Light / Dark Mode ---
function toggleDarkMode() {
  document.body.classList.toggle('dark');
}

// --- Load Gallery from GitHub assets ---
window.addEventListener('DOMContentLoaded', () => {
  const galleryDiv = document.getElementById("gallery");

  // List of image filenames in /assets/gallery/
  const filenames = [
    // <-- Add all your gallery image names here manually, e.g. -->
    // "img1.jpg", "img2.jpg", "IMG_20221001_223833.jpg", ...
  ];

  filenames.forEach(name => {
    const img = document.createElement("img");
    img.src = `assets/gallery/${name}`;
    img.alt = name;
    img.classList.add("gallery-image");
    galleryDiv.appendChild(img);
  });
});

// --- Lightbox for gallery images ---
document.addEventListener("click", e => {
  if (e.target.classList.contains("gallery-image")) {
    const lb = document.getElementById("lightbox");
    document.getElementById("lightbox-img").src = e.target.src;
    lb.style.display = 'flex';
  } else if (e.target.id === 'lightbox') {
    e.target.style.display = 'none';
  }
});


