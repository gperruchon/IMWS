# IM Wealth Select® — Website Brief V6 · Vontobel Light Style

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
IDENTITY & STRATEGY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
| | |
|---|---|
| **Name** | IM Wealth Select® |
| **Tagline** | Your private bank should be selected, not inherited. |
| **Location** | Geneva, Switzerland |
| **Target** | High Net Worth individuals and families — seeking a modern, independent, and transparent approach. |
| **Languages** | EN (default) · FR · DE · ES · IT |

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DESIGN SYSTEM — VONTOBEL LIGHT V6
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
### Color Palette (strict rules)
| Token | Hex | Usage |
|---|---|---|
| `--accent` | #1A6B56 | **CTA buttons ONLY** — buttons, pill backgrounds |
| `--accent-light` | #4A8A6E | Fine decorative accents if needed |
| `--accent-dim` | rgba(26,107,86,0.08) | Card hover radial spotlight |
| `--accent-border` | rgba(26,107,86,0.20) | Card border on hover |
| `--bg-light` | #FFFFFF | Primary white sections |
| `--bg-light-alt` | #F5F2EC | Cream — alternating sections, footer, mobile overlay |
| `--text-dark` | #1A1A18 | All headings |
| `--text-dark-sub` | #4D4D48 | Body text |
| `--text-dark-mut` | #8A8A85 | Eyebrows, labels, step indicators — **NEVER green** |
| `--border-light` | #E5E3DC | 0.5px structural borders |

**Absolute rule: NO green text anywhere in typography. Green = buttons only.**

### Typography
- **Titles (section headings)**: Georgia/serif, weight 400
- **Hero H1**: Inter Bold 700 (exception — white on video)
- **Hero subtitle**: Inter Bold 700 (white on video)
- **Section card titles**: Inter 700
- **Body text**: Inter 300–400
- **Eyebrows/steps/labels**: Inter 700, uppercase, tracked, `--text-dark-mut` (slate gray)
- **Buttons**: Inter 500, pill, `--accent` background, white text

### Layout
- Container max-width: 1140px, padding 0 24px (mobile), 0 40px (desktop)
- Sections: 80px padding (mobile), 120px (desktop)
- No dark sections — 100% light: white or cream only

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GLOBAL NAVIGATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Fixed, height 64px, `--bg-light`, 0.5px bottom border `--border-light`
- Left: "IM Wealth Select®" (Inter 700, `--text-dark`)
- Center: Approach · Expertise · Publications · Team
- Right: Language dropdown (EN/FR/DE/ES/IT) + CTA "Request a banking review"
- Mobile: hamburger → cream overlay with all links + inline language row
- Scroll shadow: `box-shadow: 0 1px 24px rgba(0,0,0,0.06)` on `.is-scrolled`

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PAGE 1 — HOME (index.html)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
— SECTION 1: Hero V6 (70vh, floating text on raw video)
- Height: 70vh, min-height 420px, margin-top: var(--nav-h)
- Background: raw unfiltered video (hero-video.mp4). No overlays, no filters.
- Text floats directly on video: NO glassmorphic panel.
- H1: "Your private bank should be selected, not inherited." (Inter 700, white, text-shadow: 0 2px 10px rgba(0,0,0,0.5))
- Subtitle: "We help you select and monitor the right private banks and wealth managers." (Inter 700, white, same text-shadow)
- NO trust banner. NO CTA buttons in hero.
- Animation: H1 fadeUp 0.85s, subtitle blurReveal 1.0s

— SECTION 2: The Challenge — Comparison Table + Stat Bar (white, 120px)
- Eyebrow: "The Challenge" (`data-i18n="challenge.eyebrow"`) — Inter 700, uppercase, `--accent`
- Heading: "How to choose the right investment partner?" (`data-i18n="challenge.heading"`) — Georgia 300, `clamp(1.5rem,2.2vw,2rem)`, `--text-dark`

**Comparison table** (`.comparison-table.stagger-grid`):
- 2-column CSS Grid (1fr 1fr), no `<table>` element — div-based rows
- Header row (`.comparison-table__header`): cream `--bg-light-alt` background, `border-radius:10px 10px 0 0`, `padding:12px 22px`
  - Left cell (`.comparison-table__head-left`): "Without independent advisor" — Inter 600, 0.8125rem, centered, `--text-dark-mut`
  - Right cell (`.comparison-table__head-right`): "IM Wealth Select®" — Inter 600, 0.8125rem, centered, `--accent`
