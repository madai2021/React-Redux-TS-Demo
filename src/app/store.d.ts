import { EnhancedStore } from "@reduxjs/toolkit";
import { CounterState } from "../features/counter/counterSlice";

export interface RootState {
  counter: CounterState;
}

// store の型を宣言
declare const store: EnhancedStore<RootState>;
export default store;
