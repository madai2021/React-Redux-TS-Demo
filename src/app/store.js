import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "../features/counter/counterSlice.js";
import todoSlice from "../features/todo/todoSlice.js";

const store = configureStore({ reducer: { counterSlice, todoSlice } });

export default store;
