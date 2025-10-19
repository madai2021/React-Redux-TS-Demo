import { Dispatch } from "redux";
import { decrement, increment } from "../../features/counter/counterSlice";

export const handleIncrement = (dispatch: Dispatch) => {
  dispatch(increment());
};

export const handleDecrement = (dispatch: Dispatch) => {
  dispatch(decrement());
};
