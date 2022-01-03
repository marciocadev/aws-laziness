#!/usr/bin/env node

//import * as fs from 'fs';
//import * as path from 'path';
import { program } from 'commander';
import './commands/dynamodb-schema';
//program.version(version, '-v, --version', 'output current version');
program.parse(process.argv);
