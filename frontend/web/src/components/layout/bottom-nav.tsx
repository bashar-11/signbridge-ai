import { NavLink } from "react-router-dom";
import { Waves, Video, Mic, MessageSquareText, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { to: "/mode", label: "Start", icon: Waves },
  { to: "/hearing", label: "Hearing", icon: Video },
  { to: "/deaf", label: "Deaf", icon: Mic },
  { to: "/history", label: "History", icon: MessageSquareText },
  { to: "/settings", label: "Settings", icon: Settings },
];

export function BottomNav() {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t bg-card/95 backdrop-blur-xl lg:hidden"
      aria-label="Primary mobile"
    >
      <div className="grid grid-cols-5">
        {items.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                "flex h-16 flex-col items-center justify-center gap-1 text-[10px] font-medium text-muted-foreground transition-colors",
                isActive && "text-primary",
              )
            }
          >
            {({ isActive }) => (
              <>
                <Icon className={cn("h-5 w-5", isActive && "text-primary")} aria-hidden="true" />
                {label}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
