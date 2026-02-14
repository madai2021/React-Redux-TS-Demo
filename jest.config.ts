import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  testMatch: ["**/*.test.(ts|tsx)"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{ts,tsx}"],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov"],
};

export default config;
