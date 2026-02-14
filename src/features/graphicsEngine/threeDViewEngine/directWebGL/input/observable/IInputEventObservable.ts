import { IDisposable } from "@lifecycle/IDisposable";
import { IObservable } from "@observer/IObservable";
import { InputEvent } from "./type";

export interface IInputEventObservable
  extends IObservable<InputEvent>, IDisposable {}
