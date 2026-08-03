# 5 · High-Fidelity UI Description

Pixel-level description of every screen. All colors reference the token names in [11-theme-tokens.md](11-theme-tokens.md). All spacing uses the 4 px scale.

---

## 5.0 Global

- **Font**: Inter, 16 px base, `font-feature-settings: 'cv11','ss01'` for clean numerals.
- **Radius scale**: `sm=8` `md=12` `lg=16` `xl=20` `2xl=24` px.
- **Shadow**: `shadow-card` on cards, `shadow-float` on popovers/dialogs, `shadow-focus` on focus rings.
- **Focus**: 2 px ring `ring-focus` offset 2 px, visible in both themes.
- **Top loading bar**: 3 px cyan indeterminate bar under the topbar during route/lazy transitions.

---

## 5.1 Topbar (app shell, desktop)

- Height 64 px, `bg-background/80` with `backdrop-blur-xl`, bottom `border-border`.
- Left: mobile hamburger (≤ 1024 px) + breadcrumb/route label.
- Center: global search input (280 px, `rounded-lg`, keyboard hint `⌘K` chip) — **future**.
- Right: system-status chip (● All systems healthy | ● Degraded), notification bell (badge dot), user menu (avatar 32 px, name, dropdown → Profile, Settings, Sign out).

---

## 5.2 Sidebar (desktop ≥ 1280 px)

- Width 240 px, `bg-surface`; ≤ 1280 px collapses to 68 px icon-only (tooltips).
- Primary nav: Home, Start (mode selection), Conversations, Settings, About.
- Active item: `bg-primary/8 text-primary` with 3 px rounded indicator on the left edge.
- Bottom: version chip `v0.1.0-beta` + "AI: Online" pill.

---

## 5.3 Landing Page

| Section | Spec |
|---------|------|
| Hero | `max-w-7xl`, left-aligned on desktop. H1 `text-5xl/6xl font-semibold tracking-tight` in `foreground`. Subcopy `text-lg text-muted-foreground`. Two CTAs: primary `[Start free]`, secondary `[Watch demo]` (play icon). Trust row: 4.9★ rating · "12,000+ sessions" · "Sign in 40+ languages (soon)". |
| Feature cards | 3-column `grid gap-6`, each `rounded-2xl border bg-card p-8 shadow-card`, icon in 44 px rounded `bg-primary/8 text-primary`, title `text-lg font-semibold`, body `text-muted-foreground`. Hover: translateY(-2px), shadow-float. |
| How it works | 4 steps, horizontal stepper with numbered circles, connecting dashed line, step titles + one-liners. |
| AI workflow | Full-width band `bg-gradient-to-br from-primary/5 to-cyan/5`, 6 node pills connected by animated arrows, each node = icon + label. |
| CTA band | Centered `text-3xl font-semibold` "Start your first conversation", primary button 48 px. |
| Footer | 4 columns (Product, Company, Resources, Legal) + brand column with logo + short line; bottom row © 2026 SignBridge · Privacy · Terms · Accessibility statement. |

---

## 5.4 Auth Screens

- 2-column on ≥ 1024 px: left **brand panel** (48% width, `bg-primary` deep-blue gradient, white logo, testimonial quote in large serif-free type); right form panel centered `max-w-sm`.
- Login fields: Email (type email), Password (with show/hide eye icon). Checkbox "Remember me", link "Forgot password?".
- Primary button full-width 48 px. Divider "or continue with". Two social buttons (Google, Apple) — *placeholder*.
- Error: `Alert` with red `destructive` styling under the form + input-level `aria-invalid` red borders.
- Success → dashboard with a 900 ms fade-in.

---

## 5.5 Dashboard

- Greeting block: "Good morning, Alex" (`text-2xl font-semibold`) + subline "4 conversations this week · All systems operational".
- **Stat cards** (4, `grid-cols-1 sm:grid-cols-2 xl:grid-cols-4`): live FPS, Latency, Avg confidence, Conversation count. Each: label uppercase `text-xs font-medium text-muted-foreground`, value `text-3xl font-semibold`, delta chip (▲2% green / ▼ red), sparkline (24-sample, 32×48 px, cyan).
- **Quick actions** card: two large 48 px+ buttons — "Start signing" (camera icon), "Start listening" (mic icon) — plus "Avatar — coming soon" disabled with lock.
- **AI status card**: 2-column grid of 6 `StatusChip`s (MediaPipe, Camera, LLM, Speech, GPU, Backend), each dot color-coded, tooltip with detail, "View pipeline" link.
- **Recent conversations**: table (Title, Mode badge, Date, Duration, Turns, ⋯ menu) with `Skeleton` rows on load and `EmptyState` when none.

