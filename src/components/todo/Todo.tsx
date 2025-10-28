import { FormControlLabel, Switch } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { FilterType } from "../../features/filter/filterSlice";
import { FilterButtons } from "../filter/FilterButtons";
import { handleIsServerMode } from "./TodoActions";
import TodoLocalStorage from "./TodoLocalStorage";
import TodoServer from "./TodoServer";

const Todo: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todo.list);
  const filter = useSelector((state: RootState) => state.filter.value);
  const filteredTodos = todos.filter((t) => {
    if (filter === FilterType.Active) return !t.completed;
    if (filter === FilterType.Completed) return t.completed;
    return true;
  });

  const isServerMode = useSelector(
    (state: RootState) => state.todo.isServerMode
  );
  const dispatch = useDispatch();
  return (
    <div>
      <FormControlLabel
        control={
          <Switch
            checked={isServerMode}
            onChange={() => handleIsServerMode(dispatch, !isServerMode)}
          />
        }
        label={
          (isServerMode ? "サーバーモード" : "ローカルストレージモード") +
          "で動作中"
        }
      />
      {isServerMode ? (
        <TodoServer todos={filteredTodos} />
      ) : (
        <TodoLocalStorage todos={filteredTodos} />
      )}
      <FilterButtons />
    </div>
  );
};

export default Todo;
