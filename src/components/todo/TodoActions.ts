import { Dispatch } from "redux";
import {
  addTodo,
  removeTodo,
  setServerMode,
  toggleTodo,
} from "../../features/todo/todoSlice";

export const handleIsServerMode = (
  dispatch: Dispatch,
  isServerMode: boolean
) => {
  dispatch(setServerMode(isServerMode));
};
export const handleAddTodo = (dispatch: Dispatch, text: string) => {
  const trimmed = text.trim();
  if (!trimmed) return;
  dispatch(addTodo(text));
};

export const handleToggleTodo = (dispatch: Dispatch, id: number) => {
  dispatch(toggleTodo(id));
};

export const handleRemoveTodo = (dispatch: Dispatch, id: number) => {
  dispatch(removeTodo(id));
};
