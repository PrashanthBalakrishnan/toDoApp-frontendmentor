import { useEffect, useReducer, useState } from "react";
import {
  Action,
  PomodoroState,
  TIMER_ACTIONS,
  TodoType,
} from "../../utils/types";
import TodoFilter from "../todoFilter/TodoFilter";
import TodoItem from "../todoItem/TodoItem";
import "./todoList.scss";
import { Draggable, Droppable } from "react-beautiful-dnd";
import Pomodoro from "../pomodoro/Pomodoro";
import alarm from "../../assets/alarmsound.mp3";

interface TodoListProps {
  todos: TodoType[];
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
}
const defaultValue = {
  id: "",
  title: "No tasks",
  completed: false,
  pomodoroCount: 0,
  totalPomodoro: 0,
};

function playAlarm() {
  new Audio(alarm).play();
}

const TodoList: React.FC<TodoListProps> = ({ setTodos, todos }) => {
  const [currentTask, setCurrentTask] = useState<TodoType>(
    todos[0] || defaultValue
  );

  function increasePomodoroCount(id: string) {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, pomodoroCount: todo.pomodoroCount + 1 };
        }
        return todo;
      });
    });
  }

  const initialState: PomodoroState = {
    focusMinutes: 45,
    breakMinutes: 15,
    seconds: 0,
    isActive: false,
    isBreak: false,
  };

  const pomodoroReducer = (state: PomodoroState, action: Action) => {
    switch (action.type) {
      case TIMER_ACTIONS.START:
        return {
          ...state,
          isActive: true,
        };
      case TIMER_ACTIONS.PAUSE:
        return {
          ...state,
          isActive: false,
        };
      case TIMER_ACTIONS.RESET: {
        return { ...state };
      }

      case TIMER_ACTIONS.SET_FOCUS: {
        return { ...state, focusMinutes: action.payload?.minutes };
      }

      case TIMER_ACTIONS.SET_BREAK: {
        return { ...state, breakMinutes: action.payload?.minutes };
      }
      case TIMER_ACTIONS.TICK: {
        if (!state.isBreak) {
          if (state.seconds === 0) {
            if (state.focusMinutes === 0) {
              playAlarm();
              increasePomodoroCount(currentTask.id);
              return {
                ...initialState,
                isBreak: !state.isBreak,
              };
            } else {
              return {
                ...state,
                focusMinutes: (state.focusMinutes ?? 0) - 1,
                seconds: 59,
              };
            }
          } else {
            return { ...state, seconds: state.seconds - 1 };
          }
        } else {
          if (state.seconds === 0) {
            if (state.breakMinutes === 0) {
              playAlarm();
              return {
                ...initialState,
                isBreak: !state.isBreak,
              };
            } else {
              return {
                ...state,
                breakMinutes: (state.breakMinutes ?? 0) - 1,
                seconds: 59,
              };
            }
          } else {
            return { ...state, seconds: state.seconds - 1 };
          }
        }
      }

      case TIMER_ACTIONS.SWITCH_MODE: {
        return {
          ...state,
          isBreak: !state.isBreak,
        };
      }

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(pomodoroReducer, initialState, () => {
    const localValue = localStorage.getItem("pomoState");
    if (localValue === null) return initialState;
    return JSON.parse(localValue);
  });

  const [filter, setFilter] = useState("all");
  function handleClearCompleted() {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => !todo.completed);
    });
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") {
      return true;
    } else if (filter === "active") {
      return !todo.completed;
    } else {
      return todo.completed;
    }
  });
  useEffect(() => {
    if (todos.length === 0) {
      setCurrentTask(defaultValue);
    }
    if (currentTask.id === "") {
      setCurrentTask(todos[0] || defaultValue);
    }

    localStorage.setItem("pomoState", JSON.stringify(state));
  }, [todos, currentTask, state]);
  return (
    <div className="list">
      <Pomodoro
        currentTask={currentTask}
        setCurrentTask={setCurrentTask}
        setTodos={setTodos}
        state={state}
        dispatch={dispatch}
      />

      <div className="list__currentTask">
        Current Task:
        <span className="list__taskName">{currentTask.title}</span>
      </div>

      <Droppable droppableId="todos">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {filteredTodos.map((todo: TodoType, index) => (
              <div key={todo.id}>
                <Draggable draggableId={todo.id.toString()} index={index}>
                  {(provided) => (
                    <div
                      key={todo.id}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      <TodoItem
                        todo={todo}
                        setTodos={setTodos}
                        todos={todos}
                        setCurrentTask={setCurrentTask}
                        dispatch={dispatch}
                      />
                    </div>
                  )}
                </Draggable>
              </div>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
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
          <TodoFilter setFilter={setFilter} filter={filter} />
        </div>
        <button className="list__infoButton" onClick={handleClearCompleted}>
          Clear Completed
        </button>
      </div>
    </div>
  );
};
export default TodoList;
