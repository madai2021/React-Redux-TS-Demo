import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Todo {
  id: number;
  text: string;
  done: boolean;
}

export interface TodoState {
  list: Todo[];
}

const loadTodos = (): Todo[] => {
  const data = localStorage.getItem("todos");
  return data ? JSON.parse(data) : [];
};

const saveTodos = (todos: Todo[]) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const initialState: TodoState = {
  list: loadTodos(),
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.list.push({ id: Date.now(), text: action.payload, done: false });
      saveTodos(state.list);
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.list.find((t) => t.id === action.payload);
      if (todo) todo.done = !todo.done;
      saveTodos(state.list);
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter((t) => t.id !== action.payload);
      saveTodos(state.list);
    },
  },
});

export const { addTodo, toggleTodo, removeTodo } = todoSlice.actions;

export default todoSlice.reducer;
