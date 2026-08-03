import { ScanFace } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface AvatarPlaceholderProps {
  animated?: boolean;
  className?: string;
}

export function AvatarPlaceholder({ animated = false, className }: AvatarPlaceholderProps) {
  return (
    <div
      className={cn(
        "relative flex aspect-[3/4] w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border border-dashed bg-muted/40",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />
      <div
        className={cn(
          "flex h-24 w-24 items-center justify-center rounded-full bg-primary/10",
          animated && "animate-float-soft",
        )}
      >
        <ScanFace className="h-12 w-12 text-primary" aria-hidden="true" />
      </div>
      <div className="space-y-1 text-center">
        <p className="text-sm font-semibold">3D Avatar</p>
        <p className="px-4 text-xs text-muted-foreground">
          A signing avatar will interpret speech in real time.
        </p>
      </div>
      <Badge variant="live">Coming soon</Badge>
    </div>
  );
}
