import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchTodosThunk } from "../../services/todo/todoService";
import TodoStorage from "./todoStorage";

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface TodoState {
  isServerMode: boolean;
  list: Todo[];
  isLoading: boolean;
  error: string | null;
}

const initialState: TodoState = {
  isServerMode: false,
  list: TodoStorage.load(),
  isLoading: false,
  error: null,
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.list.push({
        userId: 0,
        id: Date.now(),
        title: action.payload,
        completed: false,
      });
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.list.find((t) => t.id === action.payload);
      if (todo) todo.completed = !todo.completed;
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter((t) => t.id !== action.payload);
    },
    setServerMode: (state, action: PayloadAction<boolean>) => {
      state.isServerMode = action.payload;
    },
    replaceTodos: (state, action: PayloadAction<Todo[]>) => {
      state.list = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodosThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchTodosThunk.fulfilled,
        (state, action: PayloadAction<Todo[]>) => {
          state.isLoading = false;
          state.list = action.payload;
        }
      )
      .addCase(fetchTodosThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch todos";
      });
  },
});

export const { addTodo, toggleTodo, removeTodo, setServerMode, replaceTodos } =
  todoSlice.actions;

export default todoSlice.reducer;
