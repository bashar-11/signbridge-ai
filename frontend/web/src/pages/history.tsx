import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Download,
  Play,
  Trash2,
  Video,
  Mic,
  MoreVertical,
  Copy,
  Save,
  Inbox,
} from "lucide-react";
import { toast } from "sonner";
import { PageTransition } from "@/components/page-transition";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MOCK_CONVERSATIONS, type Conversation } from "@/lib/mock";
import { formatDate, formatDuration, relativeTime } from "@/lib/utils";

/**
 * Conversations record the direction of translation, not the role of the user:
 * "sign-speech" is a Deaf signer being rendered as speech, "speech-sign" is
 * speech being rendered as a sign. Deriving the filter from Conversation keeps
 * these two vocabularies from drifting apart again.
 */
type ModeFilter = "all" | Conversation["mode"];

const MODE_LABELS: Record<Conversation["mode"], string> = {
  "sign-speech": "Sign \u2192 Speech",
  "speech-sign": "Speech \u2192 Sign",
};

function exportConversation(conversation: Conversation, format: "json" | "txt" | "csv") {
  let content = "";
  let mime = "text/plain";
  let ext = "txt";
  if (format === "json") {
    content = JSON.stringify(conversation, null, 2);
    mime = "application/json";
    ext = "json";
  } else if (format === "csv") {
    const rows = conversation.turns.map((t) =>
      [t.role, `"${t.text.replace(/"/g, '""')}"`, new Date(t.at).toISOString()].join(","),
    );
    content = ["role,text,at", ...rows].join("\n");
    mime = "text/csv";
    ext = "csv";
  } else {
    content = conversation.turns.map((t) => `${t.role}: ${t.text}`).join("\n\n");
  }
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${conversation.title.replace(/\s+/g, "-").toLowerCase()}.${ext}`;
  a.click();
  URL.revokeObjectURL(url);
}

export function HistoryPage() {
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<ModeFilter>("all");
  const [deleteTarget, setDeleteTarget] = useState<Conversation | null>(null);
  const [exportTarget, setExportTarget] = useState<Conversation | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>(MOCK_CONVERSATIONS);

  const filtered = useMemo(() => {
    return conversations.filter((c) => {
      const matchesMode = mode === "all" || c.mode === mode;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.turns.some((t) => t.text.toLowerCase().includes(q));
      return matchesMode && matchesQuery;
    });
  }, [conversations, mode, query]);

  const handleDelete = () => {
    if (!deleteTarget) return;
    setConversations((prev) => prev.filter((c) => c.id !== deleteTarget.id));
    toast.success("Conversation deleted");
    setDeleteTarget(null);
  };

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-semibold tracking-tight">Conversation history</h1>
            <p className="text-muted-foreground">
              Every session is saved automatically. Search, filter, export, or delete.
            </p>
          </div>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" /> Export all
          </Button>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <Input
              placeholder="Search conversations…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-11"
              aria-label="Search conversations"
            />
          </div>
          <div className="flex gap-3">
            <Select value={mode} onValueChange={(v) => setMode(v as ModeFilter)}>
              <SelectTrigger className="w-44" aria-label="Filter by mode">
                <SelectValue placeholder="All modes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All modes</SelectItem>
                <SelectItem value="sign-speech">Sign &rarr; Speech</SelectItem>
                <SelectItem value="speech-sign">Speech &rarr; Sign</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            icon={query || mode !== "all" ? Search : Inbox}
            title={query || mode !== "all" ? "No matching conversations" : "No conversations yet"}
            description={
              query || mode !== "all"
                ? "Try a different search term or clear the filters."
                : "Start your first signing or listening session and it will appear here."
            }
            action={
              query || mode !== "all" ? (
                <Button variant="outline" onClick={() => { setQuery(""); setMode("all"); }}>
                  Clear filters
                </Button>
              ) : (
                <Button asChild>
                  <Link to="/mode">Start a conversation</Link>
                </Button>
              )
            }
          />
        ) : (
          <div className="overflow-hidden rounded-2xl border bg-card shadow-card">
            <div className="hidden md:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Mode</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Turns</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((c) => (
                    <TableRow key={c.id} className="group">
                      <TableCell className="font-medium">{c.title}</TableCell>
                      <TableCell>
                        <Badge variant={c.mode === "sign-speech" ? "default" : "live"}>
                          {c.mode === "sign-speech" ? <Mic className="h-3 w-3" /> : <Video className="h-3 w-3" />}
                          {MODE_LABELS[c.mode]}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        <span className="hidden lg:inline">{formatDate(c.createdAt)}</span>
                        <span className="lg:hidden">{relativeTime(c.createdAt)}</span>
                      </TableCell>
                      <TableCell className="tabular text-muted-foreground">
                        {formatDuration(c.durationSec)}
                      </TableCell>
                      <TableCell className="tabular text-muted-foreground">{c.turns.length}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="iconSm" aria-label={`Actions for ${c.title}`}>
                              <MoreVertical />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link to={`/hearing`}>
                                <Play /> Replay
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setExportTarget(c)}>
                              <Download /> Export
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                navigator.clipboard.writeText(c.turns.map((t) => t.text).join(" "));
                                toast.success("Transcript copied");
                              }}
                            >
                              <Copy /> Copy transcript
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive focus:text-destructive"
                              onClick={() => setDeleteTarget(c)}
                            >
                              <Trash2 /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Mobile card list */}
            <div className="divide-y md:hidden">
              {filtered.map((c) => (
                <div key={c.id} className="flex items-center gap-3 p-4">
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{c.title}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {relativeTime(c.createdAt)} · {formatDuration(c.durationSec)} · {c.turns.length} turns
                    </p>
                  </div>
                  <Badge variant={c.mode === "sign-speech" ? "default" : "live"} className="hidden sm:inline-flex">
                    {MODE_LABELS[c.mode]}
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="iconSm" aria-label={`Actions for ${c.title}`}>
                        <MoreVertical />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setExportTarget(c)}>
                        <Download /> Export
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={() => setDeleteTarget(c)}
                      >
                        <Trash2 /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Export dialog */}
        <Dialog open={!!exportTarget} onOpenChange={(o) => !o && setExportTarget(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Download className="h-5 w-5 text-primary" /> Export conversation
              </DialogTitle>
              <DialogDescription>
                {exportTarget?.title} · {exportTarget?.turns.length} turns
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-2">
              <Button
                variant="outline"
                className="justify-start gap-2"
                onClick={() => { exportConversation(exportTarget!, "json"); toast.success("Exported as JSON"); }}
              >
                <Save className="h-4 w-4" /> JSON — full structured data
              </Button>
              <Button
                variant="outline"
                className="justify-start gap-2"
                onClick={() => { exportConversation(exportTarget!, "txt"); toast.success("Exported as TXT"); }}
              >
                <Save className="h-4 w-4" /> Plain text transcript
              </Button>
              <Button
                variant="outline"
                className="justify-start gap-2"
                onClick={() => { exportConversation(exportTarget!, "csv"); toast.success("Exported as CSV"); }}
              >
                <Save className="h-4 w-4" /> CSV — spreadsheet friendly
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Delete confirmation */}
        <AlertDialog open={!!deleteTarget} onOpenChange={(o) => !o && setDeleteTarget(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete this conversation?</AlertDialogTitle>
              <AlertDialogDescription>
                “{deleteTarget?.title}” and its {deleteTarget?.turns.length} turns will be permanently
                removed. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                onClick={handleDelete}
              >
                <Trash2 className="h-4 w-4" /> Delete permanently
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </PageTransition>
  );
}
