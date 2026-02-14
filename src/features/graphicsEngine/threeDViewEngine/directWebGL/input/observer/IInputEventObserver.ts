import { IDisposable } from "@lifecycle/IDisposable";
import { IObserver } from "@reactive/IObserver";
import { InputEvent } from "../observable/type";

export interface IInputEventObserver
  extends IObserver<InputEvent>, IDisposable {}
