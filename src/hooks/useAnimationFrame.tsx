import { useDispatch, useSelector } from "react-redux";
import {
  IPomodoro,
  getPomodoroState,
  pauseTimer,
  startTimer,
  tick,
} from "./pomodoroSlice";
import { useEffect, useRef } from "react";

const Pomodoro = () => {
  const pomodoroTimer: IPomodoro = useSelector(getPomodoroState);
  const dispatch = useDispatch();
  const lastTickTimeRef = useRef<number>(0);

  useEffect(() => {
    const animate = () => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - lastTickTimeRef.current;

      if (elapsedTime >= 1000) {
        dispatch(tick());
        lastTickTimeRef.current = currentTime;
      }

      requestAnimationFrame(animate);
    };

    if (pomodoroTimer.isRunning) {
      lastTickTimeRef.current = Date.now();
      requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(requestRef.current!);
    }

    return () => cancelAnimationFrame(requestRef.current!);
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
