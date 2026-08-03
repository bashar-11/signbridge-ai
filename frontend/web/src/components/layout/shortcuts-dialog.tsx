import { useEffect, useState } from "react";
import { Keyboard } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const SHORTCUTS: { keys: string[]; action: string }[] = [
  { keys: ["Space"], action: "Play / pause speech (Hearing) or toggle mic (Deaf)" },
  { keys: ["S"], action: "Start / stop session" },
  { keys: ["C"], action: "Copy last sentence or subtitle" },
  { keys: ["1", "2"], action: "Open Hearing / Deaf mode" },
  { keys: ["?"], action: "Show this shortcut overlay" },
  { keys: ["Esc"], action: "Close dialog · stop speech" },
];

function Kbd({ children }: { children: string }) {
  return (
    <kbd className="inline-flex min-w-[1.5rem] items-center justify-center rounded-md border bg-muted px-1.5 py-0.5 font-mono text-[11px] font-semibold">
      {children}
    </kbd>
  );
}

export function ShortcutsDialog() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const openHandler = () => setOpen(true);
    const keyHandler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const typing = target.matches("input, textarea, select, [contenteditable]");
      if (typing) return;
      if (e.key === "?") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("open-shortcuts", openHandler);
    window.addEventListener("keydown", keyHandler);
    return () => {
      window.removeEventListener("open-shortcuts", openHandler);
      window.removeEventListener("keydown", keyHandler);
    };
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Keyboard className="h-5 w-5 text-primary" /> Keyboard shortcuts
          </DialogTitle>
          <DialogDescription>
            Every shortcut also has an equivalent button, so keyboard users are never locked out.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          {SHORTCUTS.map(({ keys, action }) => (
            <div key={action} className="flex items-center justify-between gap-4 text-sm">
              <span className="text-muted-foreground">{action}</span>
              <span className="flex items-center gap-1">
                {keys.map((k) => (
                  <Kbd key={k}>{k}</Kbd>
                ))}
              </span>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
