/**
 * Navigation & Common Functionality
 * Handles hamburger menu scroll locking and shared page functionality
 * @author Copilot
 */
(function () {
  "use strict";

  // Hamburger menu scroll lock
  const navToggle = document.getElementById("nav-toggle");
  const navOverlay = document.querySelector(".nav-overlay");
  let scrollPosition = 0;

  if (navToggle) {
    navToggle.addEventListener("change", function () {
      if (this.checked) {
        // Save scroll position and lock body
        scrollPosition = window.scrollY;
        document.body.classList.add("nav-open");
        document.body.style.top = `-${scrollPosition}px`;
      } else {
        // Restore scroll position
        document.body.classList.remove("nav-open");
        document.body.style.top = "";
        window.scrollTo(0, scrollPosition);
      }
    });
  }

  // Prevent touch scrolling on nav overlay
  if (navOverlay) {
    navOverlay.addEventListener(
      "touchmove",
      (e) => {
        e.preventDefault();
      },
      { passive: false }
    );
  }

  // Dynamic year in footer
  const yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
})();
