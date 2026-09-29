// Usage: bun tools/check.mjs
// Verifies the manuscript sources, the built EPUB and (if present) the built PDF.
import { readFileSync, existsSync, readdirSync } from "node:fs";
import JSZip from "jszip";
import { EpubCheck } from "@likecoin/epubcheck-ts";
import { loadManuscript, bookFile, BOOK_VERSION, SOURCE, EXAMPLE_LABEL, COMMENTARY_LABEL } from "./lib/manuscript.mjs";

let failed = 0;
const fail = (msg) => {
  failed++;
  console.error(`FAIL ${msg}`);
};

// 1. Manuscript rules.
const { items } = loadManuscript();
const ids = new Map(items.map((i) => [i.href, new Set(i.headings.map((h) => h.id).concat(i.id))]));
for (const item of items) {
  if (item.source.includes("—")) fail(`${item.file}: contains em dash`);
  // Blockquotes that present author-written examples or commentary must open with the exact label.
  for (const m of item.source.matchAll(/^> \*\*((?:示例|解说)[^*]*)\*\*/gm)) {
    if (m[1] !== EXAMPLE_LABEL && m[1] !== COMMENTARY_LABEL) fail(`${item.file}: example or commentary block with a non-standard label: ${m[1]}`);
  }
  for (const m of item.html.matchAll(/href="([^"]+)"/g)) {
    const href = m[1];
    if (/^(https?:|mailto:)/.test(href)) continue;
    const [file0, frag] = href.split("#");
    const file = file0 === "" ? item.href : file0;
    let fragDec = frag;
    if (frag) {
      try { fragDec = decodeURIComponent(frag); } catch { fragDec = frag; }
    }
    if (!ids.has(file)) fail(`${item.file}: link to missing document ${href}`);
    else if (fragDec && !ids.get(file).has(fragDec)) fail(`${item.file}: link to missing anchor ${href}`);
  }
}
const srcRoot = process.env.PSTACK_SRC;
if (!srcRoot) console.warn("PSTACK_SRC not set: skipping source path check");
for (const item of items) {
  if (!srcRoot) break;
  for (const path of item.srcPaths) if (!existsSync(`${srcRoot}/${path}`)) fail(`${item.file}: source path not found in clone: ${path}`);
}
// Every skill, playbook and agent in the source clone has a section anchor in the manuscript.
if (srcRoot) {
  const anchors = new Set(items.flatMap((i) => i.headings.map((h) => h.id)));
  const want = (dir, prefix) => {
    for (const name of readdirSync(`${srcRoot}/${dir}`)) {
      const base = name.replace(/\.md$/, "");
      if (!anchors.has(`${prefix}-${base}`)) fail(`no section for ${dir}/${name} (expected #${prefix}-${base})`);
    }
  };
  want("skills", "skill");
  want("skills/poteto-mode/playbooks", "playbook");
  console.log(`coverage: ${readdirSync(`${srcRoot}/skills`).length} skills, ${readdirSync(`${srcRoot}/skills/poteto-mode/playbooks`).length} playbooks`);
}

for (const f of readdirSync(".").filter((f) => f.endsWith(".md"))) {
  if (readFileSync(f, "utf8").includes("—")) fail(`${f}: contains em dash`);
}

