---
name: Phosphor Sepia
version: 1.0
scope: GMG-GameBook frontend
source: DESIGN.md reference and current home console
colors:
  surface: '#fcf9f2'
  surface-dim: '#dcdad3'
  surface-bright: '#fcf9f2'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3ec'
  surface-container: '#f1eee7'
  surface-container-high: '#ebe8e1'
  surface-container-highest: '#e5e2db'
  on-surface: '#1c1c18'
  on-surface-variant: '#44474a'
  inverse-surface: '#31312c'
  inverse-on-surface: '#f3f0e9'
  outline: '#75777b'
  outline-variant: '#c5c6ca'
  surface-tint: '#5a5f65'
  primary: '#101519'
  on-primary: '#ffffff'
  primary-container: '#24292e'
  on-primary-container: '#8b9096'
  inverse-primary: '#c2c7cd'
  secondary: '#006a6a'
  on-secondary: '#ffffff'
  secondary-container: '#94efee'
  on-secondary-container: '#006e6e'
  tertiary: '#001901'
  on-tertiary: '#ffffff'
  tertiary-container: '#013003'
  on-tertiary-container: '#6b9b61'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
typography:
  display:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
  headline:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-mobile:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.2'
  body-lg:
    fontFamily: Space Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Space Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label:
    fontFamily: Space Grotesk
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.0'
    letterSpacing: 0.1em
  caption:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: '400'
    lineHeight: '1.4'
spacing:
  unit: 4px
  gutter: 16px
  margin-sm: 16px
  margin-md: 32px
  margin-lg: 48px
  column-gap: 24px
---

# GMG-GameBook frontend design system

## Direction

**Retro-Technical / Phosphor Sepia** is a clinical, archival interface language inspired by late-1970s amber and paper terminals. The product should feel like a high-fidelity research console: dense, legible, purposeful, and slightly tactile.

The home screen is the visual anchor. Other views inherit its console grammar instead of introducing a separate editorial style.

## Foundations

- Use `Space Grotesk` exclusively. Keep body copy readable and use 600-700 weights for emphasis.
- Use sentence case for narrative content. Use uppercase for compact labels, navigation, statuses, and metadata.
- Keep the outer safe area at least `32px` on desktop and `16px` on mobile.
- Use a 12-column desktop grid, `24px` gutters, and a single-column stack below `700px`.
- Prefer left alignment and stable dimensions. Avoid fluid controls that resize when labels or states change.
- Keep corner radius at `0px`.
- Do not use drop shadows. Use borders, tonal insets, and double borders for depth.

## Color roles

- `--surface` / `#fcf9f2`: aged paper screen and page background.
- `--surface-container` / `#f1eee7`: header bars and structural panels.
- `--surface-container-high` / `#ebe8e1`: recessed readouts and inactive controls.
- `--on-surface` / `#1c1c18`: primary text and high-contrast structure.
- `--on-surface-variant` / `#44474a`: supporting copy and metadata.
- `--primary` / `#101519`: inverted terminal panels and primary actions.
- `--secondary` / `#006a6a`: links, processing, selected paths, and technical actions.
- `--tertiary-container` / `#013003`: active/success states. Pair with `#6b9b61` or `#bcf0ae` text.
- `--outline` / `#75777b` and `--outline-variant` / `#c5c6ca`: dividers, inactive borders, and grid structure.

Red is reserved for critical hardware-level errors. Warm sepia is used only as a surface family, never as a heavy accent.

## Surface treatment

Every page may use two persistent, non-interactive layers:

- Micro-grid: `24px` square grid using a low-opacity `1px` line.
- Scanlines: repeating horizontal lines with approximately `2.5%` dark opacity.

Keep both layers behind content, with `pointer-events: none`. Use borders to define terminal boxes. A primary panel uses a `2px` charcoal border; an active or modal surface can use a second inset border or a solid offset block, never a shadow.

## Component rules

### Console header

A compact rectangular bar contains the route identity on the left and the current system state on the right. Use an icon with a text prompt, a `2px` bottom rule, and a small uppercase status readout.

### Navigation

Navigation is a row of text links with generous tracking and a visible active underline. On mobile it becomes a horizontally scrollable row without wrapping.

### Buttons and links

Buttons are sharp rectangles with a `2px` primary border. Primary actions invert to charcoal with sepia text. Hover and focus states fill with `--primary` and flip the text color. Use Lucide icons inside buttons when an icon exists. Unfamiliar icon-only controls need a tooltip.

### Records and cards

Cards are reserved for repeated records, submissions, and genuinely framed tools. Use a `1px` or `2px` border, a tonal fill, and a header rule such as `[ RECORD_02 ]`. Never nest cards inside cards. Narrative records should use a readable body size and a clear author/date metadata row.

### Inputs and controls

Inputs use a recessed `--surface-container-high` fill, `1px` border, and a square shape. Focus uses a charcoal border or cyan outer line. Checkboxes are square and use an `X`; radio controls use a solid square block.

### Status

Use green for `ONLINE`, `SUCCESS`, and active system states. Use cyan for `PROCESSING`, selected options, and links. Keep status labels uppercase with `0.1em` tracking.

## Canon page pattern

The canon is a sequential archive, not a collection of floating editorial cards.

- Start with a terminal header containing the route label, `KANON`, a short description, and a compact count/status readout.
- Represent the opening paragraph as `RECORD_01` and each winning paragraph as its own sequential record.
- Use a thin vertical sequence rail to connect records. Keep round prompts and chosen options as indented transition records, clearly separated from canonical prose.
- Mark the current unfinished round with a bordered system readout and a direct map link.
- Preserve the full narrative text, author names, winning option labels, and the existing story order.
- On mobile, collapse the grid to one column but keep borders, labels, rail accents, and readable copy.

## Accessibility and motion

Maintain readable contrast against `--surface`. Never rely on color alone for canonical/selected states: pair color with labels, borders, or symbols. Preserve keyboard focus visibility. Motion should be restrained: use short background/border transitions and optional staggered reveal for records, with no layout-shifting animation.

## Implementation tokens

The canonical CSS variables live in `src/index.css`. Page-specific styles belong in `src/App.css`. React views should reuse the existing domain helpers from `src/domain/story.ts`; visual rewrites must not duplicate or mutate story data.
