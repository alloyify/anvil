module.exports = {
  resetMocks: true,
  coveragePathIgnorePatterns: [],
  collectCoverageFrom: [
    '<rootDir>/lib/**/*.ts',
    '<rootDir>/bin/**/*.ts',
    '!<rootDir>/**/*.d.ts',
    '!<rootDir>/**/index.ts',
    '!<rootDir>/**/*.interface.ts',
    '!**/node_modules/**',
    '!**/__stubs__/**',
    '!**/__fixture__/**',
  ],
  coverageThreshold: null,
  testEnvironment: 'node',
  testRegex: '\\.spec.ts$',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.jest.json',
    },
  },
  moduleDirectories: ['node_modules'],
  moduleFileExtensions: ['js', 'ts'],
};
