module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
  moduleNameMapper: {
    '^expo-localization$': '<rootDir>/test-mocks/expo-localization.js',
    '^@react-native-async-storage/async-storage$': '<rootDir>/test-mocks/async-storage.js',
    '^react-i18next$': '<rootDir>/test-mocks/react-i18next.js',
  },
};
