#!/usr/bin/env node

import { program } from 'commander';
import { version } from './version-aws-laziness.json';
import './commands/dynamodb-schema';
program.version(version, '-v, --version', 'output current version');
program.parse(process.argv);

