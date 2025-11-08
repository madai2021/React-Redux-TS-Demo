import { BabylonCore } from "../features/graphicsEngine/threeDViewEngine/babylon/BabylonCore";
import { ThreeCore } from "../features/graphicsEngine/threeDViewEngine/three/ThreeCore";
import ThreeDView from "./threeDView/ThreeDView";
import Todo from "./todo/Todo";

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
        <Todo />
      </div>
    </div>
  );
};

export default App;
