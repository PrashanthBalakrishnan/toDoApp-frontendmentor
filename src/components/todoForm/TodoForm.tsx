import { TodoType } from "@/src/utils/types";
import "./todoForm.scss";
import { useState } from "react";
import { AiOutlineRight } from "react-icons/ai";

interface TodoFormProps {
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
}

const TodoForm: React.FC<TodoFormProps> = ({ setTodos }) => {
  const [newItem, setNewItem] = useState("");

  function addTodo(title: string) {
    setTodos((prevTodos) => [
      ...prevTodos,
      {
        id: crypto.randomUUID(),
        title,
        completed: false,
      },
    ]);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTodo(newItem);
    setNewItem("");
  };
  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form__container">
        <input
          className="form__input"
          type="text"
          placeholder="Create a new todo..."
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <div className="form__circle" />
        <button
          className="form__button"
          type="submit"
          aria-label="submit"
          data-testid="submit-button"
          disabled={!newItem.trim()}
        >
          <AiOutlineRight />
        </button>
      </div>
    </form>
  );
};
export default TodoForm;
