import { HiOutlineXMark } from "react-icons/hi2";
import { MdOutlineModeEdit } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

import { useRef, useEffect, useState } from "react";

import "./todoItem.scss";
import { TodoType } from "@/src/utils/types";

interface TodoListProps {
  todo: TodoType;
  todos: TodoType[];
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
  setCurrentTask: React.Dispatch<React.SetStateAction<string>>;
}

const TodoItem: React.FC<TodoListProps> = ({
  setTodos,
  todo,
  todos,
  setCurrentTask,
}) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.title);

  const inputRef = useRef<HTMLInputElement>(null);

  function deleteTodo(id: string) {
    return setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== id);
    });
  }

  function toggleTodo(id: string, completed: boolean) {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed };
        }
        return todo;
      });
    });
  }
  const handleEdit = (e: React.FormEvent, id: string) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, title: editTodo } : todo
      )
    );
    setEdit(false);
  };

  useEffect(() => {
    if (edit) {
      inputRef.current?.focus();
    }
  }, [edit]);
  return (
    <div className="listItem">
      <input
        className="listItem__input"
        aria-label="Task"
        type="checkbox"
        id={todo.id}
        value={todo.title}
        checked={todo.completed}
        onChange={(e) => toggleTodo(todo.id, e.target.checked)}
      />

      {edit ? (
        <form
          className="listItem__form"
          onSubmit={(e) => handleEdit(e, todo.id)}
        >
          <label htmlFor={todo.id} className="sr-only">
            Title:
          </label>
          <input
            id={todo.id}
            ref={inputRef}
            value={editTodo}
            data-testid="edit-input"
            onChange={(e) => setEditTodo(e.target.value)}
            className="listItem__inputEdit"
          />
          <button
            className="listItem__icon"
            data-testid="save-button"
            aria-label="save edited task"
          >
            <FaCheck />
          </button>
        </form>
      ) : todo.completed ? (
        <span
          className="listItem__label"
          onClick={() => setCurrentTask(todo.title)}
        >
          <span className="dashed">{todo.title}</span>

          <span>
            {todo.pomodoroCount}/{todo.totalPomodoro}
          </span>
        </span>
      ) : (
        <>
          <span
            className="listItem__label"
            onClick={() => setCurrentTask(todo.title)}
          >
            {todo.title}
          </span>

          <span>
            {todo.pomodoroCount}/{todo.totalPomodoro}
          </span>
        </>
      )}

      <div className="listItem__actions">
        <button
          data-testid="edit-button"
          className="listItem__icon"
          aria-label="edit task"
          onClick={() => {
            if (!edit && !todo.completed) {
              setEdit(!edit);
            }
          }}
        >
          <MdOutlineModeEdit />
        </button>
        <button
          onClick={() => deleteTodo(todo.id)}
          data-testid="delete-button"
          aria-label="delete task"
        >
          <HiOutlineXMark className="listItem__icon" />
        </button>
      </div>
    </div>
  );
};
export default TodoItem;
