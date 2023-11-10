import { useState } from "react";

type TodoType = {
  id: string;
  title: string;
  completed: boolean;
};

const App = () => {
  const [newItem, setNewItem] = useState("");
  const [todos, setTodos] = useState<TodoType[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTodo(newItem);
    setNewItem("");
  };

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

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <input
          className="form__input"
          type="text"
          placeholder="Create a new todo..."
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
      </form>

      <ul className="list">
        {todos.map((todo: TodoType) => (
          <li key={todo.id} className="list__item">
            {todo.title}
          </li>
        ))}
      </ul>
    </>
  );
};
export default App;
