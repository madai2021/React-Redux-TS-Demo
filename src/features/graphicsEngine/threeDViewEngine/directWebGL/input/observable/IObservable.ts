import { IDisposable } from "@lifecycle/IDisposable";
import { IObserver } from "../observer";

export interface IObservable<TEvent> {
  subscribe(observer: IObserver<TEvent>): IDisposable;
  unsubscribe(observer: IObserver<TEvent>): void;
}
