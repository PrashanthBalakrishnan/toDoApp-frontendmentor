import { useState } from "react";

interface TodoFormProps {
  addTodo: (newItem: string) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ addTodo }) => {
  const [newItem, setNewItem] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTodo(newItem);
    setNewItem("");
  };
  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        className="form__input"
        type="text"
        placeholder="Create a new todo..."
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
    </form>
  );
};
export default TodoForm;
