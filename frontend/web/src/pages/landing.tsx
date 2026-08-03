import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Video,
  Mic,
  Sparkles,
  AudioLines,
  Star,
  MoveRight,
  Camera,
  Brain,
  MessageSquareText,
  Volume2,
  ArrowRight,
  Github,
  Twitter,
  Linkedin,
} from "lucide-react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const } },
};

const FEATURES = [
  {
    icon: Video,
    title: "Live sign recognition",
    body: "MediaPipe tracks every hand and landmark in real time, so your signs are understood the moment they're made.",
  },
  {
    icon: Sparkles,
    title: "Natural sentence AI",
    body: "Recognized glosses are composed into fluent, natural sentences by an LLM — no robotic fragments.",
  },
  {
    icon: AudioLines,
    title: "Speak out loud",
    body: "Generated sentences are spoken with clear, natural text-to-speech, bridging the gap instantly.",
  },
];

const STEPS = [
  { step: "01", title: "Open your camera", body: "Start a Hearing session and face the camera." },
  { step: "02", title: "Sign naturally", body: "MediaPipe tracks landmarks at up to 60 FPS." },
  { step: "03", title: "AI composes", body: "Glosses become natural sentences via the LLM." },
  { step: "04", title: "Speech is spoken", body: "Clear TTS delivers your message out loud." },
];

const WORKFLOW = [
  { icon: Camera, label: "Camera" },
  { icon: Brain, label: "MediaPipe" },
  { icon: Sparkles, label: "AI Recognition" },
  { icon: MessageSquareText, label: "LLM" },
  { icon: AudioLines, label: "Sentence" },
  { icon: Volume2, label: "Text to Speech" },
];

