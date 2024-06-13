// eslint-disable-next-line import/no-extraneous-dependencies -- devDependencies are allowed
import type { Config } from '@jest/types';
import { glob } from 'glob';
import { join } from 'path';

const config: Config.InitialOptions = {
  verbose: true,
  moduleFileExtensions: [
    'js',
    'json',
    'ts',
  ],
  rootDir: '.',
  testRegex: '.*\\.(test|spec)\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: [
    '**/*.(t|j)s',
  ],
  moduleDirectories: [
    'node_modules',
    '.',
  ],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  setupFiles: glob.sync(join(__dirname, './test/setup/*.setup.ts')),
};

export default config;