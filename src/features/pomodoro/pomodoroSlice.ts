import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  FocusMinutes: 1,
  seconds: 0,
  isRunning: false,
  isPaused: false,
  isCompleted: false,
};

export interface IPomodoro {
  FocusMinutes: number;
  seconds: number;
  isRunning: boolean;
  isPaused: boolean;
  isCompleted: boolean;
  status: "Focus" | "Short Break" | "Long Break";
}

const pomodoroSlice = createSlice({
  name: "pomodoro",
  initialState,
  reducers: {
    startTimer: {
      reducer: (state) => {
        state.isRunning = true;
      },
      prepare() {
        return {
          payload: {},
        };
      },
    },
    pauseTimer: {
      reducer: (state) => {
        state.isRunning = false;
      },
      prepare() {
        return {
          payload: {},
        };
      },
    },
    resumeTimer: {
      reducer: (state) => {
        state.isPaused = false;
      },
      prepare(isPaused: boolean) {
        return {
          payload: {
            isPaused,
          },
        };
      },
    },
    resetTimer: {
      reducer: (state) => {
        state.FocusMinutes = 25;
        state.seconds = 0;
        state.isRunning = false;
        state.isPaused = false;
        state.isCompleted = false;
      },
      prepare(
        FocusMinutes: number,
        seconds: number,
        isRunning: boolean,
        isPaused: boolean,
        isCompleted: boolean
      ) {
        return {
          payload: {
            FocusMinutes,
            seconds,
            isRunning,
            isPaused,
            isCompleted,
          },
        };
      },
    },
    completeTimer: {
      reducer: (state) => {
        state.isRunning = false;
        state.isCompleted = true;
      },
      prepare(isRunning: boolean, isCompleted: boolean) {
        return {
          payload: {
            isRunning,
            isCompleted,
          },
        };
      },
    },
    tick: {
      reducer: (state) => {
        if (state.seconds > 0) {
          state.seconds -= 1;
        } else if (state.FocusMinutes > 0) {
          state.FocusMinutes -= 1;
          state.seconds = 59;
        } else {
          state.isRunning = false;
          state.isCompleted = true;
        }
      },
      prepare() {
        return {
          payload: {},
        };
      },
    },
    setTimer: {
      reducer: (
        state,
        action: PayloadAction<{ FocusMinutes: number; seconds: number }>
      ) => {
        state.FocusMinutes = action.payload.FocusMinutes;
        state.seconds = action.payload.seconds;
      },
      prepare(FocusMinutes: number, seconds: number) {
        return {
          payload: {
            FocusMinutes,
            seconds,
          },
        };
      },
    },
  },
});

export const getPomodoroState = (state: { pomodoro: IPomodoro }) =>
  state.pomodoro;

export const {
  startTimer,
  pauseTimer,
  resumeTimer,
  resetTimer,
  completeTimer,
  tick,
} = pomodoroSlice.actions;

export default pomodoroSlice.reducer;
