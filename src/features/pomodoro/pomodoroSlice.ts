import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  minutes: 25,
  seconds: 0,
  isRunning: false,
  isPaused: false,
  isCompleted: false,
};

export interface IPomodoro {
  minutes: number;
  seconds: number;
  isRunning: boolean;
  isPaused: boolean;
  isCompleted: boolean;
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
          payload: {
            isRunning: true,
          },
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
        state.minutes = 25;
        state.seconds = 0;
        state.isRunning = false;
        state.isPaused = false;
        state.isCompleted = false;
      },
      prepare(
        minutes: number,
        seconds: number,
        isRunning: boolean,
        isPaused: boolean,
        isCompleted: boolean
      ) {
        return {
          payload: {
            minutes,
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
        } else if (state.minutes > 0) {
          state.minutes -= 1;
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
        action: PayloadAction<{ minutes: number; seconds: number }>
      ) => {
        state.minutes = action.payload.minutes;
        state.seconds = action.payload.seconds;
      },
      prepare(minutes: number, seconds: number) {
        return {
          payload: {
            minutes,
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
