import { IDisposable } from "@lifecycle/IDisposable";
import { IObserver } from "../../observer";
import { InputType, StatusChangeInputActionType } from "../const";
import { IObservable } from "../IObservable";
import { StatusChangeInputEvent } from "../type";
import { DomKeyboardEventValue } from "./const";
import { StatusChangeInputActionConfig } from "./type";

export default class KeyboardInputObservable
  implements IObservable<StatusChangeInputEvent>, IDisposable
{
  private observers: Set<IObserver<StatusChangeInputEvent>>;

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

  subscribe(observer: IObserver<StatusChangeInputEvent>): IDisposable {
    this.observers.add(observer);
    return {
      dispose: () => this.unsubscribe(observer),
    };
  }

  unsubscribe(observer: IObserver<StatusChangeInputEvent>): void {
    this.observers.delete(observer);
  }

  dispose(): void {
    window.removeEventListener(DomKeyboardEventValue.KeyDown, this.#onKeyDown);
    this.observers.clear();
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
