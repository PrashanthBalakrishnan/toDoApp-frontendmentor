import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

export interface Itodo {
  id: string;
  todo: string;
  pomodoroCount: number;
  completed: boolean;
}

const initialState: Itodo[] = [
  {
    id: "1",
    todo: "Complete AWS course",
    pomodoroCount: 1,
    completed: false,
  },
];

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: {
      reducer: (state, action: PayloadAction<Itodo>) => {
        state.push(action.payload);
      },
      prepare: (todo: string, pomodoroCount: number) => {
        return {
          payload: {
            id: nanoid(),
            todo: todo,
            pomodoroCount: pomodoroCount,
            completed: false,
          },
        };
      },
    },
    deleteTodo: {
      reducer: (state, action: PayloadAction<string>) => {
        return state.filter((todo) => todo.id !== action.payload);
      },
      prepare: (id: string) => {
        return {
          payload: id,
        };
      },
    },
    editTodo: (state, action: PayloadAction<Itodo>) => {
      const { id, todo, pomodoroCount } = action.payload;
      const existingTodo = state.find((todo) => todo.id === id);
      if (existingTodo) {
        existingTodo.todo = todo;
        existingTodo.pomodoroCount = pomodoroCount;
      }
    },
  },
});

export const selectAllTodos = (state: { todos: Itodo[] }) => state.todos;

export const { addTodo, deleteTodo, editTodo } = todosSlice.actions;
export default todosSlice.reducer;
