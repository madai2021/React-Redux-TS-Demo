import { AnyAction, Reducer } from "@reduxjs/toolkit";
import { CounterState } from "./counterSlice.types";

export const increment: () => AnyAction;
export const decrement: () => AnyAction;

// reducer のデフォルトエクスポート
declare const reducer: Reducer<CounterState, AnyAction>;
export default reducer;
