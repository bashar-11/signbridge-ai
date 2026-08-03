import { cn } from "@/lib/utils";

interface WaveformProps {
  active: boolean;
  bars?: number;
  className?: string;
}

export function Waveform({ active, bars = 15, className }: WaveformProps) {
  return (
    <div
      className={cn("flex h-8 items-center gap-0.5", className)}
      role="img"
      aria-label={active ? "Listening — audio detected" : "Microphone idle"}
    >
      {Array.from({ length: bars }).map((_, i) => (
        <span
          key={i}
          className={cn(
            "w-1 origin-center rounded-full bg-accent-live",
            active && "animate-wave",
          )}
          style={{
            height: "100%",
            animationDelay: `${(i % 5) * 0.09}s`,
            transform: active ? undefined : "scaleY(0.25)",
          }}
        />
      ))}
    </div>
  );
}
