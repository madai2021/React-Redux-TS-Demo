import { IDisposable } from "@lifecycle/IDisposable";
import { IObservable } from "@reactive/IObservable";
import { IObserver } from "@reactive/IObserver";
import { ViewChangeInputEvent } from "../type";

export interface IMouseInputObservable
  extends IObservable<ViewChangeInputEvent>, IDisposable {}

export interface IMouseInputObserver extends IObserver<ViewChangeInputEvent> {}
