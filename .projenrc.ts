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
    '@types/node-notifier',
    '@types/cli-color',
  ],
  bundledDeps: [
    'cli-color',
    'node-notifier',
    'commander',
  ],

  codeCov: true,
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