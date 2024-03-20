import { useState } from "react";
import { AiOutlineRight } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addTodo } from "./todosSlice";
const TodoForm = () => {
  const [newItem, setNewItem] = useState("");
  const [pomodoro, setPomodoro] = useState(1);

  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newItem.trim()) return;
    dispatch(addTodo(newItem, pomodoro));
    setNewItem("");
    setPomodoro(1);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form__inputItems">
        <div>
          <label htmlFor="task" className="sr-only">
            Task:
          </label>
          <input
            id="task"
            className="form__inputTask"
            type="text"
            placeholder="What are you working on"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
          />
        </div>
        <div className="form__inputPomContainer">
          <label htmlFor="pomodoro">Est Pomodoros:</label>
          <input
            className="form__inputPom"
            type="number"
            id="pomodoro"
            min={1}
            max={24}
            value={pomodoro}
            onChange={(e) => setPomodoro(e.target.valueAsNumber)}
            required
          />
        </div>
      </div>
      <button
        className="form__submitButton"
        type="submit"
        data-testid="submit-button"
        disabled={!newItem.trim()}
        aria-label="add task"
      >
        <AiOutlineRight className="icon" />
      </button>
    </form>
  );
};
export default TodoForm;
