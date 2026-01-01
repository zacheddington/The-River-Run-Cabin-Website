# The River Run Cabin Website

A modern, responsive website for The River Run Cabin — a riverside vacation rental on Henry's Fork of the Snake River in Ashton, Idaho.

🌐 **Live Site:** [theriverruncabin.com](https://theriverruncabin.com)

## Features

### 🏠 Pages

- **Home** — Hero image, property description, and interactive photo gallery
- **Area** — Local attractions with expandable descriptions and links
- **Q&A** — Frequently asked questions with tables for rentals, restaurants, airports, and fly shops
- **Contact** — Contact information with clickable phone/email links

### 🎨 Design

- Mobile-first, fully responsive layout
- Dark mode support via `prefers-color-scheme`
- Smooth animations with `prefers-reduced-motion` support
- CSS custom properties (design tokens) for consistent theming
- Print-optimized stylesheet

### ♿ Accessibility

- Skip to main content link
- ARIA labels and roles throughout
- Keyboard navigation support
- Focus trapping in modals
- High contrast ratios (WCAG AA compliant)
- Screen reader friendly

### 🚀 Performance

- DNS prefetching for external domains
- Font preconnect for Google Fonts
- Lazy loading for gallery images
- No external dependencies or frameworks
- Minimal, optimized CSS and JavaScript

### 🔍 SEO

- Structured data (JSON-LD) for rich search results
- Open Graph meta tags for social sharing
- Twitter Card support
- Canonical URLs
- XML sitemap
- robots.txt

### 📱 Mobile Enhancements

- Animated hamburger menu (transforms to X)
- Touch-friendly tap targets
- Overlay to close menu when tapping outside
- Scroll lock when menu is open
- Theme color for browser toolbar
- Apple touch icon for iOS home screen

### 🔒 Privacy

- No cookies
- No analytics or trackers
- No third-party scripts (except Google Fonts and Maps)
- No popups or consent banners

## Tech Stack

- **HTML5** — Semantic markup
- **CSS3** — Custom properties, Grid, Flexbox, animations
- **Vanilla JavaScript** — ES2020+, IIFE modules
- **Hosting** — GitHub Pages with custom domain

## File Structure

```
├── index.html              # Home page
├── area.html               # Area attractions
├── qa.html                 # Q&A / FAQ
├── contact.html            # Contact information
├── favicon.ico             # Site favicon
├── robots.txt              # Search engine directives
├── sitemap.xml             # XML sitemap for SEO
├── CNAME                   # Custom domain config
├── README.md               # This file
├── assets/
│   ├── css/
│   │   └── style.css       # All styles
│   ├── js/
│   │   ├── gallery.js      # Gallery modal and hero animation
│   │   ├── area.js         # Attractions cards and modal
│   │   ├── qa.js           # Q&A content rendering
│   │   └── nav.js          # Navigation and common functionality
│   └── images/
│       ├── Cabin/          # Property photos
│       └── Area/           # Attraction photos
└── docs/
    └── instructions.md     # Development guidelines
```

## Development

### Prerequisites

- Any modern web browser
- A local web server (optional, for testing)

### Quick Start

1. Clone the repository:

   ```bash
   git clone https://github.com/zacheddington/The-River-Run-Cabin-Website.git
   ```

2. Open `index.html` in your browser, or serve locally:

   ```bash
   # Using Python
   python -m http.server 8000

   # Using Node.js
   npx serve
   ```

3. Visit `http://localhost:8000`

### Deployment

The site is deployed automatically to GitHub Pages when pushing to the `main` branch.

1. Push changes to `main`
2. GitHub Actions builds and deploys
3. Site is live at [theriverruncabin.com](https://theriverruncabin.com)

## Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

## License

This project is for personal use. Contact the owner for other uses.

---

Made with ❤️ for The River Run Cabin
