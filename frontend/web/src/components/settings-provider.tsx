import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Theme = "light" | "dark" | "system";
type TextSize = 1 | 2 | 3 | 4;

interface SettingsState {
  theme: Theme;
  setTheme: (t: Theme) => void;
  textSize: TextSize;
  setTextSize: (s: TextSize) => void;
  highContrast: boolean;
  setHighContrast: (v: boolean) => void;
  reduceMotion: boolean;
  setReduceMotion: (v: boolean) => void;
  autoSpeak: boolean;
  setAutoSpeak: (v: boolean) => void;
  speechRate: number;
  setSpeechRate: (v: number) => void;
}

const STORAGE_KEY = "signbridge.prefs";

interface Persisted {
  theme: Theme;
  textSize: TextSize;
  highContrast: boolean;
  reduceMotion: boolean;
  autoSpeak: boolean;
  speechRate: number;
}

const defaults: Persisted = {
  theme: "system",
  textSize: 2,
  highContrast: false,
  reduceMotion: false,
  autoSpeak: true,
  speechRate: 1,
};

function load(): Persisted {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaults;
    return { ...defaults, ...(JSON.parse(raw) as Persisted) };
  } catch {
    return defaults;
  }
}

const SettingsContext = createContext<SettingsState | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<Persisted>(load);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage unavailable */
    }
  }, [state]);

  useEffect(() => {
    const root = document.documentElement;
    const apply = (t: "light" | "dark") => {
      root.classList.toggle("dark", t === "dark");
    };
    if (state.theme === "system") {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      const onChange = (e: MediaQueryListEvent) => apply(e.matches ? "dark" : "light");
      apply(mq.matches ? "dark" : "light");
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    }
    apply(state.theme);
  }, [state.theme]);

  useEffect(() => {
    const sizes: Record<TextSize, string> = {
      1: "15px",
      2: "16px",
      3: "17.5px",
      4: "19px",
    };
    document.documentElement.style.fontSize = sizes[state.textSize];
  }, [state.textSize]);

  useEffect(() => {
    document.documentElement.dataset.highContrast = state.highContrast ? "true" : "false";
  }, [state.highContrast]);

  useEffect(() => {
    document.documentElement.dataset.reduceMotion = state.reduceMotion ? "true" : "false";
  }, [state.reduceMotion]);

  const value: SettingsState = {
    theme: state.theme,
    setTheme: (theme) => setState((s) => ({ ...s, theme })),
    textSize: state.textSize,
    setTextSize: (textSize) => setState((s) => ({ ...s, textSize })),
    highContrast: state.highContrast,
    setHighContrast: (highContrast) => setState((s) => ({ ...s, highContrast })),
    reduceMotion: state.reduceMotion,
    setReduceMotion: (reduceMotion) => setState((s) => ({ ...s, reduceMotion })),
    autoSpeak: state.autoSpeak,
    setAutoSpeak: (autoSpeak) => setState((s) => ({ ...s, autoSpeak })),
    speechRate: state.speechRate,
    setSpeechRate: (speechRate) => setState((s) => ({ ...s, speechRate })),
  };

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}
