import * as THREE from "three";

export class Cube {
  public positions: Float32Array;
  public normals: Float32Array;
  public indices: Uint16Array;

  private positionVbo: WebGLBuffer;
  private normalVbo: WebGLBuffer;
  private indexVbo: WebGLBuffer;

  private modelMatrix: THREE.Matrix4;

  constructor(gl: WebGL2RenderingContext, vao: WebGLVertexArrayObject) {
    gl.bindVertexArray(vao);

    // 頂点バッファの設定
    this.positions = new Float32Array([
      // front
      -1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1, 1,
      // back
      -1, -1, -1, -1, 1, -1, 1, 1, -1, 1, -1, -1,
      // top
      -1, 1, -1, -1, 1, 1, 1, 1, 1, 1, 1, -1,
      // bottom
      -1, -1, -1, 1, -1, -1, 1, -1, 1, -1, -1, 1,
      // right
      1, -1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1,
      // left
      -1, -1, -1, -1, -1, 1, -1, 1, 1, -1, 1, -1,
    ]);

    this.positionVbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.positionVbo);
    gl.bufferData(gl.ARRAY_BUFFER, this.positions, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);

    // 法線バッファの設定
    this.normals = new Float32Array([
      // front
      0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
      // back
      0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1,
      // top
      0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0,
      // bottom
      0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0,
      // right
      1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,
      // left
      -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0,
    ]);

    this.normalVbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.normalVbo);
    gl.bufferData(gl.ARRAY_BUFFER, this.normals, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(1);
    gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 0, 0);

    // インデックスバッファの設定
    this.indices = new Uint16Array([
      0,
      1,
      2,
      0,
      2,
      3, // front
      4,
      5,
      6,
      4,
      6,
      7, // back
      8,
      9,
      10,
      8,
      10,
      11, // top
      12,
      13,
      14,
      12,
      14,
      15, // bottom
      16,
      17,
      18,
      16,
      18,
      19, // right
      20,
      21,
      22,
      20,
      22,
      23, // left
    ]);

    this.indexVbo = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexVbo);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.STATIC_DRAW);

    gl.bindVertexArray(null);

    this.modelMatrix = new THREE.Matrix4().identity();
  }

  getModelMatrix(): THREE.Matrix4 {
    return this.modelMatrix;
  }
}
