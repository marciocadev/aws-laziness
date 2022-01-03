#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
import { program } from 'commander';
const json = JSON.parse(fs.readFileSync(path.resolve('../package.json'), 'utf8'));
const version = json.version;
import './commands/dynamodb-schema';
program.version(version, '-v, --version', 'output current version');
program.parse(process.argv);
