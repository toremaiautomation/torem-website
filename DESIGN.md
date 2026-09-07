---
name: Torem AI
description: Done-for-you AI automation for small businesses — 24/7 inquiry capture, booking, and follow-up
colors:
  navy: "#0B1F3A"
  navy-mid: "#122847"
  navy-surface: "#0F2238"
  signal-blue: "#007AE3"
  signal-blue-lit: "#0088F5"
  signal-blue-dark: "#3B9EFF"
  blueprint-white: "#F7FAFF"
  sky-surface: "#EEF6FF"
  steel-gray: "#5C6E84"
  cloud-border: "#D3E0F0"
  deep-border: "#21344E"
  chip-dark: "#16314F"
  ghost-blue: "rgba(0,122,227,0.1)"
  risk-red: "#F87171"
  active-green: "#34d399"
  white: "#FFFFFF"
typography:
  display:
    fontFamily: "'Bricolage Grotesque', 'Georgia', serif"
    fontSize: "clamp(38px, 5.8vw, 72px)"
    fontWeight: 800
    lineHeight: 1.08
    letterSpacing: "-1px"
  headline:
    fontFamily: "'Bricolage Grotesque', 'Georgia', serif"
    fontSize: "clamp(26px, 3.5vw, 40px)"
    fontWeight: 800
    lineHeight: 1.15
  title:
    fontFamily: "'Bricolage Grotesque', 'Georgia', serif"
    fontSize: "18px"
    fontWeight: 700
    lineHeight: 1.3
  body:
    fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.75
  body-large:
    fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif"
    fontSize: "11px"
    fontWeight: 700
    letterSpacing: "1.8px"
rounded:
  xs: "6px"
  sm: "8px"
  md: "10px"
  lg: "14px"
  xl: "16px"
  pill: "100px"
  circle: "50%"
spacing:
  xs: "8px"
  sm: "14px"
  md: "24px"
  lg: "40px"
  xl: "64px"
  2xl: "96px"
components:
  button-primary:
    backgroundColor: "{colors.signal-blue}"
    textColor: "{colors.white}"
    rounded: "{rounded.sm}"
    padding: "14px 28px"
  button-primary-hover:
    backgroundColor: "{colors.signal-blue-lit}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.signal-blue}"
    rounded: "{rounded.sm}"
    padding: "12px 26px"
  button-ghost-hover:
    backgroundColor: "{colors.ghost-blue}"
  button-cta-inverse:
    backgroundColor: "{colors.white}"
    textColor: "{colors.signal-blue}"
    rounded: "{rounded.sm}"
    padding: "15px 32px"
  card-standard:
    backgroundColor: "{colors.blueprint-white}"
    rounded: "{rounded.lg}"
    padding: "32px"
  card-featured:
    backgroundColor: "{colors.blueprint-white}"
    rounded: "{rounded.xl}"
    padding: "40px"
  input-field:
    backgroundColor: "{colors.white}"
    textColor: "{colors.navy}"
    rounded: "{rounded.sm}"
    padding: "11px 14px"
---

# Design System: Torem AI

## Overview

**Creative North Star: "The Reliable Machine"**

Torem AI's visual system is built on a single conviction: trust is earned by working, not by looking impressive. The design operates like infrastructure — foundational, disciplined, doing its job without announcing itself. Foundry Navy provides the grounding weight of a business that knows what it's doing; Signal Blue appears precisely where action is required — on buttons, active states, and confirmation moments — and nowhere else. Every layout decision serves clarity: wide containers breathe, sections land with decisive vertical spacing, and nothing competes for attention the product hasn't earned.

The dual-mode system (light and dark) maintains the same visual logic across both surfaces. What shifts is ground color and border weight; the palette character, typographic hierarchy, and spatial rhythm stay constant. On dark hero sections and the footer, a subtle blueprint grid operates at 10% opacity — a quiet reference to construction-grade precision, used exactly once per section and never on light backgrounds.

The component vocabulary is tactile and confident: buttons feel clickable, cards feel solid, inputs feel grounded. Hover states offer clear physical feedback — a 5px upward lift with blue-tinted shadow on cards, a 1px rise on buttons — so every interactive element communicates its function without instruction.

**Key Characteristics:**
- Foundry Navy as dominant ground; Signal Blue as a precision action marker, used sparingly
- Display type commands; body type disappears into readability — the gap between them is structural
- Flat at rest, lifted on hover — depth is a response to interaction, never decorative ambience
- Blueprint grid motif appears exclusively on navy sections — structural whisper, not wallpaper
- Pill geometry for tags, chips, and status; rectangular confidence for all primary actions and cards
- No gradients, no pastels, no decorative illustration — authority through restraint

