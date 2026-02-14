export interface IObserver<TEvent> {
  onNext(value: TEvent): void;
}
