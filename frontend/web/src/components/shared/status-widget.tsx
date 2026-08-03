import type { StageInfo } from "@/lib/mock";
import { StatusChip } from "@/components/shared/status-chip";

interface StatusWidgetProps {
  stages: StageInfo[];
  pulseKeys?: string[];
  className?: string;
}

export function StatusWidget({ stages, pulseKeys = [], className }: StatusWidgetProps) {
  return (
    <div className={className}>
      <div className="grid grid-cols-2 gap-3">
        {stages.map((stage) => (
          <StatusChip
            key={stage.key}
            label={stage.label}
            status={stage.status}
            detail={stage.detail}
            pulse={pulseKeys.includes(stage.key)}
          />
        ))}
      </div>
    </div>
  );
}
