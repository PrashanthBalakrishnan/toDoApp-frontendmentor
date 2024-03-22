import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "../features/todos/todosSlice";
import pomodoroReducer from "../features/pomodoro/pomodoroSlice";

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    pomodoro: pomodoroReducer,
  },
});
