# SignBridge — Complete Product UI/UX Specification

> An AI-powered communication platform enabling real-time conversation between
> Deaf and Hearing people. This repository contains the complete, production-ready
> design specification — detailed enough that a frontend engineer can implement
> the entire application without making major design decisions.

---

## Product Summary

| | |
|---|---|
| **Product** | SignBridge |
| **Category** | AI-powered accessibility / communication SaaS |
| **Core value prop** | Real-time two-way conversation between Deaf and Hearing people |
| **Modes** | Hearing Mode (camera → sign recognition → sentence → speech) and Deaf Mode (microphone → speech-to-text → large subtitles) |
| **Future** | 3D Sign Language Avatar, multi-language, AI chat assistant, analytics, cloud sync, model switching |
| **Design bar** | ChatGPT / Notion / Linear / Vercel / Figma / Microsoft Copilot quality |

---

## Design Principles

1. **Accessibility is the product.** WCAG 2.2 AA minimum, color-blind safe, keyboard-first, screen-reader ready, `prefers-reduced-motion` respected.
2. **Clarity over decoration.** No gradients, no heavy animation, no decorative noise.
3. **Speed of use.** Every core action is ≤ 2 clicks from anywhere in the app.
4. **Legibility first.** Large type, high contrast, spacious rhythm, generous touch targets (min 44px).
5. **Calm, trustworthy AI.** Status always visible; the user always knows what the system is doing.

---

## Deliverables — Coverage Map

All 20 requested deliverables are covered by the documents in this package:

| # | Deliverable | Document |
|---|---|---|
| 1 | Complete Information Architecture | `docs/01-information-architecture.md` |
| 2 | User Flow | `docs/01-information-architecture.md` §3 |
| 3 | Site Map | `docs/01-information-architecture.md` §2 |
| 4 | Wireframes | `docs/04-pages-specification.md` |
| 5 | High-Fidelity UI Description | `docs/04-pages-specification.md` |
| 6 | Component Library | `docs/03-component-library.md` |
| 7 | Design System | `docs/02-design-system.md` |
| 8 | Responsive Layout Rules | `docs/05-ux-motion-a11y.md` §1 |
| 9 | UX Guidelines | `docs/05-ux-motion-a11y.md` |
| 10 | React Folder Structure | `docs/06-react-architecture.md` §2 |
| 11 | React Component Hierarchy | `docs/06-react-architecture.md` §3 |
| 12 | Suggested Pages | `docs/04-pages-specification.md` |
| 13 | Suggested Routing | `docs/06-react-architecture.md` §4 |
| 14 | Suggested Theme Tokens | `docs/02-design-system.md` §3 |
| 15 | Suggested Tailwind CSS Structure | `docs/02-design-system.md` §6 |
| 16 | Suggested shadcn/ui Components | `docs/03-component-library.md` §2 |
| 17 | Suggested Lucide Icons | `docs/03-component-library.md` §4 |
| 18 | Suggested Motion Effects | `docs/05-ux-motion-a11y.md` §3 |
| 19 | Complete UI Specification | `docs/04-pages-specification.md` |
| 20 | Production-ready implementation guidance | `docs/06-react-architecture.md` + `docs/05-ux-motion-a11y.md` |

---

## Document Index

| Document | Read this to... |
|---|---|
| [`docs/01-information-architecture.md`](docs/01-information-architecture.md) | Understand what exists, how users flow through it, and the site structure |
| [`docs/02-design-system.md`](docs/02-design-system.md) | Get every design token: color, type, space, radius, shadow, dark mode |
| [`docs/03-component-library.md`](docs/03-component-library.md) | Build every reusable component: anatomy, states, icons, shadcn/ui mapping |
| [`docs/04-pages-specification.md`](docs/04-pages-specification.md) | Build every page exactly: wireframes + high-fidelity specs |
| [`docs/05-ux-motion-a11y.md`](docs/05-ux-motion-a11y.md) | Responsive behavior, motion, accessibility, error/loading/empty states |
| [`docs/06-react-architecture.md`](docs/06-react-architecture.md) | Set up the repo: folder structure, routing, component hierarchy |

---

## Suggested Tech Stack (implementation baseline)

- **Framework:** Next.js 14+ (App Router) or Vite + React 18 — docs assume Next.js App Router, easily portable.
- **Styling:** Tailwind CSS v3.4+ (or v4 with the same token values).
- **UI primitives:** shadcn/ui (Radix UI under the hood), `class-variance-authority`, `clsx`, `tailwind-merge`.
- **Icons:** `lucide-react`.
- **Motion:** `framer-motion` (Motion One-compatible values in spec).
- **AI pipeline:** MediaPipe Tasks (Vision + Audio), Web Audio API, Web Speech API, LLM via SSE streaming, Web Speech API TTS or ElevenLabs.
- **State:** Zustand or TanStack Query for server state; `@tanstack/react-query` recommended for streaming/status polling.
- **Forms:** React Hook Form + Zod.
- **Toasts:** `sonner`.

---

## Convention Rules (apply to every file in this spec)

- All hex tokens are exact; do not invent new colors.
- Every interactive element must be reachable via keyboard and have a visible focus ring.
- All icons come from `lucide-react` unless explicitly noted.
- All spacing uses the 4px base scale (Tailwind defaults) unless a token says otherwise.
- No gradients, no heavy animation, no decorative illustration blobs.
- Empty, loading, and error states are specified for every data-driven surface.
