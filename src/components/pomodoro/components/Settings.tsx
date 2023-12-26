import useTimer from "../../../hooks/useTimer";
import ReactSlider from "react-slider";
import "./settings.scss";
import { IoChevronBack } from "react-icons/io5";

interface SettingsProps {
  setShowSettings: React.Dispatch<React.SetStateAction<boolean>>;
}

const Settings = ({ setShowSettings }: SettingsProps) => {
  const { workTime, timeOff, setTimeOff, setWorkTime } = useTimer();
  return (
    <div style={{ textAlign: "left" }}>
      <label>work: {workTime}</label>
      <ReactSlider
        className={"slider"}
        thumbClassName={"thumb"}
        trackClassName={"track"}
        value={workTime}
        onChange={(newValue) => setWorkTime(newValue)}
        min={1}
        max={60}
      />
      <label>break: {timeOff}</label>
      <ReactSlider
        className={"slider green"}
        thumbClassName={"thumb"}
        trackClassName={"track"}
        value={timeOff}
        onChange={(newValue) => setTimeOff(newValue)}
        min={1}
        max={60}
      />
      <button
        style={{ textAlign: "center", marginTop: "20px", cursor: "pointer" }}
        onClick={() => setShowSettings(false)}
      >
        <IoChevronBack />
      </button>
    </div>
  );
};
export default Settings;
