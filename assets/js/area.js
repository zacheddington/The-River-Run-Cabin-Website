/**
 * Area Page Sorting
 * The attraction cards are plain HTML in area/index.html. This adds the
 * "Suggested / Closest first" toggle, ordering cards by their data-minutes
 * drive time. Without JavaScript the toggle stays hidden and the suggested
 * order is shown.
 *
 * @author The River Run Cabin
 * @version 2.0.0
 */
(function () {
  "use strict";

  const list = document.querySelector(".attractions-list");
  const sortBar = document.querySelector(".area-sort");
  if (!list || !sortBar) return;

  /** @type {HTMLElement[]} Cards in the owner's suggested order */
  const suggested = Array.from(list.children);

  /** @type {HTMLElement[]} Cards from shortest to longest drive (ties keep suggested order) */
  const closestFirst = [...suggested].sort(
    (a, b) => Number(a.dataset.minutes) - Number(b.dataset.minutes),
  );

  const buttons = sortBar.querySelectorAll("button[data-sort]");

  /**
   * Reorder the cards and mark the active button
   * @param {"suggested"|"distance"} mode - Sort order to apply
   */
  function applySort(mode) {
    const order = mode === "distance" ? closestFirst : suggested;
    order.forEach((card) => list.appendChild(card));
    buttons.forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.sort === mode));
    });
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => applySort(button.dataset.sort));
  });

  sortBar.hidden = false;
})();
