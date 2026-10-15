/**
 * Gallery Module
 * Builds the cabin photo grid and runs the full-screen photo viewer.
 *
 * Every thumbnail is a <button class="thumb-button" data-full="..."> wrapping
 * a small WebP image. Clicking it opens the original, full-resolution photo
 * (data-full) so enlarged photos stay sharp while the page stays light.
 * Two sets share the viewer: the cabin gallery (built here from `images`)
 * and the fishing photos (static buttons in index.html).
 *
 * @author The River Run Cabin
 * @version 2.0.0
 */
(function () {
  "use strict";

  const galleryGrid = document.querySelector(".gallery-grid");
  if (!galleryGrid) return;

  /**
   * Gallery photos, in display order. `file` is the original in
   * assets/images/Cabin/; its thumbnail is assets/images/Cabin/thumbs/<name>.webp
   * (made from the original; see CLAUDE.md "Add a gallery photo").
   * @type {{ file: string, title: string }[]}
   */
  const images = [
    { file: "02-Outside.jpg", title: "Cabin Exterior" },
    { file: "03-Entrance-1.jpg", title: "Main Entrance" },
    { file: "03-Entrance-2.jpg", title: "Living Room" },
    { file: "03-Front-Porch.png", title: "Front Porch" },
    { file: "04-Living-Kitchen.jpg", title: "Living Room & Kitchen" },
    { file: "05-Kitchen.JPG", title: "Kitchen" },
    { file: "06-Master-1.JPG", title: "Master Bedroom" },
    { file: "06-Master-2.jpg", title: "Master Bedroom (View 2)" },
    { file: "07-Bathroom-1.jpg", title: "Bathroom/Laundry" },
    { file: "07-Bathroom-2.jpg", title: "Bathroom (View 2)" },
    { file: "08-Loft-1.jpg", title: "Loft" },
    { file: "08-Loft-2.jpg", title: "Loft (View 2)" },
    { file: "08-Loft-3.jpg", title: "Loft (View 3)" },
    { file: "08-Loft-Kitchen.JPG", title: "Kitchen from Loft" },
    { file: "09-Kitchen-Living.jpg", title: "Kitchen & Living Room" },
    { file: "10-Living-1.jpg", title: "Living Room" },
    { file: "11-Fireplace-1.jpg", title: "Fireplace" },
    { file: "Sunset Over River.jpg", title: "Sunset Over River" },
    { file: "Sunset.jpg", title: "Sunset" },
    { file: "Snowmobile.jpg", title: "Snowmobiling" },
    { file: "ATV.jpg", title: "Offroading" },
  ];

  /** @type {string} Base path for gallery images */
  const IMAGE_PATH = "/assets/images/Cabin/";

  /** @type {number} Animation duration in milliseconds */
  const ANIMATION_DURATION = 350;

  /**
   * @typedef {{ src: string, title: string }} ModalItem
   */

  // Build the gallery thumbnails
  /** @type {ModalItem[]} */
  const galleryItems = images.map(({ file, title }) => ({
    src: IMAGE_PATH + file,
    title,
  }));

  const galleryButtons = images.map(({ file, title }) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "thumb-button";

    const img = document.createElement("img");
    img.src = `${IMAGE_PATH}thumbs/${file.replace(/\.[^.]+$/, "")}.webp`;
    img.alt = title;
    img.loading = "lazy";
    button.appendChild(img);

    galleryGrid.appendChild(button);
    return button;
  });

  // Fishing section thumbnails are already in the page
  /** @type {HTMLButtonElement[]} */
  const fishingButtons = Array.from(
    document.querySelectorAll(".fishing .thumb-button"),
  );

  /** @type {ModalItem[]} Captioned by data-caption, then figcaption, then alt */
  const fishingItems = fishingButtons.map((button) => ({
    src: button.dataset.full,
    title:
      button.dataset.caption ??
      button.closest("figure")?.querySelector("figcaption")?.textContent ??
      button.querySelector("img")?.alt ??
      "",
  }));

  // Create modal element
  const modal = document.createElement("div");
  modal.className = "gallery-modal";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-label", "Photo viewer");
  modal.innerHTML = `
    <button class="gallery-modal-close" type="button" aria-label="Close photo viewer">&times;</button>
    <button class="gallery-modal-arrow gallery-modal-arrow-left" type="button" aria-label="Previous photo">&#10094;</button>
    <button class="gallery-modal-arrow gallery-modal-arrow-right" type="button" aria-label="Next photo">&#10095;</button>
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

  /** @type {ModalItem[]} The set of photos the viewer is currently browsing */
  let activeItems = galleryItems;

  /** @type {number} Currently displayed photo index */
  let currentIndex = 0;

  /** @type {HTMLElement|null} Thumbnail that opened the viewer, refocused on close */
  let openedFrom = null;

  /** @type {number} Scroll position when modal opened */
  let modalScrollPosition = 0;

  /**
   * Show a photo in the viewer and start loading its neighbors
   * @param {number} index - Index into activeItems
   */
  function showItem(index) {
    const item = activeItems[index];
    modalImg.src = item.src;
    modalImg.alt = item.title;
    modalCaption.textContent = item.title;

    // Warm the cache so the arrows feel instant on the full-size files
    [index - 1, index + 1].forEach((i) => {
      const neighbor = activeItems[(i + activeItems.length) % activeItems.length];
      new Image().src = neighbor.src;
    });
  }

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
      "sweep-out-right",
    );
    modalImg.classList.add(outClass);

    setTimeout(() => {
      modalImg.classList.remove("sweep-out-left", "sweep-out-right");
      showItem(nextIndex);
      modalImg.classList.add(inClass);

      setTimeout(() => {
        modalImg.classList.remove("sweep-in-left", "sweep-in-right");
      }, ANIMATION_DURATION);
    }, ANIMATION_DURATION);
  }

  /**
   * Open the viewer at a specific photo
   * @param {ModalItem[]} items - Photo set to browse
   * @param {number} index - Photo index to display
   * @param {HTMLElement} trigger - Thumbnail that was activated
   */
  function openModal(items, index, trigger) {
    activeItems = items;
    currentIndex = index;
    openedFrom = trigger;
    showItem(index);
    modal.classList.add("gallery-modal--open");

    // Lock body scroll (same approach as nav menu)
    modalScrollPosition = window.scrollY;
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${modalScrollPosition}px`;
    document.body.style.width = "100%";
    document.body.style.touchAction = "none";

    closeBtn.focus();
  }

  /**
   * Close the viewer, restore page scroll, and return focus to the thumbnail
   */
  function closeModal() {
    modal.classList.remove("gallery-modal--open");

    document.body.style.overflow = "";
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";
    document.body.style.touchAction = "";
    window.scrollTo(0, modalScrollPosition);

    openedFrom?.focus({ preventScroll: true });
    openedFrom = null;
  }

  /** Show the previous photo in the active set */
  function showPrev() {
    const nextIndex =
      (currentIndex - 1 + activeItems.length) % activeItems.length;
    animateModalImg("left", nextIndex);
    currentIndex = nextIndex;
  }

  /** Show the next photo in the active set */
  function showNext() {
    const nextIndex = (currentIndex + 1) % activeItems.length;
    animateModalImg("right", nextIndex);
    currentIndex = nextIndex;
  }

  // Thumbnails open the viewer (buttons handle Enter/Space natively)
  galleryButtons.forEach((button, idx) => {
    button.addEventListener("click", () =>
      openModal(galleryItems, idx, button),
    );
  });
  fishingButtons.forEach((button, idx) => {
    button.addEventListener("click", () =>
      openModal(fishingItems, idx, button),
    );
  });

  // Modal controls
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
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault();
      lastElement.focus();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
    }
  }

  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("gallery-modal--open")) return;

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
  const SWIPE_THRESHOLD = 50; // Minimum distance for a swipe

  modal.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    },
    { passive: true },
  );

  modal.addEventListener(
    "touchmove",
    (e) => {
      // Prevent scrolling while swiping in the modal
      e.preventDefault();
    },
    { passive: false },
  );

  modal.addEventListener("touchend", (e) => {
    const swipeDistanceX = e.changedTouches[0].screenX - touchStartX;
    const swipeDistanceY = e.changedTouches[0].screenY - touchStartY;

    // Only handle horizontal swipes (ignore vertical)
    if (Math.abs(swipeDistanceX) < SWIPE_THRESHOLD) return;
    if (Math.abs(swipeDistanceY) > Math.abs(swipeDistanceX)) return;

    if (swipeDistanceX > 0) {
      showPrev();
    } else {
      showNext();
    }
  });
})();
