# 4 · Wireframes

ASCII wireframes for every screen. Box widths map to the desktop 1280 px grid.

Legend: `[ button ]` `_input_` `▼ dropdown` `(icon)` `◻ toggle` `◦ bullet`

---

## 4.1 Landing (single page scroll)

```
┌──────────────────────────────────────────────────────────────────────────┐
│ LOGO  SignBridge     Features   How it works   About   [Sign in] [Start]│ ← sticky bar
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│   Real-time communication                                          HERO │
│   between Deaf and Hearing                                             │
│   people.                                                               │
│   _one line subcopy_                                                    │
│   [Start free]   [Watch demo]                                           │
│   ● ● ● (trust: 4.9★ · 12k sessions · 40+ languages planned)           │
│                                                                          │
│   ┌─────────────┐        ┌─────────────┐                               │
│   │ Hearing Mode│        │  Deaf Mode  │   (two illustrative cards)     │
│   └─────────────┘        └─────────────┘                               │
├──────────────────────────────────────────────────────────────────────────┤
│ FEATURES  (3-col grid)   FEATURES                                       │
│   (icon) (icon) (icon)                                                  │
│   Cards: Live sign recognition · Natural sentence AI · Speak out loud   │
├──────────────────────────────────────────────────────────────────────────┤
│ HOW IT WORKS  4-step horizontal                                       │
│   1 Camera → 2 MediaPipe → 3 LLM → 4 Voice                            │
├──────────────────────────────────────────────────────────────────────────┤
│ AI WORKFLOW  (diagram band)                                            │
│   [Camera]→[MediaPipe]→[Recognition]→[LLM]→[Sentence]→[TTS]            │
├──────────────────────────────────────────────────────────────────────────┤
│ ABOUT   (short narrative + link)                                       │
├──────────────────────────────────────────────────────────────────────────┤
│ CTA  "Start your first conversation"   [Get started]                   │
├──────────────────────────────────────────────────────────────────────────┤
│ FOOTER  Product · Company · Resources · Legal                           │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## 4.2 Login

```
┌─────────────────────────────────────────────────────┐
│  Logo                                             │ │
│                                                   │ │
│  Welcome back                                     │ │
│  Sign in to your workspace                        │ │
│                                                   │ │
│  Email                                            │ │
│  _you@example.com_                                │ │
│  Password                                         │ │
│  _············_        (eye)                      │ │
│  ◻ Remember me        Forgot password?           │ │
│  [  Sign in          ]                           │ │
│  ──── or ────                                    │ │
│  [Google]  [Apple]   (placeholder)               │ │
│                                                   │ │
│  New to SignBridge?  Create account               │ │
└─────────────────────────────────────────────────────┘
  (left: brand panel w/ quote, hidden ≤ 1024px)
```

---

## 4.3 Dashboard (`/app`)

```
┌────────┬───────────────────────────────────────────────────────────────┐
│(logo)  │ Search…                                          (settings)  │ ← topbar
│◉ Home  │                                                              │
│◉ Mode  │  Good morning, Alex                        [New conversation]│
│◉ Hist  │  ▸ 4 conversations this week · AI healthy                     │
│◉ Setts │                                                                 │
│◉ About │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐                         │
│        │  │ 48   │ │ 240ms│ │ 96%  │ │ 3    │   stat cards            │
│        │  │ FPS  │ │ Lat  │ │ Conf │ │ Conv │                         │
│        │  └──────┘ └──────┘ └──────┘ └──────┘                         │
│        │                                                              │
│        │  ┌────────────────────────┐  ┌────────────────────────┐      │
│        │  │ Quick actions          │  │ AI status              │      │
│        │  │ [Start signing]        │  │ ● MediaPipe   ● LLM    │      │
│        │  │ [Start listening]      │  │ ● Camera     ● Speech  │      │
│        │  │ [Avatar – soon]        │  │ ● GPU        ● Backend │      │
│        │  └────────────────────────┘  └────────────────────────┘      │
│        │                                                              │
│        │  RECENT CONVERSATIONS (table)                                │
│        │  Title        Mode     Date      Duration   Action           │
│        │  Clinic visit Hearing  Jul 2    12:04      (play) (more)     │
│        │  …                                                           │
└────────┴───────────────────────────────────────────────────────────────┘
```

---

## 4.4 Mode Selection (`/app/mode`)

```
┌────────────────────────────────────────────────────────────────────┐
│  Choose how you'll communicate                                     │
│                                                                     │
│  ┌───────────────────┐  ┌───────────────────┐  ┌──────────────────┐ │
│  │ (camera icon)     │  │ (mic icon)        │  │ (avatar icon)    │ │
│  │ HEARING MODE      │  │ DEAF MODE         │  │ AVATAR (soon)    │ │
│  │ Sign → Speech     │  │ Speech → Text     │  │ 3D interpreter   │ │
│  │ [Start]           │  │ [Start]           │  │ [Notify me]      │ │
│  └───────────────────┘  └───────────────────┘  └──────────────────┘ │
└────────────────────────────────────────────────────────────────────┘
```

---

## 4.5 Hearing Mode (live)

```
┌─────────────────────────────────────────────────────────────────────────┐
│ ◀ Back   Session #4821        ● ● ● pipeline   [End session] (record) │
├────────────────────────────────┬────────────────────────────────────────┤
│ ┌────────────────────────────┐ │  LIVE OUTPUT                           │
│ │                            │ │  Detected word:  HELLO   ▣ 94%        │
│ │       CAMERA PREVIEW       │ │  (MediaPipe skeleton overlay)          │
│ │     (16:9, rounded)        │ │  ┌──────────────────────────────┐      │
│ │   🎥 FPS 48 · 240ms        │ │  │ Generated sentence          │      │
│ │                            │ │  │  "Hello! How are you today?"│      │
│ │      [Mute]  [Switch cam]  │ │  └──────────────────────────────┘      │
│ └────────────────────────────┘ │  [▶ Play] [Copy] [Auto-speak ◻]      │
│                                │                                        │
│                                │  PREDICTION TIMELINE                   │
│                                │  HELLO ▓▓▓  YOU ▓▓  TODAY ▓            │
│                                │                                        │
│                                │  CONVERSATION HISTORY                   │
│                                │  ➤ You: Hello! How are you today?      │
│                                │  ➤ Them: I'm good, thanks!             │
└────────────────────────────────┴────────────────────────────────────────┘
```

---

## 4.6 Deaf Mode (live)

```
┌─────────────────────────────────────────────────────────────────────────┐
│ ◀ Back   Session #4823        ● ● ● pipeline   [End session] (record) │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │                                                                │   │
│   │   LIVE SUBTITLE — large, high-contrast                        │   │
│   │   "Hello! My name is Sarah and I'm here to"                    │   │
│   │   _the meeting…_ (live streaming line)                         │   │
│   │                                                                │   │
│   └────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│   ● Listening   (waveform animating)   🎙 Mic: external (USB)          │
│                                                                          │
│   ┌───────────────┐  ┌────────────────────────────────────────────┐    │
│   │  AVATAR (soon)│  │  CONVERSATION PANEL                        │    │
│   │  placeholder  │  │  ➤ Them: "Good morning!"                   │    │
│   │               │  │  ➤ You: (typed reply)                     │    │
│   └───────────────┘  └────────────────────────────────────────────┘    │
│   [🔁 Repeat last]  [Copy]  [Type reply]                               │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 4.7 Conversation History