- Each row (`.comparison-table__row.stagger-item`): display grid 1fr 1fr, no border-bottom, padding-bottom 8px
  - Left cell (`.comparison-table__left`): Inter 400, 0.875rem, `--text-dark-mut`, normal style, `border-right:0.5px --border-light`
  - Right cell (`.comparison-table__right`): white card, `border-radius:10px`, `box-shadow:0 2px 16px var(--accent-dim)`, font-weight 500, `--text-dark`, `margin:6px 0`
  - Left prefix: SVG dash (11×2px) via `.comparison-table__prefix--left`, color `--border-light`
  - Right prefix: SVG checkmark (13×13px) via `.comparison-table__prefix--right`, color `--accent`, font-size 1.1rem
  - Row hover: row `background:transparent`; left cell → `--bg-light-alt`; right cell → `--accent-dim`
- 5 rows content:
  1. "Hard to compare providers." / "Structured tender across all eligible providers."
  2. "Total fees rarely disclosed." / "Full audit: fees benchmarked & negotiated."
  3. "Product incentives can affect advice." / "Paid by you. Zero retrocessions, zero partnerships."
  4. "Established relationships often go unchallenged." / "Ongoing supervision with the right to reopen a tender."
  5. "Multiple providers, multiple reports." / "One consolidated view across all your providers."
- Mobile (<768px): grid collapses to 1fr; left cell gets border-bottom, loses border-right; right cell stacks below with margin 4px 0 12px

**Conclusion** (`.challenge__conclusion.fade-up`): Inter 400, 1.0625rem, `--text-dark-sub`, `margin-top:48px`
"We audit your current setup, run a competitive selection process, negotiate terms on your behalf, and monitor each mandate over time."

**Stat bar** (`.stat-bar.fade-up`, role="list"):
- Desktop: 4-column grid (`repeat(4,1fr)`), no gap. Mobile: 2-column grid.
- Each item (`.stat-bar__item`): `padding:32px 28px`, flex column, centered
  - Item 1 bg: `--bg-light-alt` · Item 2 bg: `--accent-dim` · Item 3 bg: `--border-light` · Item 4 bg: `--bg-light-alt`
- Value (`.stat-bar__value`): Georgia 400, `clamp(1.5rem,3.5vw,2.75rem)`, `--text-dark` — **not green**
  - Suffix `<em>+</em>`: `font-style:normal`, same `--text-dark`
  - Count-up animation via JS `IntersectionObserver` on scroll
- Label (`.stat-bar__label`): Inter 500, 0.8125rem, `--text-dark-sub`
- Values: `80<em>+</em>` / `14` / `5,300<em>+</em>` / `0`
- Labels: "Swiss private banks evaluated" / "Kantonal banks" / "Investment managers" / "Retrocessions"
- All values carry `data-i18n` attributes (keys in `translations/en.json`)

— SECTION 3: Approach (cream `--bg-light-alt`, 3 spotlight cards)
- Eyebrow: "Our Process"
- Heading: "Diagnose. Select & Negotiate. Monitor." (`.section-heading`, Georgia 300)
- Sub: "A transparent, conflict-free process to turn private banking selection into a structured, comparable and monitored decision." (`.section-sub`, Inter 300)
- Card 1: step "01" | title "Diagnose" | "We clarify your investment objectives and risk profile before assessing your current banking setup."
- Card 2: step "02" | title "Select & Negotiate" | "We run a dedicated tender across all eligible providers, select the most suitable partners with you, and negotiate terms and service commitments on your behalf."
- Card 3: step "03" | title "Monitor" | "We track performance, costs, risk and service quality — with consolidated online reporting across all providers."
- CTA: "Discover our approach →" (`.btn-outline-dark`, links to `approach.html`)

— SECTION 4: Latest Publications (white, 3 pub cards)
- No green text on cards. "Read article →" links: `--text-dark-mut`

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PAGE 2 — APPROACH (approach.html)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Page hero: serif title "A rigorous, independent process." (no subtitle)
- Anchor nav: 01 — Diagnose (`#diagnose`) · 02 — Select & Negotiate (`#select`) · 03 — Monitor (`#monitor`) · Fees (`#fees`)
- 3 step detail sections (alternating white/cream)
- Fee table section (cream): transparent flat fee, no retrocessions

