export default {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/*.test.ts"],
  moduleFileExtensions: ["ts", "js"],
  rootDir: "tests",
  verbose: true,
  moduleNameMapper: {
    '@layer': '<rootDir>/../layers/nodejs/dist',
    '^@core/(.*)$': '<rootDir>/../src/core/$1',
    '@utils': '<rootDir>/../src/utils',
    '@services': '<rootDir>/../src/services',
    '^@src/(.*)$': '<rootDir>/../src/$1',
  },
  setupFiles: ['<rootDir>/jest.setup.ts'],
}