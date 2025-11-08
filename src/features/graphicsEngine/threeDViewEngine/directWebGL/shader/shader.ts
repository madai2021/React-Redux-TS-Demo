export class Shader {
  private program: WebGLProgram | null;

  private vertexShader = `#version 300 es
      precision mediump float;
      layout(location = 0) in vec3 aPosition;
      layout(location = 1) in vec3 aNormal;
      uniform mat4 uMVP;
      uniform vec3 uLightDir;
      out float vLight;
      void main(void) {
        gl_Position = uMVP * vec4(aPosition, 1.0);
        vLight = max(dot(normalize(aNormal), normalize(uLightDir)), 0.0);
      }
    `;

  private fragmentShader = `#version 300 es
      precision mediump float;
      in float vLight;
      out vec4 outColor;
      void main(void) {
        vec3 baseColor = vec3(1.0, 1.0, 1.0);
        outColor = vec4(baseColor * (0.3 + 0.7 * vLight), 1.0);
      }
    `;

  constructor() {
    this.program = null;
  }

  init(gl: WebGL2RenderingContext) {
    const vs = this.createShader(gl, gl.VERTEX_SHADER, this.vertexShader);
    const fs = this.createShader(gl, gl.FRAGMENT_SHADER, this.fragmentShader);

    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(program) || "link error");
    }
    this.program = program;
    gl.useProgram(program);
  }

  getProgram(): WebGLProgram | null {
    return this.program;
  }

  dispose(): void {
    this.program = null;
  }

  private createShader(
    gl: WebGL2RenderingContext,
    type: number,
    src: string
  ): WebGLShader {
    const shader = gl.createShader(type)!;
    gl.shaderSource(shader, src);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
      throw new Error(gl.getShaderInfoLog(shader) || "shader error");
    return shader;
  }
}
