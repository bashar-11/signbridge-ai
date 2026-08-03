# 02 · Design System

Every design token for SignBridge. Do not invent values outside this document.
Tokens are expressed as CSS variables (used by shadcn/ui) and as a Tailwind
theme object (§6).

---

## 1. Design Language Summary

- **Style:** clean, minimal, spacious, professional. No gradients, no decorative noise.
- **Shape:** large-radius cards (12–16px), pill buttons for primary actions, 8px inputs.
- **Depth:** soft layered shadows only; subtle glass only for floating action bars.
- **Tone:** calm, trustworthy, legible. Blue = brand, Cyan = AI/active signal,
  Green/Orange/Red = status only.

---

## 2. Color System

### 2.1 Semantic tokens (CSS variables)

These are the only colors components reference. All mappings shown for
light and dark.

| Token | Light value | Dark value | Usage |
|---|---|---|---|
| `--background` | `#F8FAFC` (slate-50) | `#0A0F1E` (deep navy) | App background |
| `--foreground` | `#0F172A` (slate-900) | `#F1F5F9` (slate-100) | Primary text |
| `--card` | `#FFFFFF` | `#0F1629` (navy-800) | Card / panel surface |
| `--card-foreground` | `#0F172A` | `#F1F5F9` | Text on card |
| `--muted` | `#F1F5F9` (slate-100) | `#151E34` (navy-750) | Muted surfaces, hover fills |
| `--muted-foreground` | `#64748B` (slate-500) | `#94A3B8` (slate-400) | Secondary text |
| `--subtle-foreground` | `#94A3B8` | `#64748B` | Captions, hints, disabled |
| `--border` | `#E2E8F0` (slate-200) | `#1E2A44` (navy-700) | Hairlines, dividers |
| `--input` | `#E2E8F0` | `#1E2A44` | Input borders |
| `--ring` | `#2563EB` at 40% | `#38BDF8` at 40% | Focus rings |
| `--primary` | `#1D4ED8` (blue-700) | `#3B82F6` (blue-500) | Primary buttons, links, active nav |
| `--primary-foreground` | `#FFFFFF` | `#0B1220` | Text on primary |
| `--primary-hover` | `#1E40AF` (blue-800) | `#60A5FA` (blue-400) | Hover state |
| `--accent` | `#0891B2` (cyan-600) | `#22D3EE` (cyan-400) | AI/active signals, selection |
| `--accent-foreground` | `#FFFFFF` | `#082F49` | Text on accent |
| `--secondary` | `#F1F5F9` | `#1E2A44` | Secondary buttons |
| `--secondary-foreground` | `#0F172A` | `#E2E8F0` | Text on secondary |
| `--success` | `#059669` (emerald-600) | `#34D399` (emerald-400) | Connected, ready, high confidence |
| `--success-bg` | `#ECFDF5` | `#052E22` | Status pill background |
| `--warning` | `#D97706` (amber-600) | `#FBBF24` (amber-400) | Loading, warming, degraded |
| `--warning-bg` | `#FFFBEB` | `#3A2A08` | Status pill background |
| `--destructive` | `#DC2626` (red-600) | `#F87171` (red-400) | Errors, delete, disconnects |
| `--destructive-bg` | `#FEF2F2` | `#3F1212` | Status pill / alert background |
| `--popover` | `#FFFFFF` | `#0F1629` | Menus, dropdowns |
| `--popover-foreground` | `#0F172A` | `#F1F5F9` | Text on popover |
| `--tooltip` | `#0F172A` | `#F1F5F9` | Tooltip surface |
| `--tooltip-foreground` | `#F8FAFC` | `#0F172A` | Tooltip text |

### 2.2 Brand ramp (exact)

Used for marketing surfaces, charts, and the logo.

```
Brand blue        #1D4ED8   (primary)
  └─ 50   #EFF6FF   100 #DBEAFE   200 #BFDBFE   300 #93C5FD   400 #60A5FA
     500 #3B82F6   600 #2563EB   700 #1D4ED8   800 #1E40AF   900 #1E3A8A  950 #172554
Accent cyan       #0891B2
  └─ 400 #22D3EE   500 #06B6D4   600 #0891B2   700 #0E7490
Success emerald   #059669   (400 #34D399  500 #10B981  600 #059669)
Warning amber     #D97706   (400 #FBBF24  500 #F59E0B  600 #D97706)
Error red         #DC2626   (400 #F87171  500 #EF4444  600 #DC2626)
Navy (dark bg)    #0A0F1E  #0F1629  #151E34  #1E2A44  #2A3A5C
```

