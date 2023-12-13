import { useState } from "react";
import { TodoType } from "../../utils/types";
import TodoFilter from "../todoFilter/TodoFilter";
import TodoItem from "../todoItem/TodoItem";
import "./todoList.scss";
import { Draggable, Droppable } from "react-beautiful-dnd";

interface TodoListProps {
  todos: TodoType[];
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
}

const TodoList: React.FC<TodoListProps> = ({ setTodos, todos }) => {
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

  return (
    <div className="list">
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
                      <TodoItem todo={todo} setTodos={setTodos} todos={todos} />
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
          clear completed
        </button>
      </div>
    </div>
  );
};
export default TodoList;
