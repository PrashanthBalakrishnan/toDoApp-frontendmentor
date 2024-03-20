import TodoForm from "../features/todos/TodoForm";
import { FaMoon } from "react-icons/fa";
import { LuSun } from "react-icons/lu";
import TodoList from "../features/todos/TodoList";
import "../features/todos/todoStyles.scss";

interface TodoAppProps {
  toggleDarkMode: () => void;
  isDarkMode: boolean;
}

const TodoApp: React.FC<TodoAppProps> = ({ toggleDarkMode, isDarkMode }) => {
  return (
    <main className="main">
      <header className="main__header">
        <h1 className="main__logo">Taskify</h1>
        <button
          onClick={toggleDarkMode}
          className="main__themebtn"
          aria-label="Theme switcher"
        >
          {isDarkMode ? <LuSun /> : <FaMoon />}
        </button>
      </header>

      <TodoForm />
      <TodoList />

      <small className="main__dragmessage">Drag and drop to reorder list</small>
    </main>
  );
};
export default TodoApp;