### 2.3 Color usage rules

- **Never** use status colors for decoration. Green/amber/red mean a real state.
- Primary blue for brand + primary actions. Cyan only for "AI is live/active" signal.
- Links are `primary` with underline on hover; not underlined by default in nav.
- Dark mode is a full palette swap via `[data-theme=dark]` — no opacity hacks.
- **Color-blind safety:** status is never color alone — every status pill has an
  icon + text label (e.g. `✓ Ready`, `⚠ Warming up`, `✕ Error`).

---

## 3. Typography

### 3.1 Families

| Role | Family | Weights |
|---|---|---|
| UI + display | **Inter** (`next/font` / `@fontsource/inter`) | 400, 500, 600, 700 |
| Numeric readouts | **Geist Mono** (or JetBrains Mono) | 400, 500 |
| Fallback | system-ui, -apple-system, Segoe UI, Roboto | — |

### 3.2 Scale (type tokens)

| Token | Size / Line / Tracking | Weight | Use |
|---|---|---|---|
| `display` | 48px / 1.1 / -0.025em | 600 | Landing hero only |
| `h1` | 36px / 1.15 / -0.022em | 600 | Page titles |
| `h2` | 28px / 1.2 / -0.02em | 600 | Section titles |
| `h3` | 22px / 1.25 / -0.015em | 600 | Card titles |
| `h4` | 18px / 1.35 / -0.01em | 600 | Sub-section titles |
| `body-lg` | 18px / 1.6 | 400 | Landing body, subtitles |
| `body` | 16px / 1.5 | 400 | Default text |
| `sm` | 14px / 1.45 | 400 | Secondary text, table cells |
| `xs` | 13px / 1.4 | 500 | Labels, badges, captions |
| `mono` | 14px / 1.4 | 400 | FPS/latency/percent readouts |

### 3.3 Rules

- Minimum body size 16px in the app; Deaf Mode subtitle area is **28–40px** and
  user-scalable in Settings (Text Size slider).
- `text-size-adjust: 100%`; never shrink below 13px for non-icon text.
- Headings wrap to `text-balance`; body paragraphs use `text-pretty`.
- Line length: body copy max 68ch.
- Numeric readouts always mono, right-aligned in tables.

---

## 4. Spacing & Layout

- Base unit: **4px** (Tailwind default scale). Use semantic names below.
- Page gutter: `24px` mobile → `40px` desktop (`p-6 md:p-10`).
- Card padding: `20px` default, `24px` featured cards.
- Section spacing on landing: `96px` desktop / `64px` mobile.
- Vertical rhythm inside cards: `16px` (space-y-4).

| Token | px | Tailwind |
|---|---|---|
| `space-1` | 4 | p-1 / gap-1 |
| `space-2` | 8 | p-2 / gap-2 |
| `space-3` | 12 | p-3 / gap-3 |
| `space-4` | 16 | p-4 / gap-4 |
| `space-6` | 24 | p-6 / gap-6 |
| `space-8` | 32 | p-8 / gap-8 |
| `space-10` | 40 | p-10 / gap-10 |
| `space-16` | 64 | p-16 / gap-16 |

---

## 5. Radius, Shadow, Borders, Focus

### 5.1 Radius tokens

| Token | px | Use |
|---|---|---|
| `--radius-sm` | 6px | Small chips |
| `--radius-md` | 8px | Inputs, buttons, select |
| `--radius-lg` | 12px | Cards, panels |
| `--radius-xl` | 16px | Feature cards, modals |
| `--radius-full` | 9999px | Pills, avatar, icon buttons |

### 5.2 Shadow tokens

