# 17 · Production-Readiness

How the design specification maps to a shippable, public product. This doc closes the loop on deliverable 20 ("everything should be production-ready").

---

## 17.1 Product Quality Bars

| Bar | Standard | Evidence in spec |
|-----|----------|------------------|
| Accessibility | WCAG 2.2 AA; contrast, keyboard, SR, reduced-motion | [09-ux-guidelines.md](09-ux-guidelines.md), [16 §16.1](16-ui-specification.md) |
| Performance | Route splitting, rAF-throttled telemetry, compositor-only animations | [16 §16.5](16-ui-specification.md), [15 §15.3](15-motion-effects.md) |
| Resilience | Error/offline/permission recovery on every path | [01 §1.7](01-information-architecture.md), [05 §5.14](05-high-fidelity-ui.md) |
| Trust | Data export, delete-in-3-clicks, minimal permissions | [09 §9.6](09-ux-guidelines.md) |
| Consistency | Token-only styling, single component library | [07-design-system.md](07-design-system.md) |

## 17.2 Implementation Checklist

### Foundation
- [ ] Tailwind + shadcn/ui initialized with SignBridge tokens.
- [ ] Inter font (self-hosted or `next/font`-style optimization); system fallbacks.
- [ ] Light, dark, and high-contrast themes; persisted; system detection.
- [ ] `MotionConfig reducedMotion="user"`; motion token import.

### Engineering guards
- [ ] Lint + typecheck in CI (`eslint`, `tsc --noEmit`).
- [ ] i18n skeleton (`i18next` + en locale); no inline strings in components.
- [ ] API layer with retry/backoff and typed errors → maps to `ErrorState` taxonomy.
- [ ] Zustand stores typed; pipeline status single source of truth.
- [ ] Route-level code splitting + skeleton fallbacks + top loader.
- [ ] a11y audit (axe) in CI on all routes.

### Release gates
- [ ] All P0 routes implemented per [16-ui-specification.md](16-ui-specification.md).
- [ ] Keyboard-shortcuts overlay documented in-app.
- [ ] Session unload-guard active on live routes.
- [ ] Conversation export (JSON/TXT/CSV) + delete guards verified.
- [ ] Device permission error paths tested on Chrome, Firefox, Safari (desktop + mobile).
- [ ] Verified no horizontal scroll at 360px width.

## 17.3 Launchable Scope (v0.1.0-beta)

| Scope | Status |
|-------|--------|
| Landing, Auth (email placeholder), Dashboard, Mode selection | Ship |
| Hearing mode live pipeline (MediaPipe → LLM → TTS) | Ship |
| Deaf mode live subtitles (STT → LLM) | Ship |
| Conversation history + export + delete | Ship |
| Settings (appearance/audio/devices/accessibility/notifications/developer) | Ship |
| Error pages (camera/mic/offline/network/500) | Ship |
| Avatar, assistant, analytics, sync, OAuth, reset email, i18n secondary | Backlog (placeholder UI shipped) |

## 17.4 Risk Register (design-level mitigations)

| Risk | Mitigation |
|------|-----------|
| MediaPipe latency on low-end devices | FPS/latency telemetry visible; auto-degrade to 10 FPS processing; "Quality" hint banner. |
| LLM/TTS outage | Status widgets + retry; session keeps local transcript; queued sync. |
| Permission revocation mid-session | Live status flip + recovery card; transcript preserved. |
| Subtitle overflow on small screens | Subtitle area auto-sizes, scrolls, caps at 3 lines visible; size stepper. |
| Screen-reader users in live sessions | All live output duplicated in non-animated, static, `aria-live` regions; buttons available for every shortcut. |

## 17.5 Recommended Tooling

- **UI**: Vite · React 18 · TS · Tailwind · shadcn/ui · Lucide · Framer Motion · Radix.
- **State**: Zustand (client), TanStack Query (server data).
- **Routing**: TanStack Router (typed) or React Router v6.
- **Forms**: react-hook-form + zod.
- **i18n**: i18next.
- **Toasts**: sonner.
- **Media**: MediaPipe Hands/HandLandmarker, Web Speech API / Whisper (STT), browser SpeechSynthesis / ElevenLabs (TTS), custom gloss model via ONNX/WebGPU.
- **Quality**: ESLint + Prettier, Vitest + Testing Library, axe, Playwright (smoke + a11y matrix).

## 17.6 Handoff Summary

The frontend engineer has everything needed:

1. **Look** → tokens (`11`), Tailwind config (`12`), components (`06`, `13`), icons (`14`).
2. **Behave** → flows (`02`), motion (`15`), UX rules (`09`), component contracts (`16 §16.3`).
3. **Layout** → wireframes (`04`), hi-fi (`05`), responsive rules (`08`).
4. **Structure** → folder + routing + pages (`10`).
5. **Verify** → acceptance criteria (`16 §16.6`), this checklist.

No major design decisions remain open.
