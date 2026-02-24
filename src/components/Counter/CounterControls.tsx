import React from 'react';
import { Play, Pause, RotateCcw, Plus } from 'lucide-react';
import './CounterControls.css';

interface CounterControlsProps {
  isTimerRunning: boolean;
  onIncrement: () => void;
  onToggleTimer: () => void;
  onReset: () => void;
}

export const CounterControls: React.FC<CounterControlsProps> = ({
  isTimerRunning,
  onIncrement,
  onToggleTimer,
  onReset,
}) => {
  return (
    <div className="controls-wrapper">
      <button
        onClick={onIncrement}
        disabled={isTimerRunning}
        className="control-btn control-btn-secondary neumorphic"
        aria-label="Incrementar"
      >
        <Plus size={24} />
      </button>

      <button
        onClick={onToggleTimer}
        className="control-btn control-btn-primary glow-ring"
        aria-label={isTimerRunning ? 'Parar cronômetro' : 'Iniciar cronômetro'}
      >
        {isTimerRunning ? <Pause size={32} /> : <Play size={32} style={{ marginLeft: 4 }} />}
      </button>

      <button
        onClick={onReset}
        className="control-btn control-btn-secondary neumorphic"
        aria-label="Resetar"
      >
        <RotateCcw size={22} />
      </button>
    </div>
  );
};
