import { cn } from "@/lib/utils";

interface MetricChipProps {
  label: string;
  value: string | number;
  unit?: string;
  live?: boolean;
  className?: string;
}

export function MetricChip({ label, value, unit, live = false, className }: MetricChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full bg-black/50 px-2.5 py-1 font-mono text-xs font-medium text-white backdrop-blur-sm",
        className,
      )}
    >
      {live && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-live opacity-60" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-live" />
        </span>
      )}
      <span className="uppercase tracking-wide text-white/60">{label}</span>
      <span className="tabular">{value}</span>
      {unit && <span className="text-white/60">{unit}</span>}
    </span>
  );
}
