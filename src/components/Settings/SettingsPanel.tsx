import React from "react";
import { Settings, X, Sun, Moon } from "lucide-react";
import type { AccentColor, ThemeMode } from "../../types/counter.types";
import "./SettingsPanel.css";

interface SettingsPanelProps {
  isOpen: boolean;
  onToggle: () => void;
  accentColor: AccentColor;
  onColorChange: (color: AccentColor) => void;
  themeMode: ThemeMode;
  onThemeChange: (mode: ThemeMode) => void;
  selectedFont: string;
  onFontChange: (font: string) => void;
}

const colorOptions: { value: AccentColor; label: string }[] = [
  { value: 'coral', label: 'Coral' },
  { value: 'cyan', label: 'Ciano' },
  { value: 'purple', label: 'Roxo' },
];

const fontOptions = [
  { value: 'kumbh', label: 'Aa', family: "'Kumbh Sans', sans-serif" },
  { value: 'roboto', label: 'Aa', family: "'Roboto Slab', serif" },
  { value: 'mono', label: 'Aa', family: "'Space Mono', monospace" },
];

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  isOpen,
  onToggle,
  accentColor,
  onColorChange,
  themeMode,
  onThemeChange,
  selectedFont,
  onFontChange,
}) => {
  const handleApply = () => {
    onToggle();
  };

  return (
    <>
      <button
        onClick={onToggle}
        className="settings-toggle-btn"
        aria-label="Configurações"
      >
        <Settings size={24} />
      </button>

      {isOpen && (
        <div className="settings-overlay" onClick={onToggle}>
          <div
            className="settings-panel neumorphic"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="settings-header">
              <h2 className="settings-title">Configurações</h2>
              <button onClick={onToggle} className="settings-close-btn" aria-label="Fechar">
                <X size={20} />
              </button>
            </div>

            <div className="settings-section">
              <p className="settings-label">Fonte</p>
              <div className="font-options">
                {fontOptions.map(({ value, label, family }) => (
                  <button
                    key={value}
                    onClick={() => onFontChange(value)}
                    className={`font-btn ${selectedFont === value ? 'active' : ''}`}
                    style={{ fontFamily: family }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="settings-section">
              <p className="settings-label">Cor</p>
              <div className="color-options">
                {colorOptions.map(({ value, label }) => (
                  <button
                    key={value}
                    onClick={() => onColorChange(value)}
                    className={`color-swatch ${accentColor === value ? 'selected' : ''}`}
                    style={{ backgroundColor: `hsl(var(--accent-${value}))` }}
                    aria-label={label}
                  >
                    {accentColor === value && (
                      <span className="color-swatch-check">✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="settings-section">
              <p className="settings-label">Tema</p>
              <div className="theme-options">
                <button
                  onClick={() => onThemeChange('dark')}
                  className={`theme-btn ${themeMode === 'dark' ? 'active' : ''}`}
                >
                  <Moon size={16} /> Escuro
                </button>
                <button
                  onClick={() => onThemeChange('light')}
                  className={`theme-btn ${themeMode === 'light' ? 'active' : ''}`}
                >
                  <Sun size={16} /> Claro
                </button>
              </div>
            </div>

            <button className="settings-apply-btn" onClick={handleApply}>
              Apply
            </button>
          </div>
        </div>
      )}
    </>
  );
};