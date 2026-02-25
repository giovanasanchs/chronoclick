import { useState, useEffect } from "react";
import { useCounter } from "../hooks/useCounter";
import { Counter } from "../components/Counter/Counter";
import { SettingsPanel } from "../components/Settings/SettingsPanel";
import type { AccentColor, ThemeMode } from "../types/counter.types";

const App = () => {
  const { count, isTimerRunning, increment, reset, toggleTimer } = useCounter();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [mode, setMode] = useState<"counter" | "timer">(
    () =>
      (localStorage.getItem("chronoclick-mode") as "counter" | "timer") ||
      "counter",
  );

  const handleToggleTimer = () => {
    if (mode === "counter") {
      setMode("timer");
    }
    toggleTimer();
  };

  const [accentColor, setAccentColor] = useState<AccentColor>(
    () =>
      (localStorage.getItem("chronoclick-accent") as AccentColor) || "coral",
  );
  const [themeMode, setThemeMode] = useState<ThemeMode>(
    () => (localStorage.getItem("chronoclick-theme") as ThemeMode) || "dark",
  );
  const [selectedFont, setSelectedFont] = useState(
    () => localStorage.getItem("chronoclick-font") || "kumbh",
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
    localStorage.setItem("chronoclick-mode", mode);
    localStorage.setItem("chronoclick-accent", accentColor);
    localStorage.setItem("chronoclick-theme", themeMode);
    localStorage.setItem("chronoclick-font", selectedFont);
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
