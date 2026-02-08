import { IInputObserver } from "../observer";
import { IInputObservable } from "./IInputObservable";
import { KeyboardInputObservable } from "./Keyboard";
import { MouseInputObservable } from "./Mouse";
import { InputEvent } from "./type";

export default class InputObservable implements IInputObservable<InputEvent> {
  private observers: Set<IInputObserver<InputEvent>>;

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

  subscribe(observer: IInputObserver<InputEvent>): void {
    this.observers.add(observer);
  }

  unsubscribe(observer: IInputObserver<InputEvent>): void {
    this.observers.delete(observer);
  }

  #onNext = (event: InputEvent) => {
    this.observers.forEach((o) => o.onNext(event));
  };
}
