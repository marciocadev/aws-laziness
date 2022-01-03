#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
import { program, Argument } from 'commander';
import { LazyDynamoDBSchema } from '../../lazy/aws-sdk/v3/aws-dynamodb/lazy-schema';

program
  .command('dynamodb-schema')
  .alias('schema')
  .addArgument(new Argument('<name>', 'data model name'))
  .option('-p, --path <path>', 'path to create files')
  .option('-j, --json-model <file>', 'json file with description of the table')
  .option('-d, --debug', 'display some debugging')
  .description('Generate DynamoDB Schema')
  .action(async (name, options, command) => {
    if (options.debug) {
      console.error('Called %s with options %o', command.name(), options);
    }
    console.log(name);
    console.log(options);
    // console.log(command);

    let data = undefined;
    if (options.jsonModel) {
      data = JSON.parse(fs.readFileSync(path.resolve(options.jsonModel), 'utf8'));

      const lazy = new LazyDynamoDBSchema(name, options.path);
      lazy.createModel(data);
      lazy.synth();

      if (options.path) {
        fs.unlinkSync(options.path + '/.gitignore');
        fs.rmdirSync(options.path + '/.projen', { recursive: true });
      } else {
        fs.unlinkSync('/.gitignore');
        fs.rmdirSync('.projen', { recursive: true });
      }
    }
    console.log(data);
  });