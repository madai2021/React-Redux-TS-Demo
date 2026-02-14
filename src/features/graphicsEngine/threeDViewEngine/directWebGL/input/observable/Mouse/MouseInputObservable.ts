import { IInputObserver } from "../../observer";
import { InputType } from "../const";
import { IInputObservable } from "../IInputObservable";
import { ViewChangeInputActionType, ViewChangeInputEvent } from "../type";

export default class MouseInputObservable implements IInputObservable<ViewChangeInputEvent> {
  private observers: Set<IInputObserver<ViewChangeInputEvent>>;

  private isLeftDown;

  private isRightDown;

  constructor(canvas: HTMLCanvasElement) {
    this.observers = new Set();
    this.isLeftDown = false;
    this.isRightDown = false;

    canvas.addEventListener("mousedown", this.#onMouseDown);
    canvas.addEventListener("mouseup", this.#onMouseUp);
    canvas.addEventListener("mousemove", this.#onMouseMove);
    canvas.addEventListener("wheel", this.#onWheel, {
      passive: false,
    });
    canvas.addEventListener("contextmenu", this.#contextmenu);
  }

  subscribe(observer: IInputObserver<ViewChangeInputEvent>): void {
    this.observers.add(observer);
  }

  unsubscribe(observer: IInputObserver<ViewChangeInputEvent>): void {
    this.observers.delete(observer);
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
