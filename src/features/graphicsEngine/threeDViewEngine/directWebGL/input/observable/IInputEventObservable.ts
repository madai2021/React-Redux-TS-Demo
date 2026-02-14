import { IDisposable } from "@lifecycle/IDisposable";
import { IObservable } from "./IObservable";
import { InputEvent } from "./type";

export interface IInputEventObservable
  extends IObservable<InputEvent>, IDisposable {}
