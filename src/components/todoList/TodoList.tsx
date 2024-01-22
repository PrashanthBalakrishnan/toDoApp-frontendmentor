import { useEffect, useReducer, useState } from "react";
import { TodoType } from "../../utils/types";
import TodoFilter from "../todoFilter/TodoFilter";
import TodoItem from "../todoItem/TodoItem";
import "./todoList.scss";
import { Draggable, Droppable } from "react-beautiful-dnd";
import Pomodoro from "../pomodoro/Pomodoro";

import {
  initialState,
  pomodoroReducer,
} from "../pomodoroReducer/pomodoroReducer";

interface TodoListProps {
  todos: TodoType[];
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
}
const defaultValue = {
  id: "",
  title: "No tasks",
  completed: false,
  pomodoroCount: 0,
  totalPomodoro: 0,
};

const TodoList: React.FC<TodoListProps> = ({ setTodos, todos }) => {
  const [currentTask, setCurrentTask] = useState<TodoType>(
    todos[0] || defaultValue
  );

  const [state, dispatch] = useReducer(pomodoroReducer, initialState);

  const [filter, setFilter] = useState("all");
  function handleClearCompleted() {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => !todo.completed);
    });
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") {
      return true;
    } else if (filter === "active") {
      return !todo.completed;
    } else {
      return todo.completed;
    }
  });
  useEffect(() => {
    if (todos.length === 0) {
      setCurrentTask(defaultValue);
    }
    if (currentTask.id === "") {
      setCurrentTask(todos[0] || defaultValue);
    }
  }, [todos, currentTask]);
  return (
    <div className="list">
      <Pomodoro
        currentTask={currentTask}
        setCurrentTask={setCurrentTask}
        setTodos={setTodos}
        state={state}
        dispatch={dispatch}
      />

      <div className="list__currentTask">
        Current Task:
        <span className="list__taskName">{currentTask.title}</span>
      </div>

      <Droppable droppableId="todos">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {filteredTodos.map((todo: TodoType, index) => (
              <div key={todo.id}>
                <Draggable draggableId={todo.id.toString()} index={index}>
                  {(provided) => (
                    <div
                      key={todo.id}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      <TodoItem
                        todo={todo}
                        setTodos={setTodos}
                        todos={todos}
                        setCurrentTask={setCurrentTask}
                        dispatch={dispatch}
                      />
                    </div>
                  )}
                </Draggable>
              </div>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <div className="list__info">
        <div>
          {todos.length === 0 ? (
            "No items"
          ) : (
            <div>
              {todos.length} {todos.length === 1 ? "item" : "items"} left
            </div>
          )}
        </div>
        <div className="list__filterBtns">
          <TodoFilter setFilter={setFilter} filter={filter} />
        </div>
        <button className="list__infoButton" onClick={handleClearCompleted}>
          Clear Completed
        </button>
      </div>
    </div>
  );
};
export default TodoList;
