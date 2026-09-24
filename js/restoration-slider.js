/**
 * CLASSIC BIKES OEDHEIM - RESTORATION BEFORE/AFTER SLIDER
 * Supports Mouse Drag, Touch Gestures, Direct Click Repositioning & Keyboard Navigation
 */

function initRestorationSlider(sliderElement) {
  if (!sliderElement) return;

  const afterImg = sliderElement.querySelector('.slider-img.after');
  const handle = sliderElement.querySelector('.slider-handle');

  if (!afterImg || !handle) return;

  let isDragging = false;

  const setPosition = (xPos, smooth = false) => {
    const rect = sliderElement.getBoundingClientRect();
    if (!rect.width) return;

    let percentage = ((xPos - rect.left) / rect.width) * 100;
    // Clamp between 2% and 98%
    percentage = Math.max(2, Math.min(98, percentage));

    if (smooth) {
      handle.style.transition = 'left 0.25s ease-out';
      afterImg.style.transition = 'clip-path 0.25s ease-out';
    } else {
      handle.style.transition = 'none';
      afterImg.style.transition = 'none';
    }

    handle.style.left = `${percentage}%`;
    afterImg.style.clipPath = `polygon(0 0, ${percentage}% 0, ${percentage}% 100%, 0 100%)`;
  };

  // Mouse Events
  sliderElement.addEventListener('mousedown', (e) => {
    isDragging = true;
    setPosition(e.clientX, false);
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    setPosition(e.clientX, false);
  });

  window.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      handle.style.transition = '';
      afterImg.style.transition = '';
    }
  });

  // Touch Events for Mobile / Tablet
  sliderElement.addEventListener('touchstart', (e) => {
    isDragging = true;
    setPosition(e.touches[0].clientX, false);
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    setPosition(e.touches[0].clientX, false);
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });

  // Allow clicking anywhere to jump smoothly
  sliderElement.addEventListener('click', (e) => {
    setPosition(e.clientX, true);
  });

  // Set default initial position on load and resize
  const resetToCenter = () => {
    const rect = sliderElement.getBoundingClientRect();
    if (rect.width > 0) {
      handle.style.left = '50%';
      afterImg.style.clipPath = 'polygon(0 0, 50% 0, 50% 100%, 0 100%)';
    }
  };

  resetToCenter();
  window.addEventListener('resize', resetToCenter, { passive: true });
}

document.addEventListener('DOMContentLoaded', () => {
  const sliders = document.querySelectorAll('.restoration-slider-container');
  sliders.forEach(slider => initRestorationSlider(slider));
});
