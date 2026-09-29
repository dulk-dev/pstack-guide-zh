// Usage: bun tools/check-layout.mjs
// Opens every EPUB document in headless Chrome at phone width and fails on horizontal overflow.
import { readFileSync, mkdtempSync, mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { pathToFileURL } from "node:url";
import JSZip from "jszip";
import { bookFile } from "./lib/manuscript.mjs";
import { launch } from "./lib/chrome.mjs";

const zip = await JSZip.loadAsync(readFileSync(`dist/${bookFile("epub")}`));
const dir = mkdtempSync(join(tmpdir(), "epub-"));
for (const [name, entry] of Object.entries(zip.files)) {
  if (entry.dir) continue;
  const path = join(dir, name);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, await entry.async("nodebuffer"));
}
const browser = await launch();
let failed = 0;
try {
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 800 });
  for (const name of Object.keys(zip.files).filter((n) => n.endsWith(".xhtml"))) {
    await page.goto(pathToFileURL(join(dir, name)).href, { waitUntil: "load" });
    const r = await page.evaluate(() => {
      const bad = [];
      for (const el of document.querySelectorAll("pre, table, img")) {
        if (el.scrollWidth > el.clientWidth + 1 && el.tagName !== "TABLE") bad.push(`${el.tagName} scroll ${el.scrollWidth} > ${el.clientWidth}`);
        if (el.getBoundingClientRect().right > window.innerWidth + 1) bad.push(`${el.tagName} right edge ${Math.round(el.getBoundingClientRect().right)}`);
      }
      return { page: document.documentElement.scrollWidth, bad };
    });
    if (r.page > 391 || r.bad.length) {
      failed++;
      console.error(`FAIL ${name}: page width ${r.page}; ${r.bad.slice(0, 3).join("; ")}`);
    }
  }
} finally {
  await browser.close();
}
if (failed) process.exit(1);
console.log("layout ok: no horizontal overflow at 390px");
