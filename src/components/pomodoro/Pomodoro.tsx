import { useEffect, useState } from "react";

import {
  Action,
  PomodoroState,
  TIMER_ACTIONS,
  TodoType,
} from "../../../src/utils/types";
import "./pomodoro.scss";

import { CiSettings } from "react-icons/ci";
import { FaPlay, FaPause } from "react-icons/fa";
import Settings from "./components/settings/Settings";

interface PomodoroProps {
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
  currentTask: TodoType;
  setCurrentTask: React.Dispatch<React.SetStateAction<TodoType>>;
  state: PomodoroState;
  dispatch: React.Dispatch<Action>;
}

const Pomodoro = ({
  setTodos,
  currentTask,
  state,
  dispatch,
}: PomodoroProps) => {
  const [settingOpen, setSettingOpen] = useState(false);

  useEffect(() => {
    let interval: number | undefined;

    if (state.isActive) {
      interval = setInterval(() => {
        dispatch({ type: TIMER_ACTIONS.TICK });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [state.isActive, state.isBreak, setTodos, currentTask.id, dispatch]);

  const startTimer = () => {
    dispatch({ type: TIMER_ACTIONS.START });
  };

  const pauseTimer = () => {
    dispatch({ type: TIMER_ACTIONS.PAUSE });
  };

  return (
    <>
      {settingOpen ? (
        <Settings
          dispatch={dispatch}
          state={state}
          setSettingOpen={setSettingOpen}
        />
      ) : (
        <div className="pomodoro">
          <div className="pomodoro__display">
            <p>{state.isBreak ? "Break Time" : "Focus Time"}</p>
            <p className="pomodoro__time">
              {state.isBreak ? state.breakMinutes : state.focusMinutes}:
              {state.seconds < 10 ? `0${state.seconds}` : state.seconds}
            </p>
          </div>
          <div className="pomodoro__buttons">
            <button
              className="pomodoro__breakBtn"
              type="button"
              onClick={() => dispatch({ type: TIMER_ACTIONS.SWITCH_MODE })}
            >
              {state.isBreak ? "Switch to Focus" : "Take a Break"}
            </button>
            {state.isActive ? (
              <div className="pomodoro__pauseContainer">
                <button
                  className="pomodoro__pause"
                  onClick={pauseTimer}
                  disabled={!state.isActive}
                  aria-label="stop"
                >
                  <FaPause className="icon" />
                </button>
                <span>Pause Timer</span>
              </div>
            ) : (
              <div className="pomodoro__startContainer">
                <button
                  className="pomodoro__start "
                  onClick={startTimer}
                  disabled={state.isActive}
                  aria-label="start"
                >
                  <FaPlay className="icon" />
                </button>
                <span>Start Timer</span>
              </div>
            )}

            <div className="pomodoro__settingsContainer">
              <button
                className="pomodoro__settings"
                aria-label="settings"
                onClick={() => setSettingOpen(true)}
              >
                <CiSettings className="icon" />
              </button>
              <span>Settings</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Pomodoro;
