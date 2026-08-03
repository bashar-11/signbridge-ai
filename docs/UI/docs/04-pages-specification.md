# 04 · Pages — Wireframes & High-Fidelity Specifications

Complete UI spec for every page. Wireframes are ASCII; annotations after each
block describe exact tokens, spacing, states, and behavior. Component names
refer to `docs/03`; tokens to `docs/02`. Light & dark both render the same
layout — only tokens swap.

Legend for wireframes: `#` solid accent/primary fill, `=` muted fill, `·` gutter,
`[]` element, `|` divider, `{ }` status.

---

## 1. Landing Page (`/`)

### 1.1 Navbar (sticky, glass on scroll)

```
┌────────────────────────────────────────────────────────────────────────────┐
│  ◇ SignBridge            Product  How it works  About          Sign in  [  │
│                                                              Get started → ] │
└────────────────────────────────────────────────────────────────────────────┘
```
- Height 64px; logo mark = rounded square `brand` with hand glyph (`Hand` icon, white, 20px) + wordmark "SignBridge" (600).
- Nav: `sm` text, muted, hover primary. CTA `Button primary lg` "Get started". Mobile: hamburger → Sheet with same items.
- Active anchor links scroll to sections.

### 1.2 Hero

```
┌────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│         [ Badge: Now in public beta ]                                       │
│                                                                             │
│            Every voice. Every sign.                                          │
│            One conversation.                                                │
│                                                                             │
│        SignBridge translates sign language to speech and speech to           │
│        live subtitles — in real time, on your device.                        │
│                                                                             │
│          [ Try it free → ]  [   Watch how it works  ▶   ]                   │
│                                                                             │
│    ┌─────────────────────────────────────────────────────────────────────┐  │
│    │  mock device UI (mini camera + sentence + status pills, static)     │  │
│    └─────────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────────┘
```
- Centered column, `pt-24 pb-16 md:pt-32`, max-w-4xl.
- H1 = `display` token. Gradient: **none** — solid `foreground`.
- Badge: `badge` accent variant with `Sparkles` icon.
- Sub: `body-lg` muted, max-w-2xl mx-auto.
- Primary CTA → `/register`; secondary `outline` → anchor `#how-it-works`.
- Below: mock UI card (`shadow-card`, radius-xl) — static composition of CameraPreview frame + SentenceCard + StatusPills, **not** a live demo.

### 1.3 Trust strip

```
[ ✓ Private by design ] [ ✓ Works offline core ] [ ✓ WCAG 2.2 AA ] [ ✓ Free beta ]
```
- 4 items, centered, xs uppercase subtle, `Check` icons in success.

### 1.4 Features (`#features`)

```
Section title:  Built for both sides of the conversation
    [ Hand + Card ]            [ Ear + Card ]              [ Sparkles + Card ]
    Hearing Mode               Deaf Mode                   AI-powered core
    Signs → natural            Speech → huge,             MediaPipe → LLM →
    speech in real time.       high-contrast subtitles.   reliable sentences.
```
- 3 cards (`Card interactive`, max-w-sm, p-8); icon in 48px rounded container (hearing: primary/10, deaf: accent/10, ai: muted). Title h3, body sm muted.

### 1.5 How It Works (`#how-it-works`) — the two pipelines

```
     HEARING MODE                                    DEAF MODE
   ┌──────────┐   ┌──────────┐   ┌──────────┐     ┌──────────┐  ┌──────────┐  ┌──────────┐
   │  Camera  │→  │ MediaPipe│→  │   LLM    │     │Microphone│→ │    STT   │→ │   LLM    │
   └──────────┘   └──────────┘   └──────────┘     └──────────┘  └──────────┘  └──────────┘
   ┌──────────┐   ┌──────────┐                     ┌──────────┐  ┌──────────┐
   │  Speech  │←  │Sentence  │                     │Subtitle  │← │Sentence  │
   └──────────┘   └──────────┘                     └──────────┘  └──────────┘
```
- Two `Card highlight` columns; each step a chip (icon + label sm) with arrow chevrons; step descriptions below. Static diagram — no animation.

