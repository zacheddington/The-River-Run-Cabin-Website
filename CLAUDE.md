# CLAUDE.md: The River Run Cabin Website

Maintenance guide for this repo. Read it fully before changing anything.

## What this is

A static marketing site for a vacation rental cabin at **3617 Fishermans Drive, Ashton, ID 83420** (Henry's Fork of the Snake River). Owner: Zach's father-in-law. Bookings happen on **VRBO** (`https://www.vrbo.com/4506360`). The site's job is to make people want to stay and send them to that listing.

- **Stack:** hand-written HTML + one CSS file + small vanilla JS files. No framework, no bundler, no `package.json`.
- **Hosting:** GitHub Pages, deployed from the `main` branch (legacy "deploy from branch" mode). Custom domain `www.theriverruncabin.com` (see `CNAME`). The bare `theriverruncabin.com` redirects to `www`.
- **After every push to `main`:** Pages republishes (1-2 min), and `.github/workflows/sitemap.yml` runs `scripts/build-sitemap.mjs`, committing `sitemap.xml` if any page's last-modified date changed. That bot commit is expected.

## Hard rules

1. **No build step.** Don't add npm dependencies to the site, frameworks, or bundlers. (`scripts/make-thumbnails.mjs` uses `sharp` as a temporary local tool with `--no-save`; it is never a site dependency.)
2. **Root-absolute paths everywhere** (`/assets/...`, `/area/`). `404.html` is served at any URL, so relative paths break there.
3. **Every page shares the same `<head>` security/analytics/font block, header, and footer.** If you change one (CSP, GA tag, font URL, nav link, footer text), change all five pages: `index.html`, `area/index.html`, `qa/index.html`, `contact/index.html`, `404.html`. Only the `aria-current="page"` link differs.
4. **Never put a full-size camera photo in a grid or card.** Grids show thumbnails from `thumbs/`; the original loads only in the full-screen viewer. Run `scripts/make-thumbnails.mjs` after adding photos (see recipes).
5. **Page content lives in the HTML.** Don't move text into JavaScript arrays. Search engines and link previews must see it. (Exception: the gallery photo list in `gallery.js`, and reviews in `assets/data/reviews.json`.)
6. **Use the canonical domain `https://www.theriverruncabin.com`** (with `www`) in canonical links, `og:url`, `og:image`, JSON-LD, `robots.txt`, and the sitemap.
7. **Accessibility is not optional:** one `<h1>` per page; images get real `alt` text; anything clickable is a `<button>` or `<a>`; links that open a new tab carry `<span class="visually-hidden"> (opens in new tab)</span>`; text must meet WCAG AA contrast (4.5:1).
8. **VRBO policy:** VRBO forbids steering guests who found the cabin *on VRBO* to book elsewhere. The "Prefer to book directly?" lines on this site are fine. **Never** add this site's URL, phone, or email to the VRBO listing or pre-booking VRBO messages.
9. **Reviews:** show only real guest reviews, copied as written, with 10/10 ratings (`reviews.js` filters the rest). Keep the "A few of our favorite reviews" wording and the "Read every review on VRBO" link, so the page never implies these are all the reviews.
10. **Don't reintroduce** anything listed under "Decisions" below without asking.

## File map

| Path | What it is |
|---|---|
| `index.html` | Home: hero, name + bedrooms/bath/guests, About, Fishing (photos, access points, angler links), Gallery, Reviews, Book CTA. Holds the LodgingBusiness JSON-LD. |
| `area/index.html` | Attraction cards with drive times. Each `<li>` has `data-minutes` for sorting. |
| `qa/index.html` | Q&A cards. FAQPage microdata (`itemscope`/`itemprop`) is on the content itself; there is no separate JSON-LD copy to keep in sync. |
| `contact/index.html` | Contact card, booking button, map. |
| `404.html` | "Page not found" (GitHub Pages serves it automatically). `noindex`. |
| `assets/css/style.css` | All styles. Design tokens at the top (`:root`), dark mode right after. |
| `assets/js/nav.js` | Every page: mobile menu (aria-expanded, Escape to close, scroll lock) + footer year. |
| `assets/js/gallery.js` | Home: builds gallery thumbnails from its `images` list; runs the full-screen photo viewer for gallery + fishing photos. |
| `assets/js/reviews.js` | Home: loads `assets/data/reviews.json`, shows up to 6 newest 10/10 reviews, else keeps the section hidden. |
| `assets/js/area.js` | Area: "Suggested / Closest first" sort toggle. |
| `assets/data/reviews.json` | Guest reviews (array). Empty `[]` = section hidden. |
| `assets/images/Cabin/` | Gallery originals (full-screen viewer) + `01-Sign-1280.webp` / `01-Sign-2400.webp` (hero). |
| `assets/images/Cabin/thumbs/` | Gallery thumbnails (640px WebP), same base name as the original. |
| `assets/images/Fishing/` + `thumbs/` | Fishing photos/signs/maps; originals + 800px WebP thumbnails. |
| `assets/images/Area/` | Attraction card images, 960px WebP (no originals kept). |
| `assets/images/og-image.jpg` | 1200×630 link-preview image. |
| `apple-touch-icon.png`, `favicon.ico` | Icons. |
| `scripts/build-sitemap.mjs` | Writes `sitemap.xml` with `lastmod` from git history. Its `PAGES` list maps URLs to the files that define them. |
| `scripts/make-thumbnails.mjs` | Creates missing thumbnails / web copies with `sharp`. |
| `.github/workflows/sitemap.yml` | Runs the sitemap script after pushes to `main`. |
| `.github/copilot-instructions.md` | Zach's editor-assistant settings. Not site code. |
| `CNAME`, `robots.txt`, `sitemap.xml` | Domain, crawler rules, sitemap (generated; don't hand-edit dates). |

## Design system

- **Colors** (`:root` in `style.css`): background `--color-bg` cream `#f6f5f0`; text `#22333b`; section headings `--color-heading` river green `#2f6152` (dark mode `#a9c8a3`); `--color-nav` forest `#2d3a2e` for header, footer, and the Book band; `--color-gold` `#e9c46a` for buttons, focus rings, and the short rule under section headings; links `#1565c0`.
- **Type:** headings and the site name use **Young Serif** (`--font-display`; it has only one weight, so headings are `font-weight: 400`). Body uses **Inter**. Both load from Google Fonts in each page's `<head>`.
- **Section heading pattern:** a section's `h2` gets the green serif + gold underline automatically when the section's class is in the "Section Headings" selector list in `style.css`. Add new section classes there and to the "Page Sections" width list.
- **Widths:** all home sections share `--content-width` (1100px; 1200px at ≥1200px screens). Q&A is narrower (900px), Contact 600px.
- **Buttons:** `.btn .btn-primary` (gold). Thumbnails that enlarge: `<button class="thumb-button" data-full="ORIGINAL">` wrapping the thumbnail `<img>`.

## Recipes

### Change the booking link
Search the repo for `vrbo.com/4506360` and replace every hit (5 nav buttons + home CTA + contact button + reviews link + JSON-LD `sameAs`). Also update this file.

### Add a gallery photo
1. Put the original in `assets/images/Cabin/` (a phone photo is fine).
2. Make its thumbnail:
   ```bash
   npm install --no-save sharp@0.33.5
   node scripts/make-thumbnails.mjs
   ```
   Then delete the `node_modules` folder it created.
3. Add `{ file: "Exact-Name.jpg", title: "Caption" }` to the `images` list in `assets/js/gallery.js`, in the position it should appear.

To remove a photo, delete the entry, the original, and its file in `thumbs/`.

### Add a fishing photo
Put the original in `assets/images/Fishing/`, run the thumbnail script (above), then copy an existing `<figure>` block in the `.fishing-photos` grid of `index.html`: `data-full` = original path, `<img src>` = the `thumbs/` WebP, set real `width`/`height` of the thumbnail, write `alt`, and a short `<figcaption>`. Keep the grid at 4 photos (or 8) so rows stay even.

### Add an Area attraction
1. Save an image in `assets/images/Area/`, run the thumbnail script, then delete the original JPG/PNG (only the `.webp` is used).
2. Get the drive time from Google Maps directions **from the cabin** (`44.1062357,-111.4328024`) to the place.
3. Copy an existing `<li class="attraction-card">` in `area/index.html`. Set `data-minutes` (total minutes, e.g. 1 hr 35 min = 95), the `.attraction-distance` text (`1 hr 35 min · 76 mi`), image `width`/`height`, `alt`, heading, description, link, and the visually-hidden link label. Position in the list = "Suggested" order.

### Add guest reviews
VRBO has no public API, so reviews are pasted by hand. Append objects to `assets/data/reviews.json`:
```json
[
  {
    "name": "Sarah",
    "date": "2026-08",
    "rating": 10,
    "title": "Perfect fishing getaway",
    "text": "The review text exactly as the guest wrote it."
  }
]
```
`date` is `YYYY-MM` (or `YYYY-MM-DD`); newest show first. `title` is optional. Only `rating: 10` reviews appear; up to 6. Validate the JSON (a trailing comma hides the whole section).

### Add a Q&A item
Copy an existing `<article class="qa-item" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">` block in `qa/index.html`. Keep the `itemprop="name"` on the `h2` and the `acceptedAnswer` / `itemprop="text"` wrappers. Tables use `class="qa-table"` with a `<thead>` and sit inside `<div class="table-scroll">`.

### Add a restaurant / fly shop / rental
Edit the matching list or table in `qa/index.html`. Check the link opens the business's own site.

### Add a new page
Copy `contact/index.html` (full head/header/footer), change title, description, canonical, `og:*`, and move `aria-current="page"`. Add the nav link to all pages and the URL to `PAGES` in `scripts/build-sitemap.mjs`.

## Checks before pushing

- Serve locally (`npx serve .`) and click through all four pages at desktop and phone width, in light and dark mode.
- Browser console: no errors, no Content-Security-Policy violations.
- Tap a gallery and a fishing photo: viewer opens sharp, arrows/swipe work, Escape closes and focus returns to the photo.
- Area: "Closest first" puts Rapid River Rentals / Outdoor Recreation (6 min) at the top; "Suggested" restores Yellowstone first.
- Phone width: open the menu (☰), Tab moves through the menu links, Escape closes it; with the menu closed, Tab skips the menu links.
- `https://www.theriverruncabin.com/some-missing-page` shows the custom 404 after deploying.

## Known data

- Cabin coordinates: `44.1062357, -111.4328024` (from Google Maps for the street address).
- Google Analytics 4 property: `G-62DTE1SX6Z` (loaded via `gtag.js` on every page).
- Access points: Stone Bridge 5.7 mi / ~16 min; Jump Off Canyon 0.3 mi / ~1 min (owner-provided).
- River flows: USGS gauge 13046000, Henrys Fork near Ashton.

## Decisions (why things are absent)

- **KABINO booking removed (2026-10):** owner left the service; all booking goes to VRBO.
- **Google Tag Manager removed (2026-10):** the container had zero tags; it only added a 333 KB script. GA4 runs directly via `gtag.js`.
- **Q&A and Area content moved from JS into HTML (2026-10):** for search engines and link previews. The old `qa.js` and the Area "see more" pop-up are gone; Area cards show full descriptions.
- **Unused photos deleted (2026-10):** two snowy Teton shots and `Snake-River.jpg`, at the owner's request. The full-size `01-Sign.jpg` and the original Area JPGs were replaced by WebP copies (originals remain in git history).
- **Sitemap is generated, not hand-edited (2026-10):** dates come from git history via the GitHub Action.
