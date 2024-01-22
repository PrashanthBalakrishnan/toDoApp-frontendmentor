import { useEffect } from "react";

import { Action, TIMER_ACTIONS, TodoType } from "../../../src/utils/types";
import "./pomodoro.scss";

import { CiSettings } from "react-icons/ci";
import { FaPlay, FaPause } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";
import { initialState } from "../pomodoroReducer/pomodoroReducer";

interface PomodoroProps {
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
  currentTask: TodoType;
  setCurrentTask: React.Dispatch<React.SetStateAction<TodoType>>;
  state: typeof initialState;
  dispatch: React.Dispatch<Action>;
}

const Pomodoro = ({
  setTodos,
  currentTask,
  state,
  dispatch,
}: PomodoroProps) => {
  useEffect(() => {
    let interval: number | undefined;

    function increasePomodoroCount(id: string) {
      setTodos((currentTodos) => {
        return currentTodos.map((todo) => {
          if (todo.id === id) {
            return { ...todo, pomodoroCount: todo.pomodoroCount + 1 };
          }
          return todo;
        });
      });
    }

    if (state.isActive) {
      interval = setInterval(() => {
        dispatch({ type: TIMER_ACTIONS.TICK });
      }, 1);
    } else {
      clearInterval(interval);
      if (state.isBreak) {
        increasePomodoroCount(currentTask.id);
      }
    }

    return () => clearInterval(interval);
  }, [state.isActive, state.isBreak, setTodos, currentTask.id, dispatch]);

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

  return (
    <div className="pomodoro">
      <div className="pomodoro__display">
        <p>
          {state.isBreak ? "Break Time" : "Focus Time"}: {state.minutes}:
          {state.seconds < 10 ? `0${state.seconds}` : state.seconds}
        </p>
      </div>
      <div className="pomodoro__buttons">
        {state.isActive ? (
          <button
            onClick={pauseTimer}
            disabled={!state.isActive}
            aria-label="stop"
          >
            <FaPause className="icon" />
          </button>
        ) : (
          <button
            className="pomodoro__start "
            onClick={startTimer}
            disabled={state.isActive}
            aria-label="start"
          >
            <FaPlay className="icon" />
          </button>
        )}
        <button
          onClick={resetTimer}
          disabled={state.isActive}
          aria-label="reset"
        >
          <GrPowerReset className="icon" />
        </button>
        <button>
          <CiSettings className="icon" />
        </button>
      </div>
    </div>
  );
};
export default Pomodoro;
