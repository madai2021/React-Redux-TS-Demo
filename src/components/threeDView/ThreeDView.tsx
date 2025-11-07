import { useEffect, useRef } from "react";
import { IGraphicsEngine } from "../../features/graphicsEngine/IGraphicsEngine";
import { BabylonCore } from "../../features/graphicsEngine/threeDViewEngine/babylon";

const ThreeDView: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const engineRef = useRef<IGraphicsEngine | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    engineRef.current = new BabylonCore();
    engineRef.current.init(canvasRef.current);
    engineRef.current.startRender();

    return () => {
      engineRef.current?.dispose();
      engineRef.current = null;
    };
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

export default ThreeDView;
