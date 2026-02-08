import { IInputObserver } from "../observer";

export interface IInputObservable<TInputEvent> {
  subscribe(observer: IInputObserver<TInputEvent>): void;
  unsubscribe(observer: IInputObserver<TInputEvent>): void;
}
