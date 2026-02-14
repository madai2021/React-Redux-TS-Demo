import { IDisposable } from "@lifecycle/IDisposable";
import { IObserver } from "../../observer";
import { InputType, ViewChangeInputActionType } from "../const";
import { IObservable } from "../IObservable";
import { ViewChangeInputEvent } from "../type";
import { DomMouseEventValue } from "./const";

export default class MouseInputObservable
  implements IObservable<ViewChangeInputEvent>, IDisposable
{
  private observers: Set<IObserver<ViewChangeInputEvent>>;

  private isLeftDown;

  private isRightDown;

  constructor(canvas: HTMLCanvasElement) {
    this.observers = new Set();
    this.isLeftDown = false;
    this.isRightDown = false;

    canvas.addEventListener(DomMouseEventValue.Down, this.#onMouseDown);
    canvas.addEventListener(DomMouseEventValue.Up, this.#onMouseUp);
    canvas.addEventListener(DomMouseEventValue.Move, this.#onMouseMove);
    canvas.addEventListener(DomMouseEventValue.Wheel, this.#onWheel, {
      passive: false,
    });
    canvas.addEventListener("contextmenu", this.#contextmenu);
  }

  subscribe(observer: IObserver<ViewChangeInputEvent>): IDisposable {
    this.observers.add(observer);
    return {
      dispose: () => this.unsubscribe(observer),
    };
  }

  unsubscribe(observer: IObserver<ViewChangeInputEvent>): void {
    this.observers.delete(observer);
  }

  dispose(): void {
    window.removeEventListener(DomMouseEventValue.Down, this.#onMouseDown);
    window.removeEventListener(DomMouseEventValue.Up, this.#onMouseUp);
    window.removeEventListener(DomMouseEventValue.Move, this.#onMouseMove);
    window.removeEventListener(DomMouseEventValue.Wheel, this.#onWheel);
    window.removeEventListener(
      DomMouseEventValue.ContextMenu,
      this.#contextmenu,
    );
    this.observers.clear();
  }

  #notify(event: ViewChangeInputEvent) {
    this.observers.forEach((o) => o.onNext(event));
  }

  #onMouseDown = (e: MouseEvent) => {
    if (e.button === 0) this.isLeftDown = true;
    if (e.button === 2) this.isRightDown = true;
  };

  #onMouseUp = (e: MouseEvent) => {
    if (e.button === 0) this.isLeftDown = false;
    if (e.button === 2) this.isRightDown = false;
  };

  #onMouseMove = (e: MouseEvent) => {
    if (!this.isLeftDown && !this.isRightDown) return;

    if (this.isLeftDown) {
      this.#notify({
        type: InputType.ViewChange,
        value: {
          type: ViewChangeInputActionType.Tilt,
          deltaX: e.movementX,
          deltaY: e.movementY,
        },
      });
    }

    if (this.isRightDown) {
      this.#notify({
        type: InputType.ViewChange,
        value: {
          type: ViewChangeInputActionType.Pan,
          deltaX: e.movementX,
          deltaY: e.movementY,
        },
      });
    }
  };

  #onWheel = (e: WheelEvent) => {
    this.#notify({
      type: InputType.ViewChange,
      value: {
        type: ViewChangeInputActionType.Zoom,
        zoom: e.deltaY,
      },
    });
    e.preventDefault();
  };

  #contextmenu = (e: MouseEvent) => {
    e.preventDefault();
  };
}
