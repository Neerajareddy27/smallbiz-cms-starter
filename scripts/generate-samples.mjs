// Generates the local placeholder SVG artwork in /public/samples so the seeded demo
// works offline. Run once: node scripts/generate-samples.mjs   (safe to delete afterwards)
import { mkdirSync, writeFileSync } from "node:fs";

mkdirSync("public/samples", { recursive: true });

const palettes = [
  ["#fde2e4", "#f4a6b7", "#c9506b"],
  ["#e2ece9", "#a8d5c2", "#3f8f74"],
  ["#fff1e6", "#fbc490", "#d9772b"],
  ["#e8e4f3", "#b9a7e0", "#6b4fb3"],
  ["#fef9d7", "#f5dc7a", "#b8931a"],
  ["#dff3fa", "#8fd0e8", "#2b7fa3"],
];

function art(w, h, p, seed) {
  // Deterministic pseudo-random so output is stable between runs.
  let s = seed * 9301 + 49297;
  const rnd = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
  let petals = "";
  for (let i = 0; i < 7; i++) {
    const cx = rnd() * w, cy = rnd() * h, r = (0.08 + rnd() * 0.16) * Math.min(w, h);
    const fill = i % 2 ? p[1] : p[2];
    for (let k = 0; k < 6; k++) {
      const a = (k * Math.PI) / 3;
      petals += `<circle cx="${(cx + Math.cos(a) * r * 0.8).toFixed(1)}" cy="${(cy + Math.sin(a) * r * 0.8).toFixed(1)}" r="${(r * 0.55).toFixed(1)}" fill="${fill}" opacity="0.55"/>`;
    }
    petals += `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${(r * 0.35).toFixed(1)}" fill="#fff" opacity="0.85"/>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${p[0]}"/><stop offset="1" stop-color="${p[1]}"/></linearGradient></defs><rect width="${w}" height="${h}" fill="url(#g)"/>${petals}</svg>`;
}

const write = (name, w, h, i) => writeFileSync(`public/samples/${name}.svg`, art(w, h, palettes[i % palettes.length], i + 1));

write("hero", 1600, 1000, 0);
write("about", 1000, 1000, 1);
for (let i = 1; i <= 5; i++) write(`service-${i}`, 800, 600, i);
const sizes = [[800, 1000], [1000, 800], [800, 800], [800, 1000], [1000, 800], [800, 800], [800, 1000], [1000, 800]];
sizes.forEach(([w, h], i) => write(`gallery-${i + 1}`, w, h, i + 2));
console.log("Sample art written to public/samples");
