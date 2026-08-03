# SignBridge — Product & UI/UX Design System

A production-ready design specification for **SignBridge**, an AI-powered real-time communication platform for Deaf and Hearing people.

This document set is complete enough for a frontend engineer to implement the entire application without making major design decisions.

---

## Deliverable Index

| # | Deliverable | File |
|---|-------------|------|
| 1 | Complete Information Architecture | [`01-information-architecture.md`](01-information-architecture.md) |
| 2 | User Flow | [`02-user-flows.md`](02-user-flows.md) |
| 3 | Site Map | [`03-sitemap.md`](03-sitemap.md) |
| 4 | Wireframes | [`04-wireframes.md`](04-wireframes.md) |
| 5 | High-Fidelity UI Description | [`05-high-fidelity-ui.md`](05-high-fidelity-ui.md) |
| 6 | Component Library | [`06-component-library.md`](06-component-library.md) |
| 7 | Design System | [`07-design-system.md`](07-design-system.md) |
| 8 | Responsive Layout Rules | [`08-responsive-layout-rules.md`](08-responsive-layout-rules.md) |
| 9 | UX Guidelines | [`09-ux-guidelines.md`](09-ux-guidelines.md) |
| 10–13 | React Folder Structure · Component Hierarchy · Pages · Routing | [`10-react-structure-pages-routing.md`](10-react-structure-pages-routing.md) |
| 14 | Suggested Theme Tokens | [`11-theme-tokens.md`](11-theme-tokens.md) |
| 15 | Suggested Tailwind CSS Structure | [`12-tailwind-structure.md`](12-tailwind-structure.md) |
| 16 | Suggested shadcn/ui Components | [`13-shadcn-components.md`](13-shadcn-components.md) |
| 17 | Suggested Lucide Icons | [`14-lucide-icons.md`](14-lucide-icons.md) |
| 18 | Suggested Motion Effects | [`15-motion-effects.md`](15-motion-effects.md) |
| 19 | Complete UI Specification | [`16-ui-specification.md`](16-ui-specification.md) |
| 20 | Production-readiness (architecture, conventions, checklist) | [`17-production-readiness.md`](17-production-readiness.md) |

---

## Product Summary

**SignBridge** bridges the communication gap between Deaf and Hearing people in real time.

### Two core modes

**Hearing Mode** — a Hearing person signs into the camera; the app recognizes the gestures via MediaPipe, converts them to natural sentences through an LLM, and speaks them aloud via TTS.

```
Camera → MediaPipe → AI Recognition → LLM → Natural Sentence → Text To Speech
```

**Deaf Mode** — a Deaf person hears nothing; the app transcribes a Hearing person's speech via STT, and shows large, high-contrast live subtitles (plus a 3D avatar in a future release).

```
Microphone → Speech To Text → LLM → Subtitle → Avatar (Future)
```

### Core UX principles

1. **Accessibility-first** — WCAG 2.2 AA+, high contrast, large type, visible focus, full keyboard and screen-reader support.
2. **Zero-clutter** — every screen has one primary action.
3. **Large touch targets** — minimum 48px interactive elements.
4. **Status transparency** — the user always knows if the AI pipeline is alive.
5. **Design language** — Deep Blue primary, Cyan accent, Inter/Geist typography, Lucide icons, rounded corners, soft shadows, subtle motion only.

---

## Reading Order

1. Start with [Information Architecture](01-information-architecture.md) and [User Flows](02-user-flows.md) to understand the product.
2. Read [Design System](07-design-system.md) + [Theme Tokens](11-theme-tokens.md) + [Tailwind Structure](12-tailwind-structure.md) before writing any code.
3. Follow [React Structure, Pages & Routing](10-react-structure-pages-routing.md) to scaffold the app.
4. Implement components per [Component Library](06-component-library.md) + [shadcn/ui](13-shadcn-components.md).
5. Wire up screens per [High-Fidelity UI](05-high-fidelity-ui.md) and the [Complete UI Specification](16-ui-specification.md).
6. Validate with [Production-Readiness](17-production-readiness.md) checklist.

---

## Quick Facts

| Attribute | Value |
|-----------|-------|
| Product | SignBridge |
| Stack | React 18 + TypeScript, Vite, Tailwind CSS v3, shadcn/ui, Lucide, Framer Motion |
| Design tokens | CSS variables, light + dark mode |
| Accessibility target | WCAG 2.2 AA |
| Font | Inter (Latin + fallback), optional Manrope |
| Language | English (i18n-ready) |
| Icons | Lucide React |
