import { createListenerMiddleware } from "@reduxjs/toolkit";
import registerTodoListeners from "./todoListeners";
export const listenerMiddleware = createListenerMiddleware();

export const startListening = listenerMiddleware.startListening;

// 各機能の listener を登録
registerTodoListeners();

export default listenerMiddleware.middleware;