| Token | Light | Dark |
|---|---|---|
| `shadow-sm` | `0 1px 2px rgb(15 23 42 / 0.06)` | `0 1px 2px rgb(0 0 0 / 0.4)` |
| `shadow-card` | `0 1px 2px rgb(15 23 42 / 0.04), 0 8px 24px -12px rgb(15 23 42 / 0.12)` | `0 1px 2px rgb(0 0 0 / 0.5), 0 12px 32px -16px rgb(0 0 0 / 0.6)` |
| `shadow-pop` | `0 2px 8px rgb(15 23 42 / 0.08), 0 16px 48px -16px rgb(15 23 42 / 0.18)` | `0 2px 8px rgb(0 0 0 / 0.5), 0 20px 56px -20px rgb(0 0 0 / 0.7)` |
| `shadow-glass` | `0 1px 2px rgb(15 23 42 / 0.06), 0 12px 32px -12px rgb(15 23 42 / 0.18)` | `0 1px 2px rgb(0 0 0 / 0.4), 0 12px 32px -12px rgb(0 0 0 / 0.7)` |

### 5.3 Borders & dividers

- Default hairline: `1px solid --border`.
- Card borders on light: always visible `--border`. On dark: slightly stronger.
- Floating bars (audio controls) may use subtle glass: `bg-card/80 backdrop-blur-md`.

### 5.4 Focus

- Visible ring everywhere: `focus-visible:outline-none focus-visible:ring-2
  focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background`.
- Ring offset 2px, width 2px, color `--ring` (blue 40% light / cyan 40% dark).
- Hover on cards: `border-primary/40` + `shadow-card` deepen — never scale.

---

## 6. Tailwind CSS Structure

### 6.1 Tailwind config (v3 style)

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss'

