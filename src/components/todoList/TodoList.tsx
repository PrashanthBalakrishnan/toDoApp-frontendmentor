import { TodoType } from "../../utils/types";
import TodoFilter from "../todoFilter/TodoFilter";
import TodoItem from "../todoItem/TodoItem";
import "./todoList.scss";

interface TodoListProps {
  todos: TodoType[];
  handleClearCompleted: () => void;
  filter: string;
  setFilter: (filter: string) => void;
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  handleClearCompleted,
  filter,
  setFilter,
  setTodos,
}) => {
  return (
    <div className="list">
      {todos.map((todo: TodoType) => (
        <div key={todo.id}>
          <TodoItem todo={todo} setTodos={setTodos} todos={todos} />
        </div>
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
    </div>
  );
};
export default TodoList;
