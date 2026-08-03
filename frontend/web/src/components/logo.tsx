import { cn } from "@/lib/utils";

export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary shadow-card">
        <svg
          viewBox="0 0 32 32"
          className="h-5 w-5"
          aria-hidden="true"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 11.5c0-1.4 1.1-2.5 2.5-2.5h13c1.4 0 2.5 1.1 2.5 2.5v9c0 1.4-1.1 2.5-2.5 2.5h-10l-5 4V20.5c-1.4 0-2.5-1.1-2.5-2.5v-6.5z"
            fill="white"
          />
          <path d="M24 12l-3.4 4.5-2-2.6L13 19h12l-1-7z" fill="#06b6d4" />
        </svg>
      </span>
      {!compact && (
        <span className="text-lg font-semibold tracking-tight">
          SignBridge
        </span>
      )}
    </span>
  );
}