**Step 01 — Diagnose** (`id="diagnose"`, `section-light`)
- H2: "Diagnose."
- Body: "We first define your investment goals, personal objectives, risk profile, liquidity needs, time horizon and constraints. We then audit your current banking relationships — portfolios, performance, fees, risks, reporting and service quality — to identify what is aligned, what is costly and what should be challenged."
- List (6 items): Investment goals and personal objectives · Risk profile, liquidity needs and time horizon · Current banks, mandates, asset allocation and holdings · Performance versus objectives and relevant benchmarks · Full fee review: management, custody, transaction costs and retrocessions · Risk exposure, reporting transparency and service quality
- Deliverable card: "Investment Profile & Banking Audit" — "A clear diagnostic summarising your objectives, risk profile, current banking setup, performance, fees, key gaps and priorities for each mandate."
- Duration card: "1 – 3 weeks" — "Depending on the number of banking relationships, portfolio complexity, and availability of documentation."

**Step 02 — Select & Negotiate** (`id="select"`, `section-light--alt`)
- H2: "Independent Selection & Negotiation." (unchanged)
- Body: "For each mandate, we run a dedicated tender / RFP across eligible private banks, external asset managers and specialist providers. We compare proposals side by side, select the preferred partner together with you, then negotiate fees, terms and service commitments on your behalf."
- List (6 items): One dedicated tender / RFP per mandate · Screening of eligible private banks, EAMs and specialist providers · Side-by-side comparison of proposals, fees, service, access and reporting · Final selection made together with you · Negotiation of fees, terms and service commitments · Transition support and implementation coordination
- Deliverable card: "Mandate Tender Report" — "A clear comparison of shortlisted providers, negotiated terms and our recommendation for each mandate."
- Duration card: "4 – 8 weeks" (unchanged)

**Step 03 — Monitor** (`id="monitor"`, `section-light`)
- H2: "Monitor."
- Subtitle (`.step-detail__subtitle`): "Keep the mandate accountable."
- Body: "After onboarding, we monitor whether each mandate remains aligned with your objectives. We review performance, costs, risk, reporting and service quality — and help you act when standards are no longer met."
- List (6 items): Performance and risk reviewed against agreed objectives · Verification of fees, costs and negotiated terms · Mandate compliance, reporting quality and service review · Access to an online reporting tool, with consolidation where relevant · Quarterly review meeting and clear action points · Trigger-based re-tendering when standards are no longer met
- Deliverable card: "Governance Report & Online Reporting Access" — "Regular governance reporting, access to an online reporting tool, quarterly review meetings and clear recommendations when a mandate requires attention."
- Format card: "First 12 months after onboarding" — "Ongoing monitoring is included during the first 12 months after onboarding. After that period, continued governance and reporting can be maintained at a reduced annual rate."

Fees (asset-tiered, percentage-based — `.fee-table-v2.stagger-grid`):
| Assets under advice (CHF M) | Diagnose, selection & monitoring — Year 1 | Monitoring per annum (after Year 1) |
|---|---|---|
| 1 – 5 | 0.65% | 0.25% |
| 5 – 10 | 0.40% | 0.20% |
| 10 – 20 | 0.35% | 0.15% |
| 20+ | 0.25% | 0.10% |

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PAGE 3 — USE CASES / EXPERTISE (use-cases.html)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
8 life scenarios in 2×4 grid (`.grid-2x2`):
1. Divorce & asset separation
2. Inheritance & estate transition
3. Widowhood — banking continuity
4. Business sale proceeds — private banking
5. Corporate treasury — partner selection
6. Expatriation — new banking setup
7. Intergenerational wealth transfer
8. Investment mandate review

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PAGE 4 — PUBLICATIONS (publications.html)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Article list (`.article-list`) on white background
- Filter badges: All · Banking · Fees · Governance · Succession

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PAGE 5 — TEAM (team.html)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Gaylord Perruchon profile (white section)
- Bio: Independent wealth management consultant, Geneva. Former private banker.
- Tech infrastructure (cream section): Morningstar, SmartRFP, Bloomberg, Secure Document Vault

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PAGE 6 — CONTACT (contact.html)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Light form: First name, Last name, Email, Country, Financial assets (select), Message
- Submission CTA: Forest Green pill "Send a confidential request"
- Privacy note below form

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FOOTER (all pages)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Background: `--bg-light-alt`, border-top: 0.5px `--border-light`
- Centered: "IM Wealth Select® · Geneva · Confidential" (Inter 11px, `--text-dark-mut`)
- No links

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
COOKIE BANNER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Fixed bottom bar, white background, `--border-light` top border
- Text + "Accept" button (outline-dark pill, small)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ANIMATIONS & JS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- main.js: scroll nav shadow, hamburger, lang dropdown, IntersectionObserver, spotlight
- No third-party libraries
- Reduced motion: respect prefers-reduced-motion