## Colors

Two-tone at the core: deep navy anchors every surface, electric blue signals every action. Supporting neutrals and borders do structural work without competing.

### Primary
- **Foundry Navy** (#0B1F3A): The primary dark ground. Used for hero sections, the footer, and the always-dark band that opens every page. Sets the authority and depth of the system.
- **Signal Blue** (#007AE3): The action color. Primary buttons, active nav states, interactive links, featured card borders, and input focus rings. Used precisely — never for ambient color.

### Secondary
- **Signal Blue Lit** (#0088F5): Hover state for Signal Blue elements only. Not used independently as a brand color.
- **Signal Blue Dark** (#3B9EFF): Signal Blue's dark-mode equivalent. Maintains accessible contrast on navy and dark card surfaces.

### Neutral
- **Blueprint White** (#F7FAFF): The primary light-mode secondary surface. Slightly blue-tinted white — used for card backgrounds and off-white page sections.
- **Sky Surface** (#EEF6FF): Light-mode alternate background. Alternating section fills and chip/tag backgrounds in light mode.
- **Steel Gray** (#5C6E84): Muted text. Secondary body copy, captions, card descriptions. Never for headings.
- **Cloud Border** (#D3E0F0): Light-mode borders and dividers. All card borders, section dividers, input strokes at rest.
- **Deep Border** (#21344E): Dark-mode equivalent of Cloud Border. Card and input strokes on navy surfaces.
- **Pure White** (#FFFFFF): Light-mode primary page background. Also used as text color on Signal Blue CTA bands.

### Semantic
- **Risk Red** (#F87171): Pain-point markers, ROI loss figures, error states. Never used as a primary brand color.
- **Active Green** (#34d399): Status indicator dot (live, active, connected). Icon-only use; never for text or fills.

### Named Rules

**The Single Signal Rule.** Signal Blue at full saturation (#007AE3, opacity ≥60%) is capped at ≤15% of any given screen — confined to interactive markers: buttons, active states, card accent borders, and focus rings. This cap governs only the action color, not the material system. Two other blue registers exist and are not subject to the cap: (1) **Atmospheric Blue** — low-opacity tinted glass (rgba(0,122,227,≤0.20) + backdrop-blur) used in glassmorphism treatments on the navbar, hero surfaces, and floating panels; this is ambient material texture, not the action color. (2) **Canvas Blue** — Signal Blue as a full section background (CTA bands); this is a structural scroll moment where blue becomes the ground, allowed at ≤2 non-adjacent sections per page. Conflating these three registers undermines all of them: the action color loses its scarcity, the atmospheric glass looks like a UI error, and the canvas sections lose their landing-point weight.

**The Semantic Color Rule.** Risk Red and Active Green are reserved for system states, never brand expression. They carry functional meaning that marketing color undermines.

## Typography

**Display Font:** Bricolage Grotesque (optical size 12–96, weights 400–800), Georgia serif fallback
**Body Font:** DM Sans (weights 400–700), system-ui fallback

**Character:** A deliberate contrast pairing — Bricolage's editorial authority and variable optical sizing against DM Sans's clean, neutral utility. Headings arrive with weight and presence; body copy steps back and disappears into reading. The pairing communicates: this product was designed for real work, not polished for a pitch deck.

### Hierarchy

- **Display** (weight 800, clamp(38px–72px), line-height 1.08, letter-spacing −1px): Hero headlines only. The biggest statement a page makes. Never used for section headings or subtext.
- **Headline** (weight 800, clamp(26px–40px), line-height 1.15): Section headings (h2). One per section; pairs with an 11px uppercase eyebrow above and 15px muted subtext below.
- **Title** (weight 700–800, 18–20px, line-height 1.3): Card titles and inner-page h1s at a reduced scale (clamp(32px–58px) on sub-pages). The primary label for a discrete content unit.
- **Body** (weight 400, 13–14px, line-height 1.75): All descriptive and explanatory copy. Weight 500 for emphasis within body; 600–700 for button labels only.
- **Body Large** (weight 400, 15–17px, line-height 1.7): Hero subtext and section lead copy. Used directly under Display or Headline; not a third heading level.
- **Label** (weight 700, 11px, letter-spacing 1.8px, uppercase): Section eyebrows, chip/tag text, column headers, form field labels (0.5px tracking). Never body copy.

### Named Rules

**The Hierarchy Guarantee.** Display sets the room's weight; body disappears into it. The gap between them is the architecture — never narrow it by bumping body size or dropping display weight. A 14px body next to a 72px display is intentional contrast, not a mistake.

**The Display Exclusion Rule.** Bricolage Grotesque is reserved for headings and stat values (the large numerals in hero pills and ROI output). It never appears as body copy, button labels, or form elements. DM Sans owns all running text and interactive controls.

## Layout

The layout system uses a single max-width container (1140px, `margin: 0 auto`) with fluid horizontal padding (`clamp(24px, 6vw, 80px)`) that compresses gracefully from large desktop to mobile. Section vertical rhythm is bold: 76–96px top/bottom padding per section, creating clear visual breathing room between content blocks.

Grid behavior is pragmatic: three-column (features, pain points), two-column (ROI calculator, form layouts), and `auto-fit minmax(300px, 1fr)` for add-on cards that reflow naturally. All grids collapse to a single column at 760px. Gap values range from 12px (tight chip rows) to 40px (primary card grids).

The nav is fixed at 66px height with backdrop-blur(16px) on scroll. On mobile (≤768px), the desktop links are hidden and replaced by a full-width slide-down hamburger panel.

**Spatial rhythm:** 8px base unit. xs=8px, sm=14px, md=24px, lg=40px, xl=64px, 2xl=96px. Card internal padding: 28–32px standard, 40px featured. Interactive element padding: 9–15px vertical, 14–28px horizontal.

## Elevation & Depth

A hybrid system: flat by default, with hover-state elevation used as the primary interactive feedback mechanism. Permanent shadows appear only on featured components. Ambient depth is achieved through tonal layering (dark sections use Navy Mid for card surfaces) and the blueprint grid overlay — not shadows.

**The Flat-By-Default Rule.** Every surface rests flat. No drop shadow at rest, no ambient glow, no floating cards on page load. Shadows appear in exactly two cases: hover state (user-triggered) and featured/primary components (editorial emphasis). A shadow on a resting default card is noise.

### Shadow Vocabulary

- **Hover lift** (`0 20px 48px rgba(23,84,207,0.13)`, paired with `translateY(-5px)`, 0.22s ease): All standard cards on hover. Blue-tinted to echo Signal Blue — elevation stays on-brand.
- **Featured glow** (`0 8px 40px rgba(0,122,227,0.12)`): The foundation card and other primary-highlighted components. A permanent low-intensity blue ambient glow marks editorial priority.
- **Logo ring** (`0 0 0 3px {surface-color}, 0 4px 14px rgba(0,122,227,0.35)`): Ring + glow on the circular logo mark. The ring matches the current surface to create a floating halo.
- **Chat widget** (`0 8px 40px rgba(0,0,0,0.16)`): Floating chat panel. Neutral dark shadow anchors it independently of the page surface color.

## Shapes

The system uses a two-level corner strategy: **rectangular confidence for primary containers and actions** (8–16px radius) and **pill geometry for metadata and status** (100px radius). This contrast is intentional — pills read instantly as labels, chips, or badges; rectangular elements are structural furniture.

- **Buttons and inputs:** 8–9px radius. Grounded, not soft.
- **Small cards (pain points, add-ons):** 10px radius.
- **Standard feature cards:** 14px radius.
- **Featured/primary cards:** 16px radius, paired with a 2px solid Signal Blue full border (not top-only).
- **Chips, tags, eyebrow badges, active nav indicator:** 100px radius (pill). Reads as metadata or status, never as primary action.
- **Logo/avatar:** 50% (circle). Reserved for the brand mark and profile images only.
- **Process step rail:** 2px solid left border, rgba(23,84,207,0.4). Structural timeline marker on navy sections.

**The Corner Consistency Rule.** Never mix pill and large-radius corners on the same structural level. Buttons: 8–9px. Cards: 10–16px. Chips: pill. The radius gradient communicates hierarchy — breaking it confuses the visual scan.

## Components

### Buttons

Tactile and confident. Buttons feel clickable because they have visual weight and respond physically to interaction.

- **Shape:** 8–9px radius (primary and ghost)
- **Primary:** Signal Blue background (#007AE3), white text, 14px/28px padding (vertical/horizontal), DM Sans 600 weight
- **Hover / Focus:** Shifts to Signal Blue Lit (#0088F5), `translateY(-1px)`, 0.18s ease. Focus-visible: 3px Signal Blue ring at 40% opacity, 2px offset
- **Ghost:** Transparent background, 2px solid Signal Blue border, Signal Blue text — 12px/26px padding, weight 700. Hover: `rgba(0,122,227,0.08)` fill, `translateY(-1px)`
- **CTA Inverse (on blue bands):** White background, Signal Blue text. Used exclusively when the section background is Signal Blue

### Cards / Containers

- **Corner Style:** 14px standard, 16px featured
- **Background:** Blueprint White (#F7FAFF) on light surfaces; Navy Mid (#122847) on dark surfaces
- **Shadow Strategy:** Flat at rest. Hover: `translateY(-5px)` + blue-tinted shadow. Featured: permanent blue ambient glow (see Elevation)
- **Border:** 1px Cloud Border (#D3E0F0) on standard cards. 2px solid Signal Blue on featured/primary cards. 3px Signal Blue top accent on home-page feature preview cards
- **Internal Padding:** 28–32px standard, 40px featured

### Chips / Tags

- **Style:** Pill radius (100px). Two variants: (1) Eyebrow tag — no background, 11px uppercase, Signal Blue text, 1.8px letter-spacing. (2) Category chip — Sky Surface (#EEF6FF) background, Signal Blue text, 5px/14px padding. Dark variant: Chip Dark (#16314F) background, Signal Blue Dark (#3B9EFF) text (on navy surfaces)
- **State:** Static labels; non-interactive unless used as filter toggles

### Inputs / Fields

- **Style:** 1px Cloud Border stroke, white background, 8px radius, 11px/14px padding
- **Focus:** Border shifts to Signal Blue; `0 0 0 3px rgba(0,122,227,0.12)` outer glow ring — identical treatment to button focus
- **Label:** 11px uppercase DM Sans, 700 weight, Steel Gray, 0.5px letter-spacing — always above the field, never placeholder-only

### Navigation

- **Style:** 66px fixed height, `backdrop-filter: blur(16px)`, 1px bottom border appearing on scroll (transparent at top). Background transitions from page bg to a blurred version of the surface on scroll
- **Links:** 13px DM Sans 500, Steel Gray default. Active: 600 weight, Signal Blue text, Sky Surface background at 6px radius pill. Hover: Sky Surface bg + Signal Blue text
- **Mobile:** Hamburger replaces desktop links at ≤768px. Full-width slide-down panel; Signal Blue background on the open-state toggle button

### Signature: Stat Pill (Dark Surface)

The hero stat pills are a distinctive recurring element — frosted-glass tiles on navy, used to surface proof points (24/7, 3–7 days, 100% custom).

- **Background:** `rgba(255,255,255,0.05)` — nearly invisible tint
- **Border:** `1px rgba(255,255,255,0.09)`
- **Radius:** 10px
- **Value:** Bricolage Grotesque, 22px, weight 800, white
- **Label:** DM Sans, 11px, #475569 — intentionally low contrast on navy for hierarchy

### Signature: Blueprint Grid Overlay

Present on all Foundry Navy hero sections and the footer. Rendered as a CSS `background-image` linear gradient at 44×44px, using `rgba(0,122,227,0.1)`.

**The Blueprint Rule.** This motif appears only on Foundry Navy (#0B1F3A) surfaces. It is invisible on light backgrounds. It communicates construction-grade precision; applying it to light sections turns it into decoration and breaks the rule it enforces.

## Do's and Don'ts

### Do:
- **Do** use Signal Blue exclusively for primary actions, active nav states, featured card borders, and interactive links — nothing else.
- **Do** pair Bricolage Grotesque headings with DM Sans body copy — never use display type for body text or button labels.
- **Do** keep cards flat at rest and lift only on hover (`translateY(-5px)` + blue-tinted shadow, 0.22s ease).
- **Do** use the blueprint grid motif (`44×44px`, `rgba(0,122,227,0.1)`) exclusively on Foundry Navy sections.
- **Do** use pill radius (100px) for all tags, chips, badges, and status indicators.
- **Do** maintain section vertical padding at 76–96px to preserve the generous, breathable rhythm.
- **Do** label form fields with 11px uppercase DM Sans above the input — never rely on placeholder text alone.

### Don't:
- **Don't** soften the system with pastels, gradients, bubbly illustration, or over-rounded corners — this is tactile authority, not consumer-app friendliness.
- **Don't** add shadows to flat resting surfaces — elevation is a hover response, not ambient decoration.
- **Don't** dilute Signal Blue into backgrounds, decorative borders, or non-interactive text — its scarcity is its power.
- **Don't** apply the blueprint grid to light-mode sections or card backgrounds — it only reads on Foundry Navy.
- **Don't** narrow the gap between display and body type — the size contrast is the information architecture.
- **Don't** use Risk Red (#F87171) or Active Green (#34d399) outside their semantic roles (error states and live-status indicators).
