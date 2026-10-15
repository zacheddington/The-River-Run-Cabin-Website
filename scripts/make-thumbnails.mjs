// Makes the small web copies the site displays. Run after adding photos:
//   npm install --no-save sharp@0.33.5
//   node scripts/make-thumbnails.mjs
// Only creates files that don't exist yet; delete a thumbnail to rebuild it.
import sharp from "sharp";
import { existsSync, mkdirSync, readdirSync } from "node:fs";
import path from "node:path";

sharp.cache(false); // Windows: don't hold source files open

const IMG = "assets/images";
const PHOTO = /\.(jpe?g|png|webp)$/i;
const baseName = (file) => file.replace(/\.[^.]+$/, "");

const JOBS = [
  // Gallery and fishing: thumbnail in thumbs/, original kept for the full-screen viewer
  { dir: "Cabin", out: "Cabin/thumbs", width: 640, quality: 74, skip: /^01-Sign/ },
  { dir: "Fishing", out: "Fishing/thumbs", width: 800, quality: 74 },
  // Area cards are never enlarged: one web copy beside the original (then delete the original)
  { dir: "Area", out: "Area", width: 960, quality: 72, only: /\.(jpe?g|png)$/i },
];

for (const job of JOBS) {
  for (const file of readdirSync(path.join(IMG, job.dir))) {
    if (!(job.only ?? PHOTO).test(file) || job.skip?.test(file)) continue;
    const dest = path.join(IMG, job.out, `${baseName(file)}.webp`);
    if (existsSync(dest)) continue;
    mkdirSync(path.dirname(dest), { recursive: true });
    await sharp(path.join(IMG, job.dir, file))
      .rotate() // respect phone-camera orientation
      .resize({ width: job.width, withoutEnlargement: true })
      .webp({ quality: job.quality })
      .toFile(dest);
    console.log("made", dest);
  }
}
console.log("Thumbnails up to date");
