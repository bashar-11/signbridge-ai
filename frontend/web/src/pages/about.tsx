import {
  Heart,
  Network,
  Brain,
  Database,
  Users,
  ScrollText,
  Sparkles,
  Globe,
  ShieldCheck,
} from "lucide-react";
import { PageTransition } from "@/components/page-transition";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { TEAM, DATASETS } from "@/lib/mock";

const MODELS = [
  { name: "MediaPipe Hands", role: "Hand & landmark tracking", version: "0.4" },
  { name: "SignBridge Gloss v2", role: "Gloss classification", version: "2.0.1" },
  { name: "LLM Sentence Composer", role: "Natural sentence generation", version: "8B" },
  { name: "Neural TTS", role: "Speech synthesis", version: "1.4" },
  { name: "STT Engine", role: "Speech-to-text subtitles", version: "3.2" },
];

export function AboutPage() {
  return (
    <PageTransition>
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="space-y-2">
          <Badge variant="live">v0.1.0-beta</Badge>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            About SignBridge
          </h1>
          <p className="max-w-2xl text-muted-foreground">
            SignBridge is an open, accessibility-first platform that makes real-time
            communication between Deaf and Hearing people effortless.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-primary" aria-hidden="true" /> The project
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p>
              Every day, millions of Deaf people face unnecessary barriers in simple
              conversations — at the doctor's office, the bank, or a job interview.
              SignBridge removes those barriers with AI that understands sign language and
              speaks it back, and transcribes speech into clear subtitles.
            </p>
            <p>
              We build with the Deaf community, not just for it: high-contrast themes, large
              type, calm motion, and full keyboard and screen-reader support are the default,
              not an afterthought.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Network className="h-4 w-4 text-primary" aria-hidden="true" /> Architecture
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
              {["Camera", "MediaPipe", "Gloss model", "LLM", "TTS", "Speech"].map((step, i, arr) => (
                <div key={step} className="flex flex-1 flex-col items-center gap-2 sm:flex-row">
                  <div className="flex h-14 w-full items-center justify-center rounded-xl border bg-muted/40 px-3 text-center text-xs font-medium sm:w-auto">
                    {step}
                  </div>
                  {i < arr.length - 1 && (
                    <span className="hidden text-muted-foreground sm:block" aria-hidden="true">→</span>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-4 w-4 text-primary" aria-hidden="true" /> AI models
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Model</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="text-right">Version</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MODELS.map((m) => (
                  <TableRow key={m.name}>
                    <TableCell className="font-medium">{m.name}</TableCell>
                    <TableCell className="text-muted-foreground">{m.role}</TableCell>
                    <TableCell className="text-right font-mono text-xs tabular">{m.version}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-4 w-4 text-primary" aria-hidden="true" /> Datasets
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="text-right">Clips</TableHead>
                  <TableHead className="text-right">Glosses</TableHead>
                  <TableHead>License</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {DATASETS.map((d) => (
                  <TableRow key={d.name}>
                    <TableCell className="font-medium">{d.name}</TableCell>
                    <TableCell className="text-right tabular">{d.samples.toLocaleString()}</TableCell>
                    <TableCell className="text-right tabular">{d.glosses}</TableCell>
                    <TableCell className="text-muted-foreground">{d.license}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" aria-hidden="true" /> Team
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            {TEAM.map((member) => (
              <div key={member.name} className="flex items-center gap-3 rounded-xl border p-4">
                <Avatar className="h-11 w-11">
                  <AvatarFallback className="bg-primary/10 font-semibold text-primary">
                    {member.name.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold">{member.name}</p>
                  <p className="text-xs text-muted-foreground">{member.role}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ScrollText className="h-4 w-4 text-primary" aria-hidden="true" /> License & version
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap items-center gap-3 text-sm">
            <Badge variant="secondary">MIT License</Badge>
            <Badge variant="secondary">v0.1.0-beta</Badge>
            <span className="inline-flex items-center gap-1.5 text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-success" /> Accessibility-first · WCAG 2.2 AA
            </span>
            <span className="inline-flex items-center gap-1.5 text-muted-foreground">
              <Globe className="h-4 w-4 text-info" /> 40+ languages planned
            </span>
            <span className="inline-flex items-center gap-1.5 text-muted-foreground">
              <Sparkles className="h-4 w-4 text-warning" /> Open datasets
            </span>
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  );
}
