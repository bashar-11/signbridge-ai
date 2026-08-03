import { cn } from "@/lib/utils";

interface ConfidenceBarProps {
  value: number;
  className?: string;
}

function thresholdColor(value: number) {
  if (value >= 80) return "bg-success";
  if (value >= 60) return "bg-warning";
  return "bg-destructive";
}

export function ConfidenceBar({ value, className }: ConfidenceBarProps) {
  const pct = Math.min(100, Math.max(0, value));
  return (
    <div className={cn("space-y-1.5", className)}>
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium uppercase tracking-wide text-muted-foreground">
          Confidence
        </span>
        <span className={cn("font-mono font-semibold tabular", pct >= 60 ? "text-success" : "text-destructive")}>
          {Math.round(pct)}%
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className={cn("h-full rounded-full transition-all duration-300 ease-out", thresholdColor(pct))}
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={Math.round(pct)}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
}
