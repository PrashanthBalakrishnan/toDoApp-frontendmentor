import x from "../../assets/icon-cross.svg";
import check from "../../assets/icon-check.svg";
import "./todoItem.scss";
import { useState } from "react";
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
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <ul>
      <li
        className="listItem"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
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
          {isHovered && (
            <button className="listItem__delete" onClick={() => deleteTodo(id)}>
              <img src={x} />
            </button>
          )}
          <button
            className="listItem__Mobiledelete"
            onClick={() => deleteTodo(id)}
          >
            <img src={x} />
          </button>
        </label>
      </li>
    </ul>
  );
};
export default TodoItem;
