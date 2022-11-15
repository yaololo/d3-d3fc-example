module.exports = {
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '^src/api-caller(.*)$': '<rootDir>/src/api-caller$1',
    '^src/component(.*)$': '<rootDir>/src/component/$1',
    '^src/interfaces(.*)$': '<rootDir>/src/interfaces$1',
    '^src/store(.*)$': '<rootDir>/src/store$1',
    '^src/lib/(.+)$': '<rootDir>/src/lib/$1',
    '^test-utils(.*)$': '<rootDir>/src/test-utils$1',
    '\\.(css|less)$': 'identity-obj-proxy',
  },
  testPathIgnorePatterns: ['/node_modules/', '/__snapshots__/', '/public/'],
  moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx', 'node'],
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!lodash-es/)',
    'node_modules/(?!(antd)/)',
  ],
  transform: {
    '\\.[jt]sx?$': 'babel-jest',
  },
  setupFiles: ['<rootDir>/jest.init.js'],
  testEnvironmentOptions: {
    url: 'http://localhost:3000',
  },
  testEnvironment: 'jest-environment-jsdom',
}
