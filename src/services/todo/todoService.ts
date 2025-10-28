import type { Todo } from "../../features/todo/todoSlice";
import { createApiThunk } from "../apiThunkService";

export const fetchTodosThunk = createApiThunk<Todo[]>(
  "todos/fetchTodos",
  // JSONPlaceholderはフロントエンド開発用のモック API
  // ダミーデータを返してくれる
  "https://jsonplaceholder.typicode.com/todos?_limit=5"
);