// 2. Notation: the glossary lists the Korean words that do not map one to one to the source.
// Each row pairs a Korean word with one English term and names the chapter that introduces the pair,
// and that chapter must contain the pair in the fixed form 中文(english).
const TERMS_HEADING = "不能一对一对应的术语";
const glossary = items.find((i) => i.file === "92-app-glossary.md");
const termsSection = glossary?.source.split(/^## /m).find((s) => s.startsWith(TERMS_HEADING));
if (!termsSection) fail(`glossary has no "${TERMS_HEADING}" section`);
else {
  const rows = termsSection.split("\n").filter((l) => l.startsWith("| ")).slice(2).map((l) => l.split("|").slice(1, -1).map((c) => c.trim().replaceAll("`", "")));
  if (rows[0]?.[0] !== "原则") fail("glossary terms table must start with 原则");
  for (const [ko, en, slug] of rows) {
    const chapter = items.find((i) => i.slug === slug);
    if (!chapter) fail(`glossary terms table: unknown chapter "${slug}" for ${ko}(${en})`);
    else if (!chapter.source.includes(`${ko}(${en})`)) fail(`${chapter.file}: missing ${ko}(${en}), the glossary says this chapter introduces it`);
    for (const item of items) if (item.source.includes(`${ko} (${en})`)) fail(`${item.file}: write ${ko}(${en}) without a space`);
  }
  console.log(`notation: ${rows.length} Chinese(English) pairs`);
}

// 3. Dark screen palette. Print and the PDF stay on the light rules: the dark
// block is scoped to screen, and every text or stroke color clears WCAG against its fill.
const styleCss = readFileSync("assets/style.css", "utf8");
const printCss = readFileSync("assets/print.css", "utf8");
if (/prefers-color-scheme/.test(printCss)) fail("print.css must stay light; it declares prefers-color-scheme");
const darkBlocks = [];
for (const m of styleCss.matchAll(/@media\s+([^{]+)\{/g)) {
  if (!/prefers-color-scheme:\s*dark/.test(m[1])) continue;
  let i = m.index + m[0].length;
  let depth = 1;
  while (i < styleCss.length && depth) {
    if (styleCss[i] === "{") depth++;
    else if (styleCss[i] === "}") depth--;
    i++;
  }
  darkBlocks.push({ prelude: m[1], body: styleCss.slice(m.index + m[0].length, i - 1) });
}
if (darkBlocks.length !== 1) fail(`style.css should have one dark palette, found ${darkBlocks.length}`);
else {
  const { prelude, body } = darkBlocks[0];
  if (!/\bscreen\b/.test(prelude)) fail("dark palette must be @media screen so print and PDF stay light");
  const channel = (c) => {
    const s = c / 255;
    return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  const lum = (hex) => {
    const n = parseInt(hex.slice(1), 16);
    return 0.2126 * channel((n >> 16) & 255) + 0.7152 * channel((n >> 8) & 255) + 0.0722 * channel(n & 255);
  };
  const contrast = (a, b) => {
    const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
    return (hi + 0.05) / (lo + 0.05);
  };
  const vars = Object.fromEntries([...body.matchAll(/(--dm-[\w-]+)\s*:\s*(#[0-9a-fA-F]{6})\b/g)].map((v) => [v[1], v[2].toLowerCase()]));
  for (const name of Object.keys(vars)) if (!body.includes(`var(${name})`)) fail(`dark palette ${name} is never applied`);
  const pairs = [
    ["--dm-fg", "--dm-bg", 4.5],
    ["--dm-fg", "--dm-example-bg", 4.5],
    ["--dm-muted", "--dm-bg", 4.5],
    ["--dm-code-fg", "--dm-code-bg", 4.5],
    ["--dm-code-fg", "--dm-pre-bg", 4.5],
    ["--dm-code-fg", "--dm-th-bg", 4.5],
    ["--dm-link", "--dm-bg", 4.5],
    ["--dm-link", "--dm-code-bg", 4.5],
    ["--dm-link", "--dm-th-bg", 4.5],
    ["--dm-link-line", "--dm-bg", 3],
    ["--dm-quote-fg", "--dm-quote-bg", 4.5],
    ["--dm-quote-border", "--dm-quote-bg", 3],
    ["--dm-border", "--dm-bg", 3],
    ["--dm-flow-text", "--dm-flow-fill", 4.5],
    ["--dm-flow-text", "--dm-flow-end", 4.5],
    ["--dm-flow-text", "--dm-flow-alt", 4.5],
    ["--dm-flow-sub", "--dm-flow-fill", 4.5],
    ["--dm-flow-sub", "--dm-flow-end", 4.5],
    ["--dm-flow-sub", "--dm-flow-alt", 4.5],
    ["--dm-flow-stroke", "--dm-flow-fill", 3],
    ["--dm-flow-stroke-alt", "--dm-flow-alt", 3],
    ["--dm-hl-comment", "--dm-pre-bg", 4.5],
    ["--dm-hl-keyword", "--dm-pre-bg", 4.5],
    ["--dm-hl-string", "--dm-pre-bg", 4.5],
    ["--dm-hl-title", "--dm-pre-bg", 4.5],
  ];
  for (const [fg, bg, min] of pairs) {
    if (!vars[fg] || !vars[bg]) fail(`dark palette missing ${vars[fg] ? bg : fg}`);
    else {
      const ratio = contrast(vars[fg], vars[bg]);
      if (ratio < min) fail(`dark contrast ${fg} on ${bg} is ${ratio.toFixed(2)}:1, need ${min}:1`);
    }
  }
  console.log(`dark palette: ${Object.keys(vars).length} colors, ${pairs.length} contrast pairs`);
}

// 4. EPUB structure and validity.
// The book version is BOOK_VERSION. The colophon, EPUB metadata, output file names and README must all agree.
const version = BOOK_VERSION;
const colophon = items.find((i) => i.file === "01-front-colophon.md");
if (!colophon || !colophon.source.includes(`| 本书版本 | ${version} `)) fail(`colophon does not state book version ${version}`);
const readme = readFileSync("README.md", "utf8");
for (const ext of ["epub", "pdf"]) if (!readme.includes(bookFile(ext))) fail(`README.md does not name ${bookFile(ext)}`);
if (!readme.includes(`pstack ${SOURCE.version}（提交`)) fail(`README.md does not state pstack version ${SOURCE.version}`);
if (!readme.includes(`本书当前版本是 \`${version}\``)) fail(`README.md does not state book version ${version}`);
if (existsSync("dist")) {
  const want = new Set([bookFile("epub"), bookFile("pdf")]);
  for (const f of readdirSync("dist").filter((f) => /^pstack-guide.*\.(epub|pdf)$/.test(f))) if (!want.has(f)) fail(`dist/${f}: file name does not match version ${version}`);
}

const epubPath = `dist/${bookFile("epub")}`;
if (!existsSync(epubPath)) fail(`${epubPath} missing`);
else {
  const data = readFileSync(epubPath);
  const zip = await JSZip.loadAsync(data);
  const names = Object.keys(zip.files);
  const opf = await zip.file("OEBPS/content.opf").async("string");
  if (opf.match(/<meta property="schema:version">([^<]*)</)?.[1] !== version) fail(`EPUB metadata version does not equal ${version}`);
  if (names[0] !== "mimetype") fail("mimetype is not the first zip entry");
  const result = await EpubCheck.validate(new Uint8Array(data));
  const msgs = result.messages ?? [];
  const errors = msgs.filter((m) => ["fatal", "error"].includes(String(m.severity).toLowerCase()));
  const warnings = msgs.filter((m) => String(m.severity).toLowerCase() === "warning");
  for (const m of [...errors, ...warnings]) console.error(`${m.severity} ${m.id} ${m.location?.path ?? ""} ${m.message}`);
  if (errors.length) fail(`epubcheck: ${errors.length} errors`);
  if (warnings.length) fail(`epubcheck: ${warnings.length} warnings`);
  console.log(`epubcheck: valid=${result.valid} errors=${errors.length} warnings=${warnings.length}`);
}

if (failed) {
  console.error(`${failed} check(s) failed`);
  process.exit(1);
}
console.log("all checks passed");
