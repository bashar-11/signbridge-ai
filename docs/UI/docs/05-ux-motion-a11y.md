# 05 · UX Guidelines, Responsive Rules, Motion & Accessibility

---

## 1. Responsive Layout Rules

### 1.1 Breakpoints

| Breakpoint | Width | Strategy |
|---|---|---|
| `sm` | ≥640px | 2-col stat grids, auth form single col |
| `md` | ≥768px | Tablets: sidebar → 72px icon rail, content gutter 32px |
| `lg` | ≥1024px | Full sidebar 260px, hearing mode 3-col layout |
| `xl` | ≥1280px | Max-width 1440px content; landing hero at full width |
| `2xl` | ≥1536px | Max-width 1600px |

Base = mobile-first (single column), then progressively widen.

### 1.2 Navigation responsiveness

| Screen | Sidebar | Topbar |
|---|---|---|
| Mobile < 768 | Hidden → `Sheet` drawer (from left, 80vw max) | hamburger `[≡]` + title + avatar |
| Tablet 768–1023 | Icon rail (72px, labels in tooltips) | breadcrumb |
| Desktop ≥1024 | Full 260px | full |

### 1.3 Live-mode layouts

- **Hearing mode:**
  - `lg+`: 3 columns `[260px history | main 1fr | 300px metrics]`.
  - `md`: 2 columns — history above, main + metrics side; or main + metrics stacked.
  - mobile: single column — camera, sentence, controls, then tabs `[Video|Metrics|History]` or accordion for metrics/history. **Camera + controls always visible.**
- **Deaf mode:**
  - Subtitles always dominant: mobile = subtitle full-width + conversation toggle tab; desktop = subtitle + right column (avatar/conversation).
- **Metrics:** on <lg collapse to a horizontal scroll strip or a slide-over `Sheet` opened by a `[Metrics]` button in the control bar.

### 1.4 Fixed elements & safe areas

- SessionControls bar: fixed bottom, centered, `mx-auto`, max-w-xl, safe-area inset on iOS (`pb-[env(safe-area-inset-bottom)]`).
- Video uses `object-cover`; never distort.

---

## 2. Keyboard Shortcuts

### 2.1 Global (app shell)

| Keys | Action |
|---|---|
| `⌘/Ctrl + K` | Command palette |
| `?` | Shortcuts overlay |
| `G` then `D` | Dashboard |
| `G` then `N` | New session (choose mode) |
| `G` then `H` | Hearing mode |
| `G` then `F` | Deaf mode |
| `G` then `I` | History |
| `G` then `S` | Settings |
| `Escape` | Close modal / stop session prompt |

### 2.2 Live modes

| Keys | Action |
|---|---|
| `Space` | Hearing: Play/Pause speech · Deaf: replay last subtitle |
| `S` | Stop playback |
| `C` | Copy current sentence/subtitle |
| `V` | Toggle camera (hearing) |
| `M` | Toggle microphone |
| `Enter` | End session (with confirm) |

- Show as `kbd` chips in SessionControls footer and Shortcuts overlay.
- Shortcuts disabled while a modal is open; `aria-keyshortcuts` attributes set.

---

## 3. Motion Design (Motion Effects)

### 3.1 Motion tokens

| Token | Duration | Easing | Trigger |
|---|---|---|---|
| `fade-in` | 150ms | ease-out | page/panel entry |
| `fade-in-up` | 200ms | `cubic-bezier(0.16,1,0.3,1)` | card entry, 16px translate |
| `scale-in` | 180ms | ease-out | dropdowns, modals, tooltips |
| `slide-in` | 220ms | ease-out | Sheet drawer, metrics slide-over |
| `expand` | 240ms | ease-out | accordion/table row expand |
| `pulse` | 2s | ease-in-out | live dots, "playing", streaming word |
| `spin` | 1s | linear | loaders |

All durations halve under `prefers-reduced-motion: reduce` → set to 0 (elements fade/scale instantly).

### 3.2 Where motion is allowed (and not)

**Allowed (subtle):**
- Status dot pulse on live/warning pills.
- Card entry `fade-in-up` stagger (landing only, 80ms stagger, max 4 items).
- Dropdown/modal scale-in.
- `active:scale-[0.98]` on buttons.
- Streaming text: interim word appears with 80ms fade, no typewriter.
- Skeleton pulse.

**Forbidden:**
- Hover scale on cards, 3D tilt, parallax, marquees, spinning logos, gradient movement.
- Camera "Ken Burns" effects; subtitle typewriter/slide-through.
- Confetti, fireworks, or celebration effects.

### 3.3 Implementation notes (framer-motion)

```tsx
// tokens
export const EASE = [0.16, 1, 0.3, 1]
export const fadeUp = { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.2, ease: EASE } }

// respect reduced motion globally
const MotionConfig = motion.create + reducedMotion: "user"
```
Use `motion.reducedMotion = "user"` (framer-motion) or gate all variants behind a `useReducedMotion()` check. Prefer CSS `transition` for hovers/colors.

