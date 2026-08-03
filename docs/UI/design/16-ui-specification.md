# 16 · Complete UI Specification

This is the authoritative, implementation-ready spec. It defines every screen, component contract, and interaction with enough detail that a frontend engineer can build the app without making major design decisions. Cross-references: tokens ([11](11-theme-tokens.md)), components ([06](06-component-library.md)), motion ([15](15-motion-effects.md)), icons ([14](14-lucide-icons.md)).

---

## 16.1 Global Behavior

### 16.1.1 Layout constants
```
Topbar height      : 64px (desktop) / 56px (mobile)
Sidebar           : 240px expanded · 68px collapsed (≤1280px)
Bottom tab bar     : 64px (≤768px)
Content max width  : 1280px, centered, padding 24px (desktop) / 16px (mobile)
Interactive min    : 48×48px
```
### 16.1.2 App shell
- `SkipLink` ("Skip to content") is the first tab stop, visible on focus, target `#main-content`.
- All pages render inside `<main id="main-content" tabindex="-1">`.
- Offline banner (full-width, `role="alert"`) slides in below topbar when `navigator.onLine === false`; local session buffering continues; banner clears on reconnect.
- `Ctrl/⌘ + K` opens the command palette placeholder.
- `?` opens the shortcuts overlay.

### 16.1.3 Theme
- `data-theme` on `<html>`: `light | dark | high-contrast`; `prefers-color-scheme` honored for "system".
- Toggle available in Topbar user menu and Settings → Appearance. Persisted in localStorage (`signbridge.theme`).
- High-contrast forces white-on-black regardless of light/dark and strengthens borders (see 11.3).

### 16.1.4 Focus management
- `:focus-visible` ring: 2px `hsl(var(--ring))`, offset 2px.
- Dialog/Sheet: focus trapped, `Esc` closes, focus returns to trigger.
- Route change scrolls to top unless a `state.scrollPosition` is provided.

### 16.1.5 Toasts
- Sonner, bottom-right (bottom-center on mobile), `w-80`, 4 s auto-dismiss; errors persist until dismissed.
- Live region `aria-live="polite"`; destructive toasts `assertive`.

---

## 16.2 Screen Specifications

### 16.2.1 Landing (`/`)
Header sticky 64px glass. Sections, in order:
1. **Hero** — H1 (`display`, max 2 lines), subcopy (`body-lg muted`), CTAs (`[Start free]` primary-xl, `[Watch demo]` secondary with Play icon), trust row (★ 4.9 · 12,000+ sessions · "40+ languages (soon)").
2. **Mode cards** — Hearing Mode / Deaf Mode preview cards (see 16.2.4) with descriptive copy.
3. **Features** — 3 cards: `Video` Live sign recognition · `Sparkles` Natural sentence AI · `AudioLines` Speak out loud.
4. **How it works** — 4-step stepper: Camera → MediaPipe → LLM → Voice.
5. **AI workflow band** — 6 node pills with arrows (Camera, MediaPipe, Recognition, LLM, Sentence, TTS), gradient band `from-primary/5 to-accent-live/5`.
6. **About teaser** — 2-line narrative + "Learn more" link → `/about`.
7. **CTA band** — "Start your first conversation" + `[Get started]`.
8. **Footer** — brand, 4 link columns, bottom legal row.
Anchor nav scrolls to sections (`#features`, `#how-it-works`, `#ai-workflow`, `#about`).

### 16.2.2 Auth (`/login`, `/register`, `/forgot-password`, `/reset-password`)
- Desktop (≥1024px): left brand panel (48%), right form `max-w-sm`.
- Forms validated with react-hook-form + zod. Error = red border + `FormMessage`.
- Login: Email, Password (eye toggle), Remember me, "Forgot password?", submit `[Sign in]`, social buttons (Google/Apple — placeholder), link to Register.
- Register: Name, Email, Password (strength meter), "Which mode are you most interested in?" (Hearing/Deaf/Not sure — segmented), submit `[Create account]`.
- Forgot: Email → submit → success screen "Check your inbox" (placeholder for real email flow).
- Reset: New password + confirm → success → redirect `/login`.
- OAuth placeholders show toast "Social sign-in is coming soon."

### 16.2.3 Dashboard (`/app`)
- **Greeting**: "Good morning/afternoon/evening, {name}" + subline `{n} conversations this week · All systems operational` (or degraded copy when any pipeline stage is non-green).
- **Stat cards** (4): Live FPS, Latency, Avg confidence, Conversation count.
  - Values: `tabular text-3xl font-semibold`; delta chip (▲/▼ with value, green/red); 24-sample sparkline (cyan) — for FPS/Latency/Confidence only.
  - Loading: 4 `Skeleton` cards.
