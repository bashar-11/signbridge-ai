# 13 · Suggested shadcn/ui Components

Install via `npx shadcn@latest init` + `add`. All components customized with SignBridge tokens (radii `xl`/`2xl`, height `h-12` on primary controls, focus-ring).

## 13.1 Required Components

| Component | Config | Customization |
|-----------|--------|---------------|
| `button` | base | size `lg` = 48px; add `xl` = 56px; `focus-ring` |
| `card` | base | default radius `2xl`, `shadow-card` |
| `input` | base | `h-12 rounded-xl` |
| `textarea` | base | `rounded-xl` |
| `label` | base | `text-sm font-medium` |
| `select` | Radix | trigger `h-12 rounded-xl` |
| `switch` | Radix | 44×24 track, 20 thumb |
| `checkbox` | Radix | `size-5 rounded-md`; 44px hit area wrapper |
| `radio-group` | Radix | radio cards in Settings |
| `slider` | Radix | thumb `size-5` focus-ring |
| `tabs` | Radix | `TabsList` = rounded-full segmented pill; `TabsTrigger` active = `bg-background shadow-card` |
| `dialog` | Radix | `rounded-2xl shadow-float`; overlay `bg-foreground/40 backdrop-blur-sm` |
| `alert-dialog` | Radix | destructive confirmations |
| `sheet` | Radix | mobile menus, right quick-panel |
| `popover` | Radix | device select, help |
| `dropdown-menu` | Radix | ⋯ menus, user menu |
| `tooltip` | Radix | icon-only nav labels; delay 300 ms |
| `badge` | base | + variants success/warning/destructive/dot |
| `avatar` | Radix | initials + photo; `size-9` nav, `size-20` team |
| `skeleton` | base | shimmer via `animate-pulse`-style custom (1.6 s) |
| `table` | base | header uppercase `text-xs`; rows `h-14` |
| `separator` | Radix | list dividers |
| `sonner` (toast) | sonner | `toastOptions` bottom-right, 4 s auto-dismiss, errors persist |
| `alert` | base | `rounded-xl border` variants |
| `progress` | Radix | confidence bars, pipeline progress |
| `command` | Radix | Ctrl/⌘K palette (future) |
| `form` | react-hook-form | `FormField`/`FormMessage` for settings + auth |
| `pagination` | base | history table paging |
| `collapsible` | Radix | About sections, developer logs |
| `accordion` | Radix | FAQ (future), settings grouping |

## 13.2 Custom Composites Built on shadcn

| Composite | Built from | Purpose |
|-----------|-----------|---------|
| `StatusWidget` | Card + Badge + Tooltip | pipeline health grid |
| `StatCard` | Card + Separator + custom Sparkline | dashboard metrics |
| `PipelineLoading` | Progress + custom checklist | mode startup |
| `ConversationRow` | Card + Badge + DropdownMenu | mobile history |
| `ModeCard` | Card + Badge + Button | mode selection |
| `SubtitleDisplay` | Card + custom live region | Deaf subtitles |
| `EmptyState` | Card + Badge icon | empty regions |

## 13.3 Implementation Conventions

- Default exports per shadcn; each file keeps its `variants()` definitions.
- No styling beyond tokens; dark mode via `.dark` root class.
- All Radix primitives wrapped to enforce focus-ring and 48px targets.
- `cn()` util from shadcn used everywhere for conditional classes.
