# 1 · Complete Information Architecture

## 1.1 Purpose

The IA organizes SignBridge into four public-facing zones plus one future zone. Every page has a single clear purpose; users are never more than two clicks from their primary action.

## 1.2 Content Zones

```
SignBridge
├── PUBLIC (marketing, no auth)
│   ├── Landing
│   ├── About
│   └── Auth (Login / Register / Forgot Password / Reset Password)
│
├── APP (authenticated workspace)
│   ├── Dashboard (home)
│   ├── Mode Selection
│   │   ├── Hearing Mode (live session)
│   │   └── Deaf Mode (live session)
│   ├── Conversations (history)
│   ├── Settings
│   └── About (in-app)
│
├── SYSTEM (infrastructure)
│   ├── 404
│   ├── 500 / Error
│   ├── Offline / Network error
│   ├── Permission screens (camera / mic denied)
│   └── Loading / Onboarding
│
└── FUTURE (placeholders)
    ├── Avatar Studio (3D)
    ├── AI Assistant
    ├── Analytics
    └── Cloud Sync
```

## 1.3 Navigation Model

| Surface | Navigation |
|---------|-----------|
| Landing | Single-page scroll with sticky top bar (Logo · Features · How it works · About · Sign in · Get started) |
| App (desktop) | Fixed 64px left sidebar (icon + label at 1280px+, icon-only below 1280px) |
| App (mobile) | Top bar + bottom tab bar (4 tabs) |
| Live sessions | Distraction-free: persistent top status bar, no sidebar |

## 1.4 Content Types

| Type | Example | Owner |
|------|---------|-------|
| Conversation | A timed, two-way session (sign→text or speech→text) | App |
| Transcript | Ordered list of turns in a conversation | App |
| Turn | One utterance with role (me / them), text, confidence, timing | App |
| Status event | Recognition / TTS / STT / camera state transitions | App |
| Settings | Device, voice, accessibility, theme preferences | App |
| System metric | FPS, latency, GPU, memory | App |

## 1.5 Information Hierarchy within a Turn

```
Turn
├── Role (self / other)
├── Raw input (sign glosses OR phonemes)
├── Generated sentence (LLM)
├── Confidence (0–100)
├── Timestamp
└── Actions (play, copy, flag, delete)
```

## 1.6 Status Model (the AI Pipeline)

Every pipeline stage exposes a status; the UI renders it in a status widget.

```
Stage              Statuses
──────────────────────────────────────────────
Camera             connecting · connected · denied · not-found
MediaPipe          loading · running · error
Recognition        idle · ready · working · error
LLM                connecting · connected · degraded · offline
TTS (Speech)       idle · ready · speaking
STT (Microphone)   idle · listening · error · denied
Backend            connecting · connected · degraded · offline
GPU                ready · software-fallback
```

Status semantics (color):
- **Green** — operational
- **Yellow** — degraded / initializing / fallback
- **Red** — failed / offline
- **Gray** — not required for current mode

## 1.7 Permission & Error Model

Permissions are requested at the moment they are needed (never on signup):

```
Entry to Hearing Mode → request camera → success OR error card
Entry to Deaf Mode    → request mic    → success OR error card
```

Error taxonomy (used by error pages & banners):
`camera-denied`, `camera-not-found`, `mic-denied`, `mic-not-found`, `ai-offline`, `network-error`, `backend-error`, `model-missing`.

## 1.8 Key Objects / Glossary

| Term | Definition |
|------|-----------|
| Sign gloss | Single recognized sign token (e.g., `HELLO`) |
| Sentence | LLM-composed natural-language sentence |
| Confidence | Per-gloss and per-sentence certainty (0–100) |
| Conversation | One full session, saved to history |
| Turn | One directional utterance inside a conversation |
| FPS | Camera / pose-estimation frames per second |
| Latency | End-to-end pipeline delay (ms) |

## 1.9 IA Principles Applied

1. **Progressive disclosure** — advanced settings live under "Developer settings".
2. **Mode-first** — the two modes are first-class, reached from Dashboard or Mode selection.
3. **Recoverability** — every failure state offers a fix or retry path.
4. **No dead ends** — every placeholder ("Coming soon") links to a "Notify me" action.
5. **Consistent verbs** — Start / Stop / Retry / Copy / Play are used consistently across the app.
