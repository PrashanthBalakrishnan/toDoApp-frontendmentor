import { TodoType } from "../../utils/types";
import TodoFilter from "../todoFilter/TodoFilter";
import TodoItem from "../todoItem/TodoItem";
import "./TodoList.scss";

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
    <ul className="list">
      {todos.map((todo: TodoType) => (
        <div className="list__item" key={todo.id}>
          <TodoItem {...todo} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
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
        <TodoFilter filter={filter} setFilter={setFilter} />
        <button className="list__infoButton" onClick={handleClearCompleted}>
          clear completed
        </button>
      </div>
    </ul>
  );
};
export default TodoList;
