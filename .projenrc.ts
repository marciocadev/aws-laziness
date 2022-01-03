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

  mutableBuild: true,

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

// new JsonFile(project, './src/version-aws-laziness.json', {
//   obj: { version: version },
//   readonly: false,
//   marker: false,
// });

const version = project.addTask('version-app');
version.exec('cp package.json src/package.json');
project.postCompileTask.spawn(version);

project.synth();