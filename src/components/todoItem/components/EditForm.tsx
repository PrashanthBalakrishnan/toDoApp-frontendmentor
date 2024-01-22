import { TodoType } from "../../../utils/types";
import { useEffect, useRef, useState } from "react";
import { FaCheck } from "react-icons/fa";

import "./editform.scss";

interface EditFormProps {
  todo: TodoType;
  todos: TodoType[];
  edit: boolean;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
}

const EditForm = ({ todo, edit, setTodos, setEdit, todos }: EditFormProps) => {
  const [editTodo, setEditTodo] = useState<string>(todo.title);

  const inputRef = useRef<HTMLInputElement>(null);

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
    <form className="editForm" onSubmit={(e) => handleEdit(e, todo.id)}>
      <label htmlFor={todo.id} className="sr-only editForm__label">
        Title:
      </label>
      <input
        className="editForm__input"
        id={todo.id}
        ref={inputRef}
        value={editTodo}
        data-testid="edit-input"
        onChange={(e) => setEditTodo(e.target.value)}
      />
      <button
        className="editForm__button"
        type="submit"
        data-testid="save-button"
        aria-label="save edited task"
      >
        <FaCheck className="icon" />
      </button>
    </form>
  );
};
export default EditForm;
