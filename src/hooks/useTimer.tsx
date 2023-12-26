import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import alarm from "../assets/alarmsound.mp3";

export default function useTimer() {
  const [minutes, setMinutes] = useState(45);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(true);
  const [isWork, setisWork] = useState(true);

  const [timeOff, setTimeOff] = useState(15);
  const [workTime, setWorkTime] = useState(45);

  function play() {
    new Audio(alarm).play();
  }

  useEffect(() => {
    let interval: number | undefined;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval);
            setIsActive(false);
            if (isBreak) {
              toast.success("Break time!");
              play();
              setMinutes(timeOff);
              setIsBreak(false);
              setisWork((prev) => !prev);
            } else {
              toast.success("Back to work!");
              play();
              setMinutes(workTime);
              setIsBreak(true);
              setisWork((prev) => !prev);
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
    isActive,
    startTimer,
    pauseTimer,
    resetTimer,
    setTimer,
    setTimeOff,
    setWorkTime,
    setMinutes,
    setSeconds,
    minutes,
    seconds,
    workTime,
    timeOff,
    isWork,
  };
}
