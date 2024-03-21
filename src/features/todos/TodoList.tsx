import { useSelector } from "react-redux";
import { Itodo, selectAllTodos } from "./todosSlice";
import { IoMdMore } from "react-icons/io";
import { useState } from "react";
import TodoEditForm from "./TodoEditForm";

const TodoList = () => {
  const [openSettingsId, setOpenSettingsId] = useState<string | null>(null);

  const todos: Itodo[] = useSelector(selectAllTodos);

  // Opens the settings for the todo
  const handleToggleSettings = (todoId: string) => {
    setOpenSettingsId(openSettingsId === todoId ? null : todoId);
  };

  const renderedTodos = todos.map((todo) => (
    <div className="todo" key={todo.id}>
      <div className="todo__container">
        <p className="todo__item">{todo.todo}</p>
        <p className="todo__pomodoroCount">
          {todo.currentPomCount}/{todo.totalPomCount}
        </p>
        <div className="todo__moreBtn">
          <button
            className="todo__delete"
            onClick={() => handleToggleSettings(todo.id)}
          >
            <span className="sr-only">Open Settings</span>
            <IoMdMore />
          </button>
        </div>
      </div>
      {openSettingsId === todo.id && (
        <TodoEditForm
          handleToggleSettings={handleToggleSettings}
          id={todo.id}
          todo={todo.todo}
          totalPomCount={todo.totalPomCount}
          currentPomCount={todo.currentPomCount}
          completed={todo.completed}
        />
      )}
    </div>
  ));

  return <section>{renderedTodos}</section>;
};
export default TodoList;
