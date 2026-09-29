// Usage: bun tools/build.mjs [epub|pdf|all]
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { loadManuscript, bookFile } from "./lib/manuscript.mjs";
import { coverHtml } from "./lib/cover.mjs";
import { buildEpub } from "./lib/epub.mjs";
import { bookHtml, buildPdf } from "./lib/pdf.mjs";
import { launch } from "./lib/chrome.mjs";

const target = process.argv[2] ?? "all";
const buildDir = resolve("build");
mkdirSync(buildDir, { recursive: true });
mkdirSync("dist", { recursive: true });

const { items } = loadManuscript();
const css = readFileSync("assets/style.css", "utf8");
const printCss = readFileSync("assets/print.css", "utf8");

async function renderCover() {
  const fontsCss = pathToFileURL(resolve("node_modules/@fontsource/noto-sans-sc/chinese-simplified-700.css")).href;
  const latinCss = pathToFileURL(resolve("node_modules/@fontsource/noto-sans-sc/latin-700.css")).href;
  const path = resolve(buildDir, "cover.html");
  writeFileSync(path, coverHtml().replace("FONTS_CSS", fontsCss).replace("FONTS_LATIN", latinCss));
  const browser = await launch();
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 1800 });
    await page.goto(pathToFileURL(path).href, { waitUntil: "networkidle0" });
    await page.evaluateHandle("document.fonts.ready");
    const png = await page.screenshot({ type: "png" });
    writeFileSync(resolve(buildDir, "cover.png"), png);
    return png;
  } finally {
    await browser.close();
  }
}

const coverPng = await renderCover();

if (target === "epub" || target === "all") {
  const buf = await buildEpub({ items, coverPng, css });
  writeFileSync(`dist/${bookFile("epub")}`, buf);
  console.log(`epub: ${buf.length} bytes, ${items.length} documents`);
}
if (target === "pdf" || target === "all") {
  const html = bookHtml({ items, css, printCss, coverUrl: "/build/cover.png" });
  const pages = await buildPdf({ html, buildDir, out: resolve(`dist/${bookFile("pdf")}`) });
  console.log(`pdf: ${pages} pages`);
}
