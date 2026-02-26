export type AccentColor = "coral" | "cyan" | "purple";

export type ThemeMode = "dark" | "light";

export type Mode = "counter" | "timer";

export interface CounterState {
  count: number;
  isTimerRunning: boolean;
}
