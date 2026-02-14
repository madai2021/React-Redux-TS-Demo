import { IDisposable } from "@lifecycle/IDisposable";
import { IObserver } from "@observer/IObserver";
import { InputEvent } from "../observable/type";

export interface IInputEventObserver
  extends IObserver<InputEvent>, IDisposable {}
