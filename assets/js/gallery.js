/**
 * Gallery Module
 * Dynamically loads cabin images into the gallery and provides modal navigation.
 * Also handles hero image animation on page load.
 *
 * @author The River Run Cabin
 * @version 1.0.0
 */
(function () {
  "use strict";

  // Hero image animation
  const heroImg = document.querySelector(".slide-in-hero");
  if (heroImg) {
    // Force scroll to top on page load
    window.scrollTo(0, 0);
    heroImg.classList.add("slide-in-hero-animate");
  }

  // Force scroll to top before page unload (for browser back/forward)
  window.addEventListener("beforeunload", function () {
    window.scrollTo(0, 0);
  });

  const galleryGrid = document.querySelector(".gallery-grid");
  if (!galleryGrid) return;

  /** @type {string[]} List of image filenames in the gallery */
  const images = [
    "02-Outside.jpg",
    "03-Entrance-1.jpg",
    "03-Entrance-2.jpg",
    "04-Living-Kitchen.jpg",
    "05-Kitchen.JPG",
    "06-Master-1.JPG",
    "06-Master-2.jpg",
    "07-Bathroom-1.jpg",
    "07-Bathroom-2.jpg",
    "08-Loft-1.jpg",
    "08-Loft-2.jpg",
    "08-Loft-3.jpg",
    "08-Loft-Kitchen.JPG",
    "09-Kitchen-Living.jpg",
    "10-Living-1.jpg",
    "11-Fireplace-1.jpg",
    "Sunset Over River.jpg",
    "Sunset.jpg",
    "Snowmobile.jpg",
    "ATV.jpg",
  ];

  /** @type {string[]} Custom titles for each image (matches images array order) */
  const titles = [
    "Cabin Exterior",
    "Main Entrance",
    "Living Room",
    "Living Room & Kitchen",
    "Kitchen",
    "Master Bedroom",
    "Master Bedroom (View 2)",
    "Bathroom/Laundry",
    "Bathroom (View 2)",
    "Loft",
    "Loft (View 2)",
    "Loft (View 3)",
    "Kitchen from Loft",
    "Kitchen & Living Room",
    "Living Room",
    "Fireplace",
    "Sunset Over River",
    "Sunset",
    "Snowmobiling",
    "Offroading",
  ];

  /** @type {string} Base path for gallery images */
  const IMAGE_PATH = "assets/images/Cabin/";

  /** @type {number} Animation duration in milliseconds */
  const ANIMATION_DURATION = 350;

  /**
   * Preload all gallery images for instant display
   */
  function preloadImages() {
    images.forEach((filename) => {
      const img = new Image();
      img.src = `${IMAGE_PATH}${filename}`;
    });
  }

  // Start preloading immediately
  preloadImages();

  // Create modal element
  const modal = document.createElement("div");
  modal.className = "gallery-modal";
  modal.style.display = "none";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-label", "Gallery image viewer");
  modal.innerHTML = `
    <button class="gallery-modal-close" type="button" aria-label="Close gallery">&times;</button>
    <button class="gallery-modal-arrow gallery-modal-arrow-left" type="button" aria-label="Previous image">&#10094;</button>
    <button class="gallery-modal-arrow gallery-modal-arrow-right" type="button" aria-label="Next image">&#10095;</button>
    <img class="gallery-modal-img" src="" alt="" />
    <div class="gallery-modal-caption" aria-live="polite"></div>
  `;
  document.body.appendChild(modal);

  // Cache modal elements
  const modalImg = modal.querySelector(".gallery-modal-img");
  const modalCaption = modal.querySelector(".gallery-modal-caption");
  const closeBtn = modal.querySelector(".gallery-modal-close");
  const leftArrow = modal.querySelector(".gallery-modal-arrow-left");
  const rightArrow = modal.querySelector(".gallery-modal-arrow-right");

  /** @type {number} Currently displayed image index */
  let currentIndex = 0;

  /**
   * Animate the modal image transition with sweep effect
   * @param {string} direction - 'left' or 'right'
   * @param {number} nextIndex - Index of the next image to show
   */
  function animateModalImg(direction, nextIndex) {
    const outClass =
      direction === "left" ? "sweep-out-right" : "sweep-out-left";
    const inClass = direction === "left" ? "sweep-in-left" : "sweep-in-right";

    modalImg.classList.remove(
      "sweep-in-left",
      "sweep-in-right",
      "sweep-out-left",
      "sweep-out-right"
    );
    modalImg.classList.add(outClass);

    setTimeout(() => {
      modalImg.classList.remove("sweep-out-left", "sweep-out-right");
      modalImg.src = `${IMAGE_PATH}${images[nextIndex]}`;
      modalImg.alt = titles[nextIndex] ?? "";
      modalCaption.textContent = titles[nextIndex] ?? "";
      modalImg.classList.add(inClass);

      setTimeout(() => {
        modalImg.classList.remove("sweep-in-left", "sweep-in-right");
      }, ANIMATION_DURATION);
    }, ANIMATION_DURATION);
  }

  /**
   * Open the modal at a specific image index
   * @param {number} index - Image index to display
   */
  function openModal(index) {
    currentIndex = index;
    modalImg.src = `${IMAGE_PATH}${images[index]}`;
    modalImg.alt = titles[index] ?? "";
    modalCaption.textContent = titles[index] ?? "";
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
    closeBtn.focus(); // Focus for accessibility
  }

  /**
   * Close the modal and restore page scroll
   */
  function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "";
  }

  /**
   * Show the previous image in the gallery
   */
  function showPrev() {
    const nextIndex = (currentIndex - 1 + images.length) % images.length;
    animateModalImg("left", nextIndex);
    currentIndex = nextIndex;
  }

  /**
   * Show the next image in the gallery
   */
  function showNext() {
    const nextIndex = (currentIndex + 1) % images.length;
    animateModalImg("right", nextIndex);
    currentIndex = nextIndex;
  }

  // Event listeners
  closeBtn.addEventListener("click", closeModal);
  leftArrow.addEventListener("click", showPrev);
  rightArrow.addEventListener("click", showNext);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  // Focus trap - keep focus within modal when open
  const focusableElements = [closeBtn, leftArrow, rightArrow];

  /**
   * Handle tab key to trap focus within modal
   * @param {KeyboardEvent} e - Keyboard event
   */
  function handleTabKey(e) {
    if (e.key !== "Tab") return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey) {
      // Shift + Tab: if on first element, go to last
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    } else {
      // Tab: if on last element, go to first
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  }

  document.addEventListener("keydown", (e) => {
    if (modal.style.display !== "flex") return;

    switch (e.key) {
      case "ArrowLeft":
        showPrev();
        break;
      case "ArrowRight":
        showNext();
        break;
      case "Escape":
        closeModal();
        break;
      case "Tab":
        handleTabKey(e);
        break;
    }
  });

  // Touch swipe support for mobile
  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  let touchEndY = 0;
  const SWIPE_THRESHOLD = 50; // Minimum distance for a swipe

  modal.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
  });

  modal.addEventListener("touchmove", (e) => {
    // Prevent scrolling while swiping in the modal
    e.preventDefault();
  });

  modal.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
  });

  /**
   * Handle swipe gesture to navigate images
   */
  function handleSwipe() {
    const swipeDistanceX = touchEndX - touchStartX;
    const swipeDistanceY = touchEndY - touchStartY;

    // Only handle horizontal swipes (ignore vertical)
    if (Math.abs(swipeDistanceX) < SWIPE_THRESHOLD) return;
    if (Math.abs(swipeDistanceY) > Math.abs(swipeDistanceX)) return;

    if (swipeDistanceX > 0) {
      // Swiped right - show previous
      showPrev();
    } else {
      // Swiped left - show next
      showNext();
    }
  }

  // Render gallery images
  images.forEach((filename, idx) => {
    const img = document.createElement("img");
    img.src = `${IMAGE_PATH}${filename}`;
    img.alt = titles[idx] ?? "";
    img.tabIndex = 0;
    img.loading = "lazy";

    img.addEventListener("click", () => openModal(idx));
    img.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModal(idx);
      }
    });

    galleryGrid.appendChild(img);
  });
})();
