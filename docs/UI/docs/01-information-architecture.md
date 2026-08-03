# 01 · Information Architecture

Defines what the product is made of, how it is organized, and how users move through it.

---

## 1. Product Scope

SignBridge has exactly **two core workflows** plus a set of supporting surfaces.

### 1.1 Hearing Mode (Hearing user ← signs with Deaf user)

A Hearing person opens Hearing Mode so a Deaf person can sign to them.

```
Camera        → MediaPipe (hands/pose)   → Model recognizes gloss words
Glosses       → LLM assembles natural sentence
Sentence      → TTS plays audible speech
Sentence      → Appended to conversation history
```

**Hearing user sees:** camera preview, detected gloss word, confidence score,
generated sentence, Play/Copy actions, prediction timeline, history, and live
system status (FPS, latency, camera, MediaPipe, LLM, TTS).

### 1.2 Deaf Mode (Deaf user ← hears Hearing person)

A Deaf person opens Deaf Mode so a Hearing person can speak to them.

```
Microphone    → Web Speech API / STT model
Transcript    → LLM cleans + punctuates
Subtitle      → rendered large, high-contrast, live
Subtitle      → appended to conversation history
Avatar        → (future) animated sign language avatar renders the sentence
```

**Deaf user sees:** a very large subtitle area, mic/STT status, conversation
panel, and an avatar placeholder.

### 1.3 Support surfaces

Dashboard, mode selection, history, settings, about, auth, and error/loading
states. These make the product feel complete and operational.

---

## 2. Site Map

```
SignBridge
├── Marketing
│   ├── /                       Landing (hero, features, how it works, AI workflow, about, CTA, footer)
│   └── /about                  About (project, architecture, AI models, dataset, team, license, version)
├── Auth
│   ├── /login
│   ├── /register
│   └── /forgot-password
├── App (authenticated shell: sidebar + topbar)
│   ├── /app                    Dashboard
│   ├── /app/mode               Choose Communication Mode
│   ├── /app/hearing            Hearing Mode (live session)
│   ├── /app/deaf               Deaf Mode (live session)
│   ├── /app/history            Conversation History
│   └── /app/settings           Settings
└── System
    ├── /404                    Not found
    ├── /camera-error           Camera permission/device errors
    ├── /mic-error              Microphone permission/device errors
    ├── /ai-offline             AI backend unavailable
    ├── /network-error          Network unavailable
    └── /permission-denied      Generic permission denial
```

> Error pages are real routes so they can be deep-linked and are testable, and
> are also rendered as in-app overlays where faster than navigation.

---

## 3. User Flows

### Flow A — First run / onboarding (guest → active)

```
Landing → Register → (optional) Quick Setup wizard
   Quick Setup:
     1. Choose primary mode (Hearing / Deaf / Both)   [skip]
     2. Permission request — camera + mic              [deny → error page]
     3. Device check — camera/mic preview + test       [fail → error page]
     4. Done → Dashboard
```
Wizard is skippable; skipped users land on Dashboard with "Set up devices"
banner. Wizard state can be resumed from Settings.

### Flow B — Hearing conversation (core loop)

```
Dashboard "Start signing" → /app/mode → Hearing Mode
→ Camera prompt (if not granted)
→ Model loads (loading skeleton + status panel)
→ User signs:
     gloss detected → confidence badge pulses
     sentence finalized → appears in Sentence card
     → [Play] → TTS streams (Play toggles to Stop)
     → [Copy] → copied toast
→ utterances appended to History panel (left)
→ [End session] → modal summary → Dashboard
```

### Flow C — Deaf conversation (core loop)

```
Dashboard "Start listening" → /app/mode → Deaf Mode
→ Mic prompt (if not granted)
→ STT warms up (status panel)
→ Hearing person speaks:
     interim transcript shown immediately (dimmed)
     final subtitle promoted to large subtitle area
     sentence finalized → appears in conversation panel
     → [Copy] / [Save]
→ [End session] → modal summary → Dashboard
```

### Flow D — Recovery / errors

```
Any live mode:
  camera fails → full-screen camera error state, inline "Retry", link to Settings
  mic fails    → full-screen mic error state, inline "Retry", link to Settings
  AI offline   → session continues in degraded mode? No —
                  frozen sentence card + status panel all red + reconnect banner.
  network lost → banner "Reconnecting…" with retry button
```

### Flow E — History management

```
History → list → search / filter (mode, date, starred)
       → open row → detail view with transcript + actions
       → Export (JSON/CSV/TXT) → toast + download
       → Delete (confirm dialog) → toast + optimistic removal
       → Star/unstar
```

### Flow F — Settings

```
Settings tabs: General · Devices · Voice & Display · Accessibility · Notifications · Developer
  General       → theme (light/dark/system), language, profile
  Devices       → camera picker + live test preview, mic picker + level meter
  Voice & Display → voice, speech speed slider, text size slider, auto-play toggle
  Accessibility → high-contrast toggle, reduce motion toggle, subtitle bg opacity, caption font
  Notifications → toggle per event (session start, low battery, model ready)
  Developer     → API endpoint override, model selector, debug metrics toggle, export telemetry
```

---

## 4. Page Inventory (IA)

| Page | Route | Auth | Purpose | Primary actions |
|---|---|---|---|---|
| Landing | `/` | public | Convert & explain | CTA → Register, scroll anchors |
| About | `/about` | public | Transparency (project/architecture/models/team) | Contact, version info |
| Login | `/login` | public | Authenticate | Submit, link to register/forgot |
| Register | `/register` | public | Create account | Submit |
| Forgot password | `/forgot-password` | public | Recover access | Send reset email |
| Dashboard | `/app` | ✓ | Operate the product | Start mode, quick actions |
| Choose mode | `/app/mode` | ✓ | Enter a session | Open Hearing / Deaf / Avatar |
| Hearing mode | `/app/hearing` | ✓ | Live sign→speech | Play/Copy/Stop/End session |
| Deaf mode | `/app/deaf` | ✓ | Live speech→subtitles | Copy/Stop/End session |
| History | `/app/history` | ✓ | Manage conversations | Search/filter/export/delete |
| Settings | `/app/settings` | ✓ | Configure product | Save changes |
| 404 | `/404` | public | Recovery | Home link |
| Error routes | `/camera-error` etc. | varies | Recovery | Retry, settings |

---

## 5. Navigation Model

- **Marketing:** top nav — Product · How it works · About · Sign in · **Get started**.
- **App shell:** fixed left sidebar (collapsible to icons on tablet, off-canvas drawer on mobile) + slim topbar.
- **Sidebar items:**
  1. Dashboard
  2. New session (→ choose mode)
  3. Hearing Mode
  4. Deaf Mode
  5. History
  6. Settings
  7. (footer of sidebar) System status mini-widget + user menu
- **Keyboard:** `G D` dashboard, `G N` new session, `G H` hearing, `G F` deaf, `G I` history, `G S` settings (vim-style leader keys) — see UX doc §2.

---

## 6. Content Model (key entities)

| Entity | Fields |
|---|---|
| **Session** | id, mode (hearing/deaf), startedAt, endedAt, status, deviceIds, modelId |
| **Utterance** | id, sessionId, direction (in/out), rawGloss / rawTranscript, text, confidence, timestamps |
| **Frame record** | id, sessionId, t, detectedGloss, confidence, fps, latencyMs |
| **User** | id, email, name, avatar, primaryMode, settings, createdAt |
| **Settings** | theme, lang, cameraId, micId, voice, speechSpeed, textSize, a11y flags, notif prefs, dev prefs |

These entities drive the skeleton/empty/loading states and the tables in History.
