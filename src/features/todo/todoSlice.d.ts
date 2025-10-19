import { AnyAction, Reducer } from "@reduxjs/toolkit";
import { TodoState } from "./todoSlice.types";

export const addTodo: (text: string) => AnyAction;
export const toggleTodo: (id: number) => AnyAction;
export const removeTodo: (id: number) => AnyAction;

// reducer のデフォルトエクスポート
declare const reducer: Reducer<TodoState, AnyAction>;
export default reducer;
