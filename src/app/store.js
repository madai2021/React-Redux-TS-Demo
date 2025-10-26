import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "../features/counter/counterSlice";
import todoSlice from "../features/todo/todoSlice";
import listenerMiddleware from "./listeners";

const store = configureStore({
  reducer: { counterSlice, todoSlice },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware),
});

export default store;
