// Builds the nested table of contents shared by the EPUB nav and the PDF contents page.
import { escapeHtml } from "./manuscript.mjs";

// Entries: front and app items are top level; ch items nest under the preceding part.
export function buildToc(items) {
  const top = [];
  let currentPart = null;
  for (const item of items) {
    const entry = { item, children: [] };
    if (item.kind === "part") {
      currentPart = entry;
      top.push(entry);
    } else if (item.kind === "ch") {
      (currentPart ?? { children: top }).children.push(entry);
    } else {
      currentPart = null;
      top.push(entry);
    }
  }
  return top;
}

export function renderToc(entries, hrefOf, { sections = true } = {}) {
  const li = (e) => {
    const { item } = e;
    const label = escapeHtml(item.fullTitle);
    const cls = item.kind === "part" ? ' class="part-entry"' : "";
    let inner = `<a href="${hrefOf(item)}">${label}</a>`;
    const kids = [];
    if (sections && item.kind !== "part") {
      for (const h of item.headings.filter((h) => h.level === 2)) {
        kids.push(`<li><a href="${hrefOf(item, h.id)}">${escapeHtml(h.text)}</a></li>`);
      }
    }
    const sub = e.children.map(li);
    const all = sub.length ? sub : kids;
    if (all.length) inner += `\n<ol>\n${all.join("\n")}\n</ol>`;
    return `<li${cls}>${inner}</li>`;
  };
  return `<ol>\n${entries.map(li).join("\n")}\n</ol>`;
}
