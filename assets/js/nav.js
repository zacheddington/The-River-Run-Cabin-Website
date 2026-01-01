/**
 * Navigation & Common Functionality
 * Handles hamburger menu scroll locking and shared page functionality
 * @author Copilot
 */
(function () {
  "use strict";

  // Hamburger menu scroll lock
  const navToggle = document.getElementById("nav-toggle");

  if (navToggle) {
    navToggle.addEventListener("change", function () {
      if (this.checked) {
        document.body.classList.add("nav-open");
      } else {
        document.body.classList.remove("nav-open");
      }
    });
  }

  // Dynamic year in footer
  const yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
})();
