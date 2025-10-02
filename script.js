// ========== Mobilmeny ==========
function toggleMenu() {
  const nav = document.getElementById('mobileMenu');
  nav.classList.toggle('show');
}

// Carousel gallery logic
const galleryImages = [
  'images/galleri1.jpeg',
  'images/galleri2.jpeg',
  'images/galleri3.jpeg',
  'images/galleri4.jpeg',
  'images/galleri5.jpeg',
  'images/galleri6.jpeg',
  'images/galleri7.jpeg',
  'images/galleri8.jpeg',
  'images/galleri9.jpeg',
  'images/galleri10.jpeg',
  'images/galleri11.jpeg',
  'images/galleri12.jpeg',
  'images/galleri13.jpeg',
  'images/galleri14.jpeg',
  'images/galleri15.jpeg',
  'images/galleri16.jpeg',
  'images/galleri17.jpeg',
  'images/galleri18.jpeg',
  'images/galleri19.jpeg',
  'images/galleri20.jpeg',
  'images/galleri21.jpeg',
  'images/galleri22.jpeg',
  'images/galleri23.jpeg',
  'images/galleri24.jpeg',
  'images/galleri25.jpeg',
  'images/galleri26.jpeg',
  'images/galleri27.jpeg',
  'images/galleri28.jpeg',
  'images/galleri29.jpeg',

];
let currentIndex = 0;

function showImage(index) {
  const mainImg = document.getElementById('carousel-main');
  mainImg.src = galleryImages[index];
  mainImg.alt = `Styling ${index+1}`;
  document.querySelectorAll('.carousel-thumbs .thumb').forEach((thumb, i) => {
    thumb.classList.toggle('active', i === index);
  });
  currentIndex = index;
}

document.querySelectorAll('.carousel-thumbs .thumb').forEach((thumb) => {
  thumb.addEventListener('click', function() {
    showImage(Number(this.dataset.index));
  });
});

document.querySelector('.carousel-arrow.left').addEventListener('click', function() {
  showImage((currentIndex - 1 + galleryImages.length) % galleryImages.length);
});
document.querySelector('.carousel-arrow.right').addEventListener('click', function() {
  showImage((currentIndex + 1) % galleryImages.length);
});

// Optional: swipe support for mobile
let startX = null;
document.getElementById('carousel-main').addEventListener('touchstart', function(e) {
  startX = e.touches[0].clientX;
});
document.getElementById('carousel-main').addEventListener('touchend', function(e) {
  if (startX === null) return;
  let endX = e.changedTouches[0].clientX;
  if (endX - startX > 40) {
    // swipe right
    showImage((currentIndex - 1 + galleryImages.length) % galleryImages.length);
  } else if (startX - endX > 40) {
    // swipe left
    showImage((currentIndex + 1) % galleryImages.length);
  }
  startX = null;
});

// Lightbox logic
const carouselMain = document.getElementById('carousel-main');
const lightbox = document.getElementById('carousel-lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.querySelector('.lightbox-close');

carouselMain.addEventListener('click', function() {
  lightbox.classList.add('active');
  lightboxImg.src = galleryImages[currentIndex];
  lightboxImg.alt = this.alt;
});
lightboxClose.addEventListener('click', function() {
  lightbox.classList.remove('active');
  lightboxImg.src = '';
});
lightboxImg.addEventListener('click', function() {
  lightbox.classList.remove('active');
  lightboxImg.src = '';
});

const lightboxLeft = document.querySelector('.carousel-arrow.left.lightbox-arrow');
const lightboxRight = document.querySelector('.carousel-arrow.right.lightbox-arrow');

lightboxLeft.addEventListener('click', function(e) {
  e.stopPropagation();
  let newIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  lightboxImg.src = galleryImages[newIndex];
  lightboxImg.alt = `Styling ${newIndex+1}`;
  showImage(newIndex);
});
lightboxRight.addEventListener('click', function(e) {
  e.stopPropagation();
  let newIndex = (currentIndex + 1) % galleryImages.length;
  lightboxImg.src = galleryImages[newIndex];
  lightboxImg.alt = `Styling ${newIndex+1}`;
  showImage(newIndex);
});

document.addEventListener('keydown', function(e) {
  if (lightbox.classList.contains('active')) {
    if (e.key === 'ArrowLeft') {
      let newIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
      lightboxImg.src = galleryImages[newIndex];
      lightboxImg.alt = `Styling ${newIndex+1}`;
      showImage(newIndex);
    } else if (e.key === 'ArrowRight') {
      let newIndex = (currentIndex + 1) % galleryImages.length;
      lightboxImg.src = galleryImages[newIndex];
      lightboxImg.alt = `Styling ${newIndex+1}`;
      showImage(newIndex);
    } else if (e.key === 'Escape') {
      lightbox.classList.remove('active');
      lightboxImg.src = '';
    }
  }
});
