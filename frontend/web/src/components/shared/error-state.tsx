import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ErrorStateProps {
  icon: LucideIcon;
  title: string;
  message: string;
  action?: ReactNode;
  className?: string;
}

export function ErrorState({ icon: Icon, title, message, action, className }: ErrorStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-2xl border border-destructive/30 bg-destructive/5 px-6 py-12 text-center",
        className,
      )}
      role="alert"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
        <Icon className="h-7 w-7 text-destructive" aria-hidden="true" />
      </div>
      <div className="space-y-1">
        <p className="text-base font-semibold">{title}</p>
        <p className="mx-auto max-w-md text-sm text-muted-foreground">{message}</p>
      </div>
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
