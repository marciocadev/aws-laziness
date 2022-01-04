#!/usr/bin/env node

import { program } from 'commander';
import './commands/dynamodb-schema';
import './commands/dynamodb-client';
import './commands/cdk-dynamodb-table';
import { AWS_LAZINESS_VERSION } from './common';
program.version(AWS_LAZINESS_VERSION, '-v, --version', 'output current version');
program.parse(process.argv);
