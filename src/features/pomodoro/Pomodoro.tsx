import { useDispatch, useSelector } from "react-redux";
import {
  IPomodoro,
  getPomodoroState,
  pauseTimer,
  startTimer,
  tick,
} from "./pomodoroSlice";
import { useEffect } from "react";

const Pomodoro = () => {
  const pomodoroTimer: IPomodoro = useSelector(getPomodoroState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (pomodoroTimer.isRunning) {
      const timer = setInterval(() => {
        dispatch(tick());
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [pomodoroTimer.isRunning, dispatch]);

  return (
    <div>
      <p>
        {pomodoroTimer.minutes}:
        {pomodoroTimer.seconds < 10
          ? `0${pomodoroTimer.seconds}`
          : pomodoroTimer.seconds}
      </p>
      <button onClick={() => dispatch(startTimer())}>Start</button>
      <button onClick={() => dispatch(pauseTimer())}>Pause</button>
    </div>
  );
};
export default Pomodoro;
