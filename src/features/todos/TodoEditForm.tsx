import { useState } from "react";
import { Itodo, deleteTodo } from "./todosSlice";
import { useDispatch } from "react-redux";

const TodoEditForm = ({ todo, completed, id, pomodoroCount }: Itodo) => {
  const [updatedTodo, setUpdatedTodo] = useState(todo);
  const [updatedPomodoro, setUpdatedPomodoro] = useState(pomodoroCount);
  const [isCompleted, setIsCompleted] = useState(completed);

  const dispatch = useDispatch();
  return (
    <form className="editForm">
      <label htmlFor="task" className="sr-only">
        Task:
      </label>
      <input
        id="task"
        type="text"
        value={updatedTodo}
        onChange={(e) => setUpdatedTodo(e.target.value)}
      />
      <label htmlFor="pomodoro" className="sr-only">
        Est Pomodoros:
      </label>
      <input
        id="pomodoro"
        type="number"
        value={updatedPomodoro}
        onChange={(e) => setUpdatedPomodoro(e.target.valueAsNumber)}
      />
      <label htmlFor="completed">Completed</label>
      <input
        id="completed"
        type="checkbox"
        checked={isCompleted}
        onChange={(e) => setIsCompleted(e.target.checked)}
      />
      <button onClick={() => dispatch(deleteTodo(id))}>Delete</button>
      <button>Save</button>
    </form>
  );
};
export default TodoEditForm;
