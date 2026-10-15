/**
 * Navigation & Common Functionality
 * Mobile menu (checkbox toggle) accessibility and scroll locking, plus the
 * footer year. Loaded on every page.
 *
 * @author The River Run Cabin
 * @version 2.0.0
 */
(function () {
  "use strict";

  const navToggle = document.getElementById("nav-toggle");
  const navOverlay = document.querySelector(".nav-overlay");
  const navToggleLabel = document.querySelector(".nav-toggle-label");
  let scrollPosition = 0;

  if (navToggle && navToggleLabel) {
    // The label acts as the menu button: Enter/Space open and close it
    navToggleLabel.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        navToggle.click();
      }
    });

    navToggle.addEventListener("change", () => {
      const isOpen = navToggle.checked;
      navToggleLabel.setAttribute("aria-expanded", String(isOpen));

      if (isOpen) {
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

    // Escape closes the open menu and returns focus to the menu button
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && navToggle.checked) {
        navToggle.click();
        navToggleLabel.focus();
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
      { passive: false },
    );
  }

  // Dynamic year in footer
  const yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
})();
