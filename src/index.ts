#!/usr/bin/env node

import { program } from 'commander';
import './commands/dynamodb-schema';
import { AWS_LAZINESS_VERSION } from './common';
program.version(AWS_LAZINESS_VERSION, '-v, --version', 'output current version');
program.parse(process.argv);
