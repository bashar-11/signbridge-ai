import type { LucideIcon } from "lucide-react";
import { Lock } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Mode = "hearing" | "deaf" | "avatar";

interface ModeCardProps {
  mode: Mode;
  icon: LucideIcon;
  title: string;
  tagline: string;
  bullets: string[];
  cta: string;
  onStart?: () => void;
  disabled?: boolean;
  className?: string;
}

const iconStyles: Record<Mode, string> = {
  hearing: "bg-primary/10 text-primary",
  deaf: "bg-info/10 text-info",
  avatar: "bg-muted text-muted-foreground",
};

export function ModeCard({
  mode,
  icon: Icon,
  title,
  tagline,
  bullets,
  cta,
  onStart,
  disabled = false,
  className,
}: ModeCardProps) {
  return (
    <motion.div
      whileHover={disabled ? undefined : { y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className={cn(
        "card-hover flex h-full flex-col rounded-2xl border bg-card p-8 shadow-card",
        disabled ? "opacity-80" : "",
        className,
      )}
    >
      <div className="flex items-start justify-between">
        <div className={cn("flex h-14 w-14 items-center justify-center rounded-2xl", iconStyles[mode])}>
          <Icon className="h-7 w-7" aria-hidden="true" />
        </div>
        {disabled && (
          <Badge variant="secondary">
            <Lock className="h-3 w-3" /> Soon
          </Badge>
        )}
      </div>

      <h3 className="mt-5 text-xl font-semibold">{title}</h3>
      <p className="mt-0.5 text-sm font-medium text-primary">{tagline}</p>

      <ul className="mt-4 space-y-2">
        {bullets.map((b) => (
          <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-live" aria-hidden="true" />
            {b}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-6">
        <Button
          className="w-full"
          size="lg"
          variant={disabled ? "outline" : "default"}
          disabled={disabled}
          onClick={onStart}
        >
          {cta}
        </Button>
      </div>
    </motion.div>
  );
}
