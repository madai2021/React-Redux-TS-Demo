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
        <ThreeDView />
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
