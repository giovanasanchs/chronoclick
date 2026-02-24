import React from 'react';
import './CounterDisplay.css';

interface CounterDisplayProps {
  count: number;
  isTimerRunning: boolean;
}

function isEvenDigit(digit: string): boolean {
  const n = parseInt(digit, 10);
  return !isNaN(n) && n % 2 === 0;
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export const CounterDisplay: React.FC<CounterDisplayProps> = ({ count, isTimerRunning }) => {
  const displayValue = isTimerRunning ? formatTime(count) : String(count);

  return (
    <div className="counter-display">
      <div className="counter-digits">
        {displayValue.split('').map((char, index) => (
          <span
            key={index}
            className={`digit ${
              char === ':' ? 'separator' : isEvenDigit(char) ? 'even' : ''
            }`}
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  );
};
