# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**IM Wealth Select®** — static marketing site for a Geneva-based independent wealth advisor. No build tools, no framework, no npm. Open any `.html` file directly in a browser to preview.

**To develop:** open `index.html` in a browser. All pages link to each other with relative paths. The video hero requires `hero-video.mp4` in the root.

## File map

| File | Role |
|---|---|
| `style.css` | Single source of truth for all visual decisions — read before touching HTML |
| `main.js` | All JS: nav shadow, hamburger, lang dropdown, scroll reveal, stat count-up, anchor nav |
| `translations/en.json` | Translatable string keys (`data-i18n` attributes) — EN only so far |
| `cahier_des_charges.md` | Full design brief (V6 Vontobel Light): colors, layouts, per-page specs |
| `*.html` | Six pages: index, approach, use-cases, publications, team, contact |

## Architecture

### HTML pattern — every page
Every page shares an identical `<nav>` + mobile overlay block (copy from `index.html`). Each content section follows:
```html
<section class="section-light | section-light--alt" aria-labelledby="…">
  <div class="container">
    <!-- eyebrow · heading · content -->
  </div>
</section>
```
`section-light` = white (`--bg-light`). `section-light--alt` = cream (`--bg-light-alt`). These alternate.

### CSS organisation
Sections in `style.css` are separated by `/* ── NAME ── */` comments. New components go at the **end** of the file under a new such comment. Never add style inline or in HTML.

### Scroll-reveal animation system
Two patterns, both driven by `IntersectionObserver` in `main.js`:

- **`.fade-up`** — applied to a wrapper element; fades + slides up on scroll. Add to any block-level container.
- **`.stagger-grid` + `.stagger-item`** — applied to a grid wrapper and each card/item child respectively. Items reveal sequentially. The observer adds `.is-visible` to trigger the CSS `@keyframes`.

Do not add `is-visible` in HTML — JS adds it. Do not touch these classes when modifying hover styles.

### i18n
Translatable text carries `data-i18n="key"` matching keys in `translations/en.json`. The JS does **not** yet swap translations at runtime — the attributes are a hook for future implementation.

## Design rules — non-negotiable

**Color: green = buttons only.**
- `--accent` (`#1A6B56`) is used exclusively for CTA buttons, pill backgrounds, checkmark icons, and accent links.
- **Never use green for body text, headings, eyebrows, or labels.** `--text-dark-mut` (slate gray `#8A8A85`) is the correct color for eyebrows, step numbers, and muted labels.

**Typography tokens:**
- Section headings: Georgia/serif, weight 400 — class `.section-heading`
- Body text: Inter 300–400
- Eyebrows / step labels: Inter 700, uppercase, `letter-spacing:0.16em`, `color:var(--text-dark-mut)`

**No dark sections.** All sections are light: white or cream only.

**No style inline.** Use only classes defined in `style.css`.

## Palette reference

| Token | Hex / value | Usage |
|---|---|---|
| `--accent` | `#1A6B56` | CTAs, buttons, prefix icons |
| `--accent-light` | `#4A8A6E` | Fine decorative accents |
| `--accent-dim` | `rgba(26,107,86,0.08)` | Card hover radial bg |
| `--accent-border` | `rgba(26,107,86,0.20)` | Card border on hover |
| `--bg-light` | `#FFFFFF` | White sections |
| `--bg-light-alt` | `#F5F2EC` | Cream — alternating sections, footer |
| `--text-dark` | `#1A1A18` | All headings |
| `--text-dark-sub` | `#4D4D48` | Body text |
| `--text-dark-mut` | `#8A8A85` | Eyebrows, labels, step numbers |
| `--border-light` | `#E5E3DC` | 0.5px structural borders |

## Card hover convention

Card hovers only change: border-color, background (radial spotlight), box-shadow, transform. Text color changes via descendant selectors (e.g. `.approach-card:hover .approach-card__title`). Always pair hover rules with an `@media (hover: none)` reset block to disable effects on touch devices.
