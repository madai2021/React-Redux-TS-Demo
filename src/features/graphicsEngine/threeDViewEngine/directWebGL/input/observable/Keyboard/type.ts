import { StatusChangeInputActionType } from "../const";
import { StatusChangeInputEvent } from "../type";

export type StatusChangeInputActionConfig = {
  action: StatusChangeInputActionType;
  value: StatusChangeInputEvent["value"];
};
