#!/usr/bin/env node

import * as path from 'path';
import { program } from 'commander';
import * as fs from 'fs-extra';
import * as inquirer from 'inquirer';
import { LazyDynamoDBClient } from '../../../lazy/aws-sdk/v3/aws-dynamodb/lazy-client';
import { LazyDynamoDBModel } from '../../../lazy/aws-sdk/v3/aws-dynamodb/lazy-model';

program
  .command('sdk-dynamodb')
  .alias('db-model')
  .description('DynamoDB Model and Client')
  .action(() => {
    const questions = [
      { type: 'input', name: 'name', message: 'Name of your model' },
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
      {
        type: 'list',
        name: 'files',
        message: 'Files needed',
        choices: ['client', 'model', 'both'],
      },
    ];
    inquirer
      .prompt(questions)
      .then((answers) => {
        const data = JSON.parse(
          fs.readFileSync(path.resolve(answers.jsonModel), 'utf8'));

        if (answers.files === 'both') {
          const model = new LazyDynamoDBModel(answers.name, answers.path);
          model.createModel(data);
          model.synth();

          fs.unlinkSync(answers.path + '/.gitignore');
          fs.removeSync(answers.path + '/.projen');

          const client = new LazyDynamoDBClient(answers.name, answers.path);
          client.createClient(data);
          client.synth();
        } else if (answers.files === 'model') {
          const model = new LazyDynamoDBModel(answers.name, answers.path);
          model.createModel(data);
          model.synth();
        } else if (answers.files === 'client') {
          const client = new LazyDynamoDBClient(answers.name, answers.path);
          client.createClient(data);
          client.synth();
        }

        fs.unlinkSync(answers.path + '/.gitignore');
        fs.removeSync(answers.path + '/.projen');

        console.log("@aws-sdk/client-dynamodb");
        console.log("@aws-sdk/util-dynamodb");
        console.log("aws-cdk-lib/aws-dynamodb");
      })
      .catch((error) => {
        console.error(error);
        process.exit();
      });
  });
