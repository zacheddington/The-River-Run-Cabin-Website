# The River Run Cabin Website — Build & Content Instructions

## Overview

This is a modern, responsive website for The River Run Cabin, a rental property on Henry's Fork of the Snake River in southeast Idaho. The site provides property details, area attractions, Q&A, and booking info. It is built with static HTML, CSS, and JavaScript, and is designed for easy deployment (e.g., GitHub Pages).

## Pages & Navigation

- Home (`index.html`)
- Area (`area.html`)
- Q&A (`qa.html`)
- Contact (`contact.html`)
- Book (`book.html`)

## Home Page

- Hero image at top (`images/Cabin/01-Sign.jpg`)
- Property description below hero image
- Dynamic gallery (all images in `images/Cabin/` folder, managed by `gallery.js`)

## Area Page

- List of local attractions, each with image, description, and external link (opens in new tab)
- Attractions are managed in `area.js` as an array of objects
- Cards are generated dynamically and styled for responsiveness

## Q&A Page

- Frequently asked questions and answers
- Rental providers, restaurants, airports, and fly shops are presented in styled tables for clarity
- Rental table is grouped by type (Float Boat, Kayak/Tube/Raft, Motorsport)
- Embedded Google Map at the bottom
- All Q&A content and tables are managed in `qa.js`

## Contact Page

- Contact info: phone and email
- Simple, clean layout

## Book Page

- Booking button links to Kabino vacation rentals: https://www.kabino.com/vacation-rental/the-river-run-cabin/

## File Structure & Key Files

- `index.html`, `area.html`, `qa.html`, `contact.html`, `book.html`: Main pages
- `style.css`: All site styling, including responsive design, tables, gallery, and modal
- `gallery.js`: Loads gallery images and manages modal with sweep animations for image navigation
- `area.js`: Manages attractions and dynamically generates cards on Area page
- `qa.js`: Manages Q&A, rental/restaurant/airport/fly shop tables, and map embed
- `images/`: All images for the site, organized in subfolders

## Design & Features

- Modern, mobile-first, and fully responsive
- Color palette and fonts evoke a cabin-in-the-woods feel
- No popups, cookies, or trackers
- Gallery modal supports sweep animations when navigating images
- All external links open in a new tab

## Deployment

- Designed for static hosting (e.g., GitHub Pages)
- To deploy: push to a GitHub repository and enable GitHub Pages in repo settings

## Customization

- To add gallery images: place new images in `images/Cabin/` and update `gallery.js` arrays if you want custom titles
- To add attractions: edit the `attractions` array in `area.js`
- To update Q&A or tables: edit `qa.js`

## Contact

- Phone: 208-656-3650
- Email: theriverruncabin@gmail.com

## Domain

- Preferred: https://theriverruncabin.com/
