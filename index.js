/* Expandable Modal */
function openModal(modalId) {
    document.getElementById(modalId).style.display = "block";
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

// Close the modal when the user clicks anywhere outside of it
window.onclick = function(event) {
    let modals = document.querySelectorAll('.modal-expandable');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
}




/* Accordions */
document.addEventListener('DOMContentLoaded', function() {
    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
            this.classList.toggle("active");

            var panel = this.nextElementSibling;
            if (panel.style.display === "block") {
                panel.style.display = "none";
            } else {
                panel.style.display = "block";
            }
        });
    }
});



/* Project Gallery */
const imageUrls = [
    "https://github.com/YimingSpyro/photography/blob/master/pics/1.jpg?raw=true",
    "https://github.com/YimingSpyro/photography/blob/master/pics/2.jpg?raw=true",
    "https://github.com/YimingSpyro/photography/blob/master/pics/3.jpg?raw=true",
    "https://github.com/YimingSpyro/photography/blob/master/pics/4.jpg?raw=true",
    "https://github.com/YimingSpyro/photography/blob/master/pics/10.jpg?raw=true",
    "https://github.com/YimingSpyro/photography/blob/master/pics/11.jpg?raw=true",
    "https://github.com/YimingSpyro/photography/blob/master/pics/12.jpg?raw=true",
    "https://github.com/YimingSpyro/photography/blob/master/pics/13.jpg?raw=true"
];

const gallery = document.querySelector('.gallery');
const track = document.querySelector('.gallery-track');
const modal = document.getElementById('gallery-modal');
const modalImg = document.getElementById('modal-img');
const closeModalBtn = document.querySelector('.close');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let currentIndex = 0;

const easing = 0.05;
let startY = 0;
let endY = 0;
let raf;

const lerp = (start, end, t) => start * (1 - t) + end * t;

function updateScroll() {
    startY = lerp(startY, endY, easing);
    gallery.style.height = `${track.clientHeight}px`;
    track.style.transform = `translateY(-${startY}px)`;
    activateParallax();
    raf = requestAnimationFrame(updateScroll);
    if (startY.toFixed(1) === window.scrollY.toFixed(1)) cancelAnimationFrame(raf);
}

function startScroll() {
    endY = window.scrollY;
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(updateScroll);
}

function parallax(card) {
    const wrapper = card.querySelector('.card-image-wrapper');
    const diff = card.offsetHeight - wrapper.offsetHeight;
    const { top } = card.getBoundingClientRect();
    const progress = top / window.innerHeight;
    const yPos = diff * progress;
    wrapper.style.transform = `translateY(${yPos}px)`;
}

const activateParallax = () => document.querySelectorAll('.card').forEach(parallax);

function init() {
    activateParallax();
    startScroll();
}

function showImage(index) {
    if (index >= 0 && index < imageUrls.length) {
        modalImg.src = imageUrls[index];
        currentIndex = index;
        modal.style.display = 'block';
    }
}

function closeModal() {
    modal.style.display = 'none';
}

function prevImage() {
    showImage((currentIndex - 1 + imageUrls.length) % imageUrls.length);
}

function nextImage() {
    showImage((currentIndex + 1) % imageUrls.length);
}

imageUrls.forEach((url, index) => {
    const card = document.createElement('div');
    card.className = 'card';
    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'card-image-wrapper';
    const img = document.createElement('img');
    img.src = url;
    img.alt = `Image ${index + 1}`;
    img.addEventListener('click', () => showImage(index));
    imageWrapper.appendChild(img);
    card.appendChild(imageWrapper);
    track.appendChild(card);
});

closeModalBtn.addEventListener('click', closeModal);
prevBtn.addEventListener('click', prevImage);
nextBtn.addEventListener('click', nextImage);

window.addEventListener('load', updateScroll, false);
window.addEventListener('scroll', init, false);
window.addEventListener('resize', updateScroll, false);
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});