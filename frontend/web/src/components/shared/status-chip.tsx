import { cn } from "@/lib/utils";
import type { StageStatus } from "@/lib/mock";

const dotColor: Record<StageStatus, string> = {
  green: "bg-dot-success",
  yellow: "bg-dot-warning",
  red: "bg-dot-destructive",
  muted: "bg-dot-muted",
};

const textColor: Record<StageStatus, string> = {
  green: "text-success",
  yellow: "text-warning",
  red: "text-destructive",
  muted: "text-muted-foreground",
};

interface StatusChipProps {
  label: string;
  status: StageStatus;
  detail?: string;
  pulse?: boolean;
  className?: string;
}

export function StatusChip({ label, status, detail, pulse = false, className }: StatusChipProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1.5 text-sm",
        status === "red" ? "border-destructive/40" : "border-border",
        className,
      )}
      title={detail}
    >
      <span className="relative flex h-2 w-2 shrink-0">
        {pulse && (
          <span
            className={cn(
              "absolute inline-flex h-full w-full rounded-full opacity-60",
              dotColor[status],
              "animate-ping",
            )}
          />
        )}
        <span className={cn("relative inline-flex h-2 w-2 rounded-full", dotColor[status])} />
      </span>
      <span className="font-medium">{label}</span>
      {status !== "green" && status !== "muted" && (
        <span className={cn("text-xs font-semibold", textColor[status])}>
          {status === "yellow" ? "Degraded" : "Error"}
        </span>
      )}
    </div>
  );
}
