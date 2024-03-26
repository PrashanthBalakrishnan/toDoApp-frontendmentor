import { useState } from "react";
import { Itodo, deleteTodo, editTodo } from "../../todosSlice";
import { useDispatch } from "react-redux";
import "./todoEditForm.scss";

interface HandleToggleSettingsProp {
  handleToggleSettings: (id: string) => void;
}

const TodoEditForm = ({
  todo,
  completed,
  id,
  totalPomCount,
  currentPomCount,
  handleToggleSettings,
}: Itodo & HandleToggleSettingsProp) => {
  const [updatedTodo, setUpdatedTodo] = useState(todo);
  const [updatedPomodoro, setUpdatedPomodoro] = useState(totalPomCount);
  const [isCompleted, setIsCompleted] = useState(completed);
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      editTodo(id, updatedTodo, currentPomCount, updatedPomodoro, isCompleted)
    );
    handleToggleSettings(id);
  };

  return (
    <form className="editForm" onSubmit={handleSubmit}>
      <div className="editForm__inputContainer">
        <label className="editForm__task">
          Task:
          <input
            type="text"
            value={updatedTodo}
            onChange={(e) => setUpdatedTodo(e.target.value)}
          />
        </label>
        <label>
          Est Pomodoros:
          <input
            type="number"
            value={updatedPomodoro}
            onChange={(e) => setUpdatedPomodoro(e.target.valueAsNumber)}
          />
        </label>
        <label>
          Completed
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={(e) => setIsCompleted(e.target.checked)}
          />
        </label>
      </div>
      <div className="editForm__btn">
        <button onClick={() => dispatch(deleteTodo(id))}>Delete</button>
        <button type="submit">Save</button>
      </div>
    </form>
  );
};
export default TodoEditForm;
