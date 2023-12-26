import { useState } from "react";
import useTimer from "../../hooks/useTimer";
import "./pomodoro.scss";
import { CiSettings } from "react-icons/ci";
import { FaPlay, FaPause, FaSave } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";

const Pomodoro = () => {
  const [showSettings, setShowSettings] = useState(false);
  const {
    isActive,
    startTimer,
    pauseTimer,
    resetTimer,
    minutes,
    seconds,
    workTime,
    timeOff,
    setTimeOff,
    setWorkTime,
    setMinutes,
    setSeconds,
    isWork,
  } = useTimer();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowSettings(false);
    setMinutes(workTime);
    setSeconds(0);
  };
  return (
    <div className="pomodoro">
      {showSettings ? (
        <form className="pomodoro__form" onSubmit={handleSubmit}>
          <label>work: {workTime}:00</label>
          <input
            className="pomodoro__input"
            type="range"
            min="1"
            max="60"
            value={workTime}
            onChange={(e) => setWorkTime(Number(e.target.value))}
          />
          <label>break: {timeOff}:00</label>
          <input
            className="pomodoro__input"
            type="range"
            min="1"
            max="60"
            value={timeOff}
            onChange={(e) => setTimeOff(Number(e.target.value))}
          />
          <button type="submit" className="pomBtn">
            <FaSave />
          </button>
        </form>
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
            <p className="pomodoro__status">{isWork ? "Work" : "Break"}</p>
            <p>
              {String(minutes).padStart(2, "0")}:
              {String(seconds).padStart(2, "0")}
            </p>
          </div>
          <div className="pomodoro__buttons">
            {isActive ? (
              <button
                className="pomodoro__pauce pomBtn"
                onClick={pauseTimer}
                disabled={!isActive}
                aria-label="stop"
              >
                <FaPause />
              </button>
            ) : (
              <button
                className="pomodoro__start pomBtn"
                onClick={startTimer}
                disabled={isActive}
                aria-label="start"
              >
                <FaPlay />
              </button>
            )}

            <button
              className="pomodoro__reset pomBtn"
              onClick={resetTimer}
              disabled={isActive}
              aria-label="reset"
            >
              <GrPowerReset />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Pomodoro;
