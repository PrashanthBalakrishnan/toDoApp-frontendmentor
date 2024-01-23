import { Action, PomodoroState, TIMER_ACTIONS } from "../../utils/types";
import alarm from "../../assets/alarmsound.mp3";

export const initialState: PomodoroState = {
  focusMinutes: 45,
  breakMinutes: 15,
  seconds: 0,
  isActive: false,
  isBreak: false,
};

function playAlarm() {
  new Audio(alarm).play();
}

export const pomodoroReducer = (state: PomodoroState, action: Action) => {
  switch (action.type) {
    case TIMER_ACTIONS.START:
      return {
        ...state,
        isActive: true,
      };
    case TIMER_ACTIONS.PAUSE:
      return {
        ...state,
        isActive: false,
      };
    case TIMER_ACTIONS.RESET: {
      return { ...state };
    }

    case TIMER_ACTIONS.SET_FOCUS: {
      return { ...state, focusMinutes: action.payload?.minutes };
    }

    case TIMER_ACTIONS.SET_BREAK: {
      return { ...state, breakMinutes: action.payload?.minutes };
    }
    case TIMER_ACTIONS.TICK: {
      if (!state.isBreak) {
        if (state.seconds === 0) {
          if (state.focusMinutes === 0) {
            playAlarm();
            return {
              ...state,
              isBreak: !state.isBreak,
            };
          } else {
            return {
              ...state,
              focusMinutes: (state.focusMinutes ?? 0) - 1,
              seconds: 59,
            };
          }
        } else {
          return { ...state, seconds: state.seconds - 1 };
        }
      } else {
        if (state.seconds === 0) {
          if (state.breakMinutes === 0) {
            playAlarm();
            return {
              ...state,
              isBreak: !state.isBreak,
            };
          } else {
            return {
              ...state,
              breakMinutes: (state.breakMinutes ?? 0) - 1,
              seconds: 59,
            };
          }
        } else {
          return { ...state, seconds: state.seconds - 1 };
        }
      }
    }

    case TIMER_ACTIONS.TAKE_BREAK: {
      return { ...state, isBreak: true };
    }

    default:
      return state;
  }
};
