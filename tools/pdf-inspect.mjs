// Usage: bun tools/pdf-inspect.mjs <pdf> <outDir> <page,page,...>
// Prints page count, embedded fonts, Hangul text sample, and renders the given pages to PNG.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";
import { createCanvas } from "@napi-rs/canvas";

const [pdfPath, outDir, pagesArg = "1"] = process.argv.slice(2);
mkdirSync(outDir, { recursive: true });
const doc = await getDocument({ data: new Uint8Array(readFileSync(pdfPath)), useSystemFonts: false }).promise;
console.log("pages", doc.numPages);
const outline = (await doc.getOutline()) ?? [];
const count = (o) => o.reduce((n, x) => n + 1 + count(x.items ?? []), 0);
console.log("outline entries", count(outline), "top-level", outline.length);
const meta = await doc.getMetadata();
console.log("title", meta.info?.Title);
const fonts = new Set();
let hangul = 0, replacement = 0, chars = 0, emDash = 0;
for (let i = 1; i <= doc.numPages; i++) {
  const page = await doc.getPage(i);
  const tc = await page.getTextContent();
  for (const it of tc.items) {
    if (!it.str) continue;
    chars += it.str.length;
    hangul += (it.str.match(/[가-힣]/g) ?? []).length;
    replacement += (it.str.match(/�/g) ?? []).length;
  }
}
console.log({ chars, hangul, replacement, emDash });
for (const n of pagesArg.split(",").map(Number)) {
  const page = await doc.getPage(n);
  const vp = page.getViewport({ scale: 1.6 });
  const canvas = createCanvas(Math.ceil(vp.width), Math.ceil(vp.height));
  await page.render({ canvasContext: canvas.getContext("2d"), viewport: vp }).promise;
  writeFileSync(`${outDir}/page-${n}.png`, canvas.toBuffer("image/png"));
}
