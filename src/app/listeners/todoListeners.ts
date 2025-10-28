import Logger from "../../config/logger";
import {
  addTodo,
  removeTodo,
  replaceTodos,
  setServerMode,
  toggleTodo,
} from "../../features/todo/todoSlice";
import TodoStorage from "../../features/todo/todoStorage";
import { fetchTodosThunk } from "../../services/todo/todoService";
import { RootState } from "../store";
import { startListening } from "./index";

const registerTodoListeners = () => {
  // Todo の追加・更新・削除時に localStorage に保存するリスナー
  startListening({
    predicate: (action) =>
      action.type === addTodo.type ||
      action.type === toggleTodo.type ||
      action.type === removeTodo.type,
    effect: async (_, api) => {
      Logger.info("Todo state changed, saving to localStorage");
      const state = api.getState() as RootState;
      TodoStorage.save(state.todo.list);
    },
  });

  startListening({
    predicate: (action) => action.type === setServerMode.type,
    effect: async (_, api) => {
      Logger.info("Todo state changed, changed isServerMode");
      const state = api.getState() as RootState;
      if (state.todo.isServerMode) {
        // サーバーモード切り替え時はサーバーから取得してリストを差し替える
        const resultAction = await api.dispatch(fetchTodosThunk());
        if (fetchTodosThunk.fulfilled.match(resultAction)) {
          api.dispatch(replaceTodos(resultAction.payload));
        } else {
          Logger.error("Failed to fetch todos:", resultAction.error);
        }
      } else {
        // ローカルモード切り替え時は localStorage から取得してリストを差し替える
        api.dispatch(replaceTodos(TodoStorage.load()));
      }
    },
  });
};

export default registerTodoListeners;
