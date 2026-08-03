import { useState } from "react";
import {
  Palette,
  Volume2,
  Webcam,
  Languages,
  Accessibility,
  Bell,
  SlidersHorizontal,
  Check,
  Sun,
  Moon,
  Monitor,
  Gauge,
  Play,
  KeyRound,
  Download,
  Trash2,
  Type,
  Contrast,
} from "lucide-react";
import { toast } from "sonner";
import { PageTransition } from "@/components/page-transition";
import { useSettings } from "@/components/settings-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { VOICES } from "@/lib/mock";

type Theme = "light" | "dark" | "system";

const THEMES: { value: Theme; label: string; icon: typeof Sun }[] = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
];

function SettingRow({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-0.5">
        <p className="text-sm font-medium">{title}</p>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
      <div className="sm:w-64 sm:shrink-0">{children}</div>
    </div>
  );
}

function SectionCard({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Palette;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-primary" aria-hidden="true" /> {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="divide-y">{children}</CardContent>
    </Card>
  );
}

export function SettingsPage() {
  const s = useSettings();
  const [deviceStatus, setDeviceStatus] = useState<Record<string, "green" | "yellow">>({
    camera: "green",
    mic: "green",
    speaker: "green",
  });
  const [voice, setVoice] = useState(VOICES[0].id);

  const testDevice = (device: keyof typeof deviceStatus, name: string) => {
    setDeviceStatus((prev) => ({ ...prev, [device]: "yellow" }));
    toast.loading(`Testing ${name}…`);
    window.setTimeout(() => {
      setDeviceStatus((prev) => ({ ...prev, [device]: "green" }));
      toast.success(`${name} works`, { description: "Signal detected." });
    }, 900);
  };

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>
            <p className="text-muted-foreground">
              Changes save automatically. Everything is stored locally for now.
            </p>
          </div>
          <Badge variant="success">
            <Check className="h-3 w-3" /> Saved
          </Badge>
        </div>

        <Tabs defaultValue="appearance">
          <TabsList className="flex h-auto w-full flex-wrap sm:w-auto">
            <TabsTrigger value="appearance"><Palette /> Appearance</TabsTrigger>
            <TabsTrigger value="audio"><Volume2 /> Audio</TabsTrigger>
            <TabsTrigger value="devices"><Webcam /> Devices</TabsTrigger>
            <TabsTrigger value="language"><Languages /> Language</TabsTrigger>
            <TabsTrigger value="accessibility"><Accessibility /> Accessibility</TabsTrigger>
            <TabsTrigger value="notifications"><Bell /> Notifications</TabsTrigger>
            <TabsTrigger value="developer"><SlidersHorizontal /> Developer</TabsTrigger>
          </TabsList>

          <TabsContent value="appearance" className="space-y-6">
            <SectionCard icon={Palette} title="Theme">
              <SettingRow title="Color mode" description="Choose how SignBridge looks.">
                <div className="flex gap-2">
                  {THEMES.map(({ value, label, icon: Icon }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => s.setTheme(value)}
                      className={cn(
                        "flex h-24 flex-1 flex-col items-center justify-center gap-2 rounded-xl border text-sm font-medium transition-colors focus-ring",
                        s.theme === value
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-border hover:bg-accent",
                      )}
                      aria-pressed={s.theme === value}
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                      {label}
                    </button>
                  ))}
                </div>
              </SettingRow>
            </SectionCard>

            <SectionCard icon={Type} title="Text size">
              <SettingRow title="Interface text size" description="Scales the entire interface.">
                <div className="flex items-center gap-3">
                  {[1, 2, 3, 4].map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => s.setTextSize(size as 1 | 2 | 3 | 4)}
                      className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-xl border font-semibold transition-colors focus-ring",
                        s.textSize === size ? "border-primary bg-primary/5 text-primary" : "border-border hover:bg-accent",
                      )}
                      style={{ fontSize: `${9 + size * 1.5}px` }}
                      aria-pressed={s.textSize === size}
                      aria-label={`Text size ${size} of 4`}
                    >
                      A
                    </button>
                  ))}
                </div>
              </SettingRow>
            </SectionCard>

            <SectionCard icon={Contrast} title="Contrast">
              <SettingRow
                title="High contrast mode"
                description="Maximum contrast for low-vision users (white on black)."
              >
                <Switch checked={s.highContrast} onCheckedChange={s.setHighContrast} />
              </SettingRow>
              <SettingRow title="Reduced motion" description="Minimize animations and transitions.">
                <Switch checked={s.reduceMotion} onCheckedChange={s.setReduceMotion} />
              </SettingRow>
            </SectionCard>
          </TabsContent>

          <TabsContent value="audio" className="space-y-6">
            <SectionCard icon={Volume2} title="Speech output">
              <SettingRow title="Voice" description="Used for spoken sentences in Hearing mode.">
                <Select value={voice} onValueChange={setVoice}>
                  <SelectTrigger aria-label="Select voice">
                    <SelectValue placeholder="Choose a voice" />
                  </SelectTrigger>
                  <SelectContent>
                    {VOICES.map((v) => (
                      <SelectItem key={v.id} value={v.id}>{v.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </SettingRow>
              <SettingRow title="Speech speed" description="How fast sentences are spoken.">
                <div className="flex items-center gap-4">
                  <Gauge className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                  <Slider
                    value={[s.speechRate]}
                    min={0.5}
                    max={1.5}
                    step={0.1}
                    onValueChange={([v]) => s.setSpeechRate(v)}
                    aria-label="Speech speed"
                  />
                  <span className="w-10 text-right font-mono text-sm tabular">{s.speechRate.toFixed(1)}×</span>
                </div>
              </SettingRow>
              <SettingRow title="Auto-speak" description="Speak sentences automatically after recognition.">
                <Switch checked={s.autoSpeak} onCheckedChange={s.setAutoSpeak} />
              </SettingRow>
              <SettingRow title="Preview voice">
                <Button variant="outline" size="sm" className="gap-1.5" onClick={() => toast.info("Previewing voice (demo)")}>
                  <Play className="h-4 w-4" /> Test voice
                </Button>
              </SettingRow>
            </SectionCard>
          </TabsContent>

          <TabsContent value="devices" className="space-y-6">
            <SectionCard icon={Webcam} title="Devices">
              <SettingRow
                title="Camera"
                description="Used for sign recognition in Hearing mode."
              >
                <div className="flex items-center gap-2">
                  <Select defaultValue="builtin">
                    <SelectTrigger className="flex-1" aria-label="Select camera">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="builtin">Built-in webcam</SelectItem>
                      <SelectItem value="usb">USB Camera 4K</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="iconSm" aria-label="Test camera" onClick={() => testDevice("camera", "Camera")}>
                    <Play />
                  </Button>
                  <Badge variant={deviceStatus.camera === "green" ? "success" : "warning"}>
                    {deviceStatus.camera === "green" ? "Ready" : "Testing"}
                  </Badge>
                </div>
              </SettingRow>

              <SettingRow
                title="Microphone"
                description="Used for live transcription in Deaf mode."
              >
                <div className="flex items-center gap-2">
                  <Select defaultValue="usb-mic">
                    <SelectTrigger className="flex-1" aria-label="Select microphone">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usb-mic">USB Microphone</SelectItem>
                      <SelectItem value="builtin-mic">Built-in microphone</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="iconSm" aria-label="Test microphone" onClick={() => testDevice("mic", "Microphone")}>
                    <Play />
                  </Button>
                  <Badge variant={deviceStatus.mic === "green" ? "success" : "warning"}>
                    {deviceStatus.mic === "green" ? "Ready" : "Testing"}
                  </Badge>
                </div>
              </SettingRow>

              <SettingRow title="Speakers" description="Audio output for speech playback.">
                <div className="flex items-center gap-2">
                  <Select defaultValue="default">
                    <SelectTrigger className="flex-1" aria-label="Select speakers">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">System default</SelectItem>
                      <SelectItem value="headphones">Headphones</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="iconSm" aria-label="Test speakers" onClick={() => testDevice("speaker", "Speakers")}>
                    <Play />
                  </Button>
                  <Badge variant={deviceStatus.speaker === "green" ? "success" : "warning"}>
                    {deviceStatus.speaker === "green" ? "Ready" : "Testing"}
                  </Badge>
                </div>
              </SettingRow>
            </SectionCard>
          </TabsContent>

          <TabsContent value="language" className="space-y-6">
            <SectionCard icon={Languages} title="Language">
              <SettingRow title="Interface language" description="The language of the app itself.">
                <Select defaultValue="en">
                  <SelectTrigger aria-label="Interface language">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="de">Deutsch</SelectItem>
                  </SelectContent>
                </Select>
              </SettingRow>
              <SettingRow title="Recognition language" description="Sign language variety (experimental).">
                <Select defaultValue="asl">
                  <SelectTrigger aria-label="Recognition language">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asl">American Sign Language (ASL)</SelectItem>
                    <SelectItem value="bsl">British Sign Language (BSL) — soon</SelectItem>
                    <SelectItem value="is">International Signs — soon</SelectItem>
                  </SelectContent>
                </Select>
              </SettingRow>
              <SettingRow title="Subtitle language" description="Language for transcribed subtitles.">
                <Select defaultValue="en">
                  <SelectTrigger aria-label="Subtitle language">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                  </SelectContent>
                </Select>
              </SettingRow>
            </SectionCard>
          </TabsContent>

          <TabsContent value="accessibility" className="space-y-6">
            <SectionCard icon={Accessibility} title="Subtitles">
              <SettingRow title="Subtitle size" description="Size of live subtitles in Deaf mode.">
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4].map((n) => (
                    <Button
                      key={n}
                      variant={s.textSize === n ? "default" : "outline"}
                      size="sm"
                      onClick={() => s.setTextSize(n as 1 | 2 | 3 | 4)}
                    >
                      A{n}
                    </Button>
                  ))}
                </div>
              </SettingRow>
              <SettingRow title="Subtitle contrast" description="High-contrast subtitle panel.">
                <Switch checked={s.highContrast} onCheckedChange={s.setHighContrast} />
              </SettingRow>
            </SectionCard>

            <SectionCard icon={Accessibility} title="General">
              <SettingRow title="High contrast mode" description="WCAG-friendly white-on-black theme.">
                <Switch checked={s.highContrast} onCheckedChange={s.setHighContrast} />
              </SettingRow>
              <SettingRow title="Reduce motion" description="Turn off all non-essential animation.">
                <Switch checked={s.reduceMotion} onCheckedChange={s.setReduceMotion} />
              </SettingRow>
              <SettingRow title="Show keyboard shortcuts" description="View the full shortcut list.">
                <Button variant="outline" size="sm" onClick={() => window.dispatchEvent(new CustomEvent("open-shortcuts"))}>
                  Open shortcuts
                </Button>
              </SettingRow>
            </SectionCard>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <SectionCard icon={Bell} title="Notifications">
              <SettingRow title="Session ended" description="Notify when a session stops.">
                <Switch defaultChecked />
              </SettingRow>
              <SettingRow title="AI service offline" description="Alert if the AI pipeline goes down.">
                <Switch defaultChecked />
              </SettingRow>
              <SettingRow title="Weekly summary" description="A digest of your conversations.">
                <Switch />
              </SettingRow>
              <SettingRow title="Product updates" description="News about new features and datasets.">
                <Switch />
              </SettingRow>
            </SectionCard>
          </TabsContent>

          <TabsContent value="developer" className="space-y-6">
            <SectionCard icon={SlidersHorizontal} title="Models & data">
              <SettingRow title="Recognition model" description="Model used for sign recognition.">
                <Select defaultValue="v2">
                  <SelectTrigger aria-label="Recognition model">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="v2">SignBridge Gloss v2 (recommended)</SelectItem>
                    <SelectItem value="v1">SignBridge Gloss v1 (legacy)</SelectItem>
                  </SelectContent>
                </Select>
              </SettingRow>
              <SettingRow title="Dataset" description="Dataset used for evaluation.">
                <Select defaultValue="asl500">
                  <SelectTrigger aria-label="Dataset">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asl500">ASL-500 · 12k clips</SelectItem>
                    <SelectItem value="asl200">ASL-200 · 4k clips</SelectItem>
                  </SelectContent>
                </Select>
              </SettingRow>
              <SettingRow title="API endpoint" description="Backend is not wired up yet — this is a placeholder.">
                <Input defaultValue="https://api.signbridge.app" className="font-mono text-xs" />
              </SettingRow>
              <SettingRow title="API key" description="Kept only in your browser.">
                <div className="relative">
                  <KeyRound className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                  <Input type="password" defaultValue="sb_live_••••••••••••••••" className="pl-11 font-mono text-xs" />
                </div>
              </SettingRow>
            </SectionCard>

            <SectionCard icon={Download} title="Data">
              <SettingRow title="Export all data" description="Download every conversation as JSON.">
                <Button variant="outline" size="sm" className="gap-1.5" onClick={() => toast.success("Export started (demo)")}>
                  <Download className="h-4 w-4" /> Export
                </Button>
              </SettingRow>
              <SettingRow title="Delete account" description="Permanently delete all data.">
                <Button
                  variant="destructive"
                  size="sm"
                  className="gap-1.5"
                  onClick={() => toast.error("This is protected in production", { description: "Account deletion is mocked." })}
                >
                  <Trash2 className="h-4 w-4" /> Delete account
                </Button>
              </SettingRow>
            </SectionCard>

            <Separator />
            <p className="text-xs text-muted-foreground">
              SignBridge v0.1.0-beta · Environment: development · Privacy: all data stays on your device.
            </p>
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
}
