import { IInputObserver } from "../../observer";
import { InputType, StatusChangeInputActionType } from "../const";
import { IInputObservable } from "../IInputObservable";
import { StatusChangeInputEvent } from "../type";
import { DomKeyboardEventValue } from "./const";
import { StatusChangeInputActionConfig } from "./type";

export default class KeyboardInputObservable implements IInputObservable<StatusChangeInputEvent> {
  private observers: Set<IInputObserver<StatusChangeInputEvent>>;

  private readonly keyMap: Record<string, StatusChangeInputActionConfig> = {
    " ": {
      value: { type: StatusChangeInputActionType.Start, value: "1" },
    },
    Escape: { value: { type: StatusChangeInputActionType.Stop, value: null } },
    ArrowDown: {
      value: { type: StatusChangeInputActionType.Down, value: null },
    },
    ArrowUp: { value: { type: StatusChangeInputActionType.Up, value: null } },
  };

  constructor() {
    this.observers = new Set();

    window.addEventListener(DomKeyboardEventValue.KeyDown, this.#onKeyDown);
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
        value: event.value,
      });
    }
  };
}