### 1.6 AI Workflow (feature band)

```
    One live session, end to end:
    [Recognition 94%] → [LLM "Could you pass the salt?"] → [Speech ▶] → [History]
```
- Muted band, three mini MetricCards + sentence chip, mono readouts. Label: "What happens while you talk."

### 1.7 About (strip) → links to `/about`

### 1.8 Final CTA

```
        Ready to bridge the gap?
        Start your first conversation in under a minute.

                [ Get started free → ]    [   Contact us   ]
```
- Centered, py-24; primary CTA → register.

### 1.9 Footer

- 4 columns: Brand (logo + tagline) · Product (Features, How it works, Pricing—future) · Company (About, Contact, Blog—future) · Legal (Privacy, Terms, License).
- Bottom row: © year SignBridge · version chip (`v0.1.0-beta`) · social icons (Github, Mail).
- xs muted text, generous gaps.

---

## 2. Authentication

### 2.1 Login (`/login`)

```
┌───────────────────────────────┐
│  ◇ SignBridge                 │   ← back link, centered, top
│                               │
│   Welcome back                │
│   Sign in to continue.        │   ← h1 + body sm muted
│                               │
│   Email                        │
│   [________________________]  │
│   Password                     │
│   [________________________]  │   {Forgot password?} → right-aligned link
│                               │
│   [  Sign in with Google  ]   │   ← outline lg
│   [       Sign in        → ]  │   ← primary lg, full width
│                               │
│   Don't have an account? Register   │   ← sm muted + link
│   [✓] Keep me signed in            │
└───────────────────────────────┘
```
- Centered card, max-w-md, `Card`, p-8, radius-xl. Left/right split with brand panel on lg (desktop: 50/50 grid — left brand panel with logo, tagline, mock conversation preview; right form). Mobile: form only.
- Social button optional (grey, `Github`/`Mail` icon).
- Errors: inline `Alert destructive` "Incorrect email or password."
- Loading: button spinner `Loader2`.

### 2.2 Register (`/register`)
- Same shell. Fields: Name, Email, Password (with `Eye`/`EyeOff` reveal), Confirm password. `Checkbox` Terms. Success → `/app` (or Quick Setup wizard if enabled).
- Strength hint: xs muted + 3-step progress bar (weak/fair/strong).

### 2.3 Forgot Password (`/forgot-password`)
- Fields: Email → "Send reset link". Success state: `Alert success` "Check your email." with `Mail` icon + back-to-login link.
- Placeholder-only: submit is mocked, reset flow not implemented.

---

## 3. App Shell (all `/app/*`)

```
┌───────────────────────────────────────────────────────────────────────────┐
│ [≡]  SignBridge      {● All systems ready}          [⌘K]  [● A] [▾]     │  ← topbar h-16
├───────────┬───────────────────────────────────────────────────────────────┤
│ Sidebar   │                                                               │
│ 260px     │  < Page content (scroll area) >                                │
│           │                                                               │
│ ◇ Dashboard│                                                               │
│ ◇ New sess.│                                                               │
│ ◇ Hearing  │                                                               │
│ ◇ Deaf     │                                                               │
│ ◇ History  │                                                               │
│ ◇ Settings │                                                               │
│ ─────────  │                                                               │
│ {status}   │                                                               │
│ ● Admin    │                                                               │
└───────────┴───────────────────────────────────────────────────────────────┘
```
- **Sidebar:** fixed left, w-64 (collapsible to w-[72px] icon rail with tooltips), bg-card border-r. Nav items: icon 20 + label sm 500; active = `text-primary bg-primary/5` + left indicator; hover bg-muted. "New session" = `Button primary` full-width with `Plus`.
- **Topbar:** left: mobile menu button + breadcrumb/title; center/right: `⌘K` search button, global status pill (All systems ready / 1 service degraded), notifications bell, avatar menu.
- **Responsive:** tablet → rail; mobile → Sheet drawer (see docs/05 §1).

---

## 4. Dashboard (`/app`)

