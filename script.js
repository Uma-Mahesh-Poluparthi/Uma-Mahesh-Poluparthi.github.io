/* Scroll Progress */
window.addEventListener("scroll", () => {
    let progress = document.documentElement.scrollTop / 
                   (document.documentElement.scrollHeight - document.documentElement.clientHeight) * 100;
    document.getElementById("scroll-progress").style.width = progress + "%";
});

/* Counter Animation */
const counters = document.querySelectorAll(".counter");
counters.forEach(counter => {
    counter.innerText = "0";
    const updateCounter = () => {
        const target = +counter.getAttribute("data-target");
        const current = +counter.innerText;
        const increment = target / 80;

        if (current < target) {
            counter.innerText = `${Math.ceil(current + increment)}`;
            setTimeout(updateCounter, 30);
        } else {
            counter.innerText = target;
        }
    };
    updateCounter();
});

/* Lightbox */
function openLightbox(src) {
    document.getElementById("lightbox-img").src = src;
    document.getElementById("lightbox").style.display = "flex";
}

function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";
}
