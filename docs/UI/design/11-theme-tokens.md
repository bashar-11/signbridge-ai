# 11 · Suggested Theme Tokens

Single source of truth as CSS variables (shadcn/ui convention). Two themes: `light` and `dark`, plus `high-contrast` overrides. Both are attached to `:root` / `.dark`.

---

## 11.1 Semantic Color Tokens (light)

```css
:root {
  /* Brand */
  --primary: 221 83% 53%;        /* Deep Blue #1d4ed8 */
  --primary-foreground: 0 0% 100%;
  --accent-color: 189 94% 43%;   /* Cyan #06b6d4 (live/streaming) */

  /* Surfaces */
  --background: 0 0% 100%;
  --foreground: 222 47% 11%;     /* slate-900 */
  --surface: 210 20% 98%;        /* very light gray #f8fafc */
  --card: 0 0% 100%;
  --card-foreground: 222 47% 11%;
  --muted: 210 40% 96%;
  --muted-foreground: 215 16% 47%;  /* slate-500 */
  --accent: 210 40% 96%;
  --accent-foreground: 222 47% 11%;
  --secondary: 210 40% 96%;
  --secondary-foreground: 222 47% 11%;

  /* Feedback */
  --success: 142 71% 45%;        /* green-600 */
  --warning: 32 95% 44%;         /* orange-600 */
  --destructive: 0 72% 51%;      /* red-600 */
  --info: 189 94% 43%;           /* cyan-600 */

  /* Boundaries */
  --border: 214 32% 91%;
  --input: 214 32% 91%;
  --ring: 221 83% 53%;

  /* Status dot colors (semantic, color-blind safe via icon+label) */
  --dot-success: 142 71% 45%;
  --dot-warning: 32 95% 44%;
  --dot-destructive: 0 72% 51%;
  --dot-muted: 215 16% 80%;
}
```

## 11.2 Dark Theme

```css
.dark {
  --background: 222 47% 7%;       /* slate-950 */
  --foreground: 210 40% 98%;
  --surface: 222 45% 10%;
  --card: 222 45% 10%;
  --card-foreground: 210 40% 98%;
  --muted: 217 33% 16%;
  --muted-foreground: 215 20% 65%;
  --accent: 217 33% 16%;
  --accent-foreground: 210 40% 98%;
  --secondary: 217 33% 16%;
  --secondary-foreground: 210 40% 98%;
  --primary: 217 91% 60%;        /* lighter blue for AA on dark */
  --primary-foreground: 0 0% 100%;
  --border: 217 33% 20%;
  --input: 217 33% 20%;
  --ring: 217 91% 60%;
  --success: 142 69% 58%;
  --warning: 35 92% 60%;
  --destructive: 0 72% 62%;
  --info: 189 90% 60%;
}
```

## 11.3 High-Contrast Overrides

```css
[data-theme="high-contrast"] {
  --background: 0 0% 0%;
  --foreground: 0 0% 100%;
  --card: 0 0% 0%;
  --muted: 0 0% 12%;
  --muted-foreground: 0 0% 85%;
  --border: 0 0% 60%;           /* strong boundaries */
  --dot-success: 120 100% 50%;
  --dot-warning: 45 100% 55%;
  --dot-destructive: 0 100% 60%;
}
/* Applies regardless of light/dark selection; forces white-on-black,
   bold borders, and minimum text/background contrast ≥ 7:1. */
```

## 11.4 Typography Tokens

```css
:root {
  --font-sans: "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
  --font-display: "Inter", sans-serif; /* or "Manrope" for softer display */

  --text-xs: 0.75rem;   --text-sm: 0.875rem; --text-base: 1rem;
  --text-lg: 1.125rem;  --text-xl: 1.25rem;  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem; --text-4xl: 2.25rem; --text-5xl: 3rem;
  --text-6xl: 3.75rem;
  --leading-tight: 1.25; --leading-normal: 1.5; --leading-relaxed: 1.6;
  --tracking-tight: -0.02em; --tracking-normal: 0em; --tracking-wide: 0.01em;
  --text-subtitle: clamp(1.75rem, 4vw, 2.75rem); /* Deaf live subtitle */
}
```

## 11.5 Radius & Elevation Tokens

```css
:root {
  --radius-sm: 8px; --radius-md: 12px; --radius-lg: 16px;
  --radius-xl: 20px; --radius-2xl: 24px;

  --shadow-card: 0 1px 2px rgb(15 23 42 / .04), 0 4px 12px -2px rgb(15 23 42 / .08);
  --shadow-float: 0 8px 24px -4px rgb(15 23 42 / .16), 0 4px 8px -2px rgb(15 23 42 / .08);
  --shadow-focus: 0 0 0 2px hsl(var(--background)), 0 0 0 4px hsl(var(--ring));
}
.dark { --shadow-card: 0 1px 2px rgb(0 0 0 / .4), 0 4px 12px -2px rgb(0 0 0 / .6); }
```

## 11.6 Spacing & Layout Tokens

```css
:root {
  --space-1: 4px; --space-2: 8px; --space-3: 12px; --space-4: 16px;
  --space-5: 20px; --space-6: 24px; --space-8: 32px; --space-10: 40px;
  --space-12: 48px; --space-16: 64px; --space-20: 80px;

  --sidebar-w: 240px; --sidebar-w-collapsed: 68px;
  --topbar-h: 64px; --bottomtab-h: 64px;
  --content-max: 80rem; /* 1280px */
}
```

## 11.7 Motion Tokens

```css
:root {
  --dur-fast: 120ms; --dur-base: 200ms; --dur-slow: 300ms;
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
}
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: .01ms !important; transition-duration: .01ms !important; }
}
```

## 11.8 Token Usage Rules

- Components reference **semantic** tokens only (`--primary`, `--destructive`) — never raw hex.
- Cyan accent has no component default; used only by live-state composites (Waveform, active word, top loader, sparkline).
- Status dot tokens carry full contrast against both themes; label always accompanies dot.
