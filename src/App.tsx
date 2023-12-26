import { Toaster } from "react-hot-toast";
import TodoApp from "./components/TodoApp";
import { useState, useEffect } from "react";

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
      <TodoApp isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
    </div>
  );
};
export default App;
