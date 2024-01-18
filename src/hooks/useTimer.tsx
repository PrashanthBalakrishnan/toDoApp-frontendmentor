import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import alarm from "../assets/alarmsound.mp3";
import switchsound from "../assets/switchsound.mp3";

export default function useTimer() {
  const [minutes, setMinutes] = useState(45);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(true);
  const [isWork, setisWork] = useState(true);

  const [timeOff, setTimeOff] = useState(15);
  const [focus, setFocus] = useState(45);
  const [pomodoroCounter, setPomodoroCounter] = useState<number>(0);
  function playAlarm() {
    new Audio(alarm).play();
  }

  function clickSound() {
    const audio = new Audio(switchsound);
    audio.currentTime = 0;
    audio.play();
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
              playAlarm();
              setMinutes(timeOff);
              setIsBreak(false);
              setisWork((prev) => !prev);
              setPomodoroCounter((prev) => prev + 1);
            } else {
              toast.success("Back to work!");
              playAlarm();
              setMinutes(focus);
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
  }, [isActive, minutes, seconds, timeOff, isBreak, focus]);

  const startTimer = () => {
    setIsActive(true);
    clickSound();
  };

  const pauseTimer = () => {
    setIsActive(false);
    clickSound();
  };

  const resetTimer = () => {
    setIsActive(false);
    setMinutes(focus);
    setSeconds(0);
    clickSound();
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
    setFocus,
    setMinutes,
    setSeconds,
    minutes,
    seconds,
    focus,
    timeOff,
    isWork,
    pomodoroCounter,
  };
}
