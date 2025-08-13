const API_KEY = "_EYiP1RW9culR4-BaxUjYryJdxHZFcF9cq2gEkuuRV4";
const gallery = document.getElementById("gallery");
const searchInput = document.getElementById("searchInput");
const categoryButtons = document.querySelectorAll(".categories button");

let images = [];
let currentIndex = 0;

async function fetchImages(query = "random") {
    const res = await fetch(`https://api.unsplash.com/search/photos?query=${query}&per_page=20&client_id=${API_KEY}`);
    const data = await res.json();
    images = data.results;
    displayImages();
}

function displayImages() {
    gallery.innerHTML = "";
    images.forEach((img, index) => {
        const imageEl = document.createElement("img");
        imageEl.src = img.urls.small;
        imageEl.alt = img.alt_description;
        imageEl.addEventListener("click", () => openLightbox(index));
        gallery.appendChild(imageEl);
    });
}

// Search
searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim();
    if (query) {
        fetchImages(query);
    }
});

// Categories
categoryButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        fetchImages(btn.dataset.category);
    });
});

// Lightbox
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const closeBtn = document.getElementById("closeBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

function openLightbox(index) {
    currentIndex = index;
    lightbox.classList.remove("hidden");
    lightboxImg.src = images[currentIndex].urls.full;
}

function closeLightbox() {
    lightbox.classList.add("hidden");
}

function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    lightboxImg.src = images[currentIndex].urls.full;
}

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    lightboxImg.src = images[currentIndex].urls.full;
}

closeBtn.addEventListener("click", closeLightbox);
prevBtn.addEventListener("click", prevImage);
nextBtn.addEventListener("click", nextImage);

// Initial fetch
fetchImages();
