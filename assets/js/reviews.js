/**
 * Guest Reviews
 * Reads assets/data/reviews.json and shows the newest 10/10 reviews on the
 * home page. The section stays hidden until at least one qualifying review
 * exists, so an empty file shows nothing.
 *
 * VRBO has no public reviews API, so reviews are pasted into the JSON file
 * by hand (see CLAUDE.md "Add guest reviews").
 *
 * @author The River Run Cabin
 * @version 1.0.0
 */
(function () {
  "use strict";

  const section = document.querySelector(".reviews");
  const list = section?.querySelector(".reviews-list");
  if (!section || !list || !("fetch" in window)) return;

  /** @type {number} Only reviews with this rating (out of 10) are shown */
  const MIN_RATING = 10;

  /** @type {number} Most reviews to show at once */
  const MAX_REVIEWS = 6;

  /**
   * Turn "2026-08" or "2026-08-14" into "August 2026"
   * @param {string} date - ISO year-month or full date
   * @returns {string} Readable month and year, or "" if unparseable
   */
  function formatMonth(date) {
    const parsed = new Date(`${String(date).slice(0, 7)}-01T00:00:00`);
    if (Number.isNaN(parsed.getTime())) return "";
    return parsed.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  }

  /**
   * Build one review card. Uses textContent only, so pasted text can never
   * inject markup.
   * @param {{ name: string, date: string, rating: number, title?: string, text: string }} review
   * @returns {HTMLElement} The card element
   */
  function renderReview(review) {
    const card = document.createElement("figure");
    card.className = "review-card";

    if (review.title) {
      const title = document.createElement("h3");
      title.textContent = review.title;
      card.appendChild(title);
    }

    const quote = document.createElement("blockquote");
    quote.textContent = review.text;
    card.appendChild(quote);

    const caption = document.createElement("figcaption");
    const rating = document.createElement("span");
    rating.className = "review-rating";
    rating.textContent = `${review.rating}/10`;
    caption.append(
      rating,
      ` · ${review.name}`,
      review.date ? ` · ${formatMonth(review.date)}` : "",
    );
    card.appendChild(caption);

    return card;
  }

  fetch("/assets/data/reviews.json")
    .then((response) => (response.ok ? response.json() : []))
    .then((reviews) => {
      const shown = (Array.isArray(reviews) ? reviews : [])
        .filter((review) => Number(review.rating) >= MIN_RATING && review.text)
        .sort((a, b) => String(b.date).localeCompare(String(a.date)))
        .slice(0, MAX_REVIEWS);

      if (shown.length === 0) return;
      shown.forEach((review) => list.appendChild(renderReview(review)));
      section.hidden = false;
    })
    .catch(() => {
      // Leave the section hidden; reviews are a bonus, not core content
    });
})();
