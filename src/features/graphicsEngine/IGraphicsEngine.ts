export interface IGraphicsEngine {
  getName(): string;

  init(canvas: HTMLCanvasElement): void;

  startRender(): void;

  stopRender(): void;

  dispose(): void;
}
