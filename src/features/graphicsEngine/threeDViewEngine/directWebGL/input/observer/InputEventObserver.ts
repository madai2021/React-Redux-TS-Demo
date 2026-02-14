import { IDisposable } from "@lifecycle/IDisposable";
import {
  InputEvent,
  InputEventObservable,
  InputType,
  StatusChangeInputActionType,
  StatusChangeInputValue,
  StatusChangeNoneInputValue,
  StatusChangeStartInputValue,
  ViewChangeInputActionType,
  ViewChangeInputValue,
  ViewChangePanInputValue,
  ViewChangeTiltInputValue,
  ViewChangeZoomInputValue,
} from "../observable";
import { IInputEventObservable } from "../observable/IInputEventObservable";
import { IInputEventObserver } from "./IInputEventObserver";

export class InputEventObserver implements IInputEventObserver {
  private inputEventObservable: IInputEventObservable;

  private readonly disposables: IDisposable[];

  constructor(canvas: HTMLCanvasElement) {
    this.inputEventObservable = new InputEventObservable(canvas);
    this.disposables = [];
    this.disposables.push(this.inputEventObservable.subscribe(this));
  }

  dispose(): void {
    this.disposables.forEach((d) => d.dispose());
    this.inputEventObservable.dispose();
  }

  onNext(event: InputEvent): void {
    console.log(event);

    switch (event.type) {
      case InputType.ViewChange:
        this.#onNextViewChange(event.value);
        break;
      case InputType.StatusChange:
        this.#onNextStatusChange(event.value);
        break;
      default:
        console.warn("Unknown input event:", event);
        break;
    }
  }

  #onNextViewChange(inputValue: ViewChangeInputValue): void {
    console.log(inputValue);
    switch (inputValue.type) {
      case ViewChangeInputActionType.Tilt:
        this.#onViewChangeTilt(inputValue);
        break;
      case ViewChangeInputActionType.Pan:
        this.#onViewChangePan(inputValue);
        break;
      case ViewChangeInputActionType.Zoom:
        this.#onViewChangeZoom(inputValue);
        break;
      default:
        console.warn("Unknown view change input value:", inputValue);
        break;
    }
  }

  #onViewChangeTilt(value: ViewChangeTiltInputValue): void {
    console.log("onViewChangeTilt", value);
  }

  #onViewChangePan(value: ViewChangePanInputValue): void {
    console.log("onViewChangePan", value);
  }

  #onViewChangeZoom(value: ViewChangeZoomInputValue): void {
    console.log("onViewChangeZoom", value);
  }

  #onNextStatusChange(inputValue: StatusChangeInputValue): void {
    console.log(inputValue);
    switch (inputValue.type) {
      case StatusChangeInputActionType.Start:
        this.#onStatusChangeStart(inputValue);
        break;
      case StatusChangeInputActionType.Stop:
        this.#onStatusChangeStop(inputValue);
        break;
      case StatusChangeInputActionType.Down:
        this.#onStatusChangeDown(inputValue);
        break;
      case StatusChangeInputActionType.Up:
        this.#onStatusChangeUp(inputValue);
        break;
      default:
        console.warn("Unknown status change input value:", inputValue);
        break;
    }
  }

  #onStatusChangeStart(value: StatusChangeStartInputValue): void {
    console.log("onStatusChangeStart", value);
  }

  #onStatusChangeStop(value: StatusChangeNoneInputValue): void {
    console.log("onStatusChangeStop", value);
  }

  #onStatusChangeDown(value: StatusChangeNoneInputValue): void {
    console.log("onStatusChangeDown", value);
  }

  #onStatusChangeUp(value: StatusChangeInputValue): void {
    console.log("onStatusChangeUp", value);
  }
}
