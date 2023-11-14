import { useEffect, useState } from "react";
import TodoForm from "./todoForm/TodoForm";
import TodoList from "./todoList/TodoList";
import sun from "../assets/icon-sun.svg";
import moon from "../assets/icon-moon.svg";
import { TodoType } from "../utils/types";
import TodoFilter from "./todoFilter/TodoFilter";
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

  const handleDragDrop = (results: DropResult) => {
    const { source, destination, type } = results;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (type === "group") {
      const reorderedStores = [...todos];
      const sourceIndex = source.index;
      const destinationIndex = destination.index;

      const [removedStore] = reorderedStores.splice(sourceIndex, 1);
      reorderedStores.splice(destinationIndex, 0, removedStore);

      return setTodos(reorderedStores);
    }
  };

  function handleClearCompleted() {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => !todo.completed);
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
      <DragDropContext onDragEnd={handleDragDrop}>
        <TodoList
          todos={filteredTodos}
          deleteTodo={deleteTodo}
          toggleTodo={toggleTodo}
          handleClearCompleted={handleClearCompleted}
          filter={filter}
          setFilter={setFilter}
        />
      </DragDropContext>
      <div className="main__filterTodos">
        <TodoFilter filter={filter} setFilter={setFilter} />
      </div>
    </main>
  );
};
export default TodoApp;
