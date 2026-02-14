import { IDisposable } from "@lifecycle/IDisposable";
import { IObservable } from "@reactive/IObservable";
import { IObserver } from "@reactive/IObserver";
import { StatusChangeInputEvent } from "../type";

export interface IKeyboardInputObservable
  extends IObservable<StatusChangeInputEvent>, IDisposable {}

export interface IKeyboardInputObserver extends IObserver<StatusChangeInputEvent> {}

export type StatusChangeInputActionConfig = {
  value: StatusChangeInputEvent["value"];
};
