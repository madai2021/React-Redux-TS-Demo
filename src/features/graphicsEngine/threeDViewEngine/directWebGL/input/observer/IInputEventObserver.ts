import { IDisposable } from "@lifecycle/IDisposable";
import { InputEvent } from "../observable/type";
import { IInputObserver } from "./IInputObserver";

export interface IInputEventObserver
  extends IInputObserver<InputEvent>, IDisposable {}
