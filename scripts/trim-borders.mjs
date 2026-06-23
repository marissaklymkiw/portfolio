// Detect and trim thin, uniform borders (e.g. black scan frames) from book
// covers. Conservative: only trims a side when the border is uniform AND
// thinner than CAP_PCT of that dimension, so covers that are legitimately
// dark/light at the edge (Badass, etc.) are never cut into.
//
// Usage:
//   node scripts/trim-borders.mjs            # report only
//   node scripts/trim-borders.mjs --write    # trim in place (backs up to /tmp)

import sharp from "sharp";
import { readdirSync, mkdirSync, copyFileSync } from "node:fs";
import { join } from "node:path";

const DIR = new URL("../public/library/", import.meta.url).pathname;
const WRITE = process.argv.includes("--write");
const TOL = 28; // per-channel tolerance (0-255) for "uniform"
const CAP_PCT = 0.025; // max border thickness as fraction of that dimension

const near = (a, b) => Math.abs(a - b) <= TOL;

// thickness of uniform border on one side, walking inward
function borderThickness(data, w, h, ch, side) {
  const px = (x, y) => {
    const i = (y * w + x) * ch;
    return [data[i], data[i + 1], data[i + 2]];
  };
  const along = side === "top" || side === "bottom" ? w : h;
  const depth = side === "top" || side === "bottom" ? h : w;
  const cap = Math.floor(depth * CAP_PCT);
  // reference colour = corner pixel for this side
  const refXY =
    side === "top" || side === "left" ? [0, 0]
    : side === "right" ? [w - 1, 0]
    : [0, h - 1];
  const ref = px(refXY[0], refXY[1]);

  let count = 0;
  for (let d = 0; d < depth; d++) {
    let uniform = true;
    for (let a = 0; a < along; a++) {
      const [x, y] =
        side === "top" ? [a, d]
        : side === "bottom" ? [a, h - 1 - d]
        : side === "left" ? [d, a]
        : [w - 1 - d, a];
      const c = px(x, y);
      if (!near(c[0], ref[0]) || !near(c[1], ref[1]) || !near(c[2], ref[2])) {
        uniform = false;
        break;
      }
    }
    if (!uniform) break;
    count++;
    if (count > cap) return 0; // too thick -> it's content, not a frame
  }
  return count;
}

const files = readdirSync(DIR).filter((f) => /^cover_.*\.(jpe?g|png)$/i.test(f));
let trimmed = 0;

for (const f of files) {
  const path = join(DIR, f);
  const img = sharp(path);
  const meta = await img.metadata();
  const { width: w, height: h } = meta;
  const raw = await img
    .clone()
    .ensureAlpha(0)
    .raw()
    .toBuffer({ resolveWithObject: true });
  const ch = raw.info.channels;
  const data = raw.data;

  const px = (x, y) => {
    const i = (y * w + x) * ch;
    return [data[i], data[i + 1], data[i + 2]];
  };
  const isDark = ([r, g, b]) => Math.max(r, g, b) < 80;

  let top = borderThickness(data, w, h, ch, "top");
  let bottom = borderThickness(data, w, h, ch, "bottom");
  let left = borderThickness(data, w, h, ch, "left");
  let right = borderThickness(data, w, h, ch, "right");

  // Only trim genuinely DARK frames (the user's "thin black borders").
  // Leave same-colour cover margins (coral, white, etc.) untouched.
  if (top && !isDark(px(0, 0))) top = 0;
  if (left && !isDark(px(0, 0))) left = 0;
  if (right && !isDark(px(w - 1, 0))) right = 0;
  if (bottom && !isDark(px(0, h - 1))) bottom = 0;

  if (top + bottom + left + right === 0) {
    console.log(`ok    ${f}  (${w}x${h}) — no dark border`);
    continue;
  }

  const nw = w - left - right;
  const nh = h - top - bottom;
  console.log(
    `TRIM  ${f}  (${w}x${h} -> ${nw}x${nh})  T${top} B${bottom} L${left} R${right}`
  );
  trimmed++;

  if (WRITE) {
    const bak = "/tmp/cover-backups";
    mkdirSync(bak, { recursive: true });
    copyFileSync(path, join(bak, f));
    const buf = await sharp(path)
      .extract({ left, top, width: nw, height: nh })
      .toBuffer();
    const { writeFileSync } = await import("node:fs");
    writeFileSync(path, buf);
  }
}

console.log(
  `\n${trimmed} file(s) ${WRITE ? "trimmed (backups in /tmp/cover-backups)" : "would be trimmed — run with --write to apply"}`
);
