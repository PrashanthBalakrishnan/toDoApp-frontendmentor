import { useState } from "react";
import { Action, TIMER_ACTIONS } from "../../../../utils/types";
import { PomodoroState } from "../../../../utils/types";

import "./settings.scss";

interface SettingsProps {
  dispatch: React.Dispatch<Action>;
  state: PomodoroState;
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

  function resetSettings() {
    setFocusTime(45);
    setBreakTime(15);
    state.seconds = 0;
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
      <div className="settings__buttons">
        <button
          className="settings__reset"
          type="button"
          onClick={resetSettings}
        >
          Reset Settings
        </button>
        <button className="settings__save">Save Settings</button>
      </div>
    </form>
  );
};
export default Settings;
