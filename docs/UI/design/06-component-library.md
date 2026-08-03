# 6 · Component Library

Every component below is implemented with shadcn/ui primitives (see [13-shadcn-components.md](13-shadcn-components.md)) and styled with the tokens in [11-theme-tokens.md](11-theme-tokens.md).

Conventions: interactive min-height 48 px (44 px allowed only for dense tables/inputs), all interactive elements get focus-visible rings, icons use `size-4` inside buttons (24 px in standalone icon buttons).

---

## 6.1 Buttons

| Variant | Purpose | Spec |
|---------|---------|------|
| `primary` | Single main action per view | `bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-6 rounded-xl font-medium` |
| `secondary` | Complementary actions | `bg-secondary text-secondary-foreground hover:bg-secondary/80 border` |
| `outline` | Neutral / borders | `border-border bg-background hover:bg-accent` |
| `ghost` | Toolbars, inline | transparent, `hover:bg-accent` |
| `destructive` | Irreversible | `bg-destructive text-white hover:bg-destructive/90` |
| `link` | Inline text links | `text-primary underline-offset-4 hover:underline` |
| Sizes | `sm`(36px) · `default`(44px) · `lg`(48px) · `xl`(56px) | icons `size-4/5` |
| Icon button | Standalone square | `size-11 rounded-xl` |

States: default, hover, active (`scale-[0.98]`), focus-visible (ring), disabled (50% opacity, `not-allowed` cursor), loading (16 px spinner replacing icon, label dimmed).

---

## 6.2 Cards

- `Card` base: `rounded-2xl border bg-card shadow-card`.
- Variants: `interactive` (hover lift + shadow-float), `highlight` (`border-primary/40`), `destructive` (red border).
- Sections: `CardHeader` (title `text-base font-semibold` + optional description `text-sm text-muted-foreground`), `CardContent` (`p-6`), `CardFooter`.

---

## 6.3 Badges & Status Chips

- `Badge`: default / primary / success / warning / destructive / outline. Sizes sm (16 px) / md (20 px).
- `StatusChip`: `●` colored dot + label; colors via `dot-success/warning/destructive/muted`. Pulse animation on active stages (2 s, opacity only).
- `ConfidenceChip`: value with threshold coloring (`≥80` success, `60–79` warning, `<60` destructive) and arrow icon.

---

## 6.4 Alerts / Banners

- `Alert` (inline): icon + title + description, 4 variants (default/info/success/warning/destructive), `rounded-xl border`.
- `Banner` (full-width, top): sticky under topbar, `role="status"` / `role="alert"`, dismissible; variants info/success/warning/error/offline.

---

## 6.5 Inputs & Forms

- `Input`: `h-12 rounded-xl border bg-background px-4`, focus ring, `aria-invalid` red border + error `FormMessage`.
- `Textarea`, `Select` (shadcn Radix), `Switch` (toggle, 44×24, thumb 20), `Checkbox` (44×44 hit area), `RadioGroup` (radio cards).
- `Slider` (single-value, large thumb 20 px, focusable).
- `Stepper` (`[−] value [+]`, keyboard arrows supported) for text size / speed.
- `FormField` wrapper with `Label`, help text, error.

---

## 6.6 Navigation

- `SidebarNav` (desktop), `Topbar`, `BottomTabBar` (mobile), `Breadcrumbs`, `Tabs` (segmented, rounded-full pill for settings), `Pagination` (history table).
- `CommandPalette` (Ctrl/⌘K) — future.

---

## 6.7 Modals & Dialogs

- `Dialog` (confirmations, forms): `rounded-2xl shadow-float`, overlay `bg-foreground/40 backdrop-blur-sm`, `Esc` closes, focus trap, header with icon + title + description, footer with [Cancel] + action. `AlertDialog` for destructive confirmations (requires typing "delete" for irreversible data loss).
- `Sheet` (mobile menus / quick panel from right), `Popover` (menus, device select), `DropdownMenu` (⋯ menus, user menu), `Tooltip` (delayed 300 ms, only on icon-only nav), `Toast` (see 5.15).

---

## 6.8 Tables

- `Table`: header `text-xs uppercase tracking-wide text-muted-foreground`, rows `h-14`, hover `bg-accent/50`, numeric right-aligned in `tabular-nums`, row action menu on hover + focus.
- States: loading (`Skeleton` rows), empty (`EmptyState`), filtered-empty, dense variant for Settings lists.

---

## 6.9 Status / Telemetry Components

| Component | Shows | States |
|-----------|-------|--------|
| `StatusWidget` | AI pipeline card | per-chip: green/yellow/red/muted |
| `MetricChip` | FPS / latency / mem | value + unit, live dot, mono font |
| `Sparkline` | 24-sample trend | cyan line, min/max auto-scale |
| `ConfidenceBar` | 0–100 fill | track 4px, fill success/warning/destructive |
| `Waveform` | mic activity | 15 bars, animates while detecting |
| `PipelineLoading` | startup checklist | step rows: pending/active(✓ spinner)/done/error |
| `Timeline` | prediction tokens | chips sized by confidence |

---

## 6.10 Media Components

- `CameraPreview`: `<video>` + `Skeleton` frame + overlay chips + landmark canvas; props `fps`, `latency`, `muted`, `onSwitchCamera`, `videoRef`.
- `AvatarPlaceholder`: `aspect-[3/4]` card with silhouette icon + "coming soon".
- `AudioPlayer` / `PlaySpeechButton`: button morphs to playing state (equalizer bars).

---

## 6.11 Content Components

- `Skeleton` (shimmer 1.6 s), `EmptyState` (icon in 56 px `bg-accent` circle, title, copy, CTA), `ErrorState` (see 5.14), `Logo`, `Spinner`, `PageHeader` (title + description + actions), `StatCard`, `FeatureCard`, `Step` (stepper), `ModeCard`, `ConversationRow`, `TurnBubble`, `SubtitleDisplay`, `ModelBadge`, `UserAvatar` (initials + optional photo).

---

## 6.12 Lucide Icon Usage

- All icons `size-4` in controls, `size-5` in stat headers, `size-6` in page heroes.
- Full icon map in [14-lucide-icons.md](14-lucide-icons.md).
