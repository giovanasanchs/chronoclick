import { useState, useEffect } from "react";
import { useCounter } from "../hooks/useCounter";
import { Counter } from "../components/Counter/Counter";
import { SettingsPanel } from "../components/Settings/SettingsPanel";
import { LOCAL_STORAGE_KEYS } from "../constants";
import { LocalStorageService } from "../services/LocalStorageService";
import type { AccentColor, ThemeMode, Mode } from "../types/counter.types";

const App = () => {
  const { count, isTimerRunning, increment, reset, toggleTimer } = useCounter();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [mode, setMode] = useState<Mode>(() =>
    LocalStorageService.getItem(LOCAL_STORAGE_KEYS.MODE, "counter" as Mode),
  );

  const handleToggleTimer = () => {
    if (mode === "counter") {
      setMode("timer");
    }
    toggleTimer();
  };

  const [accentColor, setAccentColor] = useState<AccentColor>(() =>
    LocalStorageService.getItem(
      LOCAL_STORAGE_KEYS.ACCENT,
      "coral" as AccentColor,
    ),
  );
  const [themeMode, setThemeMode] = useState<ThemeMode>(() =>
    LocalStorageService.getItem(LOCAL_STORAGE_KEYS.THEME, "dark" as ThemeMode),
  );
  const [selectedFont, setSelectedFont] = useState(() =>
    LocalStorageService.getItem(LOCAL_STORAGE_KEYS.FONT, "kumbh"),
  );

  useEffect(() => {
    const root = document.documentElement;
    const fontFamilies: Record<string, string> = {
      kumbh: "'Kumbh Sans', sans-serif",
      roboto: "'Roboto Slab', serif",
      mono: "'Space Mono', monospace",
    };

    root.style.setProperty("--accent", `var(--accent-${accentColor})`);
    root.style.setProperty(
      "--font-body",
      fontFamilies[selectedFont] || fontFamilies.kumbh,
    );
    root.classList.toggle("light", themeMode === "light");
  }, [accentColor, themeMode, selectedFont]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.MODE, mode);
    localStorage.setItem(LOCAL_STORAGE_KEYS.ACCENT, accentColor);
    localStorage.setItem(LOCAL_STORAGE_KEYS.THEME, themeMode);
    localStorage.setItem(LOCAL_STORAGE_KEYS.FONT, selectedFont);
  }, [mode, accentColor, themeMode, selectedFont]);

  return (
    <div className="page-wrapper">
      <main className="page-main">
        <h1 className="page-title">chronoclick</h1>

        <div className="mode-tabs">
          <button
            onClick={() => {
              setMode("counter");
              if (isTimerRunning) toggleTimer();
            }}
            className={`mode-tab ${mode === "counter" ? "active" : ""}`}
          >
            contador
          </button>
          <button
            onClick={() => {
              setMode("timer");
              if (!isTimerRunning) toggleTimer();
            }}
            className={`mode-tab ${mode === "timer" ? "active" : ""}`}
          >
            cronômetro
          </button>
        </div>

        <Counter
          count={count}
          isTimerRunning={isTimerRunning}
          onIncrement={increment}
          onToggleTimer={handleToggleTimer}
          onReset={reset}
          mode={mode}
        />

        <SettingsPanel
          isOpen={settingsOpen}
          onToggle={() => setSettingsOpen(!settingsOpen)}
          accentColor={accentColor}
          onColorChange={setAccentColor}
          themeMode={themeMode}
          onThemeChange={setThemeMode}
          selectedFont={selectedFont}
          onFontChange={setSelectedFont}
        />
      </main>
    </div>
  );
};

export default App;
