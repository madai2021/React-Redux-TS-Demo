import { Dispatch } from "redux";
import { addTodo, removeTodo, toggleTodo } from "../../features/todo/todoSlice";

export const handleAddTodo = (dispatch: Dispatch, text: string) => {
  dispatch(addTodo(text));
};

export const handleToggleTodo = (dispatch: Dispatch, id: number) => {
  dispatch(toggleTodo(id));
};

export const handleRemoveTodo = (dispatch: Dispatch, id: number) => {
  dispatch(removeTodo(id));
};
