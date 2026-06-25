'use strict';
const fs   = require('fs');
const path = require('path');

const DIR = __dirname;
let fixes = 0;

/* ── 1. Patch main.js ─────────────────────────────────────────────
   urlForLang returned absolute paths ('/fr-index.html') which break
   local file:// testing. Relative paths work both locally and on Netlify.
   Also: click handler should prefer data-href (already set per-page in HTML)
   over the computed urlForLang result.                                      */
const mainJsPath = path.join(DIR, 'main.js');
let mainJs = fs.readFileSync(mainJsPath, 'utf8');
let mainJsChanged = false;

if (mainJs.includes("if (lang === 'EN') return '/' + base;")) {
  mainJs = mainJs
    .replace("if (lang === 'EN') return '/' + base;",          "if (lang === 'EN') return base;")
    .replace("return '/' + lang.toLowerCase() + '-' + base;",  "return lang.toLowerCase() + '-' + base;");
  mainJsChanged = true;
}

if (mainJs.includes('window.location.href = urlForLang(lang);')) {
  mainJs = mainJs.replace(
    'window.location.href = urlForLang(lang);',
    'window.location.href = el.dataset.href || urlForLang(lang);'
  );
  mainJsChanged = true;
}

if (mainJsChanged) {
  fs.writeFileSync(mainJsPath, mainJs, 'utf8');
  fixes++;
  console.log('✓ main.js  — urlForLang now returns relative paths; click handler prefers data-href');
} else {
  console.log('· main.js  — already patched');
}

/* ── 2. Verify / fix data-href in every HTML file ────────────────
   Each lang-switcher option must carry data-href pointing to the
   same-page equivalent in the target language, not always to index. */
const PAGES = ['index', 'approach', 'use-cases', 'publications', 'team', 'contact', 'privacy'];
const LANGS  = [
  { code: 'EN', pfx: '' },
  { code: 'FR', pfx: 'fr-' },
  { code: 'DE', pfx: 'de-' },
  { code: 'IT', pfx: 'it-' },
];

for (const page of PAGES) {
  for (const { pfx } of LANGS) {
    const filename = `${pfx}${page}.html`;
    const filepath = path.join(DIR, filename);
    if (!fs.existsSync(filepath)) continue;

    let html = fs.readFileSync(filepath, 'utf8');
    let changed = false;

    for (const { code: optCode, pfx: optPfx } of LANGS) {
      const correct = `${optPfx}${page}.html`;

      /* desktop lang dropdown: data-lang="X" role="option" data-href="..." */
      const next1 = html.replace(
        new RegExp(`data-lang="${optCode}" role="option" data-href="[^"]+"`, 'g'),
        `data-lang="${optCode}" role="option" data-href="${correct}"`
      );
      if (next1 !== html) { changed = true; html = next1; }

      /* mobile overlay: data-lang="X" data-href="..." (no role attribute between) */
      const next2 = html.replace(
        new RegExp(`data-lang="${optCode}" data-href="[^"]+"`, 'g'),
        `data-lang="${optCode}" data-href="${correct}"`
      );
      if (next2 !== html) { changed = true; html = next2; }
    }

    if (changed) {
      fs.writeFileSync(filepath, html, 'utf8');
      fixes++;
      console.log(`✓ ${filename}`);
    }
  }
}

console.log(`\n${fixes === 0 ? 'Nothing to update.' : `${fixes} file(s) updated.`}`);
