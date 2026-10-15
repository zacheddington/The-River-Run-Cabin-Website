// Regenerates sitemap.xml with each page's real last-modified date.
// Run by .github/workflows/sitemap.yml after every push to main; safe to run
// locally too (`node scripts/build-sitemap.mjs`). Uncommitted edits count as today.
import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";

const SITE = "https://www.theriverruncabin.com";

// Each URL and the files whose changes mean the page's content changed.
// Add new pages here.
const PAGES = [
  {
    path: "/",
    files: ["index.html", "assets/js/gallery.js", "assets/data/reviews.json", "assets/images/Cabin", "assets/images/Fishing"],
  },
  { path: "/area/", files: ["area/index.html", "assets/images/Area"] },
  { path: "/qa/", files: ["qa/index.html"] },
  { path: "/contact/", files: ["contact/index.html"] },
];

const git = (...args) => execFileSync("git", args, { encoding: "utf8" }).trim();
const today = new Date().toISOString().slice(0, 10);

function lastModified(files) {
  if (git("status", "--porcelain", "--", ...files)) return today;
  return git("log", "-1", "--format=%cs", "--", ...files) || today;
}

const urls = PAGES.map(
  ({ path, files }) =>
    `  <url>\n    <loc>${SITE}${path}</loc>\n    <lastmod>${lastModified(files)}</lastmod>\n  </url>`,
).join("\n");

writeFileSync(
  "sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
);
console.log("sitemap.xml updated");
