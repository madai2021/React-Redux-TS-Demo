import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import TodoStorage from "./todoStorage";

export interface Todo {
  id: number;
  text: string;
  done: boolean;
}

export interface TodoState {
  list: Todo[];
}

const initialState: TodoState = {
  list: TodoStorage.load(),
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.list.push({ id: Date.now(), text: action.payload, done: false });
      TodoStorage.save(state.list);
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.list.find((t) => t.id === action.payload);
      if (todo) todo.done = !todo.done;
      TodoStorage.save(state.list);
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter((t) => t.id !== action.payload);
      TodoStorage.save(state.list);
    },
  },
});

export const { addTodo, toggleTodo, removeTodo } = todoSlice.actions;

export default todoSlice.reducer;