---

## 5.6 Mode Selection

- H1 "Choose how you'll communicate" + subcopy.
- 3 large cards (grid, `lg:grid-cols-3`), height ≥ 300 px:
  - **Hearing Mode** — camera icon, title, "Sign → Speech", 3 feature bullets (Live recognition · Natural sentences · Voice output), 48 px primary button "Start signing".
  - **Deaf Mode** — mic icon, "Speech → Text", bullets (Live subtitles · High contrast · Avatar soon), primary button "Start listening".
  - **Avatar** — avatar icon, "Coming soon", bullets, disabled button "Notify me" (opens email/alert placeholder).
- Card hover: lift + border-primary/40. Selected state unnecessary (single action per card).

---

## 5.7 Hearing Mode (live session)

Layout: 2-column grid `lg:grid-cols-5` (preview `col-span-3`, output `col-span-2`); mobile stacks.

**Preview column:**
- Camera `<video>` 16:9, `rounded-2xl border bg-black`, skeleton frame while loading, MediaPipe landmark overlay (2 px, primary color, legs opacity 0.9).
- Overlay top-left: session chip `#4821 · 12:04 elapsed`. Overlay bottom: `FPS 48` + `240ms` monospaced chips with live dot.
- Under video: [Mute] [Switch camera] ghost buttons; mic level meter (if ambient input).

**Output column (card stack, `space-y-4`):**
- **Detected word**: big display `text-4xl font-semibold tracking-tight` (e.g., `HELLO`) + confidence bar (label `Confidence`, track 4 px, fill cyan/green by threshold) + `▣ 94%` chip.
- **Generated sentence** card: larger `text-xl`, cyan left border `border-l-4 border-cyan`, shimmer while composing, "…" ellipsis animation while waiting. Finalized on 800 ms pause.
- **Actions row**: [▶ Play] (primary, larger), [⧉ Copy] (secondary), [Auto-speak ◻] (toggle, default on), [Repeat] icon ghost.
- **Prediction timeline**: horizontal chips per sign token, width ∝ confidence, below 60% = amber, hidden when idle.
- **Conversation history**: scrollable list of turns, self = right-aligned primary bubble, other = left gray bubble, timestamps muted.
- **Connection status**: inline `StatusChip` row at top of output column.

**Transitions**: word update fades 150 ms; sentence finalized slides up 200 ms with subtle spring; speech playing shows animated equalizer bars in the Play button.

---

## 5.8 Deaf Mode (live session)

- **Subtitle area** — dominant element, ≥ 40% viewport height, `rounded-2xl bg-background border`, inner text `text-4xl md:text-5xl font-semibold leading-tight` with `tracking-normal`, line height 1.3, full justification off. Active word highlighted (`bg-primary/15 rounded`). Configurable via accessibility settings (size A→4A, contrast, monospace option).
- **Listening status bar**: green pulsing dot + "Listening" + live waveform (15 bars, animating only while speech detected); amber "Processing"; red "Microphone unavailable".
- **Mic selector**: chip showing device name, dropdown to change.
- **Conversation panel** (`max-h-64 overflow-y-auto`): transcript turns, "Them" (gray) / "You" (primary bubble from typed replies).
- **Avatar panel** (`lg:w-56`, `aspect-[3/4]`): placeholder with `RoundedCorners`-style silhouette icon + "3D Avatar — coming soon" + [Notify me].
- **Action bar**: [🔁 Repeat last] [⧉ Copy subtitle] [⌨ Type reply] (opens inline input that appends a "You" bubble).
- **Flash for alerts**: new subtitle arrival uses a subtle 120 ms fade, never flashing; important alerts (e.g., "mic lost") use an aria-live polite announcement + banner.

---

## 5.9 Conversation History

