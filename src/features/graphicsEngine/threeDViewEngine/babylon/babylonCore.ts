import { Camera, Mesh, Nullable } from "@babylonjs/core";
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { Engine } from "@babylonjs/core/Engines/engine";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { Scene } from "@babylonjs/core/scene";
import { ThreeDViewEngine } from "../threeDViewEngine";

export class BabylonCore extends ThreeDViewEngine {
  private engine: Nullable<Engine>;
  private scene: Nullable<Scene>;
  private camera: Nullable<Camera>;
  private render = () => {
    this.scene?.render();
  };

  constructor() {
    super();
    this.engine = null;
    this.scene = null;
    this.camera = null;
  }

  init(canvas: HTMLCanvasElement) {
    this.engine = new Engine(canvas, true);
    this.scene = new Scene(this.engine);

    this.camera = new ArcRotateCamera(
      "camera",
      Math.PI / 2,
      Math.PI / 2,
      4,
      new Vector3(0, 0, 0),
      this.scene
    );
    this.camera.attachControl(canvas, true);

    new HemisphericLight("light", new Vector3(1, 1, 0), this.scene);
    MeshBuilder.CreateBox(
      "box",
      { size: 1, sideOrientation: Mesh.DOUBLESIDE },
      this.scene
    );
  }

  startRender() {
    if (!this.engine) return;

    this.engine.runRenderLoop(this.render);
  }

  stopRender() {
    this.engine?.stopRenderLoop(this.render);
  }

  dispose() {
    this.engine?.dispose();
    this.engine = null;
    this.scene = null;
  }
}
