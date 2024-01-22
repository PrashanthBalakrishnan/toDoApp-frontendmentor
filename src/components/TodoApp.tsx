import { useEffect, useState } from "react";
import TodoForm from "./todoForm/TodoForm";
import TodoList from "./todoList/TodoList";
import { FaMoon } from "react-icons/fa";
import { LuSun } from "react-icons/lu";

import { TodoType } from "../utils/types";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

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

  useEffect(() => {
    localStorage.setItem("todo-items", JSON.stringify(todos));
  }, [todos]);

  const handleDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (!destination) return;
    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    )
      return;

    const newTodos = [...todos];
    const [reorderedItem] = newTodos.splice(source.index, 1);
    newTodos.splice(destination.index, 0, reorderedItem);
    return setTodos(newTodos);
  };
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
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

        <TodoForm setTodos={setTodos} />

        <TodoList setTodos={setTodos} todos={todos} />
        <p className="main__dragmessage">Drag and drop to reorder list</p>
      </main>
    </DragDropContext>
  );
};
export default TodoApp;
