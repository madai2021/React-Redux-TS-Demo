import * as THREE from "three";
import { IThreeDViewEngine } from "../IThreeDViewEngine";
import { CameraController } from "./cameraController";
import {
  InputEvent,
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
} from "./input/observable";
import { IInputObserver, InputObserver } from "./input/observer";
import { Cube } from "./meshes/cube";
import { Shader } from "./shader/shader";

// WebGLで直接描画するエンジン、Three.jsは行列計算にのみ使用
export class DirectWebGLCore implements IThreeDViewEngine {
  private gl: WebGL2RenderingContext | null;
  private canvas: HTMLCanvasElement | null;
  private vao: WebGLVertexArrayObject | null;
  private camera: THREE.PerspectiveCamera | null;
  private animationId: number | null;
  private shader: Shader | null;
  private cube: Cube | null;
  private cameraController: CameraController | null;
  private inputObserver: IInputObserver<InputEvent> | null;

  constructor() {
    this.gl = null;
    this.canvas = null;
    this.vao = null;
    this.camera = null;
    this.animationId = null;
    this.shader = null;
    this.cube = null;
    this.cameraController = null;
    this.inputObserver = null;
  }

  init(canvas: HTMLCanvasElement): void {
    this.canvas = canvas;
    const gl = canvas.getContext("webgl2") as WebGL2RenderingContext | null;
    if (!gl) throw new Error("WebGL2 not supported");
    this.gl = gl;

    this.inputObserver = new InputObserver(canvas);

    const aspect = canvas.clientWidth / canvas.clientHeight;
    this.camera = new THREE.PerspectiveCamera(70, aspect, 0.1, 100);
    this.camera.position.set(0, 0, 5);
    this.camera.lookAt(0, 0, 0);
    this.cameraController = new CameraController(this.camera, canvas);

    this.shader = new Shader();
    this.shader.init(gl);
    const program = this.shader.getProgram();
    if (!program) throw new Error("Shader program is null");

    this.vao = gl.createVertexArray();

    this.cube = new Cube(gl, this.vao);

    const lightDirLoc = gl.getUniformLocation(program, "uLightDir");
    gl.uniform3fv(
      lightDirLoc,
      new Float32Array(new THREE.Vector3(1, 1, 0).normalize().toArray()),
    );

    gl.enable(gl.DEPTH_TEST);

    const r = this.normalize(51, 0, 255);
    const g = this.normalize(51, 0, 255);
    const b = this.normalize(76, 0, 255);
    gl.clearColor(r, g, b, 1);
  }

  startRender(): void {
    if (!this.gl) return;
    const gl = this.gl;
    const program = this.shader?.getProgram();
    if (!program) return;
    const uMVP = gl.getUniformLocation(program, "uMVP");

    const render = () => {
      if (this.canvas === null || this.camera === null) return;

      const displayWidth = this.canvas.clientWidth;
      const displayHeight = this.canvas.clientHeight;
      if (
        this.canvas.width !== displayWidth ||
        this.canvas.height !== displayHeight
      ) {
        this.canvas.width = displayWidth;
        this.canvas.height = displayHeight;
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);

        this.camera.aspect = displayWidth / displayHeight;
        this.camera.updateProjectionMatrix();
      }

      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.useProgram(program);
      gl.bindVertexArray(this.vao);

      const model =
        this.cube?.getModelMatrix() || new THREE.Matrix4().identity();
      const view = this.camera.matrixWorldInverse;
      const proj = this.camera.projectionMatrix;

      const mvp = new THREE.Matrix4();
      mvp.multiplyMatrices(proj, view);
      mvp.multiply(model);

      gl.uniformMatrix4fv(uMVP, false, mvp.elements);

      gl.drawElements(
        gl.TRIANGLES,
        this.cube!.indices.length,
        gl.UNSIGNED_SHORT,
        0,
      );

      this.animationId = requestAnimationFrame(render);
    };
    render();
  }

  stopRender(): void {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  dispose(): void {
    this.stopRender();
    this.gl = null;
    this.vao = null;
  }

  private normalize(value: number, min: number, max: number): number {
    if (max === min) {
      return 0;
    }
    return (value - min) / (max - min);
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
