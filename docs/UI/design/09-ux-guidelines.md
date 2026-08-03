# 9 · UX Guidelines

## 9.1 Accessibility (WCAG 2.2 AA)

### Contrast
- Normal text ≥ 4.5:1; large text ≥ 3:1; UI boundaries ≥ 3:1; focus indicators ≥ 3:1.
- Status never conveyed by color alone — always pair dot + label (+ optionally icon/text).
- High-contrast theme must be fully functional (subtitle text ≥ 7:1 against backdrop).

### Keyboard
- Full linear tab order; skip-to-content link first tab stop.
- All custom controls keyboard-operable (arrows on Select/Slider/Stepper; Space on buttons; Esc closes overlays; focus returns to trigger).
- Visible focus ring everywhere (`:focus-visible`), never removed.

### Screen readers
- Landmarks: `<header> <nav> <main> <footer>`; single `h1` per page.
- Live subtitle stream in `aria-live="polite"` (region, not a single container that gets cleared — append turns).
- Toasts and session alerts in `aria-live="polite"`; destructive errors `assertive`.
- Icons `aria-hidden`, labels provided by text or `aria-label`; media requires captions/alt semantics; buttons announce state (e.g., "Muted", "Playing").
- Camera preview: non-essential decorations `aria-hidden`; provide a text equivalent of the detected sentence always (it is the semantic content).
- All dialogs: focus trap, `role="dialog"`, labelled, `Esc` close.

### Motion
- `prefers-reduced-motion`: disable slides/springs/pulses; keep opacity crossfades ≤ 150 ms; disable equalizer animation; static status dots.

### Targets & sizing
- 48×48 minimum targets (44 in dense tables/settings rows is allowed only with adequate spacing).
- Text-size option scales the whole UI (16–20 px root); layout must reflow (no fixed heights that clip text).
- Screen-reader users get dedicated "speak/send/subtitle" buttons — keyboard shortcuts are additive, never the only path.

## 9.2 Interaction Patterns

- **Zero-click for core**: once a session starts, no extra "confirm" steps; sentence finalizes automatically after an 800 ms pause (auto-speak optional setting).
- **Undo where possible**: delete conversation is undoable via toast for 8 s; destructive account deletion requires typing confirmation.
- **Optimistic updates**: copy → toast immediately; toggle → visual change immediately, persistence debounced.
- **Idle handling**: after 3 min of no video/mic activity, show a "Keep session going?" dialog; pause recognition after 10 min, resume on tap.
- **Recovery first**: every red status has an inline Retry; every error page offers a path forward (settings link, retry, or support).

## 9.3 Content & Copy

- Verbs for buttons ("Start signing"), nouns for headings ("Recent conversations").
- Numbers/units consistent: FPS as integer, latency `ms`, confidence `%`.
- Errors: "What happened" + "What to do", ≤ 2 sentences.
- Dates: localized, e.g., "Jul 2, 2026"; relative for recents ("2 h ago").

## 9.4 Empty & First-Run

- First-run: guided 2-step choice (Hearing vs Deaf) → device check → dashboard. Never dump the user into an empty table without a CTA.
- Empty states always contain a primary CTA that is one click from value.

## 9.5 Performance UX

- Route-level code-splitting with skeleton + top loader.
- MediaPipe/LLM/STT/TTS load lazily, in parallel, with `PipelineLoading` checklist (transparent, gives sense of progress).
- Heavy work off main thread; UI never blocks; fps/latency are live-updated ≤ 10 Hz with `requestAnimationFrame` throttling.

## 9.6 Privacy & Trust

- Microphone/camera only accessed inside an active session; clear indicator when recording; session chips show "Recording" with red dot.
- Settings → Data: "Export all data" and "Delete all conversations" always reachable in ≤ 3 clicks.
- Notifications never interrupt a live session (toast queue only).

## 9.7 Consistency Checklist (review gate)

- [ ] One primary CTA per screen, correct variant order (primary → secondary → ghost).
- [ ] All status uses StatusChip semantics (dot+label), not raw colors.
- [ ] Focus-visible visible on every interactive element.
- [ ] No element < 44×44 (48 preferred) in a touch context.
- [ ] Empty/loading/error states present for every data region.
- [ ] Copy ≤ length limits; all strings in i18n catalog.
- [ ] Motion only from approved motion map; reduced-motion respected.
- [ ] Color usage only via semantic tokens.
