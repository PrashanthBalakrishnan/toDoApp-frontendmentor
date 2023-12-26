import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function useTimer() {
  const [minutes, setMinutes] = useState(45);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  const [timeOff, setTimeOff] = useState(15);
  const [workTime, setWorkTime] = useState(45);

  useEffect(() => {
    let interval: number | undefined;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval);
            setIsActive(false);
            // You can add a notification or other actions when the timer reaches 0
            if (isBreak) {
              toast.success("Time is up! Break time!");
              setMinutes(timeOff);
              setIsBreak(false);
            } else {
              toast.success("Time is up! Back to work!");
              setMinutes(workTime);
              setIsBreak(true);
            }
          } else {
            setMinutes((prevMinutes) => prevMinutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds((prevSeconds) => prevSeconds - 1);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, minutes, seconds, timeOff, isBreak, workTime]);

  const startTimer = () => {
    setIsActive(true);
  };

  const pauseTimer = () => {
    setIsActive(false);
  };

  const resetTimer = () => {
    setIsActive(false);
    setMinutes(workTime);
    setSeconds(0);
  };

  const setTimer = (minutes: number) => {
    setMinutes(minutes);
    setSeconds(0);
    setIsActive(false);
  };

  return {
    minutes,
    seconds,
    isActive,
    startTimer,
    pauseTimer,
    resetTimer,
    setTimer,
    setTimeOff,
    setWorkTime,
    setMinutes,
    workTime,
    timeOff,
  };
}
