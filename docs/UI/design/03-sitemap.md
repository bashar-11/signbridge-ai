# 3 · Site Map

## 3.1 Map (sitemap.xml-ready)

```
/
├── /                      Landing page (public)
├── /about                 About (public)
├── /login                 Login
├── /register              Register
├── /forgot-password       Forgot password
├── /reset-password        Reset password (placeholder)
│
├── /app                   App shell (authenticated, sidebar layout)
│   ├── /app              Dashboard
│   ├── /app/mode         Mode selection
│   ├── /app/hearing      Hearing Mode (live session)
│   ├── /app/deaf         Deaf Mode (live session)
│   ├── /app/conversations        History list
│   ├── /app/conversations/:id    Conversation detail
│   ├── /app/settings             Settings (tabbed)
│   ├── /app/settings/appearance
│   ├── /app/settings/audio
│   ├── /app/settings/devices
│   ├── /app/settings/language
│   ├── /app/settings/accessibility
│   ├── /app/settings/notifications
│   ├── /app/settings/developer
│   ├── /app/about         In-app about
│   │
│   └── /app/coming-soon   Future features placeholders
│       ├── /app/avatar
│       ├── /app/assistant
│       ├── /app/analytics
│       └── /app/sync
│
└── /*                    404
```

## 3.2 Page → Primary Action Mapping

| Route | Primary action | Secondary actions |
|-------|---------------|-------------------|
| `/` | Start for free | Sign in, learn more |
| `/app` | Start a conversation | View history, settings |
| `/app/mode` | Pick mode | Compare modes |
| `/app/hearing` | Start signing | Copy, play, end |
| `/app/deaf` | Start listening | Copy, repeat, end |
| `/app/conversations` | Open a conversation | Search, filter, export |
| `/app/conversations/:id` | Replay / export | Delete |
| `/app/settings/*` | Save | Reset |

## 3.3 Deep Links

| Link | Target |
|------|--------|
| `signbridge.app/signin?next=/app/hearing` | Login → straight to Hearing Mode |
| `signbridge.app/join` | Register with invite |
| `signbridge.app/conversations?filter=deaf` | History pre-filtered |
| `signbridge.app/status` | Public system status page (future) |

## 3.4 URL Naming Rules

- Kebab-case, lowercase, no parameters in the path where a route exists.
- Live session routes carry `?session=<id>` for share/rejoin links (future).
- Auth pages are under the public root, not under `/app`.
