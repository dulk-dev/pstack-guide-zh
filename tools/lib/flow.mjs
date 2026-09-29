// Renders a ```flow fenced block to an inline SVG flow chart.
//
// Grammar, one node per line. Indented lines attach to the node above them.
//   start TITLE | DETAIL      rounded terminal (also end)
//   step TITLE | DETAIL        box; DETAIL is optional
//     alt LABEL | TEXT         solid side box reached from the step above
//     stop LABEL | TEXT        dashed side box, the run ends or hands back here
//     back N | LABEL           arrow from the step above back up to main node N (1-based)
// The info string after "flow" becomes the accessible name of the chart.
const escapeHtml = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const W = 520;
const FS = 14;
const FS_SMALL = 12.5;
const LH = 1.4;
const PAD = 6;
const GAP = 16;
const SIDE_GAP = 8;
const LEFT = 44;

// Approximate advance width of one character in em.
function em(ch) {
  if (/[\u1100-\u11ff\u2e80-\u9fff\uac00-\ud7af\uf900-\ufaff\uff00-\uffef]/.test(ch)) return 1;
  if (ch === " ") return 0.3;
  if (/[A-Z0-9]/.test(ch)) return 0.62;
  if (/[.,:;'`|!()\-]/.test(ch)) return 0.4;
  return 0.56;
}
const width = (s, fs) => [...s].reduce((n, ch) => n + em(ch) * fs, 0);

function wrap(text, fs, max) {
  const lines = [];
  let line = "";
  for (const word of text.split(/(?<= )/)) {
    if (line && width(line + word, fs) > max) {
      lines.push(line.trimEnd());
      line = "";
    }
    if (width(word, fs) > max) {
      for (const ch of word) {
        if (width(line + ch, fs) > max) {
          lines.push(line);
          line = "";
        }
        line += ch;
      }
    } else line += word;
  }
  if (line.trim()) lines.push(line.trimEnd());
  return lines;
}

function parse(source) {
  const mains = [];
  for (const raw of source.split("\n")) {
    if (!raw.trim()) continue;
    const indented = /^\s/.test(raw);
    const m = raw.trim().match(/^(\w+)\s+(.*)$/);
    if (!m) throw new Error(`flow: bad line "${raw}"`);
    const [, kind, rest] = m;
    const [a, b] = rest.split(/\s*\|\s*/);
    if (indented) {
      if (!mains.length) throw new Error(`flow: "${raw}" has no node above it`);
      const node = mains[mains.length - 1];
      if (kind === "back") node.backs.push({ target: Number(a), label: b ?? "" });
      else if (kind === "alt" || kind === "stop") node.sides.push({ kind, label: a, text: b ?? "" });
      else throw new Error(`flow: unknown side kind "${kind}"`);
    } else {
      if (!["start", "end", "step"].includes(kind)) throw new Error(`flow: unknown node kind "${kind}"`);
      mains.push({ kind, title: a, detail: b, sides: [], backs: [] });
    }
  }
  return mains;
}

function box(x, y, w, lines, { title, cls }) {
  const h = PAD * 2 + lines.length * FS * LH - (LH - 1) * FS * 0.2;
  return { x, y, w, h, lines, title, cls };
}

export function renderFlow(source, name) {
  const mains = parse(source);
  const uid = `fl${Bun.hash(source + name).toString(36)}`;
  const hasSide = mains.some((n) => n.sides.length);
  const hasBack = mains.some((n) => n.backs.length);
  const left = hasBack ? LEFT : 8;
  const mainW = hasSide ? 250 : 380;
  const mainX = hasSide ? left : left + Math.max(0, (W - left - 8 - mainW) / 2);
  const sideX = mainX + mainW + 30;
  const sideW = W - 8 - sideX;

  let y = 6;
  const parts = [];
  const rows = [];
  mains.forEach((node, i) => {
    const inner = mainW - PAD * 2 - (node.kind === "step" ? 0 : 12);
    const titleLines = wrap(node.title, FS, inner);
    const detailLines = node.detail ? wrap(node.detail, FS_SMALL, inner) : [];
    const h = PAD * 2 + titleLines.length * FS * LH + detailLines.length * FS_SMALL * LH - 2;
    const sides = node.sides.map((s) => {
      const labelLines = wrap(s.kind === "stop" ? `停止: ${s.label}` : s.label, FS_SMALL, sideW - PAD * 2);
      const textLines = s.text ? wrap(s.text, FS_SMALL, sideW - PAD * 2) : [];
      const sh = PAD * 2 + (labelLines.length + textLines.length) * FS_SMALL * LH - 2;
      return { ...s, labelLines, textLines, h: sh };
    });
    const sideTotal = sides.reduce((n, s) => n + s.h, 0) + Math.max(0, sides.length - 1) * SIDE_GAP;
    const rowH = Math.max(h, sideTotal);
    const top = y + (rowH - h) / 2;
    rows.push({ node, top, h, cy: top + h / 2, titleLines, detailLines, sides, rowTop: y, rowH, sideTotal });
    y += rowH + (i < mains.length - 1 ? GAP : 0);
  });
  const H = y + 6;

  // Boxes and connectors.
  rows.forEach((r, i) => {
    const { node } = r;
    const cx = mainX + mainW / 2;
    if (node.kind === "step") {
      parts.push(`<rect class="fl-box" x="${mainX}" y="${r.top}" width="${mainW}" height="${r.h}" rx="4"/>`);
    } else {
      parts.push(`<rect class="fl-end" x="${mainX}" y="${r.top}" width="${mainW}" height="${r.h}" rx="${Math.min(r.h / 2, 18)}"/>`);
    }
    let ty = r.top + PAD + FS;
    const tx = node.kind === "step" ? mainX + PAD : cx;
    const anchor = node.kind === "step" ? "start" : "middle";
    for (const line of r.titleLines) {
      parts.push(`<text class="fl-t" x="${tx}" y="${ty - 2}" text-anchor="${anchor}">${escapeHtml(line)}</text>`);
      ty += FS * LH;
    }
    ty -= FS * LH - FS_SMALL * LH;
    for (const line of r.detailLines) {
      parts.push(`<text class="fl-d" x="${tx}" y="${ty - 2}" text-anchor="${anchor}">${escapeHtml(line)}</text>`);
      ty += FS_SMALL * LH;
    }
    if (i < rows.length - 1) {
      const y1 = r.top + r.h;
      const y2 = rows[i + 1].top;
      parts.push(`<path class="fl-line" d="M${cx} ${y1} V${y2 - 1}" marker-end="url(#${uid})"/>`);
    }
    // Side boxes.
    let sy = r.rowTop + (r.rowH - r.sideTotal) / 2;
    for (const s of r.sides) {
      const cls = s.kind === "stop" ? "fl-stop" : "fl-alt";
      parts.push(`<rect class="${cls}" x="${sideX}" y="${sy}" width="${sideW}" height="${s.h}" rx="4"/>`);
      let sty = sy + PAD + FS_SMALL;
      for (const line of s.labelLines) {
        parts.push(`<text class="fl-sl" x="${sideX + PAD}" y="${sty - 2}">${escapeHtml(line)}</text>`);
        sty += FS_SMALL * LH;
      }
      for (const line of s.textLines) {
        parts.push(`<text class="fl-d" x="${sideX + PAD}" y="${sty - 2}">${escapeHtml(line)}</text>`);
        sty += FS_SMALL * LH;
      }
      const sc = sy + s.h / 2;
      const x1 = mainX + mainW;
      const xm = x1 + 15;
      const from = Math.min(Math.max(sc, r.top + 6), r.top + r.h - 6);
      parts.push(
        `<path class="fl-line${s.kind === "stop" ? " fl-dash" : ""}" d="M${x1} ${from} H${xm} V${sc} H${sideX - 1}" marker-end="url(#${uid})"/>`,
      );
      sy += s.h + SIDE_GAP;
    }
    // Loop arrows on the left margin.
    r.node.backs.forEach((b, k) => {
      const target = rows[b.target - 1];
      if (!target) throw new Error(`flow: back target ${b.target} does not exist`);
      const lx = mainX - 8 - k * 16 - (hasBack ? 4 : 0);
      parts.push(
        `<path class="fl-line fl-dash" d="M${mainX} ${r.cy} H${lx} V${target.cy} H${mainX - 1}" marker-end="url(#${uid})"/>`,
      );
      if (b.label) {
        const my = (r.cy + target.cy) / 2;
        parts.push(`<text class="fl-d" transform="translate(${lx - 5} ${my}) rotate(-90)" text-anchor="middle">${escapeHtml(b.label)}</text>`);
      }
    });
  });

  const aria = escapeHtml(name || "流程图");
  return `<figure class="flow"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${Math.ceil(H)}" role="img" aria-label="${aria}"><title>${aria}</title><defs><marker id="${uid}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" class="fl-head"/></marker></defs>${parts.join("")}</svg></figure>\n`;
}
