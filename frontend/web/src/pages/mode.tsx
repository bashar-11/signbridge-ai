import { useNavigate } from "react-router-dom";
import { Video, Mic, ScanFace } from "lucide-react";
import { toast } from "sonner";
import { PageTransition } from "@/components/page-transition";
import { ModeCard } from "@/components/shared/mode-card";

export function ModePage() {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="mx-auto max-w-6xl">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Choose how you'll communicate
          </h1>
          <p className="text-muted-foreground">
            Pick a mode to start a real-time conversation. Everything runs locally in your browser.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <ModeCard
            mode="hearing"
            icon={Video}
            title="Hearing Mode"
            tagline="Sign → Speech"
            bullets={[
              "Live sign recognition from your camera",
              "Natural sentences composed by AI",
              "Clear spoken output via text-to-speech",
            ]}
            cta="Start signing"
            onStart={() => navigate("/hearing")}
          />

          <ModeCard
            mode="deaf"
            icon={Mic}
            title="Deaf Mode"
            tagline="Speech → Text"
            bullets={[
              "Live, large-print subtitles",
              "High-contrast, accessibility-first display",
              "3D avatar interpreter (coming soon)",
            ]}
            cta="Start listening"
            onStart={() => navigate("/deaf")}
          />

          <ModeCard
            mode="avatar"
            icon={ScanFace}
            title="3D Avatar"
            tagline="AI Sign Language Interpreter"
            bullets={[
              "An animated avatar signs in real time",
              "Planned support for 40+ languages",
              "Watch this space",
            ]}
            cta="Notify me"
            disabled
            onStart={() => toast.info("We'll let you know when the avatar is ready.")}
          />
        </div>

        <div className="mt-10 rounded-2xl border bg-muted/40 p-4 text-center text-sm text-muted-foreground">
          Tip: press <kbd className="rounded border bg-background px-1.5 font-mono text-xs">1</kbd> for
          Hearing mode or <kbd className="rounded border bg-background px-1.5 font-mono text-xs">2</kbd>{" "}
          for Deaf mode.
        </div>
      </div>
    </PageTransition>
  );
}
