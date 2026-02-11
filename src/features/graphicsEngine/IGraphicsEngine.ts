export interface IGraphicsEngine {
  init(canvas: HTMLCanvasElement): void;

  startRender(): void;

  stopRender(): void;

  dispose(): void;
}