- **Quick actions** (card): `[Start signing]` primary-xl with `Video`, `[Start listening]` secondary-xl with `Mic`, `[Avatar — coming soon]` disabled ghost with `Lock`. Each navigates to `/app/hearing`, `/app/deaf`, `/app/avatar`.
- **AI status** (card): 6 `StatusChip`s (MediaPipe, Camera, LLM, Speech, GPU, Backend), dot color per pipeline state, tooltip = detail, footer link "View pipeline" → `/app/hearing` status drawer. Empty/loading: skeleton chips.
- **Recent conversations**: table (Title, Mode badge, Date, Duration, Turns, Actions). Rows clickable → detail. Empty → `EmptyState` with `[Start signing]`. Loading → 5 skeleton rows.

### 16.2.4 Mode selection (`/app/mode`)
- H1 + subcopy. 3 `ModeCard`s (`grid-cols-1 md:grid-cols-3`, min-height 320px):
  - **Hearing**: `Video` icon (48px), title, "Sign → Speech", bullets: Live recognition · Natural sentences · Voice output. Button `[Start signing]` primary.
  - **Deaf**: `Mic` icon, "Speech → Text", bullets: Live subtitles · High contrast · Avatar soon. Button `[Start listening]` primary.
  - **Avatar**: `ScanFace` icon, "Coming soon", bullets: 3D interpreter · 40+ languages (planned). Button `[Notify me]` disabled + `Lock`.
- On mode click → device permission prompt → navigate to session (see 16.2.5/16.2.6). On denied → error page for that device.

### 16.2.5 Hearing mode (`/app/hearing`) — live
Session topbar (no sidebar): `[← Back]`, `Session #{id}`, pipeline chips, `[End session]` destructive-outline with `Square`.

Preview column (`lg:col-span-3`):
- `CameraPreview`: `<video>` 16:9 autoPlay playsInline; media skeleton; landmark canvas overlay; top-left chip `Session {id} · {elapsed}`; bottom-left `FPS {n}` mono chip, bottom-right `{latency}ms` chip, both with live dot; while recording add red `● REC`.
- Controls under preview: `[Mute]` ghost (`VolumeX`), `[Switch camera]` ghost (`RefreshCw`), mic meter bar (if ambient mic enabled).

Output column (`lg:col-span-2`, card stack):
1. **Detected word** — `text-4xl font-semibold tracking-tight` uppercase gloss; below `ConfidenceBar` (fill: success ≥80, warning 60–79, destructive <60) + `▣ {p}%` chip. Idle shows "Awaiting sign…" muted.
2. **Generated sentence** — card, `text-xl`, cyan left border; states:
   - `idle`: muted placeholder "Your sentence will appear here."
   - `composing`: shimmer + animated "…" (max 2 s).
   - `ready`: finalized text (auto-finalize after 800 ms no-sign pause).
3. **Actions** — `[▶ Play]` primary (label swaps to `[⏸ Pause]` with equalizer bars while speaking), `[Copy]` secondary (→ `Check` + toast), `[Auto-speak]` switch (default on from settings), `[Repeat]` ghost icon.
4. **Prediction timeline** — horizontal token chips; chip width ∝ confidence; amber if <60; empty → "Sign to see predictions".
5. **Conversation history** — scrollable (max-h 240px); turns as bubbles: self = right `bg-primary text-primary-foreground`, other = left `bg-muted`; timestamp `caption muted`; auto-scrolls to newest when at bottom (sticky-bottom only).

Live regions: detected word in `aria-live="polite"`; sentence ready announces "Sentence ready".

Behavior:
- Space = play/pause last sentence. `S` = start/stop session. `C` = copy last sentence.
- Unload guard: `beforeunload` warn when session active.

### 16.2.6 Deaf mode (`/app/deaf`) — live
Session topbar identical to hearing.

Subtitle area (dominant, full-width card, `min-h-240px md:min-h-320px`):
- Text `text-subtitle font-semibold leading-tight` (clamp 28→44px); streaming words appended; active word highlighted `bg-primary/15 rounded-md`.
- Font/size/contrast/bg-opacity from accessibility settings.
- `aria-live="polite"` container receiving finalized turns.

Listening bar:
- States: `listening` (green pulsing dot + "Listening" + `Waveform`), `processing` (amber + "Processing"), `error` (red + "Microphone unavailable" + `[Retry]`), `denied` (red + "Permission denied" + `[Open settings]`).
- Mic device chip with `Select`.

