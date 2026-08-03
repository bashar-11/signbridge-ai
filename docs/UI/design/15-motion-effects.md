# 15 · Suggested Motion Effects

Library: **Framer Motion** (`motion/react`) with CSS for simple transitions. All motion respects `prefers-reduced-motion` (MotionConfig `reducedMotion="user"`). Durations from `--dur-*` tokens. Motion is **informative, never decorative**.

---

## 15.1 Motion Map

| Effect | Component | Spec | Purpose |
|--------|-----------|------|---------|
| Page enter | Route wrapper | fade y:8 → 0, 200 ms, ease-out | soft route transition |
| Page exit | Route wrapper | fade + y:-8, 120 ms | light, no flash |
| Card hover lift | Card / FeatureCard | y:-2, 150 ms + shadow-float | affordance |
| Button press | Buttons | scale 0.98, 120 ms | tactile |
| Top loading bar | Topbar | indeterminate 3px cyan slide, 1.2 s loop | progress |
| Skeleton shimmer | Skeleton | background-position loop, 1.6 s | loading |
| Toasts | Sonner | slide-in from right / bottom, 200 ms | notification entrance |
| Dialog/Sheet | Dialog | scale 0.98→1 + fade, 200 ms; overlay fade | modal entrance |
| Status dot pulse | StatusChip | opacity 1→0.4→1, 2 s, infinite | "live/active" signal |
| Waveform bars | Waveform | height 30–100% staggered, 0.9 s, only while speaking | audio activity |
| Equalizer in play btn | PlaySpeechButton | 3 bars, 0.6 s loop while playing | speaking state |
| Active word highlight | SubtitleDisplay | background flash 120 ms on token change | reading cue |
| Sentence finalized | GeneratedSentence | y:8→0 + fade, 200 ms spring-lite | utterance completion |
| Word update | DetectedWord | fade/slide 150 ms | recognition tick |
| List stagger | RecentConversations / Turns | staggerChildren 40 ms, fade+y | hierarchy reveal |
| Empty/Error state | EmptyState / ErrorState | fade + y:8, 200 ms | gentle presence |
| Mode card select | ModeCard | hover ring, no bounce | calm affordance |

## 15.2 Motion Recipe (Framer Motion)

```tsx
import { motion } from "framer-motion";

export const pageVariants = {
  initial: { opacity: 0, y: 8 },
  enter:   { opacity: 1, y: 0, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.12, ease: "easeOut" } },
};

export const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};

export const fadeUp = {
  hidden: { opacity: 0, y: 8 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } },
};
```

Wrap the app in:

```tsx
<MotionConfig reducedMotion="user">
  <AnimatePresence mode="wait">…routes…</AnimatePresence>
</MotionConfig>
```

## 15.3 Performance Rules

- Animate only `transform` and `opacity` (compositor-friendly, no layout thrash).
- Cap simultaneous loops (status dots ≤ 6, waveform ≤ 15 bars).
- Media overlays (landmark skeleton, FPS) update via `requestAnimationFrame`, throttled to 10 Hz, no CSS transitions per frame.
- `will-change` used sparingly and removed after animation.

## 15.4 Reduced-Motion Behavior

With `prefers-reduced-motion: reduce` (or MotionConfig):

| Effect | Fallback |
|--------|----------|
| All fades/slides | Instant appear (0.01 s) |
| Status dot pulse | Static dot |
| Waveform / equalizer | Static bars at 50% |
| Skeleton shimmer | Static gray block |
| Top loader | Indeterminate → 100% progress on completion |
| Hover lift | Border/bg change only |

## 15.5 Guidelines

- Single motion per interaction (never fade + scale + slide together).
- Loop animations only for states that persist > 2 s.
- No bounces, springs with overshoot, or entrance "hype" — matches Linear/Vercel restraint.
- Motion tokens centralized; components import variants, never define inline magic numbers.
