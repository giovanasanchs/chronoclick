import React from "react";
import { CounterDisplay } from "./CounterDisplay";
import { CounterControls } from "./CounterControls";

interface CounterProps {
  count: number;
  isTimerRunning: boolean;
  onIncrement: () => void;
  onToggleTimer: () => void;
  onReset: () => void;
  mode: "counter" | "timer";
}

export const Counter: React.FC<CounterProps> = ({
  count,
  isTimerRunning,
  onIncrement,
  onToggleTimer,
  onReset,
  mode,
}) => {
  return (
    <>
      <div className="display-circle neumorphic-inset">
        <div
          className="display-circle-ring glow-ring animate-pulse-glow"
          style={{ opacity: isTimerRunning ? 1 : 0.5 }}
        />
        <div className="display-circle-content">
          <CounterDisplay
            count={count}
            isTimerRunning={isTimerRunning}
            mode={mode}
          />
          <span className="display-status">
            {isTimerRunning ? "rodando" : "pausado"}
          </span>
        </div>
      </div>

      <CounterControls
        isTimerRunning={isTimerRunning}
        onIncrement={onIncrement}
        onToggleTimer={onToggleTimer}
        onReset={onReset}
        mode={mode}
      />
    </>
  );
};
