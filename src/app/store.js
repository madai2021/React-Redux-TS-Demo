import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "../features/counter/counterSlice";
import todoSlice from "../features/todo/todoSlice";

const store = configureStore({ reducer: { counterSlice, todoSlice } });

export default store;