### 4.1 Greeting row
```
Good afternoon, Alex            { Last session: 2h ago }
Quick summary of your week: 3 sessions, 42 utterances, 96% avg. confidence.
[  Start a new session  → ]   [  View history  ]
```
- h2 + body sm muted; primary action + outline action.

### 4.2 Stat cards (4 × MetricCard)
```
┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ Utterances   │ │ Conversations │ │ Avg confidence│ │ Session time │
│  42   ▲12%   │ │     12  ▲3   │ │   96%  ▲2%   │ │  1h 24m  ▲8% │
│ sparkline    │ │ sparkline     │ │ sparkline     │ │ sparkline     │
└──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘
```
- Grid `grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4`. Value mono for numerics.

### 4.3 Quick actions
```
Start signing  [ Hand card ]      Start listening  [ Ear card ]     Avatar (soon) [Bot]
```
- 3 ModeCards (compact horizontal variant), reuse §7 layout at small scale.

### 4.4 AI status + system health (2-column)
```
┌── AI Status ────────────────┐ ┌── System health ───────────────┐
│ {● Recognition ready}       │ │ Live FPS        64  ▓▓▓▓▓▓▓░░  │
│ {● LLM connected}           │ │ Latency         48 ms ▓▓░░░░░░  │
│ {● Speech ready}            │ │ GPU usage       38%  ▓▓▓░░░░░  │
│ {● Camera connected}        │ │ Memory usage    1.9 GB ▓▓▓░░░  │
│  Model: signnet-v3 · Dataset: WL-40k │ Model: MediaPipe v2 │
└─────────────────────────────┘ └─────────────────────────────────┘
```
- Left: StatusWidget grid; Right: MetricCards + Progress bars; mono readouts; `{ }` = StatusPill.

### 4.5 Recent conversations
```
Recent conversations                 [ View all ]
┌──────────────────────────────────────────────────────────────┐
│ [Hand] "Could you pass the salt?"  Hearing · Today · 3m  · ★  │
│ [Ear]  "The meeting is at 2pm."    Deaf    · Yesterday · 5m   │
│ ...                                                           │
└──────────────────────────────────────────────────────────────┘
```
- Latest 5 rows (HistoryItem compact); empty → EmptyState `MessagesSquare`.

### 4.6 Setup banner (conditional)
- If devices unconfigured: `Alert info` "Finish device setup" with `Button sm` → `/app/settings?tab=devices`. Auto-dismiss.

---

## 5. Choose Communication Mode (`/app/mode`)

```
                Choose how you want to communicate
        Pick a mode to start a session. You can switch anytime.
┌────────────────────────┐  ┌────────────────────────┐  ┌────────────────────────┐
│  [Hand icon]           │  │  [Ear icon]            │  │  [Bot icon]            │
│                        │  │                        │  │                        │
│  Hearing Mode          │  │  Deaf Mode             │  │  Avatar (coming soon)  │
│                        │  │                        │  │                        │
│  Sign to me — I'll     │  │  I'm Deaf — turn      │  │  3D sign-language       │
│  turn signs into       │  │  speech into large,    │  │  avatar for real-time   │
│  speech.               │  │  clear subtitles.      │  │  signing.               │
│                        │  │                        │  │                        │
│  [  Open hearing → ]   │  │  [  Open deaf → ]     │  │  [Notify me]  disabled  │
└────────────────────────┘  └────────────────────────┘  └────────────────────────┘
```
- 3 `ModeCard` tiles, grid `md:grid-cols-3`, gap-6, max-w-5xl centered. Hearing card `highlight` (default/primary), Deaf `accent` accent border, Avatar `muted` + `Badge` "Future".
- Below: "Quick start" kbd hints (`Space`, `G N`).
- Selected mode opens immediately (1 click) → `/app/hearing` or `/app/deaf`.

---

## 6. Hearing Mode (`/app/hearing`)

### 6.1 Layout (desktop 3-column: history · main · metrics)

