import { typescript } from 'projen';
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
  deps: ['projen'],
  devDeps: [
    '@aws-sdk/client-dynamodb',
    '@aws-sdk/util-dynamodb',
    '@types/node-notifier',
    '@types/cli-color',
  ],
  bundledDeps: [
    'cli-color',
    'node-notifier',
    'commander',
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
project.synth();