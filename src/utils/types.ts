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
  SWITCH_MODE = "SWITCH_MODE",
}
export interface PomodoroState {
  minutes: number;
  seconds: number;
  isActive: boolean;
  isBreak: boolean;
  pomodoro: number;
}

// Define action types
interface PomodoroAction {
  type: TIMER_ACTIONS;
}

// Define specific action types
interface TickAction extends PomodoroAction {
  type: TIMER_ACTIONS.TICK;
}

interface SwitchModeAction extends PomodoroAction {
  type: TIMER_ACTIONS.SWITCH_MODE;
}

export type Action = TickAction | SwitchModeAction | PomodoroAction;