```
┌────────────────────────────────────────────────────────────────────────────┐
│ [≡] Hearing Mode      {● Live} 64 FPS · 48ms   [End session ■]             │
├─────────────┬─────────────────────────────────┬────────────────────────────┤
│ Conversation│  Camera Preview                 │  Live metrics               │
│  panel      │  ┌───────────────────────────┐  │  Detection                  │
│             │  │                           │  │  Word:   [HELLO]  {94%}     │
│ [H] Could   │  │       video (object-cover) │  │  FPS:      64              │
│     you...  │  │                           │  │  Latency:  48 ms            │
│ [D] Yes,    │  │   {● 64 FPS}   [HELLO]    │  │  ───────────────            │
│             │  │                           │  │  Sentence                   │
│ [H] Thank   │  └───────────────────────────┘  │  "Could you pass the         │
│             │  ┌───────────────────────────┐  │   salt?"   {96%}            │
│             │  │ Sentence:                  │  │  [▶ Play] [Copy]            │
│             │  │ "Could you pass the salt?" │  │  ───────────────            │
│             │  │ [▶ Play] [Copy] [♻]      │  │  Timeline                    │
│             │  └───────────────────────────┘  │  [t-2.4s] HELLO              │
│             │                                 │  [t-1.2s] YOU                │
│             │                                 │  [t-0.3s] PASS              │
│             │                                 │  ───────────────            │
│             │                                 │  AI status                   │
│             │                                 │  {●} {●} {●} {●} {●} {●}    │
├─────────────┴─────────────────────────────────┴────────────────────────────┤
│  [■ End session]     Space Play/Pause · C Copy · ? Shortcuts                │
└────────────────────────────────────────────────────────────────────────────┘
```
- **Main column:** CameraPreview (aspect 16/9, radius-xl) + SentenceCard below.
- **Left:** ConversationPanel (h-full, scroll). **Right:** metrics stack in a single `Card` divided by `Separator`.
- **Live controls** floating glass bar bottom: Pause/Resume, Camera toggle, Mic (for voiceback demo), End session.
- **States:**
  - `model loading` → CameraPreview skeleton + right panel skeletons + status pills "warming".
  - `no camera` → CameraPreview error overlay "Camera unavailable — [Retry] [Settings]"; status pill destructive.
  - `AI offline` → SentenceCard disabled + top banner `Alert destructive` "AI offline. Reconnecting… [Retry]" (non-blocking).
- **Overlays on video:** top-right StatusPill `● {fps}`; bottom-center gloss chip `[HELLO] {94%}` (accent bg, pulse while streaming).
- **Confidence bar** under sentence: `Progress` fill success ≥85 / warning 60–84 / destructive <60, with mono %.

---

## 7. Deaf Mode (`/app/deaf`)

```
┌────────────────────────────────────────────────────────────────────────────┐
│ [≡] Deaf Mode      {● Listening}   [Mic: On]        [End session ■]        │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│   ┌────────────────────────────────────────────────────────────────────┐  │
│   │                    ●  LIVE SUBTITLES  (aria-live)                  │  │
│   │                                                                    │  │
│   │           "Could you pass the salt, please?"                        │  │
│   │                    (28–40px, high contrast)                        │  │
│   │                                                                    │  │
│   │              (interim: 'could you pass the…'  — muted)             │  │
│   └────────────────────────────────────────────────────────────────────┘  │
│                                                                            │
│ ┌── Avatar (future) ─────┐   ┌── Conversation ───────────────────────────┐ │
│ │  [PersonStanding]      │   │ [E] Could you pass the salt?             │ │
│ │  Sign avatar — coming  │   │ [H] "…" [TTS]                            │ │
│ │  soon  {Badge}         │   │ ...                                      │ │
│ │  [Notify me]           │   │                                          │ │
│ └────────────────────────┘   └───────────────────────────────────────────┘ │
│  [■ End session]   Space Repeat · C Copy · ? Shortcuts                    │
└────────────────────────────────────────────────────────────────────────────┘
```
- **SubtitleArea:** dominant element, min-h-[40vh], max-w-3xl centered, center-aligned, `text-[clamp(1.75rem,5vw,2.5rem)]` default (scaled by Settings Text Size). Final text `foreground`, previous line above at 60% size muted; interim smaller muted. Optional visual flash on new sentence (subtle fade-in only).
- **Topbar pills:** `{● Listening}` StatusPill success when STT active; `[Mic: On]` toggle button with `Mic`/`MicOff`.
- **Avatar card:** right column on desktop, below subtitles on mobile. Static illustration + "coming soon".
- **Conversation panel:** right/left, bubbles from Hearing side (`Ear` avatar accent) with `Play` (TTS echo) + `Copy`.
- **States:** mic off (paused) → StatusPill warning "Paused"; STT loading → "Warming up"; error → destructive pill + inline retry; permission denied → full error page (`/mic-error`).

