import { useState } from "react";
import { Action, TIMER_ACTIONS } from "../../../../utils/types";
import "./settings.scss";
import { initialState } from "../../../pomodoroReducer/pomodoroReducer";
import { FaSave } from "react-icons/fa";

interface SettingsProps {
  dispatch: React.Dispatch<Action>;
  state: typeof initialState;
  setSettingOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Settings = ({ dispatch, state, setSettingOpen }: SettingsProps) => {
  const [focusTime, setFocusTime] = useState<number | undefined>(
    state.focusMinutes
  );
  const [breakTime, setBreakTime] = useState<number | undefined>(
    state.breakMinutes
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!focusTime && !breakTime) return;
    dispatch({
      type: TIMER_ACTIONS.SET_FOCUS,
      payload: { minutes: focusTime },
    });

    dispatch({
      type: TIMER_ACTIONS.SET_BREAK,
      payload: { minutes: breakTime },
    });
    setSettingOpen(false);
  }
  return (
    <form onSubmit={handleSubmit} className="settings">
      <label>
        Focus Time: {focusTime}
        <input
          type="range"
          min={1}
          max={60}
          value={focusTime}
          onChange={(e) => setFocusTime(e.target.valueAsNumber)}
        />
      </label>
      <label>
        Break Time: {breakTime}
        <input
          type="range"
          min={1}
          max={60}
          value={breakTime}
          onChange={(e) => setBreakTime(e.target.valueAsNumber)}
        />
      </label>
      <div className="settings__saveContainer">
        <button aria-label="save settings">
          <FaSave className="icon" />
        </button>
        <span>Save Settings</span>
      </div>
    </form>
  );
};
export default Settings;
