import { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";
import { LuSun } from "react-icons/lu";
import { FaMoon } from "react-icons/fa";
import TodoForm from "./features/todos/components/TodoForm/TodoForm";
import TodoList from "./features/todos/TodoList";
import Pomodoro from "./features/pomodoro/Pomodoro";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Get the theme from local storage on component mount
    const storedTheme = localStorage.getItem("isDarkMode");
    return storedTheme ? JSON.parse(storedTheme) : false; // Default to false if not found
  });

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode: boolean) => {
      const newMode = !prevMode;
      // Save the new mode to local storage
      localStorage.setItem("isDarkMode", JSON.stringify(newMode));
      return newMode;
    });
  };

  useEffect(() => {
    if (isDarkMode) {
      document.body.setAttribute("data-theme", "dark");
    } else {
      document.body.setAttribute("data-theme", "");
    }
  }, [isDarkMode]);

  return (
    <div className={isDarkMode ? "app-Dark" : "app"}>
      <Toaster />
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
        <Pomodoro />
        <TodoForm />
        <TodoList />

        <small className="main__dragmessage">
          Drag and drop to reorder list
        </small>
      </main>
    </div>
  );
};
export default App;