---

## 8. Conversation History (`/app/history`)

```
                Conversations
        [ Search... ⌕ ]    [All ▾] [Date ▾]     [ Export ▾ ] [ Delete ]
┌───────────────────────────────────────────────────────────────────────────┐
│ [Hand] "Could you pass the salt?"   Hearing   Today 08:12   3m   ★   ⋯   │
│ [Ear]  "The meeting moved to 3pm."  Deaf      Today 07:44   2m   ☆   ⋯   │
│ [Hand] "How are you feeling?"       Hearing   Yesterday   5m   ★   ⋯   │
│ ...                                                                      │
└───────────────────────────────────────────────────────────────────────────┘
```
- **Toolbar:** search `Input` with `Search` icon (debounced 300ms); filters: mode `Select` (All/Hearing/Deaf), date range `Select` (All/Today/7d/30d/Custom); batch actions enabled when rows selected.
- **Table:** columns = Mode icon, Title (first utterance, truncate), Mode badge, Date, Duration, Starred (`Star`/`StarOff` toggle), menu (`MoreHorizontal`).
- **Row actions (menu):** View detail (dialog with full transcript + SessionCard metadata), Export, Delete (ConfirmDialog).
- **Detail dialog:** header metadata + full transcript timeline + confidence summary + Export/Delete.
- **Export:** `DropdownMenu` → JSON / CSV / TXT → toast + download.
- **Empty state:** EmptyState `Inbox` "No conversations yet" + `[Start a session →]`.
- **Selected state:** checkbox column appears (or row click toggles) with batch bar `Delete selected (n) · Cancel`.
- **Pagination:** "Load more" button + count `Showing 1–20 of 87`.

---

## 9. Settings (`/app/settings`)

Tabs (shadcn `tabs`): `General · Devices · Voice & Display · Accessibility · Notifications · Developer`.

### 9.1 General
```
Profile:  [avatar] Name [input]  Email [input (disabled)]  Save
Theme:    [Light] [Dark] [System]        ← RadioGroup segmented
Language: [Select: English, ASL, Español, Deutsch…]  (future: full ASL→NL models)
```

### 9.2 Devices
```
Camera:   [Select: Integrated webcam]   [ Test preview ▷ ]
Microphone: [Select: Built-in mic]      [ Level meter ▓▓▓░░ ]  [ Test ]
  - Live preview card while testing; "Test" plays 2s recording loop.
```

### 9.3 Voice & Display
```
Voice:        [Select: Sarah (US) / Alex (UK) …]
Speech speed: [────●────]  1.0×  (Slider 0.5–2.0, step 0.1)
Text size:    [────●────]  1.0×  (Slider 0.75–2.0 — Deaf subtitle scale)
Auto-play speech: [Switch]
```

### 9.4 Accessibility
```
High contrast:        [Switch]  (adds outline on pills, stronger borders)
Reduce motion:        [Switch]  (disables all animations, sets prefers-reduced-motion)
Subtitle background:  [Select: Card / Solid black / None]
Caption font:         [Select: Inter / Mono]
Show keyboard hints:  [Switch]
```

### 9.5 Notifications
```
Session started · Low battery · Model ready · Reconnect — [Switch] each
```

### 9.6 Developer
```
API endpoint override: [input url]  (env-guarded, "for self-hosted")
Active model:  [Select: signnet-v3 / asl-lean]      {Models future}
Show debug metrics overlay: [Switch]  (FPS/latency hud in live modes)
Export telemetry: [Button]
```

