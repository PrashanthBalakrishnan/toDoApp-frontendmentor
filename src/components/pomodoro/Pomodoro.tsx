import useTimer from "../../hooks/useTimer";
import "./pomodoro.scss";

const Pomodoro = () => {
  const { isActive, startTimer, pauseTimer, resetTimer, minutes, seconds } =
    useTimer();
  return (
    <div className="pomodoro">
      <div className="pomodoro__display">
        <p>
          {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
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
  );
};
export default Pomodoro;
