# 03 · Component Library

Every reusable component. Each entry: purpose, anatomy, variants, sizes,
states, accessibility, shadcn/ui mapping, and Lucide icons. Use together with
`docs/02` tokens — no hardcoded colors outside the token set.

> shadcn/ui mapping assumes `npx shadcn@latest init` with the tokens from §6.2
> of `docs/02`. "Extends" means the shadcn component is customized per the notes
> below (all customization lives in the shadcn component file).

---

## 1. Foundations

### 1.1 Button

- **Anatomy:** icon (optional) + label · fixed height · pill (radius-full) for primary, md radius for others.
- **Variants:** `primary` (bg-primary), `secondary` (bg-secondary border-border), `outline` (border-input bg-transparent), `ghost`, `destructive`, `link`.
- **Sizes:** `lg` 48px (default for all primary actions in-app), `md` 44px, `sm` 36px (secondary/table actions only), `icon` 44×44, `icon-sm` 36×36.
- **States:** default · hover (variant-specific) · active · disabled (50% opacity, no pointer) · loading (spinner 16px, `Loader2 animate-spin`) · focus (ring).
- **A11y:** icon-only buttons require `aria-label`. Min 44px target in-app.
- **shadcn:** `button` (custom variants/sizes added).
- **Icons:** `ArrowRight`, `Play`, `Pause`, `Square`, `Copy`, `Check`, `Loader2`, `Plus`, `Send`, `ExternalLink`.

### 1.2 IconButton

- 44×44, radius-full, ghost fill, hover bg-muted. Used for Play, Copy, Close, settings shortcuts.
- States: default/hover/pressed/disabled/focus; `active` (accent bg, for "playing").

### 1.3 Input

- **Anatomy:** label (xs, 500) · input (h-11, radius-md, border-input, bg-card, px-4) · helper (xs, subtle) · error (xs, destructive).
- **States:** default · focus (ring) · error (border-destructive + ring-destructive/40) · disabled · with left icon (pl-11).
- **Sizes:** md 44px (default), lg 48px (auth forms).
- **shadcn:** `input`, `label`. Form composition: `react-hook-form` + `zod`.

### 1.4 Textarea / Select / Slider / Switch / Checkbox / Radio / Tabs

| Component | shadcn | Notes |
|---|---|---|
| Textarea | `textarea` | h-11 min, resize-none for chat; `Field` component wraps label+error |
| Select | `select` (native) or `dropdown-menu` trigger | Device pickers use native `select` for a11y + autopopulate |
| Slider | `slider` | 2–4x speech speed, 0–2x text size, step 0.1, shows current value mono |
| Switch | `switch` | Accessibility & notification toggles; label on left |
| Checkbox | `checkbox` | Multi-select in filters/forms |
| Radio | `radio-group` | Mode selection in quick-setup wizard |
| Tabs | `tabs` | Settings page sections, History filter tabs |

---

## 2. Content & Feedback Components

### 2.1 Card

- **Anatomy:** container radius-lg, bg-card, border, shadow-card, p-6; optional header (title h3 + description sm muted + actions) and footer.
- **Variants:** `default` · `interactive` (hover border-primary/40 + shadow deepen, cursor-pointer, `role="button"`) · `highlight` (ring-1 ring-primary/30 for featured) · `tile` (aspect square, p-8, mode cards).
- **States:** default/hover/focus.
- **shadcn:** `card` (+ `card-header`, `card-content`, `card-footer`).

### 2.2 Badge

- **Anatomy:** inline-flex items-center gap-1, radius-full, h-6, px-2.5, text-xs 500.
- **Variants:** `secondary` · `primary` · `accent` (AI) · `outline` · `success` (bg success-bg text success) · `warning` · `destructive`.
- **States:** dot badge variant includes 6px status dot (`span class="h-1.5 w-1.5 rounded-full bg-current"`).
- **shadcn:** `badge` (add status variants).

### 2.3 StatusPill (status indicator)

