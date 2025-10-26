import Logger from "../../config/logger";
import { Todo } from "./todoSlice";

class TodoStorage {
  private static KEY = "todos";

  static load(): Todo[] {
    try {
      const data = localStorage.getItem(this.KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      Logger.error("Failed to load todos:", e);
      return [];
    }
  }

  static save(todos: Todo[]) {
    try {
      localStorage.setItem(this.KEY, JSON.stringify(todos));
      Logger.info("Saved todos to localStorage", todos);
    } catch (e) {
      Logger.error("Failed to save todos", e);
    }
  }

  static clear() {
    try {
      localStorage.removeItem(this.KEY);
      Logger.info("Cleared todos from localStorage");
    } catch (e) {
      Logger.error("Failed to clear todos", e);
    }
  }
}

export default TodoStorage;
