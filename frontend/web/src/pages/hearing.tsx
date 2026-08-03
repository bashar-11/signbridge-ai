import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Square,
  Play,
  Copy,
  Check,
  RotateCcw,
  Activity,
  Zap,
  MessageSquareText,
} from "lucide-react";
import { toast } from "sonner";
import { PageTransition } from "@/components/page-transition";
import { CameraPlaceholder } from "@/components/media/camera-placeholder";
import { StatusWidget } from "@/components/shared/status-widget";
import { ConfidenceBar } from "@/components/shared/confidence-bar";
import { TurnList } from "@/components/shared/turn-list";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useSettings } from "@/components/settings-provider";
import { useInterval } from "@/hooks/use-interval";
import { copyText, speak, stopSpeaking } from "@/lib/speech";
import {
  INITIAL_HEARING_TURNS,
  MOCK_SENTENCES,
  MOCK_SIGNS,
  mockPipeline,
  type GlossToken,
  type StageInfo,
  type Turn,
} from "@/lib/mock";

type SentenceState = "idle" | "composing" | "ready";

const rand = (min: number, max: number) => Math.random() * (max - min) + min;

export function HearingPage() {
  const { autoSpeak, setAutoSpeak, speechRate } = useSettings();

  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [fps, setFps] = useState(0);
  const [latency, setLatency] = useState(0);
  const [stages, setStages] = useState<StageInfo[]>(() =>
    mockPipeline().map((s) =>
      s.key === "mediapipe" || s.key === "llm"
        ? { ...s, status: "yellow", detail: "Idle — start a session" }
        : s.key === "recognition"
          ? { ...s, status: "muted", detail: "Waiting for camera" }
          : s,
    ),
  );
  const [timeline, setTimeline] = useState<GlossToken[]>([]);
  const [detectedWord, setDetectedWord] = useState<GlossToken | null>(null);
  const [sentence, setSentence] = useState<{ state: SentenceState; text: string }>({
    state: "idle",
    text: "",
  });
  const [history, setHistory] = useState<Turn[]>(INITIAL_HEARING_TURNS);
  const [speaking, setSpeaking] = useState(false);
  const [copied, setCopied] = useState(false);
  const [muted, setMuted] = useState(false);

  const tickRef = useRef(0);
  const speakTimer = useRef<number | null>(null);

  useEffect(() => () => {
    stopSpeaking();
    if (speakTimer.current) window.clearTimeout(speakTimer.current);
  }, []);

  const start = useCallback(() => {
    stopSpeaking();
    setRunning(true);
    setElapsed(0);
    setTimeline([]);
    setDetectedWord(null);
    setSentence({ state: "idle", text: "" });
    setStages(mockPipeline().map((s) => ({ ...s, status: "green" as const })));
    toast.success("Session started", {
      description: "Sign in front of your camera — recognition is live.",
    });
  }, []);

  const stop = useCallback(() => {
    setRunning(false);
    stopSpeaking();
    if (speakTimer.current) window.clearTimeout(speakTimer.current);
    setSpeaking(false);
    setStages((prev) =>
      prev.map((s) =>
        s.key === "mediapipe" || s.key === "llm"
          ? { ...s, status: "yellow" as const, detail: "Idle — start a session" }
          : s.key === "recognition"
            ? { ...s, status: "muted" as const, detail: "Waiting for camera" }
            : s,
      ),
    );
    toast("Session ended", { description: "Saved to conversation history." });
  }, []);

  useInterval(
    () => {
      if (!running) return;
      setElapsed((e) => e + 1);
      setFps(Math.round(rand(30, 60)));
      setLatency(Math.round(rand(140, 320)));

      const token = MOCK_SIGNS[Math.floor(Math.random() * MOCK_SIGNS.length)];
      const jittered = { ...token, confidence: Math.max(0.4, Math.min(0.99, token.confidence + rand(-0.12, 0.05))) };
      setDetectedWord(jittered);
      setTimeline((prev) => [...prev.slice(-9), jittered]);

      tickRef.current += 1;
      if (tickRef.current % 4 === 0) {
        const text = MOCK_SENTENCES[Math.floor(Math.random() * MOCK_SENTENCES.length)];
        setSentence({ state: "composing", text: "" });
        window.setTimeout(() => {
          setSentence({ state: "ready", text });
          setHistory((prev) => [
            ...prev,
            { id: `h-${Date.now()}`, role: "self", text, confidence: rand(0.82, 0.98), at: Date.now() },
          ]);
          if (autoSpeak && !muted) playSpeech(text);
        }, 900);
      }
    },
    running ? 1500 : null,
  );

  const playSpeech = useCallback(
    (text: string) => {
      if (speaking) {
        stopSpeaking();
        setSpeaking(false);
        return;
      }
      const ok = speak(text, speechRate);
      if (!ok) {
        toast.error("Speech isn't supported in this browser");
        return;
      }
      setSpeaking(true);
      const duration = Math.max(1200, text.length * 60);
      if (speakTimer.current) window.clearTimeout(speakTimer.current);
      speakTimer.current = window.setTimeout(() => setSpeaking(false), duration);
    },
    [speaking, speechRate],
  );

  const handleCopy = () => {
    if (!sentence.text) return;
    copyText(sentence.text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
    toast.success("Sentence copied");
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.matches("input, textarea, select, [contenteditable]")) return;
      if (e.code === "Space" && sentence.state === "ready") {
        e.preventDefault();
        playSpeech(sentence.text);
      }
      if (e.key.toLowerCase() === "c" && sentence.text) {
        handleCopy();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const retry = () => {
    stopSpeaking();
    setStages(mockPipeline().map((s) => ({ ...s, status: "green" as const })));
    toast.success("Pipeline reconnected");
  };

  return (
    <PageTransition>
      <div className="space-y-6">
        {/* Session topbar */}
        <div className="flex flex-wrap items-center gap-3">
          <Button asChild variant="ghost" size="sm" className="gap-1.5">
            <Link to="/mode">
              <ArrowLeft className="h-4 w-4" /> Back
            </Link>
          </Button>
          <span className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1.5 text-sm font-medium">
            <Activity className="h-4 w-4 text-primary" aria-hidden="true" />
            Session #4821
          </span>
          <span className="font-mono text-sm text-muted-foreground tabular">
            {Math.floor(elapsed / 60).toString().padStart(2, "0")}:
            {(elapsed % 60).toString().padStart(2, "0")}
          </span>
          <div className="ml-auto flex items-center gap-2">
            <Button
              variant={running ? "destructive" : "default"}
              onClick={running ? stop : start}
              className="gap-2"
            >
              {running ? <><Square className="h-4 w-4" /> End session</> : <>Start signing</>}
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
          {/* Left column */}
          <div className="space-y-6">
            <CameraPlaceholder
              running={running}
              fps={fps}
              latency={latency}
              muted={muted}
              onToggleMute={() => setMuted((m) => !m)}
              onSwitchCamera={() => toast.info("Switching camera (demo)")}
            />

            <div className="grid gap-6 sm:grid-cols-2">
              {/* Recognition result card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquareText className="h-4 w-4 text-primary" aria-hidden="true" />
                    Recognized sign
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={detectedWord ? detectedWord.gloss : "idle"}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.15 }}
                      className="flex min-h-[64px] items-center"
                    >
                      {detectedWord ? (
                        <div className="flex w-full flex-col gap-3">
                          <div className="flex items-end justify-between">
                            <span className="text-4xl font-semibold tracking-tight">
                              {detectedWord.gloss}
                            </span>
                            <Badge variant={detectedWord.confidence >= 0.8 ? "success" : "warning"}>
                              {Math.round(detectedWord.confidence * 100)}%
                            </Badge>
                          </div>
                          <ConfidenceBar value={detectedWord.confidence * 100} />
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">Awaiting sign…</p>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </CardContent>
              </Card>

              {/* Sentence card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between gap-2">
                    <span className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-accent-live" aria-hidden="true" />
                      Generated sentence
                    </span>
                    <Badge variant={sentence.state === "ready" ? "live" : "secondary"}>
                      {sentence.state === "ready" ? "AI ready" : sentence.state === "composing" ? "Composing…" : "Idle"}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div
                    className={cn(
                      "min-h-[88px] rounded-xl border-l-4 bg-muted/40 p-4",
                      sentence.state === "ready" ? "border-accent-live" : "border-border",
                    )}
                  >
                    {sentence.state === "idle" && (
                      <p className="text-sm text-muted-foreground">Your sentence will appear here.</p>
                    )}
                    {sentence.state === "composing" && (
                      <p className="skeleton-shimmer h-4 w-3/4 rounded" aria-hidden="true" />
                    )}
                    {sentence.state === "ready" && (
                      <motion.p
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xl font-medium leading-relaxed"
                      >
                        {sentence.text}
                      </motion.p>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <Button
                      variant={speaking ? "secondary" : "default"}
                      size="lg"
                      disabled={sentence.state !== "ready"}
                      onClick={() => playSpeech(sentence.text)}
                      className="min-w-[132px] gap-2"
                    >
                      {speaking ? (
                        <span className="flex h-4 items-end gap-[3px]" aria-hidden="true">
                          <span className="w-[3px] animate-eq rounded-full bg-current" style={{ height: "100%", animationDelay: "0ms" }} />
                          <span className="w-[3px] animate-eq rounded-full bg-current" style={{ height: "100%", animationDelay: "150ms" }} />
                          <span className="w-[3px] animate-eq rounded-full bg-current" style={{ height: "100%", animationDelay: "300ms" }} />
                        </span>
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                      {speaking ? "Pause" : "Play speech"}
                    </Button>
                    <Button variant="outline" size="lg" disabled={!sentence.text} onClick={handleCopy}>
                      {copied ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
                      {copied ? "Copied" : "Copy"}
                    </Button>
                    <div className="flex items-center gap-2">
                      <Switch id="autospeak" checked={autoSpeak} onCheckedChange={setAutoSpeak} />
                      <Label htmlFor="autospeak" className="text-sm">Auto-speak</Label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Prediction timeline */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-primary" aria-hidden="true" />
                  Prediction timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                {timeline.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Sign to see live predictions.</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {timeline.map((token, i) => (
                      <motion.span
                        key={`${token.gloss}-${i}`}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.15 }}
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium",
                          token.confidence >= 0.8
                            ? "border-success/30 bg-success/10 text-success"
                            : "border-warning/30 bg-warning/10 text-warning",
                        )}
                      >
                        {token.gloss}
                        <span className="font-mono text-[11px] tabular opacity-70">
                          {Math.round(token.confidence * 100)}
                        </span>
                      </motion.span>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* AI status panel */}
            <Card>
              <CardHeader className="flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-primary" aria-hidden="true" />
                  AI pipeline
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={retry} className="gap-1.5 text-xs">
                  <RotateCcw className="h-3.5 w-3.5" /> Retry
                </Button>
              </CardHeader>
              <CardContent>
                <StatusWidget stages={stages} pulseKeys={running ? ["mediapipe", "tts", "camera"] : []} />
                <div className="mt-4 grid grid-cols-2 gap-3 border-t pt-4">
                  <div className="rounded-xl bg-muted/50 p-3">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">Model</p>
                    <p className="mt-1 text-sm font-semibold">Gloss v2</p>
                  </div>
                  <div className="rounded-xl bg-muted/50 p-3">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">Dataset</p>
                    <p className="mt-1 text-sm font-semibold">ASL-500</p>
                  </div>
                  <div className="rounded-xl bg-muted/50 p-3">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">GPU</p>
                    <p className="mt-1 text-sm font-semibold tabular">WebGL · 41%</p>
                  </div>
                  <div className="rounded-xl bg-muted/50 p-3">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">Speech rate</p>
                    <p className="mt-1 text-sm font-semibold tabular">{speechRate.toFixed(1)}×</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Conversation history sidebar */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <MessageSquareText className="h-4 w-4 text-primary" aria-hidden="true" />
                    Conversation
                  </span>
                  <span className="text-xs font-normal text-muted-foreground tabular">
                    {history.length} turns
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <TurnList turns={history} className="max-h-[420px] pr-1" />
              </CardContent>
            </Card>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          Keyboard: <kbd className="rounded border bg-background px-1 font-mono">Space</kbd> play/pause ·{" "}
          <kbd className="rounded border bg-background px-1 font-mono">C</kbd> copy ·{" "}
          <kbd className="rounded border bg-background px-1 font-mono">S</kbd> start/stop
        </p>
      </div>
    </PageTransition>
  );
}
