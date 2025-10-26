import { ENV } from "./env";

class Logger {
  // infoログ（開発モードのみ表示）
  static info(...args: any[]) {
    if (ENV.isDevelopment) {
      console.info("[INFO]", ...args);
    }
  }

  // warnログ（開発モードのみ表示）
  static warn(...args: any[]) {
    if (ENV.isDevelopment) {
      console.warn("[WARN]", ...args);
    }
  }

  // errorログ（本番でも表示）
  static error(...args: any[]) {
    console.error("[ERROR]", ...args);
  }
}

export default Logger;