```
┌──────────────────────────────────────────────────────────────┐
│ Conversations                     [Export all] [New]          │
│ _Search…_   Mode: ▼All   Date: ▼All                          │
│ ┌──────────────────────────────────────────────────────────┐ │
│ │ Date  | Mode | Title      | Duration | Turns | Actions   │ │
│ │ Jul 2 | Hear | Clinic     | 12:04    | 34    | ▶ ⤓ ⋯  │ │
│ │ Jul 1 | Deaf | Meeting    | 08:31    | 22    | ▶ ⤓ ⋯  │ │
│ │ …                                                       │ │
│ └──────────────────────────────────────────────────────────┘ │
│  Detail view: timeline of turns (role · text · time · conf)  │
│  [▶ Replay] [⤓ Export JSON] [🖫 Copy] [🗑 Delete]            │
└──────────────────────────────────────────────────────────────┘
```

---

## 4.8 Settings (tabs)

```
┌──────────────────────────────────────────────────────────────┐
│ Settings                                                     │
│ [Appearance][Audio][Devices][Language][Accessibility][Dev]   │ ← tabs
│                                                              │
│ APPEARANCE                                                   │
│   Theme         (●) Light   ( ) Dark   ( ) System            │
│   Text size     [  −  ]  A   A   A  [  +  ]    "Preview…"    │
│   High contrast [ ◻ ]                                        │
│                                                              │
│ DEVICES                                                      │
│   Camera      ▼ Built-in webcam      [Test]   status ●       │
│   Microphone  ▼ USB Microphone       [Test]   status ●       │
│   Speaker     ▼ Default              [Test]                  │
│                                                              │
│ [Save changes]            [Reset to defaults]                │
└──────────────────────────────────────────────────────────────┘
```

---

## 4.9 Error — Camera Denied

```
┌───────────────────────────────────────────────┐
│            (camera-off icon)                   │
│   Camera access is blocked                     │
│   We need your camera to recognize signs.      │
│   [Re-check permission]   [Open browser settings] │
│   Tips: allow camera in your browser address bar│
└───────────────────────────────────────────────┘
```

## 4.10 404

```
┌───────────────────────────────────────────────┐
│  (illustration: floating speech bubble)        │
│  4 0 4                                         │
│  This page doesn't speak sign language.        │
│  [Back home]  [Start a conversation]           │
└───────────────────────────────────────────────┘
```

---

## 4.11 Loading / Empty States

```
Skeleton (dashboard):  ▤▤▤ stat cards · ▤▤▤ table rows with shimmer
Empty conversations:   (icon)  No conversations yet
                       "Start your first signing session."
                       [Start signing]
Empty history search:  "No results for ‘x’"  [Clear filters]
```

---

## 4.12 Mobile (≤ 768 px) — key adaptations

```
Dashboard (mobile)
┌──────────────────────┐
│ ☰ Logo      (bell)   │
│ Good morning, Alex   │
│ [＋ New conversation]│
│ ▤▤ stat cards (2×2)  │
│ ▤▤ recent conv list  │
├──────────────────────┤
│ (Home)(Mode)(Hist)(Me)│ ← bottom tab bar
└──────────────────────┘

Hearing Mode (mobile)
┌──────────────────────┐
│ Camera preview 16:9  │
│ ┌──────────────────┐ │
│ │ "Hello! How are…"│ │
│ └──────────────────┘ │
│ [▶] [Copy]           │
│ Timeline + history   │
│ (stacked below)      │
└──────────────────────┘
```
