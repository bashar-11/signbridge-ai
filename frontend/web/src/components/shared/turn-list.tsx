import { useEffect, useRef } from "react";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import type { Turn } from "@/lib/mock";
import { copyText } from "@/lib/speech";
import { cn } from "@/lib/utils";

interface TurnListProps {
  turns: Turn[];
  className?: string;
}

export function TurnList({ turns, className }: TurnListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [turns.length]);

  return (
    <div className={cn("flex flex-col gap-3 overflow-y-auto", className)} aria-label="Conversation">
      {turns.map((turn) => (
        <div
          key={turn.id}
          className={cn(
            "group flex max-w-[85%] flex-col gap-1 rounded-2xl px-4 py-3 text-sm shadow-sm",
            turn.role === "self"
              ? "self-end rounded-br-md bg-primary text-primary-foreground"
              : "self-start rounded-bl-md bg-muted",
          )}
        >
          <p className="whitespace-pre-wrap">{turn.text}</p>
          <div className="flex items-center justify-between gap-3">
            <span
              className={cn(
                "text-[11px]",
                turn.role === "self" ? "text-primary-foreground/70" : "text-muted-foreground",
              )}
            >
              {new Date(turn.at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              {turn.confidence != null && ` · ${Math.round(turn.confidence * 100)}% conf`}
            </span>
            <button
              type="button"
              onClick={() => {
                copyText(turn.text);
                toast.success("Copied to clipboard");
              }}
              className={cn(
                "rounded-md p-1 opacity-0 transition-opacity focus-visible:opacity-100 group-hover:opacity-100",
                turn.role === "self" ? "text-primary-foreground/70 hover:text-primary-foreground" : "text-muted-foreground hover:text-foreground",
              )}
              aria-label="Copy turn"
            >
              <Copy className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
