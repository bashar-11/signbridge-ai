# 06 · React Architecture

Folder structure, routing, and component hierarchy for implementing SignBridge.
Assumes Next.js 14+ (App Router) with Tailwind + shadcn/ui, portable to Vite.

---

## 1. Setup checklist

```
npx create-next-app@latest signbridge --ts --tailwind --eslint --app
npx shadcn@latest init
npx shadcn@latest add <components from docs/03 §6>
npm i lucide-react framer-motion @tanstack/react-query zustand react-hook-form zod @hookform/resolvers sonner
```

---

## 2. Folder structure

```
signbridge/
├── public/                         # static: logo, og-image, favicon
├── src/
│   ├── app/
│   │   ├── layout.tsx              # root: fonts, ThemeProvider, Toaster, CommandMenu
│   │   ├── page.tsx                # Landing
│   │   ├── (auth)/
│   │   │   ├── layout.tsx          # centered auth shell (split brand panel)
│   │   │   ├── login/page.tsx
│   │   │   ├── register/page.tsx
│   │   │   └── forgot-password/page.tsx
│   │   ├── about/page.tsx
│   │   ├── (app)/                  # authenticated shell
│   │   │   ├── layout.tsx          # AppShell (sidebar + topbar) + guards
│   │   │   ├── page.tsx            # /app Dashboard
│   │   │   ├── mode/page.tsx       # choose mode
│   │   │   ├── hearing/page.tsx
│   │   │   ├── deaf/page.tsx
│   │   │   ├── history/page.tsx
│   │   │   └── settings/page.tsx
│   │   ├── errors/
│   │   │   ├── camera-error/page.tsx
│   │   │   ├── mic-error/page.tsx
│   │   │   ├── ai-offline/page.tsx
│   │   │   ├── network-error/page.tsx
│   │   │   └── permission-denied/page.tsx
│   │   ├── not-found.tsx           # 404
│   │   └── loading.tsx             # app boot skeleton
│   │
│   ├── components/
│   │   ├── ui/                     # shadcn components (generated)
│   │   ├── layout/                 # AppShell, Sidebar, Topbar, NavItems, UserMenu, MobileNav
│   │   ├── landing/                # Navbar, Hero, FeatureCard, Pipelines, FinalCta, Footer
│   │   ├── auth/                   # AuthLayout, AuthForm, PasswordStrength, SocialButtons
│   │   ├── dashboard/              # StatCard, QuickActions, RecentList, SetupBanner
│   │   ├── mode/                   # ModeCard, ModeGrid
│   │   ├── live/                   # CameraPreview, SentenceCard, SubtitleArea,
│   │   │                           #   ConversationPanel, PredictionTimeline, MetricsPanel,
│   │   │                           #   StatusWidget, StatusPill, SessionControls, AvatarPlaceholder
│   │   ├── history/                # HistoryTable, HistoryRow, HistoryDetailDialog, ExportMenu, Filters
│   │   ├── settings/               # SettingsTabs, DeviceTesters, VoiceDisplayPanel, AccessibilityPanel
│   │   ├── common/                 # ErrorState, EmptyState, PageHeader, Kbd, SkeletonComposites,
│   │   │                           #   ConfirmDialog, LiveIndicator, ShortcutsOverlay
│   │   └── providers.tsx           # Theme, Query, Auth providers
│   │
│   ├── hooks/
│   │   ├── use-mediapipe.ts        # vision pipeline lifecycle (hands/pose → gloss stream)
│   │   ├── use-stt.ts              # speech recognition lifecycle → transcript stream
│   │   ├── use-tts.ts              # speech synthesis + playback state
│   │   ├── use-llm.ts              # gloss/transcript → sentence streaming (SSE)
│   │   ├── use-devices.ts          # enumerateCamera/Mic, devicechange, permission state
│   │   ├── use-system-status.ts    # poll health: model, gpu, backend, fps, latency
│   │   ├── use-shortcuts.ts        # keybinding registry + overlay state
│   │   └── use-reduced-motion.ts
│   │
│   ├── lib/
│   │   ├── api.ts                  # typed API client (fetch + SSE), error mapping
│   │   ├── utils.ts                # cn()
│   │   └── i18n.ts                 # message loader (next-intl placeholder)
│   │
│   ├── stores/                     # zustand
│   │   ├── session.ts              # active session, utterances, frames, status
│   │   ├── settings.ts             # persisted settings (localStorage)
│   │   └── ui.ts                   # sidebar state, command palette, toasts trigger
│   │
│   ├── types/
│   │   ├── session.ts              # Session, Utterance, FrameRecord
│   │   ├── models.ts               # SystemStatus, DeviceInfo, PipelineHealth
│   │   └── settings.ts
│   │
│   ├── styles/
│   │   ├── globals.css             # tokens from docs/02 §6.2
│   │   └── tokens.css              # (optional) source-of-truth design tokens
│   │
│   └── messages/en.json            # all UI strings
│
├── tailwind.config.ts              # docs/02 §6.1
├── components.json                 # shadcn config
└── README.md
```

