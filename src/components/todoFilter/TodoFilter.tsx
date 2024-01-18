import "./todoFilter.scss";
import clsx from "clsx";
interface TodoFilterProps {
  setFilter: (filter: string) => void;
  filter: string;
}

const filterNames = ["all", "active", "completed"];

const TodoFilter: React.FC<TodoFilterProps> = ({ setFilter, filter }) => {
  return filterNames.map((name) => (
    <button
      key={name}
      aria-label={"filter" + name}
      onClick={() => setFilter(name)}
      className={clsx("filter", filter === name ? "selected" : "")}
    >
      {name}
    </button>
  ));
};
export default TodoFilter;
