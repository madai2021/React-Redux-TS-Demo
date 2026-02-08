export interface IInputObserver<TInputEvent> {
  onNext(value: TInputEvent): void;
}
