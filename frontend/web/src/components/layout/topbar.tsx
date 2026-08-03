import { useNavigate } from "react-router-dom";
import { Keyboard, LogOut, Settings, User, Check } from "lucide-react";
import { toast } from "sonner";
import { useSettings } from "@/components/settings-provider";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sun, Moon, Monitor } from "lucide-react";

const themeOptions = [
  { value: "light" as const, label: "Light", icon: Sun },
  { value: "dark" as const, label: "Dark", icon: Moon },
  { value: "system" as const, label: "System", icon: Monitor },
];

export function Topbar() {
  const { theme, setTheme } = useSettings();
  const navigate = useNavigate();

  const currentThemeLabel = themeOptions.find((t) => t.value === theme)?.label ?? "System";

  return (
    <header className="glass sticky top-0 z-30 flex h-16 items-center gap-3 border-b px-4 sm:px-6 lg:px-8">
      <div className="lg:hidden">
        <Logo compact />
      </div>

      <div className="hidden sm:flex sm:items-center sm:gap-2" aria-label="System status">
        <Badge variant="success">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
          </span>
          All systems healthy
        </Badge>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="hidden sm:inline-flex"
          aria-label="Keyboard shortcuts"
          title="Keyboard shortcuts"
          onClick={() => window.dispatchEvent(new CustomEvent("open-shortcuts"))}
        >
          <Keyboard />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" aria-label={`Theme: ${currentThemeLabel}`}>
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuLabel>Theme</DropdownMenuLabel>
            {themeOptions.map(({ value, label, icon: Icon }) => (
              <DropdownMenuItem key={value} onSelect={() => setTheme(value)}>
                <Icon />
                <span className="flex-1">{label}</span>
                {theme === value && <Check className="h-4 w-4 text-primary" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="focus-ring rounded-full"
              aria-label="Open user menu"
            >
              <Avatar className="h-9 w-9">
                <AvatarFallback className="bg-primary text-xs font-semibold text-primary-foreground">
                  AR
                </AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span className="text-sm font-semibold">Alex Rivera</span>
                <span className="text-xs font-normal text-muted-foreground">alex@signbridge.app</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/settings")}>
              <Settings /> Settings
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => toast.info("Profiles are coming soon.")}
            >
              <User /> Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() =>
                toast.success("Signed out (demo)", {
                  description: "Authentication is not wired up yet.",
                })
              }
            >
              <LogOut /> Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