export default {
  darkMode: ['class', '[data-theme="dark"]'],
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: { DEFAULT: 'hsl(var(--card))', foreground: 'hsl(var(--card-foreground))' },
        muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          hover: 'hsl(var(--primary-hover))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        success: { DEFAULT: 'hsl(var(--success))', bg: 'hsl(var(--success-bg))' },
        warning: { DEFAULT: 'hsl(var(--warning))', bg: 'hsl(var(--warning-bg))' },
        destructive: { DEFAULT: 'hsl(var(--destructive))', bg: 'hsl(var(--destructive-bg))' },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        popover: { DEFAULT: 'hsl(var(--popover))', foreground: 'hsl(var(--popover-foreground))' },
        tooltip: { DEFAULT: 'hsl(var(--tooltip))', foreground: 'hsl(var(--tooltip-foreground))' },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"Geist Mono"', '"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        display: ['48px', { lineHeight: '1.1', letterSpacing: '-0.025em' }],
        h1: ['36px', { lineHeight: '1.15', letterSpacing: '-0.022em' }],
        h2: ['28px', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        h3: ['22px', { lineHeight: '1.25', letterSpacing: '-0.015em' }],
        h4: ['18px', { lineHeight: '1.35', letterSpacing: '-0.01em' }],
      },
      boxShadow: {
        card: 'var(--shadow-card)',
        pop: 'var(--shadow-pop)',
        glass: 'var(--shadow-glass)',
      },
      borderRadius: {
        xl2: '16px',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
```

> Prefer **Tailwind v4** with `@theme` if starting fresh — token names above map
> 1:1. All components in this spec use these class names.

### 6.2 CSS variables file (`globals.css`)

```css
@layer base {
  :root {
    --background: 210 33% 98%;        /* #F8FAFC */
    --foreground: 222 47% 11%;        /* #0F172A */
    --card: 0 0% 100%;                /* #FFFFFF */
    --card-foreground: 222 47% 11%;
    --muted: 210 40% 96%;             /* #F1F5F9 */
    --muted-foreground: 215 16% 47%;  /* #64748B */
    --subtle-foreground: 215 20% 58%; /* #94A3B8 */
    --border: 214 32% 91%;            /* #E2E8F0 */
    --input: 214 32% 91%;
    --ring: 224 76% 52% / 0.40;       /* #2563EB 40% */
    --primary: 221 83% 48%;           /* #1D4ED8 */
    --primary-foreground: 0 0% 100%;
    --primary-hover: 224 76% 40%;     /* #1E40AF */
    --accent: 189 94% 33%;            /* #0891B2 */
    --accent-foreground: 0 0% 100%;
    --secondary: 210 40% 96%;
    --secondary-foreground: 222 47% 11%;
    --success: 161 84% 33%;           /* #059669 */
    --success-bg: 158 64% 93%;        /* #ECFDF5 */
    --warning: 35 92% 43%;            /* #D97706 */
    --warning-bg: 48 96% 94%;         /* #FFFBEB */
    --destructive: 0 72% 51%;         /* #DC2626 */
    --destructive-bg: 0 86% 97%;      /* #FEF2F2 */
    --popover: 0 0% 100%;
    --popover-foreground: 222 47% 11%;
    --tooltip: 222 47% 11%;
    --tooltip-foreground: 210 33% 98%;
    --shadow-card: 0 1px 2px rgb(15 23 42 / 0.04), 0 8px 24px -12px rgb(15 23 42 / 0.12);
    --shadow-pop: 0 2px 8px rgb(15 23 42 / 0.08), 0 16px 48px -16px rgb(15 23 42 / 0.18);
    --shadow-glass: 0 1px 2px rgb(15 23 42 / 0.06), 0 12px 32px -12px rgb(15 23 42 / 0.18);
  }
  [data-theme='dark'] {
    --background: 222 53% 8%;         /* #0A0F1E */
    --foreground: 210 40% 96%;
    --card: 221 47% 11%;              /* #0F1629 */
    --card-foreground: 210 40% 96%;
    --muted: 220 43% 14%;             /* #151E34 */
    --muted-foreground: 215 20% 65%;  /* #94A3B8 */
    --subtle-foreground: 215 16% 47%;
    --border: 222 40% 19%;            /* #1E2A44 */
    --input: 222 40% 19%;
    --ring: 199 89% 61% / 0.40;       /* #38BDF8 40% */
    --primary: 217 91% 60%;           /* #3B82F6 */
    --primary-foreground: 222 47% 11%;
    --primary-hover: 213 94% 68%;     /* #60A5FA */
    --accent: 187 92% 53%;            /* #22D3EE */
    --accent-foreground: 199 89% 15%;
    --secondary: 222 40% 19%;
    --secondary-foreground: 210 40% 96%;
    --success: 160 84% 54%;           /* #34D399 */
    --success-bg: 166 86% 10%;        /* #052E22 */
    --warning: 38 92% 57%;            /* #FBBF24 */
    --warning-bg: 45 80% 13%;         /* #3A2A08 */
    --destructive: 0 94% 71%;         /* #F87171 */
    --destructive-bg: 0 63% 16%;      /* #3F1212 */
    --popover: 221 47% 11%;
    --popover-foreground: 210 40% 96%;
    --tooltip: 210 40% 96%;
    --tooltip-foreground: 222 53% 8%;
    --shadow-card: 0 1px 2px rgb(0 0 0 / 0.5), 0 12px 32px -16px rgb(0 0 0 / 0.6);
    --shadow-pop: 0 2px 8px rgb(0 0 0 / 0.5), 0 20px 56px -20px rgb(0 0 0 / 0.7);
    --shadow-glass: 0 1px 2px rgb(0 0 0 / 0.4), 0 12px 32px -12px rgb(0 0 0 / 0.7);
  }
}
```

### 6.3 Utilities & base styles

```css
@layer base {
  * { @apply border-border; }
  html { @apply scroll-smooth; }
  body {
    @apply bg-background text-foreground font-sans antialiased;
    font-feature-settings: 'cv11', 'ss01';
    text-size-adjust: 100%;
  }
  ::selection { @apply bg-accent/20; }
}
@layer utilities {
  .focus-ring { @apply outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background; }
  .text-balance { text-wrap: balance; }
  .text-pretty { text-wrap: pretty; }
  .glass { @apply bg-card/80 backdrop-blur-md; }
}
```

---

## 7. Status & Data Visualization Tokens

- **Status pill** colors come only from `success/warning/destructive` + their `-bg`.
- **Progress bars:** track `muted`, fill `primary` (AI tasks) or `success` (health), radius `full`, height `6px` (sm) / `10px` (lg).
- **Charts** (dashboard sparklines): stroke `primary`, hover accent `cyan`, grid `border` at 10% opacity.
- **Confidence meter:** mono readout + horizontal bar; ≥85% success, 60–84% warning, <60% amber/red.
- **Live indicator:** 6px dot, `success` when live with gentle 2s pulse (motion-gated).

---

## 8. Iconography (Lucide) — mapping rules

- Stroke `1.75`, size 16 (inline) / 20 (buttons) / 24 (empty states & large actions).
- Buttons: icon + label for primary; icon-only allowed at ≥44px target when `aria-label` present.
- Full icon inventory per component/page in `docs/03` §4 and `docs/04`.
