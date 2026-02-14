import { IDisposable } from "@lifecycle/IDisposable";
import { IInputObservable } from "./IInputObservable";
import { InputEvent } from "./type";

export interface IInputEventObservable
  extends IInputObservable<InputEvent>, IDisposable {}
