# 7 · Design System

## 7.1 Design Principles

1. **Clarity over decoration** — every visual element earns its place.
2. **Status is visible** — the AI pipeline's health is never hidden.
3. **One primary action per screen.**
4. **Accessibility is not a mode** — it is the default styling (contrast, focus, type scale).
5. **Calm motion** — motion communicates state, not entertainment.
6. **Consistency by tokens** — no hardcoded colors/radii/spacings in components.

## 7.2 Brand

| Attribute | Value |
|-----------|-------|
| Name | SignBridge |
| Tagline | "Speak without barriers." |
| Logo | Two overlapping rounded speech-bubble halves forming a bridge arc; cyan on deep-blue mark. Minimal, wordmark "SignBridge" in Inter SemiBold with tracking `-0.02em`. |
| Logo sizes | Header 32 px; footer 40 px; favicon 16–32 px. |

## 7.3 Color System

Semantic tokens only (see [11-theme-tokens.md](11-theme-tokens.md)). Behavior rules:

- **Primary = deep blue** for primary actions, active nav, links.
- **Accent = cyan** reserved for live/streaming signals (recognition active, waveform, active word, top loader) — never for buttons.
- **Success/Warning/Destructive** reserved for status, never decorative.
- **Text hierarchy**: `foreground` (headings/body), `muted-foreground` (secondary), `muted` (disabled).
- **Contrast floor**: body text ≥ 4.5:1, large text ≥ 3:1, UI components ≥ 3:1, focus rings ≥ 3:1 against adjacent.
- **Status dot + label** always paired — never color alone (color-blind safe).

## 7.4 Typography

| Token | Size / Line-height | Weight | Use |
|-------|-------------------|--------|-----|
| `display` | 56/64 | 600 | Landing hero |
| `h1` | 40/48 | 600 | Page titles |
| `h2` | 32/40 | 600 | Section titles |
| `h3` | 24/32 | 600 | Card titles |
| `title-lg` | 20/28 | 600 | Stat values |
| `body` | 16/24 | 400 | Default |
| `body-lg` | 18/28 | 400 | Lead copy |
| `muted` | 14/20 | 400 | Secondary |
| `caption` | 12/16 | 500 | Labels, meta |
| `mono` | 13/18 | 400 | FPS/latency/metrics |
| `subtitle` | 36/44 | 600 | Live subtitle (Deaf mode base) |

- Tracking: headings `-0.02em`; body `0`; captions `+0.01em`.
- Feature: `tabular-nums` for all metrics and tables.

## 7.5 Spacing & Layout

- Base unit **4 px**. Scale: `2,4,8,12,16,20,24,32,40,48,64,80,96`.
- Page gutter: `px-6 md:px-10`, `max-w-7xl mx-auto`.
- Section rhythm: 80 px (landing) / 32 px (app cards).
- Card padding `p-6`, gap `gap-6`, list gap `gap-3`.

## 7.6 Radius

`sm 8` · `md 12` · `lg 16` · `xl 20` · `2xl 24` · `full`. Cards `2xl`, buttons `xl`, inputs `xl`, chips `full`.

## 7.7 Elevation

- `shadow-card`: `0 1px 2px rgb(15 23 42 / .04), 0 4px 12px -2px rgb(15 23 42 / .08)`
- `shadow-float`: `0 8px 24px -4px rgb(15 23 42 / .16), 0 4px 8px -2px rgb(15 23 42 / .08)`
- Dark mode: same structure, alpha boosted, plus 1 px border highlight `border-white/10` on popovers.
- Glass only where prescribed (topbar `bg-background/80 backdrop-blur-xl`).

## 7.8 Iconography

Lucide, stroke `2`, 24 px grid, downscaled via `size-*`. No filled/duotone mixes. Semantic icons allowed: warning triangle, info circle, check circle, alert circle (see 6.12 / 14).

## 7.9 Motion (system)

- Duration: micro 120 ms · default 200 ms · emphasis 300 ms.
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` (easeOutExpo-like) for in; same for out.
- Allowed: fades, y-slides (4–8 px), scale (0.98 press), shimmer, equalizer bars, pulsing status dots, top loader.
- **Disabled by `prefers-reduced-motion`** — everything becomes instant or crossfade only.
- See [15-motion-effects.md](15-motion-effects.md).

## 7.10 Focus & Accessibility

- Focus ring: 2 px, color `ring` token, offset 2 px, on every interactive element.
- Keyboard: full tab order, no traps, `Esc` closes overlays, visible `:focus-visible` only (not mouse click focus noise).
- Touch targets ≥ 48×48 (44 acceptable in tables/settings lists).
- Live regions: `aria-live="polite"` for subtitle stream & toasts; `assertive` only for destructive errors.
- See [09-ux-guidelines.md](09-ux-guidelines.md).

## 7.11 Empty, Loading & Error States

- **Empty**: icon (48 px) + title + one-line helper + single CTA. Never "blank".
- **Loading**: skeletons mirror final layout; shimmer 1.6 s; progress shown for > 1 s operations; spinners only in buttons.
- **Error**: friendly title, plain-language cause, one recovery action, "contact support" fallback. Never raw stack traces.

## 7.12 Copy / Tone of Voice

- Short, warm, specific. "You're all set." not "Operation completed successfully."
- Actions are verbs ("Start signing"). Errors state the cause and the fix.
- All strings externalized to i18n catalogs; character limits: toast ≤ 120, button ≤ 24, title ≤ 48.

## 7.13 Design Tokens vs. Components vs. Pages

```
Tokens (CSS vars) ← Components (shadcn) ← Composites (StatusWidget) ← Pages (Routes)
```

Changes flow top-down only; pages never define raw styles.
