import { useEffect, useState } from "react";
import TodoForm from "./todoForm/TodoForm";
import TodoList from "./todoList/TodoList";
import { FaMoon } from "react-icons/fa";
import { LuSun } from "react-icons/lu";

import { TodoType } from "../utils/types";
interface TodoAppProps {
  toggleDarkMode: () => void;
  isDarkMode: boolean;
}

const TodoApp: React.FC<TodoAppProps> = ({ toggleDarkMode, isDarkMode }) => {
  const [todos, setTodos] = useState<TodoType[]>(() => {
    const localValue = localStorage.getItem("todo-items");
    if (localValue === null) return [];
    return JSON.parse(localValue);
  });

  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("todo-items", JSON.stringify(todos));
  }, [todos]);

  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") {
      return true;
    } else if (filter === "active") {
      return !todo.completed;
    } else {
      return todo.completed;
    }
  });

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

  function handleClearCompleted() {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => !todo.completed);
    });
  }
  console.log(todos);
  return (
    <main className="main">
      <header className="main__header">
        <h1 className="main__logo">todo</h1>
        <button
          onClick={toggleDarkMode}
          className="main__themebtn"
          aria-label="Theme switcher"
        >
          {isDarkMode ? <LuSun /> : <FaMoon />}
        </button>
      </header>
      <TodoForm addTodo={addTodo} />
      <TodoList
        todos={filteredTodos}
        setTodos={setTodos}
        handleClearCompleted={handleClearCompleted}
        filter={filter}
        setFilter={setFilter}
      />
      <p className="main__dragmessage">Drag and drop to reorder list</p>
    </main>
  );
};
export default TodoApp;
