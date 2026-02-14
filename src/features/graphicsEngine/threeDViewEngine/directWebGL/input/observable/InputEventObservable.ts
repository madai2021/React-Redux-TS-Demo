import { IDisposable } from "@babylonjs/core";
import { IInputEventObserver } from "../observer/IInputEventObserver";
import { IInputEventObservable } from "./IInputEventObservable";
import { KeyboardInputObservable } from "./Keyboard";
import { MouseInputObservable } from "./Mouse";
import { InputEvent } from "./type";

export default class InputEventObservable implements IInputEventObservable {
  private observers: Set<IInputEventObserver>;

  private mouse: MouseInputObservable;

  private keyboard: KeyboardInputObservable;

  constructor(canvas: HTMLCanvasElement) {
    this.observers = new Set();
    this.mouse = new MouseInputObservable(canvas);
    this.keyboard = new KeyboardInputObservable();
    this.mouse.subscribe({
      onNext: this.#onNext,
    });

    this.keyboard.subscribe({
      onNext: this.#onNext,
    });
  }

  subscribe(observer: IInputEventObserver): void {
    this.observers.add(observer);
  }

  unsubscribe(observer: IInputEventObserver): void {
    this.observers.delete(observer);
  }

  dispose(): void {
    this.observers.clear();
  }

  #onNext = (event: InputEvent) => {
    this.observers.forEach((o) => o.onNext(event));
  };
}