Below subtitle (`grid-cols-1 lg:grid-cols-[1fr_240px]`):
- **Conversation panel** (`max-h-64 overflow-y-auto`): turns — Them `bg-muted`, You `bg-primary`; time `caption muted`.
- **Avatar panel**: `AvatarPlaceholder` (`aspect-[3/4]`) silhouette + "3D Avatar — coming soon" + `[Notify me]`.

Action bar: `[Repeat last]` secondary, `[Copy subtitle]` secondary, `[Type reply]` secondary (opens inline input → Send appends "You" bubble).

Behavior: Space toggles mic; `C` copies current subtitle; new-finalized subtitle shows subtle 120 ms flash only in high-focus setting.

### 16.2.7 Conversations (`/app/conversations`)
- Toolbar: search `Input` (debounced 300 ms, placeholder "Search conversations…"), mode `Select` (All/Hearing/Deaf), date `Select` (Any/Last 7d/30d/This year), `[Export all]` ghost, `[New]` primary.
- Data table (≥768px) or card list (<768px). Columns: Title (mono date), Mode badge, Date, Duration, Turns, Actions (⋯ : Replay / Export / Rename / Delete).
- Detail (`/app/conversations/:id`): header (title + meta + actions: `[Replay]` primary, Export menu, `[Delete]` destructive); timeline of turns (role badge, text, time, confidence tooltip, copy button).
- Export: JSON (raw), TXT (plain transcript), CSV (turn rows); success toast with filename.
- Delete: `AlertDialog` requiring typed word `delete` → `[Permanently delete]` destructive; success toast; list updates. Undo toast for 8 s where implemented.
- Empty: `EmptyState` — "No conversations yet" + `[Start signing]`. No results: "No results for ‘{q}’" + `[Clear filters]`.

### 16.2.8 Settings (`/app/settings`)
Tabs shell (`Tabs` pill): Appearance, Audio, Devices, Language, Accessibility, Notifications, Developer.
- **Appearance**: theme radio cards (Light/Dark/System thumbnails), text size `Stepper` [− A A A +] with live preview, high-contrast `Switch`.
- **Audio & speech**: voice `Select` + `[Test]` (plays sample), speed `Slider` 0.5×–1.5× step 0.1 with value, auto-speak `Switch`, "keep screen awake" `Switch`.
- **Devices**: camera `Select` + `[Test]` (2 s preview), mic `Select` + `[Test]` (live meter), speaker `Select` + `[Test]` (tone). Each shows StatusChip.
- **Language**: UI `Select`, recognition `Select` (future), translation target `Select`.
- **Accessibility**: reduce-motion `Switch`, high-contrast `Switch`, subtitle size `Stepper` (A–4A), subtitle font `Select` (Inter/Mono), subtitle bg-opacity `Slider` (0–90%), keyboard shortcuts table + `[Open shortcuts]` button.
- **Notifications**: toggles (session ended, AI offline, weekly summary, product updates).
- **Developer**: API base URL `Input`, model `Select`, dataset `Select`, log level `Select`, `[Export all data]` ghost, `[Delete account]` destructive (guarded by AlertDialog), environment badge.
- Autosave: debounced 600 ms, transient "Saved" indicator in header; `[Reset to defaults]` ghost bottom.

### 16.2.9 About (`/app/about`)
Cards: Project (mission + timeline), Architecture (pipeline diagram), AI models (table: MediaPipe Hands 0.4, Gloss model v2, LLM Llama-3.1-8B, TTS, STT — with versions), Dataset (12k samples, 500 glosses, licenses), Team (avatar grid), License & Version (MIT · v0.1.0-beta). Public `/about` = same content + landing header/footer.

### 16.2.10 Coming-soon placeholders
`FeatureCard`: icon, title, copy, `[Notify me]` (disabled → toast "You'll be notified."), badge `Soon`. Routes: avatar, assistant, analytics, sync.

### 16.2.11 404
Centered illustration (MessageSquareOff large, `text-primary/50`), `404` (`text-7xl`), copy, `[Back home]` primary, `[Start a conversation]` secondary.

### 16.2.12 Loading
- Route lazy: top loader + full-page skeleton per layout.
- Mode entry: `PipelineLoading` checklist (MediaPipe → Recognition → LLM → Speech/STT); each row: pending → spinner → check; failure converts the row to error + `[Retry]`.
- Buttons: 16px spinner, label dimmed; disabled while loading.

### 16.2.13 Error pages
`ErrorState` (icon 48px, title, message, action):
- Camera denied / not found / Mic denied / not found / AI offline / Network / 500 — as specified in [05-high-fidelity-ui.md §5.14](05-high-fidelity-ui.md).
- Each includes `role="alert"` and a single primary recovery action + secondary "Contact support".

