'use strict';
const fs   = require('fs');
const path = require('path');

const DIR = __dirname;
let fixes = 0;

const PAGES = ['index', 'approach', 'use-cases', 'publications', 'team', 'contact', 'privacy'];
const LANGS  = [
  { code: 'EN', pfx: '' },
  { code: 'FR', pfx: 'fr-' },
  { code: 'DE', pfx: 'de-' },
  { code: 'IT', pfx: 'it-' },
];

/* ── 1. Add missing <link rel="canonical"> to every page ─────────
   Inserted right after the last hreflang alternate line.           */
for (const page of PAGES) {
  for (const { pfx } of LANGS) {
    const filename = `${pfx}${page}.html`;
    const filepath = path.join(DIR, filename);
    if (!fs.existsSync(filepath)) continue;

    let html = fs.readFileSync(filepath, 'utf8');

    if (html.includes('rel="canonical"')) continue; // already present

    const canonical = `  <link rel="canonical" href="${filename}">`;

    // Insert after the x-default hreflang line (always the last alternate)
    const xDefault = `<link rel="alternate" hreflang="x-default"`;
    const xIdx = html.indexOf(xDefault);
    if (xIdx !== -1) {
      const lineEnd = html.indexOf('\n', xIdx);
      html = html.slice(0, lineEnd + 1) + canonical + '\n' + html.slice(lineEnd + 1);
    } else {
      // Fallback: insert before </head>
      html = html.replace('</head>', canonical + '\n</head>');
    }

    fs.writeFileSync(filepath, html, 'utf8');
    fixes++;
    console.log(`✓ ${filename}  — canonical added`);
  }
}

/* ── 2. Fix DE aria-label inconsistency ──────────────────────────
   de-contact.html and de-privacy.html have "Sprache auswählen" on
   the nav__lang-dropdown; all other DE pages use "Sprache wählen". */
const deFiles = ['de-contact.html', 'de-privacy.html'];
for (const filename of deFiles) {
  const filepath = path.join(DIR, filename);
  if (!fs.existsSync(filepath)) continue;

  let html = fs.readFileSync(filepath, 'utf8');
  const fixed = html.replace(
    'aria-label="Sprache auswählen"',
    'aria-label="Sprache wählen"'
  );

  if (fixed !== html) {
    fs.writeFileSync(filepath, fixed, 'utf8');
    fixes++;
    console.log(`✓ ${filename}  — "Sprache auswählen" → "Sprache wählen"`);
  }
}

console.log(`\n${fixes === 0 ? 'Nothing to update.' : `${fixes} file(s) updated.`}`);
