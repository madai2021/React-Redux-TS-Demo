import { IDisposable } from "@lifecycle/IDisposable";
import { InputEvent } from "../observable/type";
import { IObserver } from "./IObserver";

export interface IInputEventObserver
  extends IObserver<InputEvent>, IDisposable {}
