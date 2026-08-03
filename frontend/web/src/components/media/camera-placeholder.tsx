import { Hand, Pause, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MetricChip } from "@/components/shared/metric-chip";
import { cn } from "@/lib/utils";

interface CameraPlaceholderProps {
  running: boolean;
  fps: number;
  latency: number;
  muted?: boolean;
  onToggleMute?: () => void;
  onSwitchCamera?: () => void;
  className?: string;
}

export function CameraPlaceholder({
  running,
  fps,
  latency,
  muted,
  onToggleMute,
  onSwitchCamera,
  className,
}: CameraPlaceholderProps) {
  return (
    <div
      className={cn(
        "relative aspect-video w-full overflow-hidden rounded-2xl border bg-slate-950 shadow-card",
        className,
      )}
    >
      {/* subtle grid — camera viewfinder feel */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden="true"
      />

      {/* center subject */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={running ? { opacity: 1 } : { opacity: 0.55 }}
          transition={{ duration: 0.4 }}
          className="relative"
        >
          <div className="flex h-36 w-36 items-center justify-center rounded-full border-2 border-white/10 bg-white/5">
            <span className="absolute h-44 w-44 animate-ping rounded-full border border-accent-live/20" />
            <Hand className="h-16 w-16 text-white/70" aria-hidden="true" />
          </div>
          {/* landmark dots */}
          <div className="absolute -right-4 top-2 h-2 w-2 rounded-full bg-accent-live" aria-hidden="true" />
          <div className="absolute -left-6 top-10 h-1.5 w-1.5 rounded-full bg-accent-live/70" aria-hidden="true" />
          <div className="absolute -bottom-2 right-6 h-1.5 w-1.5 rounded-full bg-accent-live/70" aria-hidden="true" />
        </motion.div>
      </div>

      {/* scanning line */}
      {running && (
        <div
          className="absolute left-0 right-0 h-px animate-scan bg-gradient-to-r from-transparent via-accent-live to-transparent"
          aria-hidden="true"
        />
      )}

      {/* HUD: top-left */}
      <div className="absolute left-4 top-4 flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-black/50 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-500" />
          </span>
          {running ? "Camera — live preview" : "Camera preview"}
        </span>
        {running && <MetricChip label="REC" value="" live className="hidden sm:inline-flex" />}
      </div>

      {/* HUD: bottom */}
      <div className="absolute bottom-4 left-4 flex flex-wrap items-center gap-2">
        <MetricChip label="FPS" value={Math.round(fps)} live={running} />
        <MetricChip label="Latency" value={latency} unit="ms" live={running} />
      </div>

      {/* HUD: bottom-right controls */}
      <div className="absolute bottom-4 right-4 flex items-center gap-2">
        {onSwitchCamera && (
          <Button
            size="iconSm"
            variant="outline"
            className="border-white/20 bg-black/50 text-white backdrop-blur-sm hover:bg-black/70"
            onClick={onSwitchCamera}
            aria-label="Switch camera"
          >
            <RefreshCw />
          </Button>
        )}
        {onToggleMute && (
          <Button
            size="iconSm"
            variant="outline"
            className="border-white/20 bg-black/50 text-white backdrop-blur-sm hover:bg-black/70"
            onClick={onToggleMute}
            aria-label={muted ? "Unmute" : "Mute"}
            aria-pressed={muted}
          >
            <Pause className={cn(!muted && "opacity-50")} />
          </Button>
        )}
      </div>

      {/* overlay message when idle */}
      {!running && (
        <div className="absolute inset-x-0 bottom-16 flex justify-center">
          <span className="rounded-full bg-black/60 px-3 py-1 text-xs text-white/80 backdrop-blur-sm">
            Press “Start signing” to begin recognition
          </span>
        </div>
      )}
    </div>
  );
}
