# The River Run Cabin Website

The website for The River Run Cabin, a riverside vacation rental on Henry's Fork of the Snake River in Ashton, Idaho.

**Live site:** [www.theriverruncabin.com](https://www.theriverruncabin.com) · **Book:** [VRBO listing](https://www.vrbo.com/4506360)

## Pages

- **Home**: the cabin at a glance (bedrooms, bath, guests), description, fishing access points with photos, photo gallery, guest reviews, and a booking button
- **Area**: nearby attractions with drive times from the cabin, sortable by distance
- **Q&A**: guides, rentals, airports, restaurants, fly shops, and a map
- **Contact**: phone, email, address, booking, and a map

## How it's built

Plain HTML, CSS, and JavaScript with no build step or framework, hosted on GitHub Pages. Pushing to `main` publishes the site within a minute or two. A small GitHub Action (`.github/workflows/sitemap.yml`) then refreshes the sitemap's last-modified dates.

- Responsive, with dark mode and reduced-motion support
- Accessible: semantic headings, keyboard-friendly menus and photo viewer, AA color contrast
- Fast: photos are shown as small WebP thumbnails, and the full-size original loads only when a guest taps to enlarge
- Search-friendly: page content is in the HTML, with structured data, Open Graph tags, and a sitemap
- Uses Google Analytics 4 for visitor statistics; Google Fonts and Google Maps are the only other third-party services

## Working on the site

Preview locally with any static server from the repo root, for example:

```bash
npx serve .
```

Maintenance guide (file map, rules, and step-by-step recipes): [CLAUDE.md](CLAUDE.md).

## License

Personal use for The River Run Cabin. Contact the owner for other uses.
