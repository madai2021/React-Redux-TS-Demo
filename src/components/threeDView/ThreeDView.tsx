import { useEffect, useRef, useState } from "react";
import { IGraphicsEngine } from "../../features/graphicsEngine/IGraphicsEngine";
import { ThreeDViewProps } from "./types";

const ThreeDView: React.FC<ThreeDViewProps> = ({ engine }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const engineRef = useRef<IGraphicsEngine | null>(null);
  const [engineName, setEngineName] = useState<string>("");

  useEffect(() => {
    if (!canvasRef.current) return;

    engineRef.current = engine;
    engineRef.current.init(canvasRef.current);
    engineRef.current.startRender();

    setEngineName(engineRef.current.getName());

    return () => {
      engineRef.current?.dispose();
      engineRef.current = null;
    };
  }, []);

  return (
    <div>
      <span
        style={{
          flex: 1,
          fontSize: "32px",
        }}
      >
        {engineRef.current?.getName()}
      </span>
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

export default ThreeDView;
