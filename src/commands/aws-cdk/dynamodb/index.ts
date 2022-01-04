#!/usr/bin/env node

import * as path from 'path';
import { program } from 'commander';
import * as fs from 'fs-extra';
import * as inquirer from 'inquirer';
import { LazyDynamoDBTable } from '../../../lazy/aws-cdk/aws-dynamodb/lazy-table';

program
  .command('cdk-dynamodb')
  .alias('table')
  .description('DynamoDB Table Class from AWS-CDK')
  .action(() => {
    const questions = [
      { type: 'input', name: 'name', message: 'Name of your model (ex: User)' },
      {
        type: 'input',
        name: 'path',
        message: 'Path where files will be created',
        default: process.cwd(),
      },
      {
        type: 'input',
        name: 'jsonModel',
        message: 'Path to file with description of your model',
      },
    ];
    inquirer
      .prompt(questions)
      .then((answers) => {
        const data = JSON.parse(
          fs.readFileSync(path.resolve(answers.jsonModel), 'utf8'));

        const table = new LazyDynamoDBTable(answers.name, answers.path);
        table.createTable(data);
        table.synth();

        fs.unlinkSync(answers.path + '/.gitignore');
        fs.removeSync(answers.path + '/.projen');
      })
      .catch((error) => {
        console.error(error);
        process.exit();
      });
  });
