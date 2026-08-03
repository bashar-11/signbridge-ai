# 10–13 · React Folder Structure · Component Hierarchy · Pages · Routing

Stack: **Vite + React 18 + TypeScript**, Tailwind CSS v3, shadcn/ui, Lucide React, Framer Motion, TanStack Router (or React Router v6), Zustand (state), i18next (i18n), Sonner (toasts).

---

## 10 · Folder Structure

```
signbridge/
├── public/
│   ├── favicon.svg
│   └── logo.svg
├── src/
│   ├── main.tsx
│   ├── app/                       # app bootstrap, providers
│   │   ├── App.tsx                # router + providers + top loader
│   │   ├── router.tsx
│   │   └── providers.tsx          # Theme, Toaster, Auth, I18n, Pipeline
│   ├── routes/                    # route modules (co-located pages)
│   │   ├── landing/index.tsx
│   │   ├── about/index.tsx
│   │   ├── auth/
│   │   │   ├── login.tsx
│   │   │   ├── register.tsx
│   │   │   ├── forgot-password.tsx
│   │   │   └── reset-password.tsx
│   │   ├── app/                   # authenticated shell
│   │   │   ├── layout.tsx         # AppShell (topbar + sidebar/bottom bar)
│   │   │   ├── index.tsx          # Dashboard
│   │   │   ├── mode.tsx           # Mode selection
│   │   │   ├── hearing.tsx        # Hearing mode (live)
│   │   │   ├── deaf.tsx           # Deaf mode (live)
│   │   │   ├── conversations/
│   │   │   │   ├── index.tsx      # history list
│   │   │   │   └── [id].tsx       # detail
│   │   │   ├── settings/
│   │   │   │   ├── layout.tsx     # tabs shell
│   │   │   │   ├── appearance.tsx
│   │   │   │   ├── audio.tsx
│   │   │   │   ├── devices.tsx
│   │   │   │   ├── language.tsx
│   │   │   │   ├── accessibility.tsx
│   │   │   │   ├── notifications.tsx
│   │   │   │   └── developer.tsx
│   │   │   ├── about.tsx
│   │   │   └── coming-soon.tsx    # avatar/assistant/analytics/sync
│   │   └── error.tsx              # 404 + error boundary
│   ├── components/
│   │   ├── ui/                    # shadcn/ui primitives (button.tsx, card.tsx…)
│   │   ├── layout/
│   │   │   ├── AppShell.tsx
│   │   │   ├── Topbar.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── BottomTabBar.tsx
│   │   │   ├── PipelineBanner.tsx
│   │   │   └── SkipLink.tsx
│   │   ├── shared/                # cross-app composites
│   │   │   ├── PageHeader.tsx
│   │   │   ├── StatCard.tsx
│   │   │   ├── StatusWidget.tsx
│   │   │   ├── MetricChip.tsx
│   │   │   ├── ConfidenceBar.tsx
│   │   │   ├── EmptyState.tsx
│   │   │   ├── ErrorState.tsx
│   │   │   ├── PipelineLoading.tsx
│   │   │   └── Toast.tsx
│   │   ├── media/
│   │   │   ├── CameraPreview.tsx
│   │   │   ├── Waveform.tsx
│   │   │   ├── AvatarPlaceholder.tsx
│   │   │   └── PlaySpeechButton.tsx
│   │   └── conversation/
│   │       ├── TurnBubble.tsx
│   │       ├── SubtitleDisplay.tsx
│   │       ├── PredictionTimeline.tsx
│   │       ├── ConversationRow.tsx
│   │       └── ModeCard.tsx
│   ├── features/                  # feature-scoped logic
│   │   ├── auth/
│   │   ├── pipeline/              # MediaPipe/LLM/STT/TTS orchestration
│   │   │   ├── pipeline.store.ts  # Zustand
│   │   │   ├── mediapipe.ts
│   │   │   ├── llm.ts
│   │   │   ├── stt.ts
│   │   │   └── tts.ts
│   │   ├── conversation/
│   │   │   ├── conversation.store.ts
│   │   │   └── history.api.ts
│   │   ├── devices/
│   │   └── settings/
│   ├── hooks/                     # useMediaQuery, useShortcuts, useSpeech…
│   ├── lib/
│   │   ├── api.ts                 # fetch wrapper, retries
│   │   ├── utils.ts               # cn()
│   │   ├── constants.ts
│   │   └── i18n/
│   ├── styles/
│   │   ├── globals.css            # tailwind directives + tokens
│   │   └── tokens.css
│   ├── types/                     # Turn, Conversation, PipelineStatus, …
│   └── utils/
│       ├── format.ts              # dates, duration, percent
│       └── speech.ts              # speak(), stop()
└── index.html
```

---

## 11 · React Component Hierarchy

