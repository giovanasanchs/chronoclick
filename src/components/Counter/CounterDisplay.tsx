import React from "react";
import "./CounterDisplay.css";

interface CounterDisplayProps {
  count: number;
  isTimerRunning: boolean;
}

function isEvenNumber(count: number): boolean {
  return count % 2 === 0;
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

export const CounterDisplay = React.memo(
  ({ count, isTimerRunning }: CounterDisplayProps) => {
    const displayValue = isTimerRunning ? formatTime(count) : String(count);
    const isEven = isEvenNumber(count);

    const mins = Math.floor(count / 60);
    const secs = count % 60;

    return (
      <div className="counter-display">
        <div className="counter-digits">
          {displayValue.split("").map((char, index) => {
            let digitClass = "";
            if (char === ":") {
              digitClass = "separator";
            } else if (isTimerRunning) {
              if (index <= 1) {
                digitClass = mins % 2 === 0 ? "even" : "";
              } else if (index >= 3) {
                digitClass = secs % 2 === 0 ? "even" : "";
              }
            } else {
              digitClass = isEven ? "even" : "";
            }
            return (
              <span key={index} className={`digit ${digitClass}`}>
                {char}
              </span>
            );
          })}
        </div>
      </div>
    );
  },
);
