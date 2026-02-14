import { ENV } from "./env";

class Logger {
  // infoログ（開発モードのみ表示）
  static info(...args: Parameters<typeof console.info>) {
    if (ENV.isDevelopment) {
      console.info("[INFO]", ...args);
    }
  }

  // warnログ（開発モードのみ表示）
  static warn(...args: Parameters<typeof console.warn>) {
    if (ENV.isDevelopment) {
      console.warn("[WARN]", ...args);
    }
  }

  // errorログ（本番でも表示）
  static error(...args: Parameters<typeof console.error>) {
    console.error("[ERROR]", ...args);
  }
}

export default Logger;
