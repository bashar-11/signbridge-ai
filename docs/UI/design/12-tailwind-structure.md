# 12 · Suggested Tailwind CSS Structure

## 12.1 Configuration (`tailwind.config.js`)

```js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],                       // class-based dark mode via .dark on <html>
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: "1.5rem", screens: { "2xl": "80rem" } },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        surface: "hsl(var(--surface))",
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          live: "hsl(var(--accent-color))",
        },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        success: "hsl(var(--success))",
        warning: "hsl(var(--warning))",
        destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(0 0% 100%)" },
        info: "hsl(var(--info))",
        dot: {
          success: "hsl(var(--dot-success))",
          warning: "hsl(var(--dot-warning))",
          destructive: "hsl(var(--dot-destructive))",
          muted: "hsl(var(--dot-muted))",
        },
      },
      borderRadius: {
        sm: "var(--radius-sm)", md: "var(--radius-md)", lg: "var(--radius-lg)",
        xl: "var(--radius-xl)", "2xl": "var(--radius-2xl)",
      },
      boxShadow: {
        card: "var(--shadow-card)",
        float: "var(--shadow-float)",
        focus: "var(--shadow-focus)",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
        display: ["var(--font-display)"],
      },
      fontSize: {
        "subtitle": "var(--text-subtitle)",
      },
      spacing: {
        4.5: "18px", // fine adjustments
      },
      transitionTimingFunction: {
        out: "var(--ease-out)",
      },
      transitionDuration: {
        fast: "var(--dur-fast)", base: "var(--dur-base)", slow: "var(--dur-slow)",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("tailwind-scrollbar-hide")],
};
```

## 12.2 Global CSS (`src/styles/globals.css`)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * { @apply border-border; }
  body { @apply bg-background text-foreground antialiased; }
  html { scroll-behavior: smooth; }
  h1,h2,h3 { @apply tracking-tight; }
}

@layer components {
  .card-hover { @apply transition-all duration-base ease-out hover:-translate-y-0.5 hover:shadow-float; }
  .focus-ring { @apply focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background; }
  .input-base { @apply h-12 rounded-xl border border-input bg-background px-4 text-sm focus-ring; }
  .tabular { @apply tabular-nums; }
  .glass { @apply bg-background/80 backdrop-blur-xl; }
}

@layer utilities {
  .no-scrollbar::-webkit-scrollbar { display: none; }
}
```

## 12.3 Token ↔ Utility Mapping

| Use | Utility |
|-----|---------|
| Surface for sidebar/nav | `bg-surface` |
| Cards | `bg-card border rounded-2xl shadow-card` |
| Live cyan element | `bg-accent-live text-white` |
| Status dot | `bg-dot-success` / `bg-dot-warning` / `bg-dot-destructive` / `bg-dot-muted` |
| Primary button | `bg-primary text-primary-foreground hover:bg-primary/90` |
| Focus ring | `ring-2 ring-ring ring-offset-2` (`focus-ring` component) |
| Subtitle display | `text-subtitle font-semibold leading-tight` |
| Metric text | `font-mono text-sm tabular` |

## 12.4 Naming & Composition Rules

- Use Tailwind utility classes inline in components; semantic theme via tokens only.
- Composite classes (`.card-hover`, `.focus-ring`, `.input-base`) live in `@layer components` so they can be overridden.
- Never mix px spacing; use the tokenized `space-*` scale (`p-6` = `--space-6` = 24 px).
- Responsive prefixes strictly per breakpoints in [08-responsive-layout-rules.md](08-responsive-layout-rules.md).
- Icons: `size-4` (default), `size-5` (headers), `size-6` (heroes), `size-8` (stat icons).
