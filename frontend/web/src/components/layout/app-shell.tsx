import { Outlet } from "react-router-dom";
import { Topbar } from "@/components/layout/topbar";
import { Sidebar } from "@/components/layout/sidebar";
import { BottomNav } from "@/components/layout/bottom-nav";
import { ShortcutsDialog } from "@/components/layout/shortcuts-dialog";

export function AppShell() {
  return (
    <div className="min-h-dvh bg-surface">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:text-primary-foreground"
      >
        Skip to content
      </a>

      <Sidebar />

      <div className="flex min-h-dvh flex-col lg:ml-[68px] xl:ml-60">
        <Topbar />
        <main
          id="main-content"
          tabIndex={-1}
          className="mx-auto w-full max-w-7xl flex-1 px-4 pb-28 pt-6 sm:px-6 lg:px-8 lg:pb-12"
        >
          <Outlet />
        </main>
      </div>

      <BottomNav />
      <ShortcutsDialog />
    </div>
  );
}
