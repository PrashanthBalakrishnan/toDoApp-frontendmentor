import { TodoType } from "../../App";
import TodoItem from "../todoItem/TodoItem";

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
        <TodoItem {...todo} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
      ))}
    </ul>
  );
};
export default TodoList;
