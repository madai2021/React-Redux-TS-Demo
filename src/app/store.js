import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "../features/counter/counterSlice";
import filterSlice from "../features/filter/filterSlice";
import todoSlice from "../features/todo/todoSlice";
import listenerMiddleware from "./listeners";

const store = configureStore({
  reducer: { counter: counterSlice, todo: todoSlice, filter: filterSlice },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware),
});

export default store;
