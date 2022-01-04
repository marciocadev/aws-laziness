#!/usr/bin/env node

import { program } from 'commander';
import './commands/aws-sdk/dynamodb';
import './commands/aws-cdk/dynamodb';
import { AWS_LAZINESS_VERSION } from './common';
program.version(
  AWS_LAZINESS_VERSION,
  '-v, --version',
  'output current version',
);
program.parse(process.argv);
