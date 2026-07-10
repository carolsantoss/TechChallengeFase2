module.exports = {
  testEnvironment: 'node',
  verbose: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ["text", "lcov"],
  coveragePathIgnorePatterns: ['/node_modules/'],
  testResultsProcessor: "jest-sonar-reporter",
  testMatch: ['**/tests/**/*.test.js'],
};