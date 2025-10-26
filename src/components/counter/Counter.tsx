import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { handleDecrement, handleIncrement } from "./CounterActions";

const Counter: React.FC = () => {
  const counterValue = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();
  return (
    <div>
      <h1>Counter: {counterValue}</h1>
      <button onClick={() => handleIncrement(dispatch)}>+</button>
      <button onClick={() => handleDecrement(dispatch)}>-</button>
    </div>
  );
};

export default Counter;
