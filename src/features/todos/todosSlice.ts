import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

export interface Itodo {
  id: string;
  todo: string;
  totalPomCount: number;
  currentPomCount: number;
  completed: boolean;
}

const initialState: Itodo[] = [
  {
    id: "1",
    todo: "Complete AWS course",
    currentPomCount: 0,
    totalPomCount: 4,
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
            currentPomCount: 0,
            totalPomCount: pomodoroCount,
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
    editTodo: {
      reducer: (state, action: PayloadAction<Itodo>) => {
        const { id, todo, totalPomCount, completed } = action.payload;
        const existingTodo = state.find((todo) => todo.id === id);
        if (existingTodo) {
          existingTodo.todo = todo;
          existingTodo.totalPomCount = totalPomCount;
          existingTodo.completed = completed;
        }
      },
      prepare: (
        id: string,
        todo: string,
        currentPomCount: number,
        totalPomCount: number,
        completed: boolean
      ) => {
        return {
          payload: {
            id,
            todo,
            currentPomCount,
            totalPomCount,
            completed,
          },
        };
      },
    },
    increasePomCount: {
      reducer: (state, action: PayloadAction<string>) => {
        const existingTodo = state.find((todo) => todo.id === action.payload);
        if (existingTodo) {
          existingTodo.currentPomCount += 1;
        }
      },
      prepare: (id: string) => {
        return {
          payload: id,
        };
      },
    },
  },
});

export const selectAllTodos = (state: { todos: Itodo[] }) => state.todos;

export const { addTodo, deleteTodo, editTodo, increasePomCount } =
  todosSlice.actions;
export default todosSlice.reducer;
