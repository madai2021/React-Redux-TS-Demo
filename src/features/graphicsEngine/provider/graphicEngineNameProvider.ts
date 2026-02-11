import { IGraphicsEngine } from "../IGraphicsEngine";

export class GraphicEngineNameProvider {
  private constructor() {}

  static getName(engine: IGraphicsEngine): string {
    return engine.constructor.name;
  }
}
