import { HashRouter, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, MotionConfig } from "framer-motion";
import { SettingsProvider } from "@/components/settings-provider";
import { AppShell } from "@/components/layout/app-shell";
import { Toaster } from "@/components/ui/sonner";
import { LandingPage } from "@/pages/landing";
import { ModePage } from "@/pages/mode";
import { HearingPage } from "@/pages/hearing";
import { DeafPage } from "@/pages/deaf";
import { HistoryPage } from "@/pages/history";
import { SettingsPage } from "@/pages/settings";
import { AboutPage } from "@/pages/about";
import { NotFoundPage } from "@/pages/not-found";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route element={<AppShell />}>
          <Route path="/mode" element={<ModePage />} />
          <Route path="/hearing" element={<HearingPage />} />
          <Route path="/deaf" element={<DeafPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <SettingsProvider>
      <MotionConfig reducedMotion="user">
        <HashRouter>
          <AnimatedRoutes />
          <Toaster richColors closeButton />
        </HashRouter>
      </MotionConfig>
    </SettingsProvider>
  );
}
