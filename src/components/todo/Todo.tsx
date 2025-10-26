import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { TodoState } from "../../features/todo/todoSlice";
import {
  handleAddTodo,
  handleRemoveTodo,
  handleToggleTodo,
} from "./TodoActions";

const Todo: React.FC = () => {
  const todos = useSelector(
    (state: { todoSlice: TodoState }) => state.todoSlice.list
  );
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
        {todos.map((t) => (
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
    </div>
  );
};

export default Todo;
