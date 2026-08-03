# 2 · User Flows

## 2.1 Flow Conventions

- 🔷 = decision
- 🟩 = screen
- ⬜ = action / system event
- 📣 = announcement (screen reader / toast)

## 2.2 Primary Flow — Hearing Person (Sign → Speech)

```
Landing → "Get started"
  🔷 Already signed in?
  ├── No → Auth (Register / Login)
  │        ⬜ create session
  └── Yes ──► 🟩 Dashboard
                  │
                  ▼
             🟩 Mode Selection
                  │  (select "Hearing Mode")
                  ▼
             ⬜ Request camera permission
             🔷 Granted?
             ├── No → 🟩 Camera error card (permission denied)
             │         ⬜ Retry / Open system settings / Try another camera
             └── Yes ─► 🟩 Hearing Mode (live)
                          │
                          ├── ⬜ Start session
                          ├── ⬜ MediaPipe loads → status "Running" (green)
                          ├── ⬜ LLM connects → status "Connected" (green)
                          ├── ◉ User signs
                          │     └─► Live: gloss + confidence chip + draft sentence
                          ├── ⬜ Sentence finalized (auto after pause 800ms)
                          │     └─► 📣 "Sentence ready"
                          │     └─► ⬜ Auto-speak (setting) → TTS plays
                          ├── ⬜ Manual: Play speech button → TTS
                          ├── ⬜ Copy text button → clipboard
                          ├── ◉ End session
                          │     └─► Conversation saved to history
                          └── 🟩 Dashboard (recent conversation updated)
```

**Friction points designed away:**
- Start session and camera permission are combined into a single "Start signing" button.
- Recognition begins automatically once MediaPipe is ready; no "press to detect" steps.
- Sentence is finalized automatically on a 800 ms pause in signing; manual "Confirm" is an accessibility option.

## 2.3 Primary Flow — Deaf Person (Speech → Text)

```
Landing → Dashboard → Mode Selection → "Deaf Mode"
  │
  ├── ⬜ Request mic permission
  ├── 🔷 Granted?
  │   ├── No → 🟩 Mic error card (denied / not found) → Retry / Settings
  │   └── Yes ─► 🟩 Deaf Mode (live)
  │               ├── ⬜ STT listening (status green, pulsing waveform)
  │               ├── ◉ Hearing person speaks
  │               │     └─► Live subtitles (large type, high contrast)
  │               ├── ⬜ LLM cleans → subtitle finalized
  │               ├── ⬜ (Future) Avatar animates per subtitle
  │               ├── ⬜ Copy / Repeat-last / Flag buttons
  │               ├── ◉ End session
  │               └── Saved to history
```

## 2.4 Onboarding (First Run)

```
First login
  🟩 Welcome screen (2 slides: Hearing mode / Deaf mode)
  🟩 Accessibility prompt:
      "What do you need?"  → Larger text · High contrast · Slow speech
  🟩 Device check card: camera + mic + speakers, each with status
  🟩 Dashboard (empty state with "Start first conversation")
```

## 2.5 Conversation History Flow

```
Sidebar → Conversations
  ├── ⬜ Search by text / filter by mode / filter by date
  ├── 🟩 Table/list of conversations
  ├── ⬜ Click → 🟩 Conversation detail (transcript timeline)
  │         ├── ⬜ Replay (restart session with prior text)
  │         ├── ⬜ Export (JSON / TXT / CSV)
  │         └── ⬜ Delete (confirm dialog)
  └── ⬜ Export all (Settings → Data)
```

## 2.6 Settings Flow

```
Sidebar → Settings (tabbed)
  ├── Appearance  → theme (light/dark/system) · text size (4 levels) · contrast
  ├── Audio & Speech → voice · speech speed (0.5–1.5×) · auto-speak toggle
  ├── Devices → camera select · mic select · test buttons
  ├── Language → UI language · translation target
  ├── Accessibility → reduce motion · high contrast · subtitles styling · keyboard hints
  ├── Notifications → toggles
  └── Developer → API endpoint · model selection · dataset · logs · export data
```

## 2.7 Error Recovery Flows

```
AI goes offline mid-session
  ├── Status widget turns red + banner: "AI service unavailable"
  ├── Session stays on screen; last sentence preserved
  └── ⬜ Retry → reconnects → banner clears

Camera disconnects mid-session
  ├── Status red, preview shows static frame
  └── ⬜ Reconnect camera / Switch camera

Network lost
  ├── Global offline banner (top, full width)
  └── Local transcript continues buffering; sync on reconnect
```

## 2.8 Keyboard Shortcuts (App-wide)

| Shortcut | Action |
|----------|--------|
| `Space` | Play/pause speech (Hearing), start/stop mic (Deaf) |
| `S` | Start/stop session |
| `C` | Copy last sentence |
| `Ctrl/⌘ + K` | Open command palette (future) |
| `1` / `2` | Switch Hearing / Deaf mode |
| `H` | Toggle conversation history |
| `?` | Show shortcut overlay |
| `Esc` | Close dialog / stop speech |

All shortcuts are visible in a `?` overlay and on the Settings → Accessibility page. Screen-reader users get the same actions via buttons.

## 2.9 Auth Flow (with placeholders)

```
Login    → email + password → dashboard
Register → name + email + password + mode-preference → welcome
Forgot   → email → "Check your inbox" state → reset link (placeholder)
Reset    → new password → login (placeholder)
```