---

## 16.3 Component Contracts (props)

```tsx
// Status / telemetry
type PipelineStatus = "green" | "yellow" | "red" | "muted";
interface StatusChipProps { label: string; status: PipelineStatus; detail?: string; pulse?: boolean; }
interface StatusWidgetProps { stages: { key: PipelineStage; status: PipelineStatus }[]; }
interface MetricChipProps { label: string; value: string | number; unit?: string; live?: boolean; }
interface ConfidenceBarProps { value: number; }            // 0–100, threshold colors
interface SparklineProps { data: number[]; className?: string; } // 24 samples, cyan stroke
interface WaveformProps { active: boolean; }               // animated when active

// Media
interface CameraPreviewProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  fps?: number; latency?: number; recording?: boolean;
  muted?: boolean; onToggleMute?: () => void; onSwitchCamera?: () => void;
}
interface PlaySpeechButtonProps { speaking: boolean; onToggle: () => void; size?: "default"|"lg"|"xl"; }

// Conversation
interface Turn { id: string; role: "self" | "other"; text: string; confidence?: number; at: number; }
interface SubtitleDisplayProps { turns: string[]; activeWord?: string; ariaLive?: "off" | "polite"; }
interface PredictionTimelineProps { tokens: { gloss: string; confidence: number }[] | null; }

// Mode card
interface ModeCardProps {
  mode: "hearing" | "deaf" | "avatar";
  onStart?: () => void; disabled?: boolean; badge?: string;
}

// Empty/Error
interface EmptyStateProps { icon: LucideIcon; title: string; description?: string; action?: ReactNode; }
interface ErrorStateProps { icon: LucideIcon; title: string; message: string; action?: ReactNode; retry?: () => void; }

// Pipeline
interface PipelineLoadingProps { stages: { label: string; key: PipelineStage }[]; statuses: Record<PipelineStage, "loading"|"done"|"error">; onRetry?: () => void; }
```

### Data contracts
```ts
interface Conversation { id: string; title: string; mode: "hearing" | "deaf"; createdAt: number; durationSec: number; turns: Turn[]; }
interface ConversationFilters { q?: string; mode?: "hearing" | "deaf" | "all"; range?: "any"|"7d"|"30d"|"year"; }
interface PipelineStageStatus { stage: PipelineStage; status: PipelineStatus; detail?: string; latencyMs?: number; }
```

---

## 16.4 State Management

| Store (Zustand) | State | Writes |
|------------------|-------|--------|
| `usePipelineStore` | `stages: Record<PipelineStage, PipelineStageStatus>`, `fps`, `latencyMs`, `recognition` | SDK callbacks |
| `useConversationStore` | `active: { id, turns }`, `history: Conversation[]`, `filters` | session events, API |
| `useSettingsStore` | theme, textSize, speed, voice, toggles | settings UI |
| `useSessionStore` | `activeSession`, `mode`, `recording`, `elapsed` | session lifecycle |
| `useToastStore` | sonner instance | everywhere |

---

## 16.5 Implementation Order

1. **Foundation**: tokens, Tailwind config, globals, shadcn init, fonts, dark mode.
2. **Shell**: AppShell, Topbar, Sidebar, BottomTabBar, SkipLink, offline banner.
3. **Shared composites**: Button/Input/Select/Switch/Dialog/Badge/Skeleton/EmptyState/ErrorState/StatusWidget/StatCard/MetricChip.
4. **Landing + Auth + 404**.
5. **Dashboard + Mode selection**.
6. **Hearing mode** (CameraPreview, DetectedWord, GeneratedSentence, PlaySpeechButton, PredictionTimeline, ConversationHistory).
7. **Deaf mode** (SubtitleDisplay, Waveform, ListeningBar, AvatarPlaceholder, ConversationPanel).
8. **History** (table/list, detail, export, delete).
9. **Settings** (7 tabs, autosave).
10. **About + Coming-soon + Loading + Error pages**.
11. **Polish**: motion, shortcuts, i18n, a11y audit, performance pass.

## 16.6 Acceptance Criteria (definition of done per screen)

- All interactive elements ≥ 48px, visible focus ring, keyboard operable.
- Status widgets reflect pipeline store truthfully; no fake green.
- Empty/loading/error states exist for every data region.
- WCAG AA contrast verified in light, dark, and high-contrast themes.
- Reduced-motion respected; no infinite decorative loops.
- Strings in i18n catalog; no hardcoded copy in components.
- Responsive at all six breakpoints; no horizontal scroll on ≤ 480px.
