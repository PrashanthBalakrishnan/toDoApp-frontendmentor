import x from "../../assets/icon-cross.svg";

interface TodoListProps {
  completed: boolean;
  id: string;
  title: string;
  toggleTodo: (id: string, completed: boolean) => void;
  deleteTodo: (id: string) => void;
}

const TodoItem: React.FC<TodoListProps> = ({
  completed,
  id,
  title,
  toggleTodo,
  deleteTodo,
}) => {
  return (
    <li>
      <input
        type="checkbox"
        checked={completed}
        onChange={(e) => toggleTodo(id, e.target.checked)}
      />
      {title}
      <button onClick={() => deleteTodo(id)}>
        <img src={x} alt="Delete to do" />
      </button>
    </li>
  );
};
export default TodoItem;