- Toolbar: search input (left, grows), mode filter `Select`, date `Select`, [Export all] ghost, [New] primary.
- Data table: columns Date, Mode (badge), Title, Duration, Turns, Actions (⋯ menu: Replay, Export, Rename, Delete).
- Row hover: `bg-accent/50`. Row click → detail route.
- Detail: header (title, meta), timeline of turns; each turn row = role badge, text, time, confidence (tooltip), copy button.
- Export dropdown: JSON / TXT / CSV → downloads file; success toast.
- Delete: `Dialog` confirm with destructive button, text field requiring the word "delete" (protection), then success toast.

---

## 5.10 Settings

Tab bar: `rounded-full` segmented control (shadcn `Tabs`), sticky top. Each tab = card sections with `Label` + control; inputs 44–48 px.

- **Appearance**: theme radio cards (Light / Dark / System preview thumbnails), text-size stepper `[−] A A A [+]` + live preview sentence, high-contrast toggle.
- **Audio & speech**: voice `Select` (with ▶ test), speed slider (0.5×–1.5×, step 0.1) with value readout, auto-speak toggle, "always play after sentence" toggle.
- **Devices**: camera select + [Test] (renders 2 s preview), mic select + [Test] (live level meter), speaker select + [Test] (plays tone).
- **Language**: UI language `Select`, recognition language `Select` (future), translation target `Select`.
- **Accessibility**: reduce motion toggle, high contrast toggle, subtitle size (A→4A), subtitle font, subtitle background opacity slider, keyboard-shortcut table with "Open shortcuts" button.
- **Notifications**: toggles for session-ended, AI-offline, weekly summary, product updates.
- **Developer**: API base URL input, model select, dataset select, log level select, [Export all data], [Delete account] (destructive, guarded), environment badge.

Save model: settings auto-save on change (debounced 600 ms) with a transient "Saved" check; "Reset to defaults" ghost at bottom.

---

## 5.11 About (in-app)

Sections as cards: **Project** (mission), **Architecture** (pipeline diagram), **AI models** (table: MediaPipe Hands, custom gloss model, LLM, TTS engine, STT engine, each with version), **Dataset** (size, languages, licenses), **Team** (avatar grid), **License & Version** (`v0.1.0-beta`, MIT). Footer chip "Made with accessibility first".

---

## 5.12 404

Centered: illustration (hand with speech bubble, `text-primary/60` large icon composition), giant "404" (`text-7xl font-semibold`), copy "This page doesn't speak sign language yet.", buttons [Back home] [Start a conversation]. Fades in 200 ms.

---

## 5.13 Loading Screens

- Route-level: full-viewport skeleton using `Skeleton` primitives + top loading bar.
- Mode entry: `PipelineLoading` — animated checklist (MediaPipe ✓ → Recognition ✓ → LLM ✓ → Speech ✓), each row appears 120 ms apart; on failure, converts to error card.
- Button-level: spinner 16 px + reduced-opacity label.

---

## 5.14 Error Pages

Shared `ErrorState` card (icon 48 px, title, message, optional `role="alert"`):
- **Camera denied**: CameraOff icon, "Camera access is blocked", tips, [Re-check permission] [Open browser settings].
- **Camera not found**: Camera icon with slash, "No camera detected", [Try again] [Check drivers].
- **Mic denied**: MicOff, equivalent actions.
- **AI offline**: CloudOff, "AI service is temporarily unavailable", [Retry now] with countdown, status link.
- **Network error**: WifiOff, "You're offline — transcript is buffering", [Retry].
- **500**: ServerCrash, "Something went wrong on our side", [Retry] [Back home].

---

## 5.15 Toasts & Notifications

- Position: bottom-right (bottom-center on mobile), stacked, `w-80`, `rounded-xl shadow-float border`, auto-dismiss 4 s (errors persist), slide-in from right 200 ms, aria-live="polite".
- Variants: success (CheckCircle green), info (Info cyan), warning (AlertTriangle amber), error (AlertCircle red).

---

## 5.16 Comparison — visual style guardrails

| Do | Don't |
|----|-------|
| Spacious whitespace, 24–32 px gaps | Dense 8 px padding everywhere |
| One accent color at a time | Rainbow multi-colored buttons |
| Subtle fade/slide (≤ 250 ms) | Bouncing/shimmer loops everywhere |
| Rounded 12–16 px cards, soft shadows | Sharp corners, harsh drop shadows |
| Inter/sans, generous line-height | Script fonts, tight leading |
| Consistent 48 px primary CTAs | Inconsistent button sizes |
