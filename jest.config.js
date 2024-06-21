module.exports = {
  preset: 'ts-jest',
  testEnvironment: "node",
  collectCoverage: true,
  testResultsProcessor: "jest-sonar-reporter",
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/test/",
  ],
  coverageThreshold: {
    global: {
      // statements: 80,
      // branches: 80,
      // functions: 80,
      // lines: 80
    }
  },
  coverageReporters: ["cobertura", "lcov"],
  setupFilesAfterEnv: ['./jest.setup.js']
};