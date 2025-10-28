import { useState } from "react";
import { useDispatch } from "react-redux";
import { BaseTodoProps } from "./types";

import {
  handleAddTodo,
  handleRemoveTodo,
  handleToggleTodo,
} from "./TodoActions";

interface TodoLocalStorageProps extends BaseTodoProps {}

const TodoLocalStorage: React.FC<TodoLocalStorageProps> = ({ todos }) => {
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
              checked={t.completed}
              onChange={() => handleToggleTodo(dispatch, t.id)}
              style={{ marginRight: "0.5rem" }}
            />
            <span
              style={{
                flex: 1,
              }}
            >
              {t.title}
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

export default TodoLocalStorage;
