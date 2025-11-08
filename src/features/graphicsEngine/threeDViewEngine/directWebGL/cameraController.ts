import * as THREE from "three";

export class CameraController {
  public camera: THREE.PerspectiveCamera;
  private canvas: HTMLCanvasElement;

  private azimuth = 0; // 水平角
  private elevation = 0; // 垂直角
  private radius = 5; // 原点からカメラまでの距離
  private target = new THREE.Vector3(0, 0, 0); // 注視点
  private panOffset = new THREE.Vector3(0, 0, 0);

  private dragging = false;
  private dragMode: "rotate" | "pan" | null = null;
  private lastX = 0;
  private lastY = 0;

  constructor(camera: THREE.PerspectiveCamera, canvas: HTMLCanvasElement) {
    this.camera = camera;
    this.canvas = canvas;

    this.initEvents();
    this.updateCamera();
  }

  private initEvents() {
    const canvas = this.canvas;

    canvas.addEventListener("mousedown", (e) => {
      this.dragging = true;
      this.lastX = e.clientX;
      this.lastY = e.clientY;

      if (e.button === 0) this.dragMode = "rotate";
      if (e.button === 2) this.dragMode = "pan";
    });

    canvas.addEventListener("mousemove", (e) => {
      if (!this.dragging) return;

      const dx = e.clientX - this.lastX;
      const dy = e.clientY - this.lastY;
      this.lastX = e.clientX;
      this.lastY = e.clientY;

      if (this.dragMode === "rotate") {
        this.azimuth -= dx * 0.005;
        this.elevation += dy * 0.005;
        const maxElev = Math.PI / 2 - 0.01;
        const minElev = -Math.PI / 2 + 0.01;
        this.elevation = Math.max(minElev, Math.min(maxElev, this.elevation));
        this.rotate(dx, dy);
      } else if (this.dragMode === "pan") {
        this.pan(dx, dy);
      }
      this.updateCamera();
    });

    canvas.addEventListener("mouseup", () => {
      this.dragging = false;
      this.dragMode = null;
    });
    canvas.addEventListener("mouseleave", () => {
      this.dragging = false;
      this.dragMode = null;
    });

    canvas.addEventListener("wheel", (e) => {
      e.preventDefault();
      this.radius += e.deltaY * 0.01;
      this.radius = Math.max(1, Math.min(50, this.radius));
      this.updateCamera();
    });

    canvas.addEventListener("contextmenu", (e) => e.preventDefault());
  }

  private rotate(dx: number, dy: number) {
    this.azimuth -= dx * 0.005;
    this.elevation += dy * 0.005;
    const maxElev = Math.PI / 2 - 0.01;
    const minElev = -Math.PI / 2 + 0.01;
    this.elevation = Math.max(minElev, Math.min(maxElev, this.elevation));
  }

  private pan(dx: number, dy: number) {
    const offset = new THREE.Vector3().subVectors(
      this.camera.position,
      this.target
    );

    const right = new THREE.Vector3()
      .crossVectors(this.camera.up, offset)
      .normalize();
    const up = new THREE.Vector3().crossVectors(offset, right).normalize();

    const panX = right.multiplyScalar(-dx * 0.002 * this.radius);
    const panY = up.multiplyScalar(dy * 0.002 * this.radius);

    this.panOffset.add(panX).add(panY);
  }

  public updateCamera() {
    const x = this.radius * Math.cos(this.elevation) * Math.sin(this.azimuth);
    const y = this.radius * Math.sin(this.elevation);
    const z = this.radius * Math.cos(this.elevation) * Math.cos(this.azimuth);

    this.camera.position.set(
      x + this.target.x + this.panOffset.x,
      y + this.target.y + this.panOffset.y,
      z + this.target.z + this.panOffset.z
    );
    this.camera.lookAt(
      this.target.x + this.panOffset.x,
      this.target.y + this.panOffset.y,
      this.target.z + this.panOffset.z
    );

    this.camera.updateMatrixWorld();
  }

  public resize(width: number, height: number) {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }
}
