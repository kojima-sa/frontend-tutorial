// jest.config.ts
import nextJest from 'next/jest.js';
import type { Config } from 'jest';

const createJestConfig = nextJest({
    dir: './',
});

const customJestConfig: Config = {
    testEnvironment: 'jest-environment-jsdom',
    coverageProvider: 'v8',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
};

export default createJestConfig(customJestConfig);
