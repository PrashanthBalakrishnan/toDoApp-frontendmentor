import { useState } from "react";
import TodoForm from "./todoForm/TodoForm";
import TodoList from "./todoList/TodoList";
import sun from "../assets/icon-sun.svg";
import moon from "../assets/icon-moon.svg";
import { TodoType } from "../utils/types";
interface TodoAppProps {
  toggleDarkMode: () => void;
  isDarkMode: boolean;
}

const TodoApp: React.FC<TodoAppProps> = ({ toggleDarkMode, isDarkMode }) => {
  const [todos, setTodos] = useState<TodoType[]>([]);
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

  return (
    <main className="main">
      <header className="main__header">
        <h1 className="main__logo">todo</h1>
        <button onClick={toggleDarkMode} className="main__themebtn">
          {isDarkMode ? <img src={sun} /> : <img src={moon} />}
        </button>
      </header>
      <TodoForm addTodo={addTodo} />
      <TodoList todos={todos} deleteTodo={deleteTodo} toggleTodo={toggleTodo} />
    </main>
  );
};
export default TodoApp;
