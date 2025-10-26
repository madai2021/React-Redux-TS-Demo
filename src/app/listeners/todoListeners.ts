import Logger from "../../config/logger";
import { addTodo, removeTodo, toggleTodo } from "../../features/todo/todoSlice";
import TodoStorage from "../../features/todo/todoStorage";
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
      const state = api.getState() as any;
      TodoStorage.save(state.todoSlice.list);
    },
  });
};

export default registerTodoListeners;