export function LandingPage() {
  return (
    <div className="min-h-dvh bg-background">
      {/* Top nav */}
      <header className="glass sticky top-0 z-40 border-b">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" aria-label="SignBridge home">
            <Logo />
          </Link>
          <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
            <a href="#features" className="transition-colors hover:text-foreground">Features</a>
            <a href="#how-it-works" className="transition-colors hover:text-foreground">How it works</a>
            <a href="#workflow" className="transition-colors hover:text-foreground">AI workflow</a>
            <a href="#about" className="transition-colors hover:text-foreground">About</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
              <Link to="/mode">Sign in</Link>
            </Button>
            <Button asChild>
              <Link to="/mode">Get started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 lg:px-8 lg:pb-28 lg:pt-24">
        <motion.div initial="hidden" animate="show" className="mx-auto max-w-3xl text-center">
          <motion.div variants={fadeUp}>
            <Badge variant="live" className="mb-6 px-3 py-1">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-live opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-live" />
              </span>
              Real-time AI · now in beta
            </Badge>
          </motion.div>
          <motion.h1
            variants={fadeUp}
            className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl"
          >
            Real-time communication between{" "}
            <span className="text-primary">Deaf</span> and{" "}
            <span className="text-accent-live">Hearing</span> people.
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
          >
            SignBridge recognizes sign language from your camera, turns it into natural
            sentences, and speaks them aloud — and transcribes speech into clear, readable
            subtitles for Deaf users.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="xl" className="w-full sm:w-auto">
              <Link to="/mode">
                Start for free <MoveRight />
              </Link>
            </Button>
            <Button asChild size="xl" variant="outline" className="w-full sm:w-auto">
              <a href="#how-it-works">Watch how it works</a>
            </Button>
          </motion.div>
          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground"
          >
            <span className="inline-flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-warning text-warning" /> 4.9 from 800+ reviews
            </span>
            <span>12,000+ conversations</span>
            <span>40+ languages (soon)</span>
          </motion.div>
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="border-t bg-surface py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4 }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Built for both sides of the conversation
            </h2>
            <p className="mt-4 text-muted-foreground">
              Two modes, one mission: remove the barrier between sign language and speech.
            </p>
          </motion.div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {FEATURES.map(({ icon: Icon, title, body }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <Card className="card-hover h-full">
                  <CardContent className="flex h-full flex-col gap-4 p-8">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4 }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">How it works</h2>
            <p className="mt-4 text-muted-foreground">
              From sign to spoken word in four seamless steps.
            </p>
          </motion.div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map(({ step, title, body }, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="relative rounded-2xl border bg-card p-6 shadow-card"
              >
                <span className="font-mono text-sm font-semibold text-accent-live">{step}</span>
                <h3 className="mt-3 text-base font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI workflow */}
      <section id="workflow" className="border-y bg-gradient-to-br from-primary/5 via-background to-accent-live/5 py-20 lg:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              The AI pipeline, transparent
            </h2>
            <p className="mt-4 text-muted-foreground">
              Every stage reports live status — you always know your system is healthy.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4 }}
            className="mt-12 flex flex-col items-center justify-center gap-3 lg:flex-row"
          >
            {WORKFLOW.map(({ icon: Icon, label }, i) => (
              <div key={label} className="flex flex-col items-center gap-3 sm:flex-row">
                <div className="flex h-16 w-16 flex-col items-center justify-center gap-1.5 rounded-2xl border bg-card shadow-card">
                  <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                  <span className="text-[10px] font-medium text-muted-foreground">{label}</span>
                </div>
                {i < WORKFLOW.length - 1 && (
                  <ArrowRight className="hidden h-5 w-5 text-muted-foreground/50 sm:block" aria-hidden="true" />
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About teaser */}
      <section id="about" className="py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4 }}
          >
            <Badge variant="secondary" className="mb-4">Our mission</Badge>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Communication is a human right.
            </h2>
            <p className="mt-4 text-muted-foreground">
              SignBridge was built with Deaf communities, for Deaf communities. Every design
              decision — high contrast, large type, calm motion — starts from accessibility.
            </p>
            <p className="mt-4 text-muted-foreground">
              Our open datasets and transparent model roadmap mean the technology belongs to
              everyone who needs it.
            </p>
            <Button asChild className="mt-8">
              <Link to="/about">Learn more about the project</Link>
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="rounded-2xl border bg-card p-6 shadow-card">
              <Mic className="h-6 w-6 text-info" aria-hidden="true" />
              <p className="mt-4 text-3xl font-semibold tabular">98%</p>
              <p className="text-sm text-muted-foreground">subtitle accuracy</p>
            </div>
            <div className="rounded-2xl border bg-card p-6 shadow-card">
              <Video className="h-6 w-6 text-primary" aria-hidden="true" />
              <p className="mt-4 text-3xl font-semibold tabular">&lt;300ms</p>
              <p className="text-sm text-muted-foreground">end-to-end latency</p>
            </div>
            <div className="rounded-2xl border bg-card p-6 shadow-card">
              <Sparkles className="h-6 w-6 text-warning" aria-hidden="true" />
              <p className="mt-4 text-3xl font-semibold tabular">500</p>
              <p className="text-sm text-muted-foreground">recognized glosses</p>
            </div>
            <div className="rounded-2xl border bg-card p-6 shadow-card">
              <AudioLines className="h-6 w-6 text-success" aria-hidden="true" />
              <p className="mt-4 text-3xl font-semibold tabular">12k</p>
              <p className="text-sm text-muted-foreground">training samples</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20 lg:pb-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4 }}
            className="rounded-3xl border bg-gradient-to-br from-primary to-primary/80 p-10 text-center text-primary-foreground shadow-float lg:p-16"
          >
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Start your first conversation today
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">
              No setup, no cards, no friction. Just open SignBridge and communicate.
            </p>
            <Button
              asChild
              size="xl"
              variant="secondary"
              className="mt-8 w-full text-primary sm:w-auto"
            >
              <Link to="/mode">Get started free</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-10 md:grid-cols-[2fr_1fr_1fr_1fr]">
            <div>
              <Logo />
              <p className="mt-4 max-w-xs text-sm text-muted-foreground">
                Speak without barriers. AI-powered communication between Deaf and Hearing people.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Product</h3>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li><Link className="hover:text-foreground" to="/hearing">Hearing mode</Link></li>
                <li><Link className="hover:text-foreground" to="/deaf">Deaf mode</Link></li>
                <li><Link className="hover:text-foreground" to="/history">Conversations</Link></li>
                <li><Link className="hover:text-foreground" to="/about">Roadmap</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Resources</h3>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li><Link className="hover:text-foreground" to="/about">Documentation</Link></li>
                <li><Link className="hover:text-foreground" to="/about">API</Link></li>
                <li><Link className="hover:text-foreground" to="/about">Open datasets</Link></li>
                <li><Link className="hover:text-foreground" to="/about">Status</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Company</h3>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li><Link className="hover:text-foreground" to="/about">About</Link></li>
                <li><Link className="hover:text-foreground" to="/about">Team</Link></li>
                <li><Link className="hover:text-foreground" to="/about">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-6 sm:flex-row">
            <p className="text-sm text-muted-foreground">© 2026 SignBridge. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground">Privacy</Link>
              <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground">Terms</Link>
              <span className="flex items-center gap-3 text-muted-foreground">
                <a href="#" aria-label="GitHub"><Github className="h-4 w-4" /></a>
                <a href="#" aria-label="X (Twitter)"><Twitter className="h-4 w-4" /></a>
                <a href="#" aria-label="LinkedIn"><Linkedin className="h-4 w-4" /></a>
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
