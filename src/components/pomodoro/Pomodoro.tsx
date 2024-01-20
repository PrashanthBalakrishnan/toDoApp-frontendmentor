import { useReducer, useEffect } from "react";
import { initialState, pomodoroReducer } from "./components/pomodoroReducer";
import { TIMER_ACTIONS } from "../../../src/utils/types";
import "./pomodoro.scss";
import { TodoType } from "../../utils/types";

// import { CiSettings } from "react-icons/ci";
import { FaPlay, FaPause } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";

interface PomodoroProps {
  currentTask: TodoType;
}
const Pomodoro = ({ currentTask }: PomodoroProps) => {
  const [state, dispatch] = useReducer(pomodoroReducer, initialState);
  useEffect(() => {
    let interval: number | undefined;

    if (state.isActive) {
      interval = setInterval(() => {
        dispatch({ type: TIMER_ACTIONS.TICK });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    currentTask.pomodoroCount++;
    return () => clearInterval(interval);
  }, [state.isActive, currentTask]);

  const startTimer = () => {
    dispatch({ type: TIMER_ACTIONS.START });
  };

  const pauseTimer = () => {
    dispatch({ type: TIMER_ACTIONS.PAUSE });
  };

  const resetTimer = () => {
    dispatch({ type: TIMER_ACTIONS.RESET });
  };

  const switchMode = () => {
    dispatch({ type: TIMER_ACTIONS.SWITCH_MODE });
  };
  console.log("current Task" + currentTask.id);

  return (
    <div className="pomodoro">
      <div className="pomodoro__display">
        <p>
          {state.isBreak ? "Break Time" : "Focus Time"}: {state.minutes}:
          {state.seconds < 10 ? `0${state.seconds}` : state.seconds}
        </p>
      </div>
      <div>
        {state.isActive ? (
          <button
            className="pomodoro__pauce pomBtn"
            onClick={pauseTimer}
            disabled={!state.isActive}
            aria-label="stop"
          >
            <FaPause />
          </button>
        ) : (
          <button
            className="pomodoro__start pomBtn"
            onClick={startTimer}
            disabled={state.isActive}
            aria-label="start"
          >
            <FaPlay />
          </button>
        )}
        <button
          className="pomodoro__reset pomBtn"
          onClick={resetTimer}
          disabled={state.isActive}
          aria-label="reset"
        >
          <GrPowerReset />
        </button>
        <button className="pomodoro__btnMode" onClick={switchMode}>
          Switch Mode
        </button>
      </div>
    </div>
  );
};
export default Pomodoro;
