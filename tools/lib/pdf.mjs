import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { BOOK, chapterFragment, escapeHtml } from "./manuscript.mjs";
import { buildToc, renderToc } from "./toc.mjs";
import { launch } from "./chrome.mjs";

const FONT_CSS = [
  "noto-serif-sc/chinese-simplified-400",
  "noto-serif-sc/chinese-simplified-700",
  "noto-serif-sc/latin-400",
  "noto-serif-sc/latin-700",
  "noto-sans-sc/chinese-simplified-400",
  "noto-sans-sc/chinese-simplified-700",
  "noto-sans-sc/latin-400",
  "noto-sans-sc/latin-700",
  "jetbrains-mono/400",
  "jetbrains-mono/700",
];

export function bookHtml({ items, css, printCss, coverUrl }) {
  const toc = buildToc(items);
  const hrefOf = (item, frag) => `#${frag ?? item.id}`;
  const fonts = FONT_CSS.map((f) => `<link rel="stylesheet" href="/node_modules/@fontsource/${f}.css">`).join("\n");
  return `<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8"><title>${escapeHtml(BOOK.title)}</title>
${fonts}
<style>${css}</style><style>${printCss}</style></head><body>
<section class="cover"><img src="${coverUrl}" alt="cover"></section>
<nav class="toc" id="toc"><h1>目录</h1>
${renderToc(toc, hrefOf, { sections: false })}
</nav>
${items.map(chapterFragment).join("\n").replaceAll('src="images/', 'src="/manuscript/images/')}
</body></html>`;
}

export async function buildPdf({ html, buildDir, out }) {
  mkdirSync(buildDir, { recursive: true });
  writeFileSync(resolve(buildDir, "book.html"), html);
  // Serve the repo root over http so paged.js can fetch stylesheets and fonts (file:// fetches are blocked).
  const server = Bun.serve({ port: 0, fetch: async (req) => {
    const path = decodeURIComponent(new URL(req.url).pathname);
    if (path.includes("..")) return new Response("no", { status: 403 });
    const file = Bun.file(resolve(`.${path}`));
    return (await file.exists()) ? new Response(file) : new Response("not found", { status: 404 });
  } });
  const browser = await launch();
  try {
    const page = await browser.newPage();
    page.setDefaultTimeout(0);
    await page.evaluateOnNewDocument(() => { window.PagedConfig = { auto: false }; });
    await page.goto(`http://localhost:${server.port}/build/book.html`, { waitUntil: "networkidle0" });
    await page.evaluateHandle("document.fonts.ready");
    await page.addScriptTag({ path: resolve("node_modules/pagedjs/dist/paged.polyfill.js") });
    const pages = await page.evaluate(async () => {
      const flow = await window.PagedPolyfill.preview();
      // Chrome has no target-counter, so write each contents entry's page number after pagination.
      for (const a of document.querySelectorAll(".pagedjs_pages nav.toc a[href^='#']")) {
        const target = document.getElementById(a.getAttribute("href").slice(1));
        const num = target?.closest(".pagedjs_page")?.dataset.pageNumber;
        if (!num) continue;
        const dots = document.createElement("span");
        dots.className = "toc-dots";
        const n = document.createElement("span");
        n.className = "toc-num";
        n.textContent = num;
        a.append(dots, n);
      }
      return flow.total;
    });
    await page.pdf({ path: out, preferCSSPageSize: true, printBackground: true, outline: true, tagged: true });
    return pages;
  } finally {
    await browser.close();
    server.stop(true);
  }
}
