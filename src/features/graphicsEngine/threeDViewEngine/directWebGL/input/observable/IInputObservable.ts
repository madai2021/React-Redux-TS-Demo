import { IDisposable } from "@lifecycle/IDisposable";
import { IInputObserver } from "../observer";

export interface IInputObservable<TInputEvent> {
  subscribe(observer: IInputObserver<TInputEvent>): IDisposable;
  unsubscribe(observer: IInputObserver<TInputEvent>): void;
}