- Specialized badge for **system status** with icon + text + optional pulse dot.
- States map: `success` ✓ Ready · `warning` ⚠ Warming · `destructive` ✕ Error · `muted` ○ Off.
- **Icons:** `Check`, `AlertTriangle`, `X`, `Minus`.
- Motion: warning state dot pulses gently (motion-gated); destructive state static.
- Not a shadcn base — custom component in `components/status`.

### 2.4 Alert (inline feedback)

- **Anatomy:** radius-lg, border, p-4, icon + title (sm 600) + optional body (sm) + optional action button.
- **Variants:** `info` (primary) · `success` · `warning` · `destructive` · `neutral` (muted).
- **Icons:** `Info`, `CheckCircle2`, `AlertTriangle`, `XCircle`, `Sparkles`.
- **shadcn:** `alert` (`alert-dialog`? no — `alert`).

### 2.5 Dialog / Modal

- **Anatomy:** overlay `bg-background/70 backdrop-blur-sm`, panel radius-xl, shadow-pop, p-6, max-w-md (default) / sm (narrow) / lg (session summary).
- **A11y:** focus trap, esc to close, `aria-labelledby` on title, restore focus, scroll lock.
- **shadcn:** `dialog`.

### 2.6 ConfirmDialog

- **Anatomy:** title "Delete conversation?" + body + cancel/secondary + destructive confirm.
- Used for: delete history, end session (confirm summary), leave settings unsaved.
- **shadcn:** `alert-dialog`.

### 2.7 Dropdown Menu

- **Anatomy:** trigger (button/menu-button) → content radius-lg shadow-pop, items h-10 px-3 radius-md, dividers, danger items text destructive.
- Items may include icon + label + kbd hint.
- **shadcn:** `dropdown-menu`.

### 2.8 Command Palette (⌘K)

- Global search + navigation. Triggered by `⌘/Ctrl+K`.
- **Anatomy:** full-width panel (max-w-lg), search input, result groups (Navigate, Actions, Recent conversations).
- **shadcn:** `command` (+ `dialog` wrapper).

### 2.9 Table

- **Anatomy:** wrapper radius-lg border overflow-hidden · thead xs uppercase text subtle bg-muted · rows h-14 divide-y · hover bg-muted/60 · cells sm; numeric right-aligned mono.
- **States:** row hover · selected (bg-primary/5) · empty (see EmptyState).
- **shadcn:** `table`.

### 2.10 Skeleton (loading)

- `animate-pulse` bg-muted radius-md. Full composite skeletons per page (see docs/05 §4).
- **shadcn:** `skeleton`.

### 2.11 Toast

- Top-right stack. States: success/error/info/loading. Used for Copy, Export, Delete, Save.
- **shadcn:** `sonner` (`<Toaster richColors position="top-right" />`).

### 2.12 Tooltip / Progress / Avatar / Separator / ScrollArea / Sheet

| Component | shadcn | Notes |
|---|---|---|
| Tooltip | `tooltip` | Short labels only; kbd hints live in shortcuts UI not tooltips |
| Progress | `progress` | Confidence, GPU, memory, model-load |
| Avatar | `avatar` | User + bot avatars, initials fallback |
| Separator | `separator` | Dividers in lists/forms |
| ScrollArea | `scroll-area` | Conversation/history panels, max-h with fade |
| Sheet | `sheet` | Mobile nav drawer (from left) |

---

## 3. SignBridge-Specific Components

### 3.1 AppShell

- Fixed **sidebar** (desktop, 260px → icon rail 72px) + **topbar** (h-16) + main scroll area.
- Sidebar sections: Nav, "New session" primary button, spacer, status mini widget, user menu.
- Mobile: Sheet drawer + topbar with hamburger.
- **Icons:** `LayoutDashboard`, `Plus`, `Hand`, `Ear`, `History`, `Settings`, `Menu`, `X`, `ChevronUp`.

### 3.2 ModeCard

