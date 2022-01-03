#!/usr/bin/env node

import { program } from 'commander';
import { version } from './version.json';
import './commands/dynamodb-schema';
program.version(version, '-v, --version', 'output current version');
program.parse(process.argv);
