// script.js
function createCarousel(carouselId, dotsId, imagePaths) {
  const carousel = document.getElementById(carouselId);
  const dots = document.getElementById(dotsId);
  const leftArrow = document.createElement('button');
  const rightArrow = document.createElement('button');

  let index = 0;
  let startX = 0;
  let currentX = 0;
  let isDragging = false;

  leftArrow.innerHTML = '←';
  rightArrow.innerHTML = '→';
  leftArrow.className = 'carousel-arrow left-arrow';
  rightArrow.className = 'carousel-arrow right-arrow';

  leftArrow.onclick = () => {
    if (index > 0) {
      index--;
      updatePosition();
    }
  };

  rightArrow.onclick = () => {
    if (index < imagePaths.length - 1) {
      index++;
      updatePosition();
    }
  };

  function renderSlides() {
    carousel.innerHTML = '';
    for (let i = 0; i < imagePaths.length; i++) {
      const slide = document.createElement('div');
      slide.className = 'carousel-slide';

      const img = document.createElement('img');
      img.src = imagePaths[i];
      img.alt = `Slide ${i + 1}`;
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.objectFit = 'cover';

      slide.appendChild(img);
      carousel.appendChild(slide);
    }

    carousel.appendChild(leftArrow);
    carousel.appendChild(rightArrow);

    updatePosition();
  }

  function renderDots() {
    dots.innerHTML = '';
    for (let i = 0; i < imagePaths.length; i++) {
      const dot = document.createElement('div');
      dot.className = 'dot' + (i === index ? ' active' : '');
      dot.addEventListener('click', () => {
        index = i;
        updatePosition();
      });
      dots.appendChild(dot);
    }
  }

  function updatePosition() {
    const allSlides = carousel.querySelectorAll('.carousel-slide');
    allSlides.forEach(slide => {
      slide.style.transform = `translateX(-${index * 100}%)`;
    });
    renderDots();
  }

  function handleStart(e) {
    startX = e.touches ? e.touches[0].clientX : e.clientX;
    isDragging = true;
  }

  function handleMove(e) {
    if (!isDragging) return;
    currentX = e.touches ? e.touches[0].clientX : e.clientX;
  }

  function handleEnd() {
    if (!isDragging) return;
    isDragging = false;
    const dx = currentX - startX;
    if (dx > 50 && index > 0) index--;
    else if (dx < -50 && index < imagePaths.length - 1) index++;
    updatePosition();
  }

  function handleClickNav(e) {
    const rect = carousel.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const mid = rect.width / 2;
    if (clickX < mid && index > 0) {
      index--;
    } else if (clickX >= mid && index < imagePaths.length - 1) {
      index++;
    }
    updatePosition();
  }

  // mouse drag
  carousel.addEventListener('mousedown', handleStart);
  carousel.addEventListener('mousemove', handleMove);
  carousel.addEventListener('mouseup', handleEnd);
  carousel.addEventListener('mouseleave', handleEnd);

  // touch drag
  carousel.addEventListener('touchstart', handleStart);
  carousel.addEventListener('touchmove', handleMove);
  carousel.addEventListener('touchend', handleEnd);

  // click navigation for desktop
  carousel.addEventListener('click', handleClickNav);

  renderSlides();
  renderDots();
}

// Пример вставки изображений
createCarousel('carousel1', 'dots1', [
  'img/carusel/per1.jpg',
  'img/carusel/per2.jpg',
  'img/carusel/per3.jpg',
  'img/carusel/per4.jpg'
]);

createCarousel('carousel2', 'dots2', [
  'img/carusel/ser1.jpg',
  'img/carusel/ser2.jpg',
  'img/carusel/ser3.jpg',
  'img/carusel/ser4.jpg'
]);

// Карусель для отзывов
createCarousel('carouselReviews', 'dotsReviews', [
  'img/carusel/rev1.png',
  'img/carusel/rev2.png',
  'img/carusel/rev3.png',
  'img/carusel/rev4.png'
]);
