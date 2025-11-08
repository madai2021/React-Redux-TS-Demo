import { IThreeDViewEngine } from "./IThreeDViewEngine";

export abstract class ThreeDViewEngine implements IThreeDViewEngine {
  constructor() {}

  getName(): string {
    return this.constructor.name;
  }

  abstract init(canvas: HTMLCanvasElement): void;

  abstract startRender(): void;

  abstract stopRender(): void;

  abstract dispose(): void;
}
