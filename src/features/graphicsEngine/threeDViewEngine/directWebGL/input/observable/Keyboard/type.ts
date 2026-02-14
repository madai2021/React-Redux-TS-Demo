import { IDisposable } from "@lifecycle/IDisposable";
import { IObservable } from "@observer/IObservable";
import { IObserver } from "@observer/IObserver";
import { StatusChangeInputEvent } from "../type";

export interface IKeyboardInputObservable
  extends IObservable<StatusChangeInputEvent>, IDisposable {}

export interface IKeyboardInputObserver extends IObserver<StatusChangeInputEvent> {}

export type StatusChangeInputActionConfig = {
  value: StatusChangeInputEvent["value"];
};
