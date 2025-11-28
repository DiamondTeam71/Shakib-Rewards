document.addEventListener('DOMContentLoaded', function () {

  

  const track = document.querySelector('.slider-track');
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  let currentIndex = 0;
  let startX = 0;
  let isDragging = false;
  let slideInterval;

  function updateSlide() {
    track.style.transition = 'transform 0.5s ease';
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentIndex].classList.add('active');
  }

  function startAutoSlide() {
    slideInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateSlide();
    }, 3000);
  }

  function stopAutoSlide() {
    clearInterval(slideInterval);
  }

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      currentIndex = idx;
      updateSlide();
      stopAutoSlide();
      startAutoSlide();
    });
  });

  track.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
    isDragging = true;
    track.style.transition = 'none';
  });
  track.addEventListener('touchmove', e => {
    if (!isDragging) return;
    const moveX = e.touches[0].clientX - startX;
    track.style.transform = `translateX(${-currentIndex * 100 + moveX / slides[0].clientWidth * 100}%)`;
  });
  track.addEventListener('touchend', e => {
    if (!isDragging) return;
    isDragging = false;
    const diff = e.changedTouches[0].clientX - startX;
    if (diff > 50) currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    else if (diff < -50) currentIndex = (currentIndex + 1) % slides.length;
    updateSlide();
    stopAutoSlide();
    startAutoSlide();
  });

  updateSlide();
  startAutoSlide();


  
});