---

## 3. Component hierarchy

```
<Providers>                          (Theme · QueryClient · Session)
 └ <CommandMenu/>                    global ⌘K
 └ <ShortcutsOverlay/>
 └ <Toaster/>
 └ Routes
    ├── Landing                    <Navbar/> <Hero/> <Features/> <Pipelines/> <AiWorkflow/> <FinalCta/> <Footer/>
    ├── AuthLayout                 <BrandPanel/> <AuthForm/>  (forms: react-hook-form+zod)
    ├── About
    ├── AppShell                   (guarded)
    │   ├── Sidebar
    │   │   ├── NavItems
    │   │   ├── NewSessionButton
    │   │   ├── StatusMini
    │   │   └── UserMenu
    │   ├── Topbar  (mobile menu · title · ⌘K · status pill · notifications · avatar)
    │   └── <Page>
    │       ├── Dashboard: PageHeader · StatGrid(StatCard×4) · QuickActions(ModeCard) ·
    │       │            StatusGrid(StatusWidget) · HealthCard(MetricCard+Progress) ·
    │       │            RecentList(HistoryRow) · SetupBanner
    │       ├── Mode:  ModeGrid(ModeCard×3) · KbdHints
    │       ├── Hearing: <SessionProvider>
    │       │     CameraPreview · SentenceCard · ConversationPanel · PredictionTimeline ·
    │       │     MetricsPanel · StatusWidget · SessionControls · ErrorOverlay
    │       ├── Deaf:  SubtitleArea(aria-live) · ConversationPanel · AvatarPlaceholder ·
    │       │          StatusPill · SessionControls
    │       ├── History: Filters · HistoryTable(HistoryRow) · ExportMenu ·
    │       │           HistoryDetailDialog · ConfirmDialog
    │       └── Settings: SettingsTabs → General · Devices(DeviceTesters) ·
    │                     VoiceDisplay · Accessibility · Notifications · Developer
    ├── ErrorState pages
    └── NotFound
```

**SessionProvider** (`components/live/SessionProvider.tsx`) wires
`use-mediapipe + use-stt + use-llm + use-tts + stores/session` and exposes a
single `useSession()` hook consumed by all live components. This keeps hearing
and deaf pages thin and identical in structure.

---

## 4. Routing table

| Route | Page | Notes |
|---|---|---|
| `/` | Landing | public, `revalidate = 3600` (static) |
| `/login` `/register` `/forgot-password` | Auth | redirect to `/app` if authed |
| `/about` | About | static |
| `/app` | Dashboard | auth-required |
| `/app/mode` | Choose mode | auth-required |
| `/app/hearing` | Hearing mode | auth-required, device permission check |
| `/app/deaf` | Deaf mode | auth-required, device permission check |
| `/app/history` | History | auth-required |
| `/app/settings` | Settings | auth-required, `?tab=` param |
| `/camera-error` `/mic-error` `/ai-offline` `/network-error` `/permission-denied` | Error pages | public (can be prefixed) |
| `*` | 404 | `not-found.tsx` |

- Auth guard via `middleware.ts` (route match on `/app/*`), session cookie.
- Live routes check permissions before mount; on failure they `redirect('/camera-error')` (or render inline overlay — configurable).
- Deep-linkable settings tab via `?tab=devices`.

---

## 5. Data flow (live modes)

```
use-mediapipe ──frame─▶ mediapipe → gloss{word,conf,t} → store.frames[] (ring buffer)
use-llm      ──gloss ─▶ LLM stream → sentence segments → store.sentence{streaming|final}
use-tts      ──text ─▶ SpeechSynthesis / provider  → store.playing
use-stt      ──audio▶ interim → store.subtitle(interim) / final → store.subtitle(final)+utterance
use-system-status ──poll▶ health → store.status (pills, fps, latency, gpu, mem)
use-devices  ──event▶ devicechange/permission → store.devices
```
All consumers read from `stores/session` — components are pure renderers.

---

## 6. Production readiness notes

- **Errors:** all fetch/SSE wrapped with typed error mapping → ErrorState / banners.
- **Streaming:** SSE with `AbortController`; stale-frame pruning (drop frames older than 2.5s).
- **Perf:** `@media` throttling not needed — MediaPipe runs in Web Worker via `@mediapipe/tasks-vision`; video at 640×480; frame interval capped at 60fps and reduced on battery.
- **Security:** device streams never leave the device unless user opts into cloud mode (future); no secrets in client; API endpoint overridable in Developer settings only when `NEXT_PUBLIC_ALLOW_ENDPOINT_OVERRIDE=1`.
- **i18n:** all copy in `messages/en.json`; font `Inter` via `next/font`.
- **PWA baseline:** manifest + icons, offline error page, session snapshot.