```
<App/>
└── <Providers>                       (ThemeProvider, I18n, AuthProvider, PipelineProvider, Toaster)
    └── <Router/>
        ├── <LandingPage/>            ─ <LandingHeader/><Hero/><FeatureGrid/><HowItWorks/><AIWorkflow/><CTABand/><LandingFooter/>
        ├── <AuthLayout/>             ─ <BrandPanel/> + <LoginForm/> | <RegisterForm/> | <ForgotPasswordForm/>
        ├── <AppShell>                ─ <SkipLink/><Topbar/><Sidebar/>|<BottomTabBar/><main><Outlet/></main>
        │   ├── <Dashboard/>          ─ <PageHeader/><StatGrid/>(StatCard×4)<QuickActions/><StatusWidget/><RecentConversations/> (Table/ConversationRow)
        │   ├── <ModeSelection/>      ─ <ModeCard Hearing/><ModeCard Deaf/><ModeCard Avatar(disabled)/>
        │   ├── <HearingMode/>        ─ <SessionTopbar/><CameraPreview/><DetectedWord/><GeneratedSentence/><PredictionTimeline/><ConversationHistory/><PipelineStatus/>
        │   ├── <DeafMode/>           ─ <SessionTopbar/><SubtitleDisplay/><ListeningBar/><AvatarPlaceholder/><ConversationPanel/><ActionBar/>
        │   ├── <ConversationsList/>  ─ <SearchBar/><Filters/><DataTable/>(ConversationRow)<ExportAll/>
        │   ├── <ConversationDetail/> ─ <PageHeader/><TurnTimeline/>(TurnBubble)<ExportMenu/><DeleteDialog/>
        │   ├── <SettingsLayout/>     ─ <Tabs/> → appearance/audio/devices/language/accessibility/notifications/developer (FormField groups, auto-save)
        │   ├── <AboutPage/>          ─ SectionCards (Project, Architecture, Models, Dataset, Team, License)
        │   └── <ComingSoon/>         ─ FeatureCard + NotifyMe
        ├── <ErrorPage/>              ─ <ErrorState/> (404 / 500 / offline / permission)
        └── <NotFound/>               ─ 404 illustration
```

### Key composition rules
- Pages contain zero raw styling — only layout + composites.
- `PipelineProvider` exposes a single `status` object consumed by `StatusWidget`, banners, and session pages.
- `ConversationProvider` owns transcript state; sessions write turns; history reads.

---

## 12 · Suggested Pages (12)

| # | Route | Page | Priority |
|---|-------|------|----------|
| 1 | `/` | Landing | P0 |
| 2 | `/about` | About (public) | P1 |
| 3 | `/login` `/register` `/forgot-password` `/reset-password` | Auth | P0 |
| 4 | `/app` | Dashboard | P0 |
| 5 | `/app/mode` | Mode selection | P0 |
| 6 | `/app/hearing` | Hearing mode (live) | P0 |
| 7 | `/app/deaf` | Deaf mode (live) | P0 |
| 8 | `/app/conversations` · `/app/conversations/:id` | History | P0 |
| 9 | `/app/settings/*` | Settings (7 tabs) | P0 |
| 10 | `/app/about` | About (in-app) | P1 |
| 11 | `/app/{avatar,assistant,analytics,sync}` | Coming-soon placeholders | P2 |
| 12 | `*` / `/500` | 404 / Error | P0 |

---

## 13 · Routing

```tsx
// routes/app/router.tsx — protected
createBrowserRouter([
  { path: "/",  element: <LandingPage/> },
  { path: "/about", element: <PublicAboutPage/> },
  { path: "/login", element: <LoginPage/> },
  { path: "/register", element: <RegisterPage/> },
  { path: "/forgot-password", element: <ForgotPasswordPage/> },
  { path: "/reset-password", element: <ResetPasswordPage/> },
  {
    path: "/app",
    element: <RequireAuth><AppShell/></RequireAuth>,
    children: [
      { index: true, element: <DashboardPage/> },
      { path: "mode", element: <ModeSelectionPage/> },
      { path: "hearing", element: <HearingModePage/> },
      { path: "deaf", element: <DeafModePage/> },
      { path: "conversations", element: <ConversationsPage/> },
      { path: "conversations/:id", element: <ConversationDetailPage/> },
      {
        path: "settings",
        element: <SettingsLayout/>,
        children: [
          { index: true, redirect: "/app/settings/appearance" },
          { path: "appearance", element: <AppearanceSettings/> },
          { path: "audio", element: <AudioSettings/> },
          { path: "devices", element: <DevicesSettings/> },
          { path: "language", element: <LanguageSettings/> },
          { path: "accessibility", element: <AccessibilitySettings/> },
          { path: "notifications", element: <NotificationsSettings/> },
          { path: "developer", element: <DeveloperSettings/> },
        ],
      },
      { path: "about", element: <AppAboutPage/> },
      { path: "avatar", element: <ComingSoonPage feature="avatar"/> },
      { path: "assistant", element: <ComingSoonPage feature="assistant"/> },
      { path: "analytics", element: <ComingSoonPage feature="analytics"/> },
      { path: "sync", element: <ComingSoonPage feature="sync"/> },
    ],
  },
  { path: "*", element: <NotFoundPage/> },
])
```

### Guards & lazy loading
- `RequireAuth` redirects to `/login?next=<path>`.
- Live-session routes warn before unload (`beforeunload` + dialog) to prevent data loss.
- Every route is `React.lazy` with a `Skeleton` fallback and the top loading bar.

### URL state for sessions
- Session id in route state (`navigate(..., { state: { sessionId } })`) so refresh keeps context.
- Filters for history stored in search params (`?mode=deaf&q=hello`) for shareable URLs.
