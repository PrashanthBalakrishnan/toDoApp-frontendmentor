export interface TodoType {
  id: string;
  title: string;
  completed: boolean;
  pomodoroCount: number;
  totalPomodoro: number;
}

// POMODORO TYPES

export enum TIMER_ACTIONS {
  START = "START",
  PAUSE = "PAUSE",
  RESET = "RESET",
  TICK = "TICK",
  SET_FOCUS = "SET_FOCUS",
  SET_BREAK = "SET_BREAK",
  TAKE_BREAK = "TAKE_BREAK",
}
export interface PomodoroState {
  focusMinutes: number | undefined;
  breakMinutes: number | undefined;
  seconds: number;
  isActive: boolean;
  isBreak: boolean;
}

// Define action types
interface PomodoroAction {
  type: TIMER_ACTIONS;
  payload?: {
    minutes?: number;
  };
}

export type Action = PomodoroAction;
