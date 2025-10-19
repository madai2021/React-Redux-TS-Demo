import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "../features/counter/counterSlice.js";

const store = configureStore({ reducer: { counterSlice } });

export default store;
