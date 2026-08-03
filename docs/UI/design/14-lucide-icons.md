# 14 · Suggested Lucide Icons

Package: `lucide-react`. Icon rules: stroke 2, `size-4` default in controls, `size-5` headers, `size-6` heroes, `size-8` stat/mode icons, `size-10` error/empty illustrations. Always paired with text labels for status semantics.

---

## 14.1 Navigation & Shell

| Icon | Use |
|------|-----|
| `Home` | Sidebar → Home / Dashboard |
| `Waves` | Sidebar → Start (mode selection) — brand-y action icon |
| `MessageSquareText` | Sidebar → Conversations |
| `Settings` | Sidebar → Settings |
| `Info` | Sidebar → About |
| `Menu` | Mobile topbar hamburger |
| `Search` | Global search |
| `Bell` | Notifications (with dot badge) |
| `ChevronDown` | Selects, dropdowns |
| `ChevronRight` | Breadcrumbs, row chevrons |
| `ChevronLeft` | Back in live session topbar |
| `X` | Close dialogs / clear inputs |
| `ArrowLeft` / `ArrowRight` | Pagination |

## 14.2 Modes & Communication

| Icon | Use |
|------|-----|
| `Video` / `Camera` | Hearing mode card, camera status |
| `Mic` / `MicOff` | Deaf mode card, microphone status |
| `Hand` | Sign language, detected-word display |
| `Bot` / `Sparkles` | AI / LLM status, generated sentence |
| `AudioLines` | TTS / speech playback, live waveform |
| `Caption` / `Subtitles` | Subtitle display, STT |
| `User` / `UserRound` | User menu, avatar fallback |
| `Headphones` | Voice/audio settings |
| `Cog` | Developer settings |

## 14.3 Actions

| Icon | Use |
|------|-----|
| `Play` / `Pause` | Speech playback, repeat |
| `Square` | Stop session |
| `Copy` / `Check` | Copy text (Check on success) |
| `RotateCcw` | Retry / reconnect |
| `Trash2` | Delete |
| `Download` | Export |
| `Upload` | Import (future) |
| `Share2` | Share conversation (future) |
| `Edit3` / `Pencil` | Rename |
| `Plus` | New conversation |
| `MoreHorizontal` / `MoreVertical` | ⋯ menus |
| `LogOut` | Sign out |
| `LogIn` | Sign in |
| `Eye` / `EyeOff` | Password visibility |
| `RefreshCw` | Regenerate sentence (future) |
| `Send` | Type-reply submit |
| `Lock` | Coming-soon / protected |

## 14.4 Status & System

| Icon | Use |
|------|-----|
| `Activity` | Live FPS / latency metric |
| `Gauge` | System health |
| `Cpu` | GPU usage |
| `MemoryStick` | Memory usage |
| `Database` | Dataset status |
| `Brain` | Recognition model |
| `Zap` | Latency / speed |
| `Cloud` / `CloudOff` | Backend / sync / offline |
| `Wifi` / `WifiOff` | Network status |
| `CircleDot` | Recording indicator |
| `Dot` | Status dots (aria-hidden) |
| `TriangleAlert` | Warning / degraded |
| `CircleAlert` | Error / destructive |
| `CircleCheck` | Success |
| `Info` | Info alerts |
| `ShieldCheck` | Privacy / security |
| `KeyRound` | API keys (developer) |

## 14.5 Empty & Error States

| Icon | Use |
|------|-----|
| `VideoOff` | Camera error / denied |
| `MicVocalOff` / `MicOff` | Microphone error / denied |
| `Cctv` | Camera not found |
| `WifiOff` | Network error |
| `CloudOff` | AI offline |
| `ServerCrash` | 500 / backend error |
| `MessageSquareOff` | 404 illustration (bubble with slash) |
| `Inbox` | Empty conversations |
| `FolderSearch` | No search results |
| `Construction` | Coming soon (with lock) |
| `Avatar` (custom) / `ScanFace` | 3D Avatar placeholder |
| `Keyboard` | Shortcut overlay |

## 14.6 Settings-specific

| Icon | Use |
|------|-----|
| `Moon` / `Sun` / `Monitor` | Theme (dark/light/system) |
| `Palette` | Appearance |
| `Type` | Text size / typography |
| `Contrast` | High contrast |
| `Languages` | Language settings |
| `Volume2` / `VolumeX` | Audio / mute |
| `Gauge` | Speech speed |
| `MonitorSpeaker` / `Webcam` | Device tests |
| `SlidersHorizontal` | Advanced / developer |
| `Mail` | Notifications (email) |

## 14.7 Icon Consistency Rules

- Same concept = same icon everywhere (camera always `Video`/`Camera`, copy always `Copy`).
- Icons never carry semantic color alone; pair with text/badge.
- Decorative icons `aria-hidden="true"`; semantic icons hidden with adjacent text visible to SR.
- Future/placeholder features use `Lock` + badge "Soon", never a greyed mystery icon.
