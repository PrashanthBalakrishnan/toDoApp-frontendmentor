import { HiOutlineXMark } from "react-icons/hi2";
import { MdOutlineModeEdit } from "react-icons/md";

import { useEffect, useState } from "react";

import "./todoItem.scss";
import { Action, TIMER_ACTIONS, TodoType } from "../../utils/types";
import EditForm from "./components/EditForm";
import { useCallback } from "react";

interface TodoListProps {
  todo: TodoType;
  todos: TodoType[];
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
  setCurrentTask: React.Dispatch<React.SetStateAction<TodoType>>;
  dispatch: React.Dispatch<Action>;
}

const TodoItem: React.FC<TodoListProps> = ({
  setTodos,
  todo,
  todos,
  setCurrentTask,
  dispatch,
}) => {
  const [edit, setEdit] = useState<boolean>(false);

  function deleteTodo(id: string) {
    return setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== id);
    });
  }

  // ...

  const toggleTodo = useCallback(
    (id: string, completed: boolean) => {
      setTodos((currentTodos) => {
        return currentTodos.map((todo) => {
          if (todo.id === id) {
            return { ...todo, completed };
          }
          return todo;
        });
      });
    },
    [setTodos]
  );

  useEffect(() => {
    if (todo.pomodoroCount === todo.totalPomodoro) {
      toggleTodo(todo.id, true);
    }
  }, [todo.pomodoroCount, todo.totalPomodoro, toggleTodo, todo.id]);

  return (
    <div className="todoItem">
      <input
        className="todoItem__check"
        aria-label="Task"
        type="checkbox"
        id={todo.id}
        value={todo.title}
        checked={todo.completed}
        onChange={(e) => toggleTodo(todo.id, e.target.checked)}
      />

      {edit ? (
        <EditForm
          todo={todo}
          edit={edit}
          setEdit={setEdit}
          setTodos={setTodos}
          todos={todos}
        />
      ) : (
        <div className="todoItem__labelContainer">
          <div
            onClick={() => {
              setCurrentTask(todo), dispatch({ type: TIMER_ACTIONS.RESET });
            }}
            className={
              todo.completed ? "dashed todoItem__label" : "todoItem__label"
            }
          >
            {todo.title}
          </div>
          <div>
            {todo.pomodoroCount}/{todo.totalPomodoro}
          </div>
        </div>
      )}

      <div className="todoItem__actionContainer">
        <button
          className="todoItem__actionBtns"
          data-testid="edit-button"
          aria-label="edit task"
          onClick={() => {
            if (!edit) {
              setEdit(!edit);
            }
          }}
        >
          <MdOutlineModeEdit className="icon" />
        </button>

        <button
          className="todoItem__actionBtns"
          onClick={() => deleteTodo(todo.id)}
          data-testid="delete-button"
          aria-label="delete task"
        >
          <HiOutlineXMark className="icon" />
        </button>
      </div>
    </div>
  );
};
export default TodoItem;