---

## 4. Loading, Empty & Error States (all surfaces)

### 4.1 Skeleton composites (match real geometry exactly)

- **Stat card:** 4 cards, each label bar 60% + value bar 40% + sub bar 30%.
- **History row:** avatar circle 36 + title bar 40% + meta bar 20% × 5 rows.
- **Conversation:** 3 bubbles of alternating width (left 60% / right 50% / left 70%).
- **Camera:** 16/9 rounded rect + 2 overlay chips.
- **StatusWidget:** 8 rows × (dot 12 + label 40% + value 20%).

### 4.2 Empty states (pattern)

```
  [ 48px icon in muted circle ]
        Title (h4)
   description (sm muted, max-w-sm)
        [ Primary action ]
```
Used on: History, Conversation panel (before first utterance), Dashboard recent, devices list, search results (title "No matches").

### 4.3 Error states (pattern)

- **Inline (forms/cards):** `Alert destructive` above the affected control; control gets destructive border.
- **Overlay (camera/mic in live mode):** translucent `bg-background/85` over the preview, center icon + title + `[Retry]` + `[Settings]`.
- **Page-level:** dedicated error routes (docs/04 §12).
- **Connection loss:** non-blocking top banner (slide-in from top, `Alert destructive`, "Reconnecting… [Retry]"), session data retained in memory; on reconnect, history backfills.

### 4.4 Permission flows

1. Route opens → request permission → if denied show page-level error (`/camera-error` or `/mic-error`) with "How to allow" helper.
2. Browser "blocked" → same error page + settings link.
3. Device hot-plug: `devicechange` listener → show "New camera detected" toast → offer to switch.

---

## 5. Accessibility Requirements (WCAG 2.2 AA)

### 5.1 Contrast
- Body text on background/card: ≥ 4.5:1 (tokens verified in docs/02 §2).
- Large text (≥24px or ≥18.5px bold): ≥ 3:1.
- Status colors only used with ≥3:1 against their `-bg` pill surfaces; always paired with icon + text label.
- Focus ring contrast ≥ 3:1 vs surrounding (ring color at 40% over background; verified).

### 5.2 Interaction & targeting
- All touch targets ≥ 44×44px (iOS/Android comfortable). Dense table actions get 44px hit areas.
- Minimum tap spacing 8px between adjacent targets.
- `touch-action: manipulation` on controls to remove 300ms delay / double-tap zoom.

### 5.3 Keyboard & focus
- Full tab order: nav → main → controls → footer; `Tab` + `Shift+Tab`.
- Visible focus ring on every interactive element (token §5.4 of docs/02).
- Focus trap in modals/drawers; `Escape` closes; focus returns to trigger.
- No focus order jumps during live updates.

### 5.4 Screen readers / ARIA
- SubtitleArea & SentenceCard wrapped in `aria-live="polite"` (never assertive — avoids shouting).
- Status pills: `role="status"`, text describes state ("Recognition ready").
- Live indicator dots: `aria-hidden` + parent label carries meaning.
- Buttons with icon only: `aria-label`.
- Tables: `caption` or `aria-label` + proper `th scope`.
- Tabs: `aria-selected`, keyboard arrows.
- Icons decorative unless they carry meaning (then `aria-hidden={false}` + label).

### 5.5 Text & readability
- No text smaller than 13px; body 16px.
- Deaf Mode subtitle scales 28–40px by default, user-configurable to 2×.
- High-contrast toggle: adds `outline` on pills, `border-2` on cards, `text-foreground` (disables subtle/60% variants).
- Line-height ≥1.5 body; headings ≥1.2.

### 5.6 Color-blind & reduced motion
- Status never conveyed by color alone (icon + label).
- All motion gated by `prefers-reduced-motion` (see §3).
- Focus/selection states never depend on color alone (border + ring + background).

### 5.7 `lang` & translation
- Document `lang` attribute set per locale; placeholder for i18n (next-intl).
- All UI strings externalized to `messages/en.json` from day one.

---

## 6. UX Guidelines (behavioral)

1. **≤ 2 clicks to any core action** — mode → session is 2 clicks (dashboard → mode → live) or 1 (sidebar shortcut).
2. **Destructive actions always confirm** (end session, delete, clear history).
3. **Auto-save settings**; toasts confirm ("Saved").
4. **Optimistic UI** for history star/delete with rollback on failure.
5. **Live data never blocks the UI** — status pills degrade, session continues.
6. **Streaming text visible immediately** — interim transcript/gloss renders before finalization.
7. **Idle device handling** — camera/mic release on pause; reacquire on resume.
8. **Battery consideration** — notify + auto-pause when on battery below 20% (default on).
9. **Reduced-mode UX** — if user denies both devices, guide to Settings; never dead-end.
10. **Session recovery** — unsaved session kept in memory; prompt "Resume?" on next visit (localStorage snapshot, PII-flagged).
