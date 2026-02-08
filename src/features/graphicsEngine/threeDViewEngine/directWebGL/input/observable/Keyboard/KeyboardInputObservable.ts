import { IInputObserver } from "../../observer";
import { InputType, StatusChangeInputActionType } from "../const";
import { IInputObservable } from "../IInputObservable";
import { StatusChangeInputEvent } from "../type";
import { StatusChangeInputActionConfig } from "./type";

export default class KeyboardInputObservable
  implements IInputObservable<StatusChangeInputEvent>
{
  private observers: Set<IInputObserver<StatusChangeInputEvent>>;

  private readonly keyMap: Record<string, StatusChangeInputActionConfig> = {
    " ": { action: StatusChangeInputActionType.Start, value: { value: "1" } },
    Escape: { action: StatusChangeInputActionType.Stop, value: null },
    ArrowDown: { action: StatusChangeInputActionType.Down, value: null },
    ArrowUp: { action: StatusChangeInputActionType.Up, value: null },
  };

  constructor() {
    this.observers = new Set();

    window.addEventListener("keydown", this.#onKeyDown);
  }

  subscribe(observer: IInputObserver<StatusChangeInputEvent>): void {
    this.observers.add(observer);
  }

  unsubscribe(observer: IInputObserver<StatusChangeInputEvent>): void {
    this.observers.delete(observer);
  }

  #notify(event: StatusChangeInputEvent) {
    this.observers.forEach((o) => o.onNext(event));
  }

  #onKeyDown = (e: KeyboardEvent) => {
    const event = this.keyMap[e.key];
    if (event) {
      this.#notify({
        type: InputType.StatusChange,
        action: event.action,
        value: event.value,
      });
    }
  };
}
