import { TodoType } from "../../utils/types";
import TodoItem from "../todoItem/TodoItem";
import "./TodoList.scss";

interface TodoListProps {
  todos: TodoType[];
  toggleTodo: (id: string, completed: boolean) => void;
  deleteTodo: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  deleteTodo,
  toggleTodo,
}) => {
  return (
    <ul className="list">
      {todos.map((todo: TodoType) => (
        <div key={todo.id}>
          <TodoItem {...todo} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
        </div>
      ))}
    </ul>
  );
};
export default TodoList;
