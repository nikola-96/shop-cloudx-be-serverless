const { pathsToModuleNameMapper } = require("ts-jest");

const { compilerOptions } = require("./tsconfig.paths");

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  roots: ["<rootDir>/src"],
  preset: "ts-jest",
  testEnvironment: "node",
  modulePaths: [compilerOptions.baseUrl],
  moduleDirectories: ["<rootDir>", "node_modules"],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.json",
      },
    ],
  },
};
