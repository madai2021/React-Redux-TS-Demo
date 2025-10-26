import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { FilterType } from "../../features/filter/filterSlice";
import { FilterButtons } from "../filter/FilterButtons";
import {
  handleAddTodo,
  handleRemoveTodo,
  handleToggleTodo,
} from "./TodoActions";

const Todo: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todo.list);
  const filter = useSelector((state: RootState) => state.filter.value);
  const filteredTodos = todos.filter((t) => {
    if (filter === FilterType.Active) return !t.done;
    if (filter === FilterType.Completed) return t.done;
    return true;
  });

  const [text, setText] = useState("");

  const dispatch = useDispatch();
  return (
    <div>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="新しいTodoを追加"
      />
      <button onClick={() => handleAddTodo(dispatch, text)}>追加</button>

      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {filteredTodos.map((t) => (
          <li key={t.id}>
            <input
              type="checkbox"
              checked={t.done}
              onChange={() => handleToggleTodo(dispatch, t.id)}
              style={{ marginRight: "0.5rem" }}
            />
            <span
              style={{
                flex: 1,
              }}
            >
              {t.text}
            </span>
            <button onClick={() => handleRemoveTodo(dispatch, t.id)}>
              削除
            </button>
          </li>
        ))}
      </ul>
      <FilterButtons />
    </div>
  );
};

export default Todo;
