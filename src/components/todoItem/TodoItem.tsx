import x from "../../assets/icon-cross.svg";
import check from "../../assets/icon-check.svg";
import "./todoItem.scss";
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
    <div>
      <div className="listItem">
        <label className="listItem__checkbox">
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => toggleTodo(id, e.target.checked)}
            className="listItem__hiddenCheckbox"
          />
          <div
            className={`listItem__checkboxIcon ${completed ? "checked" : ""}`}
          >
            {completed && <img src={check} alt="checkicon" />}
          </div>
          <span className={`listItem__label ${completed ? "checkedItem" : ""}`}>
            {title}
          </span>

          <button
            className="listItem__delete"
            aria-label="delete todo"
            data-testid="delete-button"
            onClick={() => deleteTodo(id)}
          >
            <img src={x} />
          </button>
        </label>
      </div>
    </div>
  );
};
export default TodoItem;
