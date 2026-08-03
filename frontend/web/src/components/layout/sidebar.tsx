import { NavLink } from "react-router-dom";
import { Waves, Video, Mic, MessageSquareText, Settings, Info } from "lucide-react";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";

const items = [
  { to: "/mode", label: "Start", icon: Waves },
  { to: "/hearing", label: "Hearing", icon: Video },
  { to: "/deaf", label: "Deaf", icon: Mic },
  { to: "/history", label: "History", icon: MessageSquareText },
  { to: "/settings", label: "Settings", icon: Settings },
  { to: "/about", label: "About", icon: Info },
];

export function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-[68px] flex-col border-r bg-card xl:w-60 lg:flex">
      <div className="flex h-16 items-center justify-center border-b xl:justify-start xl:px-6">
        <NavLink to="/mode" aria-label="SignBridge home">
          <Logo compact className="xl:hidden" />
          <Logo className="hidden xl:inline-flex" />
        </NavLink>
      </div>

      <nav className="flex-1 space-y-1 p-3" aria-label="Primary">
        {items.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                "group relative flex h-11 items-center justify-center gap-3 rounded-xl px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground xl:justify-start",
                isActive && "bg-primary/10 text-primary hover:bg-primary/10 hover:text-primary",
              )
            }
            title={label}
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <span className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-primary" />
                )}
                <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                <span className="hidden xl:inline">{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="border-t p-3">
        <div className="hidden items-center gap-2 rounded-xl bg-muted px-3 py-2.5 xl:flex">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
          </span>
          <span className="text-xs font-medium">AI Online</span>
        </div>
        <p className="mt-2 hidden text-center text-[11px] text-muted-foreground xl:block">
          v0.1.0-beta
        </p>
      </div>
    </aside>
  );
}
