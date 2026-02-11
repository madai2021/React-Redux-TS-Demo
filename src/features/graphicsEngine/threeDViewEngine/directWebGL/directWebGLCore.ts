import * as THREE from "three";
import { IThreeDViewEngine } from "../IThreeDViewEngine";
import { CameraController } from "./cameraController";
import {
  IInputObservable,
  InputEvent,
  InputObservable,
  InputType,
  StatusChangeInputActionType,
  StatusChangeInputValue,
  ViewChangeInputActionType,
  ViewChangeInputValue,
} from "./input/observable";
import { IInputObserver } from "./input/observer";
import { Cube } from "./meshes/cube";
import { Shader } from "./shader/shader";
import { StatusChangeHandler, ViewChangeHandler } from "./type";

// WebGLで直接描画するエンジン、Three.jsは行列計算にのみ使用
export class DirectWebGLCore
  implements IThreeDViewEngine, IInputObserver<InputEvent>
{
  private gl: WebGL2RenderingContext | null;
  private canvas: HTMLCanvasElement | null;
  private vao: WebGLVertexArrayObject | null;
  private camera: THREE.PerspectiveCamera | null;
  private animationId: number | null;
  private shader: Shader | null;
  private cube: Cube | null;
  private cameraController: CameraController | null;
  private inputObservable: IInputObservable<InputEvent> | null;

  private readonly viewChangeHandlers: Map<
    ViewChangeInputActionType,
    ViewChangeHandler
  > = new Map([
    [ViewChangeInputActionType.Tilt, (v) => this.#onViewChangeTilt(v)],
    [ViewChangeInputActionType.Pan, (v) => this.#onViewChangePan(v)],
    [ViewChangeInputActionType.Zoom, (v) => this.#onViewChangeZoom(v)],
  ]);

  private readonly statusChangeHandlers: Map<
    StatusChangeInputActionType,
    StatusChangeHandler
  > = new Map([
    [StatusChangeInputActionType.Start, (v) => this.#onStatusChangeStart(v)],
    [StatusChangeInputActionType.Stop, (v) => this.#onStatusChangeStop(v)],
    [StatusChangeInputActionType.Down, (v) => this.#onStatusChangeDown(v)],
    [StatusChangeInputActionType.Up, (v) => this.#onStatusChangeUp(v)],
  ]);

  constructor() {
    this.gl = null;
    this.canvas = null;
    this.vao = null;
    this.camera = null;
    this.animationId = null;
    this.shader = null;
    this.cube = null;
    this.cameraController = null;
    this.inputObservable = null;
  }

  init(canvas: HTMLCanvasElement): void {
    this.canvas = canvas;
    const gl = canvas.getContext("webgl2") as WebGL2RenderingContext | null;
    if (!gl) throw new Error("WebGL2 not supported");
    this.gl = gl;

    this.inputObservable = new InputObservable(this.canvas);
    this.inputObservable.subscribe(this);

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

    if (event.type === InputType.ViewChange) {
      this.viewChangeHandlers.get(event.action)?.(event.value);
    }

    if (event.type === InputType.StatusChange) {
      this.statusChangeHandlers.get(event.action)?.(event.value);
    }
  }

  #onViewChangeTilt(value: ViewChangeInputValue): void {
    console.log("onViewChangeTilt", value);
  }

  #onViewChangePan(value: ViewChangeInputValue): void {
    console.log("onViewChangePan", value);
  }

  #onViewChangeZoom(value: ViewChangeInputValue): void {
    console.log("onViewChangeZoom", value);
  }

  #onStatusChangeStart(value: StatusChangeInputValue): void {
    console.log("onStatusChangeStart", value);
  }

  #onStatusChangeStop(value: StatusChangeInputValue): void {
    console.log("onStatusChangeStop", value);
  }

  #onStatusChangeDown(value: StatusChangeInputValue): void {
    console.log("onStatusChangeDown", value);
  }

  #onStatusChangeUp(value: StatusChangeInputValue): void {
    console.log("onStatusChangeUp", value);
  }
}