- **Save pattern:** changes apply instantly; per-section "Saved" toast + `Check` flash. Dirty-state handled locally (no form-level save button except Profile).

---

## 10. About (`/about`)

```
                    About SignBridge
              An open, privacy-first bridge between
              signed and spoken language.
┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
│ Project  │ │Architect.│ │ AI models │ │ Dataset  │ │  Team    │
│ mission  │ │ MediaPipe│ │ signnet-v3│ │ WL-40k   │ │ 4 people │
│ story,   │ │ + LLM +  │ │ ASR, TTS, │ │ 40k signs│ │ names +  │
│ roadmap  │ │ streaming│ │ LLM (link)│ │ 48 glosses││ roles    │
└──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘
License: MIT · Version: v0.1.0-beta · [ View changelog ] [ Contact ]
```
- 5 info cards (`Card`), each icon + h3 + sm body. Bottom meta row: license chip, version chip, links.
- Footer note: dataset & model links placeholder (`Database`, `Github`).

---

## 11. 404 (`/404`)

```
          ◇ SignBridge
            4 0 4
         This page signed out.
    The page you're looking for doesn't exist.
       [ Back to dashboard ]  [ Go home ]
```
- Centered; "404" in `display`; playful-but-professional line; illustration = 2D flat abstract (circle + hand glyph), no motion. Primary + outline actions.

---

## 12. Error Pages & Loading Screens

### 12.1 Error pages (routes + reusabled component `ErrorState`)

Common anatomy: centered card, destructive/gray icon in circle, h2 title, body sm muted, `[Retry]` primary + `[Open settings]` outline (contextual).

| Route | Icon | Title | Body | Actions |
|---|---|---|---|---|
| `/camera-error` | `VideoOff` | Camera unavailable | "We couldn't access your camera. Check permissions or pick another device." | Retry · Open settings |
| `/mic-error` | `MicOff` | Microphone unavailable | "…" | Retry · Open settings |
| `/ai-offline` | `CloudOff` | AI service offline | "Recognition and speech are temporarily unavailable. Your conversation can continue when the service returns." | Reconnect · Back |
| `/network-error` | `WifiOff` | No connection | "Check your network. Offline capture is preserved." | Retry |
| `/permission-denied` | `Lock` | Permission denied | "SignBridge needs camera/mic access. Update in your browser or settings." | Open settings |

### 12.2 Loading screens

- **App boot:** full-screen logo mark with soft pulse (motion-gated), then `AppShell` skeleton.
- **Dashboard:** 3 × skeleton cards row + 2 skeleton panels.
- **Live mode boot:** status panel shows sequential `checking → ready` rows (StatusWidget skeleton), camera skeleton, sentence skeleton.
- **Model load:** `Progress` bar (indeterminate) with mono `"Loading MediaPipe model…"` + `Loader2`.
- All skeletons: `skeleton` component, radius matching real element, `animate-pulse`.

---

## 13. Component-to-Page Map (single source)

| Page | Composes (from docs/03) |
|---|---|
| Landing | Navbar, Badge, Button, Card, Card-highlight, MetricCard, Footer |
| Auth ×3 | AuthLayout, Card, Input, Button, Checkbox, Alert, Progress (pw) |
| Dashboard | AppShell, MetricCard, StatusWidget, Progress, ModeCard(compact), HistoryItem, Alert |
| Mode | ModeCard, Badge, Button, KbdHints |
| Hearing | AppShell, CameraPreview, SentenceCard, ConversationPanel, PredictionTimeline, StatusWidget, SessionControls, Progress, Alert |
| Deaf | AppShell, SubtitleArea, ConversationPanel, AvatarPlaceholder, StatusPill, SessionControls |
| History | AppShell, Table, Input, Select, DropdownMenu, ConfirmDialog, Dialog, EmptyState, Checkbox |
| Settings | AppShell, Tabs, Input, Select, Slider, Switch, RadioGroup, Alert |
| About | Navbar, Card, Badge |
| 404 | LogoMark, Button |
| Errors | ErrorState |
