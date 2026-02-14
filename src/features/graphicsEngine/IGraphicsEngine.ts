import { IDisposable } from "@lifecycle/IDisposable";

export interface IGraphicsEngine extends IDisposable {
  init(canvas: HTMLCanvasElement): void;

  startRender(): void;

  stopRender(): void;
}
