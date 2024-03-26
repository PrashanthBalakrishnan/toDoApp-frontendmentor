import { useDispatch, useSelector } from "react-redux";
import { clearInterval, setInterval } from "worker-timers";
import "./pomodoro.scss";
import {
  IPomodoro,
  getPomodoroState,
  pauseTimer,
  startTimer,
  tick,
} from "./pomodoroSlice";
import { useEffect, useState } from "react";

import { FaPlay, FaStop } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";

import PomodoroSettings from "./components/pomodoroSettings/PomodoroSettings";

const Pomodoro = () => {
  const pomodoroTimer: IPomodoro = useSelector(getPomodoroState);
  const [openStatus, setOpenStatus] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (pomodoroTimer.isRunning) {
      const interval = setInterval(() => {
        dispatch(tick());
        document.title = `Taskify | ${pomodoroTimer.minutes}:${
          pomodoroTimer.seconds < 10
            ? `0${pomodoroTimer.seconds}`
            : pomodoroTimer.seconds
        }
        `;
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [
    dispatch,
    pomodoroTimer.isRunning,
    pomodoroTimer.minutes,
    pomodoroTimer.seconds,
  ]);

  return (
    <section className="pomodoro">
      <p className="pomodoro__timer">
        {pomodoroTimer.minutes}:
        {pomodoroTimer.seconds < 10
          ? `0${pomodoroTimer.seconds}`
          : pomodoroTimer.seconds}
      </p>
      <div className="pomodoro__actionBtns">
        <button
          className="pomodoro__settingBtn"
          onClick={() => setOpenStatus((prev) => !prev)}
        >
          <IoSettings />
        </button>
        {pomodoroTimer.isRunning ? (
          <button
            className="pomodoro__stopBtn"
            onClick={() => dispatch(pauseTimer())}
          >
            <span className="sr-only">Stop</span>
            <FaStop />
          </button>
        ) : (
          <button
            className="pomodoro__startBtn"
            onClick={() => dispatch(startTimer())}
          >
            <span className="sr-only">Start</span>
            <FaPlay />
          </button>
        )}
      </div>
      {openStatus && <PomodoroSettings setOpenStatus={setOpenStatus} />}
    </section>
  );
};
export default Pomodoro;
