import { Action, PomodoroState, TIMER_ACTIONS } from "../../../utils/types";
import toast from "react-hot-toast";
import alarm from "../../../assets/alarmsound.mp3";

export const initialState: PomodoroState = {
  minutes: 25,
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
      return { ...initialState };
    }
    case TIMER_ACTIONS.TICK: {
      if (state.seconds === 0) {
        if (state.minutes === 0) {
          toast.success(state.isBreak ? "Break time!" : "Back to work!");
          playAlarm();
          return { ...initialState, isBreak: !state.isBreak };
        } else {
          return { ...state, minutes: state.minutes - 1, seconds: 59 };
        }
      } else {
        return { ...state, seconds: state.seconds - 1 };
      }
    }
    case TIMER_ACTIONS.SWITCH_MODE:
      return { ...initialState, isBreak: !state.isBreak };
    default:
      return state;
  }
};
