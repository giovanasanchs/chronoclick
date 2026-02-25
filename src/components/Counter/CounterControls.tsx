import React from "react";
import { Play, Pause, RotateCcw, Plus } from "lucide-react";
import "./CounterControls.css";

interface CounterControlsProps {
  isTimerRunning: boolean;
  onIncrement: () => void;
  onToggleTimer: () => void;
  onReset: () => void;
  mode: "counter" | "timer";
}

export const CounterControls: React.FC<CounterControlsProps> = ({
  isTimerRunning,
  onIncrement,
  onToggleTimer,
  onReset,
  mode,
}) => {
  return (
    <div className="controls-wrapper">
      <button
        onClick={onIncrement}
        disabled={mode === "timer"}
        className="control-btn control-btn-secondary neumorphic"
        aria-label="Incrementar"
        title="Incrementar"
      >
        <Plus size={24} />
      </button>

      <button
        onClick={onToggleTimer}
        className="control-btn control-btn-primary glow-ring"
        aria-label={isTimerRunning ? "Parar cronômetro" : "Iniciar cronômetro"}
        title={isTimerRunning ? "Pausar" : "Iniciar"}
      >
        {isTimerRunning ? (
          <Pause size={32} />
        ) : (
          <Play size={32} style={{ marginLeft: 4 }} />
        )}
      </button>

      <button
        onClick={onReset}
        className="control-btn control-btn-secondary neumorphic"
        aria-label="Resetar"
        title="Resetar"
      >
        <RotateCcw size={22} />
      </button>
    </div>
  );
};
