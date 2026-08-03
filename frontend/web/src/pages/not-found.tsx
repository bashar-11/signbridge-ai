import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MessageSquareOff, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";

export function NotFoundPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <header className="border-b">
        <div className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <Link to="/" aria-label="SignBridge home">
            <Logo />
          </Link>
        </div>
      </header>
      <main className="flex flex-1 items-center justify-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center"
        >
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-primary/10">
            <MessageSquareOff className="h-12 w-12 text-primary/60" aria-hidden="true" />
          </div>
          <p className="mt-8 text-7xl font-semibold tracking-tight">404</p>
          <h1 className="mt-4 text-2xl font-semibold">This page doesn't speak sign language yet.</h1>
          <p className="mx-auto mt-3 max-w-md text-muted-foreground">
            The page you're looking for doesn't exist or was moved. Let's get you back to the
            conversation.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild>
              <Link to="/"><ArrowLeft className="h-4 w-4" /> Back home</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/mode">Start a conversation</Link>
            </Button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