- Tile (aspect ~3/4), interactive card. Icon in 48px accent/primary container, title h3, description sm muted, "coming soon" badge for avatar.
- **Icons:** `Hand` (hearing), `Ear` (deaf), `PersonStanding` or `Bot` (avatar).

### 3.3 MetricCard (dashboard + live mode)

- **Anatomy:** label (xs uppercase subtle) + value (h4, mono for numbers) + sub (sm muted) + optional inline status pill / sparkline.
- Variants: `metric`, `status`, `health`.
- **Icons:** `Activity`, `Gauge`, `Cpu`, `Database`, `Zap`, `MessageSquare`, `MemoryStick`, `Video`, `Mic`.

### 3.4 StatusWidget (AI/system health grid)

- **Anatomy:** 8 items in grid (2/3/4 cols): MediaPipe · Recognition · LLM · Speech · Camera · Microphone · GPU · Backend.
- Each: StatusPill + label + value (model name / fps / version) + mono detail.
- **States:** `checking` (muted, pulse) → `ready` (success) → `error` (destructive, with retry action).
- Full spec: docs/04 §9.

### 3.5 CameraPreview

- **Anatomy:** video (object-cover, full-bleed) + overlay top-right status pill (camera · fps) + bottom-center gloss word pill + optional skeleton when loading + error overlay.
- **States:** idle (poster frame + "Enable camera"), loading (skeleton), live (video + overlays), error (inline error overlay, retry button).
- **Icons:** `Video`, `VideoOff`, `ScanLine`, `Cpu`.

### 3.6 SentenceCard

- **Anatomy:** card; label "SignBridge hears" / "Detected sentence"; large text (h2/h3); confidence bar; footer actions Play / Copy / Speak again.
- **States:** empty (hint text), streaming (dimmed streaming words), final (full text), playing (accent ring + pulsing `Volume2`), error (destructive alert above card).
- **Icons:** `Volume2`, `Copy`, `Check`, `RefreshCw`.

### 3.7 SubtitleArea (Deaf Mode core)

