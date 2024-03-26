import { IoIosClose } from "react-icons/io";
import "./pomodoroSettings.scss";

interface PomodoroSettingsProps {
  setOpenStatus: (status: boolean) => void;
}

const PomodoroSettings = ({ setOpenStatus }: PomodoroSettingsProps) => {
  return (
    <div className="settings">
      <div className="settings__header">
        <h2 className="settings__title">Settings</h2>
        <button
          className="settings__closeBtn"
          onClick={() => setOpenStatus(false)}
        >
          <IoIosClose />
        </button>
      </div>

      <div className="settings__content">
        <div className="settings__option">
          <label htmlFor="pomodoro-duration">Focus Duration</label>
          <input
            type="number"
            id="pomodoro-duration"
            name="pomodoro-duration"
            min="1"
            max="60"
          />
        </div>
        <div className="settings__option">
          <label htmlFor="short-break">Short Break Duration</label>
          <input
            type="number"
            id="short-break"
            name="short-break"
            min="1"
            max="60"
          />
        </div>
        <div className="settings__option">
          <label htmlFor="long-break">Long Break Duration</label>
          <input
            type="number"
            id="long-break"
            name="long-break"
            min="1"
            max="60"
          />
        </div>
        <div>
          <label htmlFor="long-break">Choose Mode</label>
        </div>
      </div>
    </div>
  );
};
export default PomodoroSettings;
