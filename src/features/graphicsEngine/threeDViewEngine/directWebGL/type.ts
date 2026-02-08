import {
  StatusChangeInputValue,
  ViewChangeInputValue,
} from "./input/observable";

export type ViewChangeHandler = (value: ViewChangeInputValue) => void;
export type StatusChangeHandler = (value: StatusChangeInputValue) => void;
