import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { ThreeDViewEngine } from "../threeDViewEngine";

export class ThreeCore extends ThreeDViewEngine {
  private renderer: THREE.WebGLRenderer | null;
  private scene: THREE.Scene | null;
  private camera: THREE.PerspectiveCamera | null;
  private controls!: OrbitControls;
  private animationId: number | null;

  constructor() {
    super();
    this.renderer = null;
    this.scene = null;
    this.camera = null;
    this.animationId = null;
  }

  init(canvas: HTMLCanvasElement): void {
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
    });
    this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x33334c);

    const aspect = canvas.clientWidth / canvas.clientHeight;
    this.camera = new THREE.PerspectiveCamera(35, aspect, 0.1, 100);
    this.camera.position.set(5, 0, 0);
    this.camera.up.set(0, 1, 0);

    this.controls = new OrbitControls(this.camera, canvas);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.target.set(0, 0, 0);
    this.controls.update();

    const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1.0);
    light.position.set(1, 1, 0);

    this.scene.add(light);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const cube = new THREE.Mesh(geometry, material);
    this.scene.add(cube);
  }

  startRender(): void {
    if (!this.renderer || !this.scene || !this.camera) return;

    const animate = () => {
      this.controls.update();
      this.renderer!.render(this.scene!, this.camera!);
      this.animationId = requestAnimationFrame(animate);
    };

    animate();
  }

  stopRender(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  dispose(): void {
    this.stopRender();

    if (this.scene) {
      this.scene.traverse((obj) => {
        if ((obj as THREE.Mesh).geometry)
          (obj as THREE.Mesh).geometry.dispose();
        if ((obj as THREE.Mesh).material) {
          const mat = (obj as THREE.Mesh).material as THREE.Material;
          mat.dispose();
        }
      });
    }

    this.renderer?.dispose();
    this.renderer = null;
    this.scene = null;
    this.camera = null;
  }
}
