import "./todoFilter.scss";

interface TodoFilterProps {
  filter: string;
  setFilter: (filter: string) => void;
}

const TodoFilter: React.FC<TodoFilterProps> = ({ filter, setFilter }) => {
  return (
    <div className="filter">
      <div className="filter__btns">
        <label className={"filter__label" + (filter === "all" ? " on" : "")}>
          <input
            name="filter"
            value="all"
            type="radio"
            className="filter__radioBtn"
            checked={filter === "all"}
            onChange={() => setFilter("all")}
          />
          All
        </label>
        <label className={"filter__label" + (filter === "active" ? " on" : "")}>
          <input
            name="filter"
            value="active"
            type="radio"
            className="filter__radioBtn"
            checked={filter === "active"}
            onChange={() => setFilter("active")}
          />
          Active
        </label>
        <label
          className={"filter__label" + (filter === "completed" ? " on" : "")}
        >
          <input
            name="filter"
            value="completed"
            type="radio"
            className="filter__radioBtn"
            checked={filter === "completed"}
            onChange={() => setFilter("completed")}
          />
          Completed
        </label>
      </div>
    </div>
  );
};
export default TodoFilter;
