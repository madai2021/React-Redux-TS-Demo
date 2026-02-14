import { IDisposable } from "@lifecycle/IDisposable";
import { IObservable } from "@reactive/IObservable";
import { InputEvent } from "./type";

export interface IInputEventObservable
  extends IObservable<InputEvent>, IDisposable {}
