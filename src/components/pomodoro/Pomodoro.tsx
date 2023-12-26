import { useState } from "react";
import useTimer from "../../hooks/useTimer";
import "./pomodoro.scss";
import { CiSettings } from "react-icons/ci";
import Settings from "./components/Settings";

const Pomodoro = () => {
  const [showSettings, setShowSettings] = useState(false);
  const { isActive, startTimer, pauseTimer, resetTimer, minutes, seconds } =
    useTimer();
  return (
    <div className="pomodoro">
      {showSettings ? (
        <Settings setShowSettings={setShowSettings} />
      ) : (
        <div>
          <button
            className="pomodoro__settings"
            aria-label="settings"
            onClick={() => setShowSettings((prev) => !prev)}
          >
            <CiSettings />
          </button>
          <div className="pomodoro__display">
            <p>
              {String(minutes).padStart(2, "0")}:
              {String(seconds).padStart(2, "0")}
            </p>
          </div>
          <div className="pomodoro__buttons">
            <button
              className="pomodoro__start pomBtn"
              onClick={startTimer}
              disabled={isActive}
            >
              Start
            </button>
            <button
              className="pomodoro__pauce pomBtn"
              onClick={pauseTimer}
              disabled={!isActive}
            >
              Pause
            </button>
            <button
              className="pomodoro__reset pomBtn"
              onClick={resetTimer}
              disabled={isActive}
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Pomodoro;
