import { IDisposable } from "@lifecycle/IDisposable";
import { IObservable } from "@observer/IObservable";
import { IObserver } from "@observer/IObserver";
import { ViewChangeInputEvent } from "../type";

export interface IMouseInputObservable
  extends IObservable<ViewChangeInputEvent>, IDisposable {}

export interface IMouseInputObserver extends IObserver<ViewChangeInputEvent> {}
