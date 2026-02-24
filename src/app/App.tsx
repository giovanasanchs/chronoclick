import { useState, useEffect } from 'react';
import { useCounter } from '../hooks/useCounter';
import { Counter } from '../components/Counter/Counter';
import { SettingsPanel } from '../components/Settings/SettingsPanel';
import type { AccentColor, ThemeMode } from '../types/counter.types';

const App = () => {
  const { count, isTimerRunning, increment, reset, toggleTimer } = useCounter();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [accentColor, setAccentColor] = useState<AccentColor>(() =>
    (localStorage.getItem('chronoclick-accent') as AccentColor) || 'coral'
  );
  const [themeMode, setThemeMode] = useState<ThemeMode>(() =>
    (localStorage.getItem('chronoclick-theme') as ThemeMode) || 'dark'
  );
  const [selectedFont, setSelectedFont] = useState(() =>
    localStorage.getItem('chronoclick-font') || 'kumbh'
  );

  useEffect(() => {
    localStorage.setItem('chronoclick-accent', accentColor);
    const root = document.documentElement;
    root.style.setProperty('--accent', `var(--accent-${accentColor})`);
  }, [accentColor]);

  useEffect(() => {
    localStorage.setItem('chronoclick-theme', themeMode);
    const root = document.documentElement;
    if (themeMode === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
  }, [themeMode]);

  useEffect(() => {
    localStorage.setItem('chronoclick-font', selectedFont);
    const fontFamilies: Record<string, string> = {
      kumbh: "'Kumbh Sans', sans-serif",
      roboto: "'Roboto Slab', serif",
      mono: "'Space Mono', monospace",
    };
    document.documentElement.style.setProperty('--font-body', fontFamilies[selectedFont] || fontFamilies.kumbh);
  }, [selectedFont]);

  return (
    <div className="page-wrapper">
      <main className="page-main">
        <h1 className="page-title">chronoclick</h1>

        {/* Mode tabs */}
        <div className="mode-tabs">
          <button
            onClick={() => { if (isTimerRunning) toggleTimer(); reset(); }}
            className={`mode-tab ${!isTimerRunning && count === 0 ? 'active' : ''}`}
          >
            contador
          </button>
          <button
            onClick={() => { if (!isTimerRunning) { reset(); toggleTimer(); } }}
            className={`mode-tab ${isTimerRunning ? 'active' : ''}`}
          >
            cronômetro
          </button>
        </div>

        <Counter
          count={count}
          isTimerRunning={isTimerRunning}
          onIncrement={increment}
          onToggleTimer={toggleTimer}
          onReset={reset}
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