- Full-width panel, bg-card, radius-xl, center-aligned large text 28–40px (from settings), current subtitle in foreground + previous line faded above.
- Interim transcript shown smaller (body-lg muted) until finalized.
- **aria-live="polite"`** wrapper. Font mono-option toggle in Settings.
- **Icons:** `Captions`, `AlignCenter`.

### 3.8 ConversationPanel

- Two-column feed: Hearing user (left, primary, `Hand` avatar) / Deaf user (right, accent, `Ear` avatar).
- Bubbles: radius-lg, max-w 70%, hearing = bg-primary text-primary-foreground, deaf = bg-muted; timestamp sm subtle; time-separators.
- Auto-scroll to bottom; "jump to latest" chip when scrolled up.
- **Icons:** `Hand`, `Ear`, `ChevronDown`, `Copy`, `MoreHorizontal`.

### 3.9 PredictionTimeline

- Horizontal strip of recent gloss predictions: `[t-2.4s] HELLO → [t-1.2s] HOW → [t-0.3s] YOU`.
- Each chip: mono timestamp + gloss word; latest chip accent-bordered + pulse.
- **Icons:** `Activity` (live), `Clock`.

### 3.10 SessionControls

- Floating glass bar (bottom center, shadow-glass): End session (destructive) · Pause/Resume · Mic/Camera toggle · Mute · Timer (mono).
- Keyboard: `Space` = primary action, `Escape` = end/confirm.
- **Icons:** `Square`, `Play`, `Pause`, `Mic`, `MicOff`, `Video`, `VideoOff`, `Timer`.

### 3.11 HistoryItem / HistoryTableRow

- Row: mode icon + title (first utterance / session label) · mode badge · date · duration · starred toggle · kebab menu (view/export/delete).
- **Icons:** `Hand`, `Ear`, `Star`, `MoreHorizontal`, `FileText`, `Download`, `Trash2`.

### 3.12 EmptyState

- Centered: 48px icon in muted circle, title h4, description sm muted, optional primary action.
- Used for: no history, empty conversation, no devices, no sessions.
- **Icons:** per context: `Inbox`, `MessagesSquare`, `VideoOff`, `MicOff`, `Sparkles`.

### 3.13 UserMenu

- Avatar trigger → dropdown: name/email, "Account" (future), "Settings", "Log out".
- **Icons:** `User`, `Settings`, `LogOut`.

### 3.14 KeyboardShortcutHints

- Footer chip row: `Space Play/Pause · C Copy · S Stop · G N New session · ? All shortcuts`.
- **Icons:** `Keyboard`.

### 3.15 AvatarPlaceholder (future feature)

- Card with 3D-styled icon (static illustration, no heavy animation), "Sign language avatar — coming soon" badge, disabled "Preview" button.
- **Icons:** `PersonStanding` / `Bot`.

---

## 4. Lucide Icon Inventory

### 4.1 Navigation & chrome
`LayoutDashboard`, `Plus`, `Hand`, `Ear`, `History`, `Settings`, `Menu`, `X`, `ChevronUp`, `ChevronDown`, `ChevronRight`, `ChevronLeft`, `ArrowLeft`, `ArrowRight`, `ExternalLink`, `Search`, `Command`, `Keyboard`, `Sun`, `Moon`, `Monitor`, `LogOut`, `User`, `Sparkles`, `Home`, `Info`.

### 4.2 Live-mode & AI
`Video`, `VideoOff`, `Mic`, `MicOff`, `ScanLine`, `Cpu`, `Gpu` (or `CircuitBoard`), `MemoryStick`, `Activity`, `Gauge`, `Zap`, `Waves`, `Volume2`, `VolumeX`, `Captions`, `Play`, `Pause`, `Square`, `StopCircle`, `Timer`, `Signal`, `Wifi`, `WifiOff`, `CloudOff`, `RefreshCw`, `Radio`, `Bot`, `PersonStanding`.

### 4.3 Data & actions
`Copy`, `Check`, `CheckCircle2`, `XCircle`, `AlertTriangle`, `Info`, `Loader2`, `Download`, `Upload`, `FileText`, `Star`, `StarOff`, `Trash2`, `MoreHorizontal`, `Inbox`, `MessagesSquare`, `MessageSquare`, `Filter`, `Calendar`, `Clock`, `Languages`, `Volume1`, `TextCursorInput`, `Eye`, `EyeOff`, `Notification` (or `Bell`), `BellOff`, `SlidersHorizontal`, `Palette`, `Database`, `BookOpen`, `Github`, `Mail`, `Lock`, `Eye`.

### 4.4 Usage rules
- Icon size 16 inline / 20 in controls / 24 empty states.
- Always pair icon + text on primary buttons; icon-only only when target ≥44px and `aria-label` present.
- Stroke width `1.75` default; keep consistent app-wide.

---

## 5. Component States Matrix (shared rules)

| State | Rule |
|---|---|
| Default | as designed |
| Hover | `hover:bg-*` / `hover:border-primary/40` / shadow deepen — no scale |
| Active/pressed | `active:scale-[0.98]` on buttons only |
| Focus | ring-2 ring-ring ring-offset-2 ring-offset-background |
| Disabled | `disabled:pointer-events-none disabled:opacity-50` |
| Loading | icon spins (`Loader2`) + label preserved, min-width stable |
| Error | destructive border/text + `role="alert"` |
| Empty | EmptyState pattern (§3.12) |

---

## 6. Shadcn/ui Init Checklist

```
npx shadcn@latest init
npx shadcn@latest add button badge card input label textarea select switch
npx shadcn@latest add checkbox radio-group tabs slider progress alert dialog
npx shadcn@latest add alert-dialog dropdown-menu tooltip table skeleton avatar
npx shadcn@latest add separator scroll-area sheet command sonner
```
Override generated theme colors with `globals.css` tokens from `docs/02 §6.2`.
