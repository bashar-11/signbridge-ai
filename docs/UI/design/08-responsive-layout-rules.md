# 8 · Responsive Layout Rules

## 8.1 Breakpoints

| Prefix | Min-width | Layout intent |
|--------|-----------|---------------|
| (base) | 0 | Mobile |
| `sm` | 640 | Large phones / small tablets |
| `md` | 768 | Tablet portrait |
| `lg` | 1024 | Tablet landscape / small laptop |
| `xl` | 1280 | Laptop / desktop |
| `2xl` | 1536 | Large desktop |

## 8.2 Shell / Navigation by Breakpoint

| Breakpoint | Navigation |
|------------|-----------|
| base–`md` | Topbar (56 px) + **bottom tab bar** (64 px, 4 tabs: Home, Mode, History, Settings) |
| `lg`–`xl-1` | Topbar (64 px) + icon-only sidebar (68 px, tooltips) |
| `xl+` | Topbar (64 px) + expanded sidebar (240 px, icon+label) |

Live-session pages (Hearing/Deaf) suppress the sidebar on all sizes; they use a minimal top bar with Back, pipeline status, and End.

## 8.3 Grid Rules

- **Stat cards**: `grid-cols-2 lg:grid-cols-4`.
- **Mode cards**: `grid-cols-1 md:grid-cols-3`.
- **Feature cards** (landing): `grid-cols-1 md:grid-cols-3`.
- **Dashboard quick actions**: `grid-cols-1 sm:grid-cols-2`.
- **Hearing mode**: `grid-cols-1 lg:grid-cols-5` (preview `lg:col-span-3`, output `lg:col-span-2`).
- **Deaf mode**: subtitle full-width; below it `grid-cols-1 lg:grid-cols-[1fr_220px]` for conversation + avatar.
- **Landing sections**: centered `max-w-7xl px-6 md:px-10`.

## 8.4 Type Scale by Breakpoint

| Token | Mobile | Tablet | Desktop |
|-------|--------|--------|---------|
| display | 40 | 48 | 56 |
| h1 | 32 | 36 | 40 |
| h2 | 28 | 30 | 32 |
| live subtitle | 28 | 36 | 44 |
| stat value | 28 | 32 | 32 |

## 8.5 Touch & Spacing

- Interactive min 48×48 (bottom bar items 56×48). Inputs `h-12` on touch, `h-11` on desktop.
- Card gap `gap-4` (mobile) → `gap-6` (desktop); page padding `px-4 sm:px-6 lg:px-8`.
- Bottom tab bar reserves 64 px bottom padding on mobile so content never hides behind it.

## 8.6 Camera & Media

- Camera preview: 16:9, width 100%, `max-h-[70vh]`; object-fit cover; centered.
- Subtitle area: min-height 240 px; on short viewports (`max-h` media query), subtitle area flexes to 60vh max.
- Avatar placeholder: full width on mobile, `w-56` fixed on `lg+`.

## 8.7 Tables on Mobile

- History table collapses: on `< md`, render `ConversationRow` cards (Title, mode badge, date, duration, ⋯) instead of a `<table>`; filter controls stack vertically; search full width.

## 8.8 Landing on Mobile

- Hero text centered, CTAs stack full-width `w-full`; trust row wraps; how-it-works stepper becomes vertical; AI workflow band becomes vertical stack.

## 8.9 Density & A11y Notes

- Text size setting (A→4A) scales root font-size from 16 → 20 px; layout reflows automatically (use `em`/rem units, no fixed px bodies).
- High-contrast mode: `background` → near-black/near-white contrast, borders `border-strong` (stronger alpha).
- Landscape orientation on phones: bottom bar stays; subtitle area uses `h-[55vh]` split with camera side-by-side in Hearing mode.
