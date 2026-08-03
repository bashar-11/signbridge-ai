# SignBridge — Web App

Production-quality React UI for SignBridge, an AI-powered real-time communication platform for Deaf and Hearing people.

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v3 + shadcn/ui (Radix primitives)
- Lucide React icons · Framer Motion
- React Router (hash-based) · Zustand-free (lightweight local state) · Sonner toasts

## Run

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Type-check (`tsc --noEmit`) + production build |
| `npm run preview` | Preview the production build |
| `npm run typecheck` | Type-check only |

## Pages

| Route | Page |
|-------|------|
| `/` | Landing page |
| `/mode` | Choose communication mode |
| `/hearing` | Hearing Mode (sign → speech, camera placeholder, AI pipeline status, recognition + sentence cards, live history) |
| `/deaf` | Deaf Mode (live subtitles, mic status, avatar placeholder, conversation panel) |
| `/history` | Conversation history (search, filter, export JSON/TXT/CSV, delete) |
| `/settings` | Settings (appearance, audio, devices, language, accessibility, notifications, developer) |
| `/about` | About the project |
| `*` | 404 |

## Design system

Tokens (colors, radii, shadows) live in `src/index.css` as CSS variables with light + dark + high-contrast modes. Tailwind maps them via `tailwind.config.js`. Components are in `src/components/ui` (shadcn-style) with composites in `src/components/shared`.

## Notes

- **Mock data only.** No backend is wired up. All pipeline, session, and conversation data is simulated in `src/lib/mock.ts`.
- Theme, text size, and accessibility preferences persist to `localStorage`.
- "Play speech" in Hearing mode uses the browser's built-in Speech Synthesis API (works offline, no backend).
