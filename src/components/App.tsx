import Counter from "./counter/Counter";

const App: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
      }}
    >
      <div
        style={{
          flex: 1,
        }}
      >
        <Counter />
      </div>
      <div
        style={{
          flex: 1,
        }}
      >
        <Counter />
      </div>
    </div>
  );
};

export default App;
