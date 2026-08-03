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
  Captions,
  Mic,
  Send,
  AudioLines,
} from "lucide-react";
import { toast } from "sonner";
import { PageTransition } from "@/components/page-transition";
import { Waveform } from "@/components/shared/waveform";
import { AvatarPlaceholder } from "@/components/media/avatar-placeholder";
import { TurnList } from "@/components/shared/turn-list";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { StatusChip } from "@/components/shared/status-chip";
import { useInterval } from "@/hooks/use-interval";
import { copyText } from "@/lib/speech";
import { INITIAL_DEAF_TURNS, MOCK_SUBTITLES, type StageStatus, type Turn } from "@/lib/mock";

type MicState = "idle" | "listening" | "processing" | "error";

const micStatus: Record<MicState, StageStatus> = {
  idle: "muted",
  listening: "green",
  processing: "yellow",
  error: "red",
};

export function DeafPage() {
  const [listening, setListening] = useState(false);
  const [micState, setMicState] = useState<MicState>("idle");
  const [partial, setPartial] = useState("");
  const [subtitleLines, setSubtitleLines] = useState<string[]>([
    "Good morning! How can I help you today?",
  ]);
  const [turns, setTurns] = useState<Turn[]>(INITIAL_DEAF_TURNS);
  const [copied, setCopied] = useState(false);
  const [reply, setReply] = useState("");
  const [replying, setReplying] = useState(false);

  const lineIndex = useRef(0);
  const charIndex = useRef(0);
  const streamTimer = useRef<number | null>(null);

  const lastDone = subtitleLines[subtitleLines.length - 1] ?? "";

  const clearTimers = () => {
    if (streamTimer.current) window.clearInterval(streamTimer.current);
  };

  useEffect(() => () => clearTimers(), []);

  const streamNext = useCallback(() => {
    const text = MOCK_SUBTITLES[lineIndex.current % MOCK_SUBTITLES.length];
    lineIndex.current += 1;
    setMicState("processing");
    setPartial("");
    charIndex.current = 0;
    window.setTimeout(() => {
      setMicState("listening");
      streamTimer.current = window.setInterval(() => {
        charIndex.current += 2;
        const chunk = text.slice(0, charIndex.current);
        setPartial(chunk);
        if (charIndex.current >= text.length) {
          clearTimers();
          setSubtitleLines((prev) => [...prev.slice(-2), text]);
          setTurns((prev) => [
            ...prev,
            { id: `sd-${Date.now()}`, role: "other", text, at: Date.now() },
          ]);
          setPartial("");
          setMicState("listening");
        }
      }, 60);
    }, 500);
  }, []);

  const start = useCallback(() => {
    setListening(true);
    setMicState("listening");
    setSubtitleLines(["Good morning! How can I help you today?"]);
    lineIndex.current = 0;
    toast.success("Listening started", { description: "Subtitles are now live." });
  }, []);

  const stop = useCallback(() => {
    setListening(false);
    setMicState("idle");
    clearTimers();
    setPartial("");
    toast("Session ended", { description: "Saved to conversation history." });
  }, []);

  useInterval(
    () => {
      if (listening) streamNext();
    },
    listening ? 3200 : null,
  );

  const handleCopy = () => {
    if (!partial && !lastDone) return;
    copyText(partial || lastDone);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
    toast.success("Subtitle copied");
  };

  const repeatLast = () => {
    const text = partial || lastDone;
    if (!text) return;
    toast.info(`Repeating: “${text}”`, { description: "Speech playback is simulated." });
  };

  const sendReply = () => {
    if (!reply.trim()) return;
    setTurns((prev) => [
      ...prev,
      { id: `rp-${Date.now()}`, role: "self", text: reply.trim(), at: Date.now() },
    ]);
    setReply("");
    setReplying(false);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.matches("input, textarea, select, [contenteditable]")) return;
      if (e.code === "Space") {
        e.preventDefault();
        listening ? stop() : start();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

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
            <Captions className="h-4 w-4 text-primary" aria-hidden="true" />
            Session #4823
          </span>
          <StatusChip
            label={micState === "listening" ? "Listening" : micState === "processing" ? "Processing" : micState === "error" ? "Error" : "Microphone idle"}
            status={micStatus[micState]}
            pulse={micState === "listening"}
          />
          <div className="ml-auto flex items-center gap-2">
            <Button
              variant={listening ? "destructive" : "default"}
              onClick={listening ? stop : start}
              className="gap-2"
            >
              {listening ? <><Square className="h-4 w-4" /> Stop listening</> : <>Start listening</>}
            </Button>
          </div>
        </div>

        {/* Live subtitle panel */}
        <Card className="border-2 border-primary/20 bg-gradient-to-b from-card to-muted/40">
          <CardContent className="p-6 sm:p-8">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Badge variant={micState === "listening" ? "live" : "secondary"}>
                  <Mic className="h-3 w-3" aria-hidden="true" />
                  {micState === "listening" ? "Live subtitles" : micState === "processing" ? "Processing…" : "Ready"}
                </Badge>
                <span className="hidden items-center gap-2 text-sm text-muted-foreground sm:flex">
                  <AudioLines className="h-4 w-4" aria-hidden="true" /> Mic: Built-in microphone
                </span>
              </div>
              <div className="hidden sm:block">
                <Waveform active={micState === "listening"} />
              </div>
            </div>

            <div
              className="mt-6 min-h-[200px] rounded-2xl bg-background p-6 sm:p-8"
              role="log"
              aria-live="polite"
              aria-label="Live subtitles"
            >
              <AnimatePresence mode="popLayout">
                <motion.p
                  key={lastDone + "done"}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="text-subtitle font-semibold leading-tight text-foreground"
                >
                  {lastDone}
                </motion.p>
              </AnimatePresence>
              <p className="mt-3 text-2xl font-medium leading-snug text-muted-foreground sm:text-3xl">
                {partial}
                {micState === "listening" && partial && (
                  <span className="ml-0.5 inline-block h-6 w-0.5 animate-pulse bg-accent-live align-middle" aria-hidden="true" />
                )}
              </p>
              {!listening && !partial && (
                <p className="text-lg text-muted-foreground">
                  Press “Start listening” to begin live transcription.
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_240px]">
          {/* Conversation panel */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <span>Conversation</span>
                <span className="text-xs font-normal text-muted-foreground tabular">
                  {turns.length} turns
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <TurnList turns={turns} className="max-h-[340px] pr-1" />

              {replying ? (
                <div className="mt-4 flex flex-col gap-2 border-t pt-4">
                  <Textarea
                    placeholder="Type a reply…"
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        sendReply();
                      }
                    }}
                    rows={2}
                    autoFocus
                  />
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" onClick={() => setReplying(false)}>Cancel</Button>
                    <Button onClick={sendReply} className="gap-1.5">
                      <Send className="h-4 w-4" /> Send
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="mt-4 flex flex-wrap gap-2 border-t pt-4">
                  <Button variant="outline" size="sm" onClick={repeatLast} className="gap-1.5">
                    <Play className="h-4 w-4" /> Repeat last
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleCopy} className="gap-1.5">
                    {copied ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
                    {copied ? "Copied" : "Copy subtitle"}
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setReplying(true)} className="gap-1.5">
                    <Send className="h-4 w-4" /> Type reply
                  </Button>
                  <Button
                    variant="ghost"
                    size="iconSm"
                    aria-label="Reconnect microphone"
                    title="Reconnect microphone"
                    onClick={() => {
                      setMicState(listening ? "listening" : "idle");
                      toast.success("Microphone reconnected");
                    }}
                  >
                    <RotateCcw />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Avatar placeholder */}
          <div className="space-y-2">
            <AvatarPlaceholder animated={micState === "listening"} />
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          Keyboard: <kbd className="rounded border bg-background px-1 font-mono">Space</kbd> toggle microphone
        </p>
      </div>
    </PageTransition>
  );
}
