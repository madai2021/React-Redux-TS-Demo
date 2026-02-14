import { IDisposable } from "@babylonjs/core";
import { IInputEventObserver } from "../observer/IInputEventObserver";
import { IInputEventObservable } from "./IInputEventObservable";
import { IKeyboardInputObservable, KeyboardInputObservable } from "./Keyboard";
import { IMouseInputObservable, MouseInputObservable } from "./Mouse";
import { InputEvent } from "./type";

export default class InputEventObservable implements IInputEventObservable {
  private observers: Set<IInputEventObserver>;

  private mouse: IMouseInputObservable;

  private keyboard: IKeyboardInputObservable;

  private readonly disposables: IDisposable[];

  constructor(canvas: HTMLCanvasElement) {
    this.observers = new Set();
    this.mouse = new MouseInputObservable(canvas);
    this.keyboard = new KeyboardInputObservable();
    this.disposables = [];

    this.disposables.push(
      this.mouse.subscribe({
        onNext: this.#onNext,
      }),
    );

    this.disposables.push(
      this.keyboard.subscribe({
        onNext: this.#onNext,
      }),
    );
  }

  subscribe(observer: IInputEventObserver): IDisposable {
    this.observers.add(observer);
    return {
      dispose: () => this.unsubscribe(observer),
    };
  }

  unsubscribe(observer: IInputEventObserver): void {
    this.observers.delete(observer);
  }

  dispose(): void {
    this.disposables.forEach((d) => d.dispose());
    this.mouse.dispose();
    this.keyboard.dispose();
    this.observers.clear();
  }

  #onNext = (event: InputEvent) => {
    this.observers.forEach((o) => o.onNext(event));
  };
}
