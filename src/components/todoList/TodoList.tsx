import { Draggable, Droppable } from "react-beautiful-dnd";
import { TodoType } from "../../utils/types";
import TodoFilter from "../todoFilter/TodoFilter";
import TodoItem from "../todoItem/TodoItem";
import "./todoList.scss";

interface TodoListProps {
  todos: TodoType[];
  toggleTodo: (id: string, completed: boolean) => void;
  deleteTodo: (id: string) => void;
  handleClearCompleted: () => void;
  filter: string;
  setFilter: (filter: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  deleteTodo,
  toggleTodo,
  handleClearCompleted,
  filter,
  setFilter,
}) => {
  return (
    <Droppable droppableId="ROOT" type="group">
      {(provided) => (
        <ul
          className="list"
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {todos.map((todo: TodoType, index) => (
            <Draggable key={todo.id} draggableId={todo.id} index={index}>
              {(provided) => (
                <div
                  className="list__item"
                  key={todo.id}
                  {...provided.dragHandleProps}
                  {...provided.draggableProps}
                  ref={provided.innerRef}
                >
                  <TodoItem
                    {...todo}
                    toggleTodo={toggleTodo}
                    deleteTodo={deleteTodo}
                  />
                </div>
              )}
            </Draggable>
          ))}
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
              <TodoFilter filter={filter} setFilter={setFilter} />
            </div>
            <button className="list__infoButton" onClick={handleClearCompleted}>
              clear completed
            </button>
          </div>
        </ul>
      )}
    </Droppable>
  );
};
export default TodoList;
