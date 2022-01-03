import { version } from './package.json';
import { typescript, JsonFile } from 'projen';

const project = new typescript.TypeScriptProject({
  defaultReleaseBranch: 'main',
  name: 'aws-laziness',
  projenrcTs: true,

  repository: 'https://github.com/marciocadev/mca-lazyless.git',
  release: true,
  releaseToNpm: true,

  bin: {
    'aws-laziness': 'lib/index.js',
  },
  deps: [
    'projen',
  ],
  devDeps: [
    '@aws-sdk/client-dynamodb',
    '@aws-sdk/util-dynamodb',
    '@types/node-notifier',
    '@types/cli-color',
    '@types/fs-extra',
  ],
  bundledDeps: [
    'cli-color',
    'node-notifier',
    'commander',
    'fs-extra',
  ],

  codeCov: true,
  gitpod: true,
  jestOptions: {
    coverageText: false,
  },
  docgen: true,
  eslint: true,
  tsconfig: {
    compilerOptions: {
      lib: ['dom', 'es2019'],
      resolveJsonModule: true,
    },
  },
});

new JsonFile(project, './src/version.json', {
  obj: { version: version },
  marker: false,
});

project.synth();