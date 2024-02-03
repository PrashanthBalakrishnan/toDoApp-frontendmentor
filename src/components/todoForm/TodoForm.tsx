import { TodoType } from "@/src/utils/types";
import "./todoForm.scss";
import { useState } from "react";
import { AiOutlineRight } from "react-icons/ai";
interface TodoFormProps {
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
}

const TodoForm: React.FC<TodoFormProps> = ({ setTodos }) => {
  const [newItem, setNewItem] = useState("");
  const [pomodoro, setPomodoro] = useState(1);

  function addTodo(title: string, totalPomodoro: number) {
    setTodos((prevTodos) => [
      ...prevTodos,
      {
        id: crypto.randomUUID(),
        title,
        completed: false,
        pomodoroCount: 0,
        totalPomodoro,
      },
    ]);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTodo(newItem, pomodoro || 1);
    setNewItem("");
    setPomodoro(1);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form__container">
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
        >
          <AiOutlineRight className="icon" />
        </button>
      </div>
    </form>
  );
};
export default TodoForm;
