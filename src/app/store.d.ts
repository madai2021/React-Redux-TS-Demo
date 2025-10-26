import { EnhancedStore } from "@reduxjs/toolkit";
import { CounterState } from "../features/counter/counterSlice";
import { FilterState } from "../features/filter/filterSlice";
import { TodoState } from "../features/todo/todoSlice";

export interface RootState {
  counter: CounterState;
  todo: TodoState;
  filter: FilterState;
}

// store の型を宣言
declare const store: EnhancedStore<RootState>;
export default store;
