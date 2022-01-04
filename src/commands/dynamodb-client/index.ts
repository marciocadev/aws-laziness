#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
import { program, Argument } from 'commander';
import { LazyDynamoDBClient } from '../../lazy/aws-sdk/v3/aws-dynamodb/lazy-client';

program
  .command('dynamodb-client')
  .alias('db-client')
  .addArgument(new Argument('<name>', 'data model name'))
  .option('-p, --path <path>', 'path to create files')
  .option('-j, --json-model <file>', 'json file with description of the table')
  .option('-d, --debug', 'display some debugging')
  .description('DynamoDB Schema')
  .action(async (name, options, command) => {
    if (options.debug) {
      console.error('Called %s with options %o', command.name(), options);
    }
    let data = undefined;
    if (options.jsonModel) {
      data = JSON.parse(fs.readFileSync(path.resolve(options.jsonModel), 'utf8'));

      const lazy = new LazyDynamoDBClient(name, options.path);
      lazy.createClient(data);
      lazy.synth();

      if (options.path) {
        fs.unlinkSync(options.path + '/.gitignore');
        fs.rmdirSync(options.path + '/.projen', { recursive: true });
      } else {
        fs.unlinkSync('.gitignore');
        fs.rmdirSync('.projen', { recursive: true });
      }
    }
  });