import { BabylonCore } from "../features/graphicsEngine/threeDViewEngine/babylon/BabylonCore";
import { DirectWebGLCore } from "../features/graphicsEngine/threeDViewEngine/directWebGL/DirectWebGLCore";
import { ThreeCore } from "../features/graphicsEngine/threeDViewEngine/three/ThreeCore";
import ThreeDView from "./threeDView/ThreeDView";

const App: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        gap: "20px",
      }}
    >
      <div
        style={{
          flex: 1,
        }}
      >
        <ThreeDView engine={new ThreeCore()} />
      </div>
      <div
        style={{
          flex: 1,
        }}
      >
        <ThreeDView engine={new BabylonCore()} />
      </div>
      <div
        style={{
          flex: 1,
        }}
      >
        <ThreeDView engine={new DirectWebGLCore()} />
      </div>
    </div>
  );
};

export default App;
