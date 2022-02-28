#!/usr/bin/env node

import * as path from 'path';
import { bold } from 'colors';
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
        choices: ['client', 'model', 'client and model'],
      },
    ];
    inquirer
      .prompt(questions)
      .then((answers) => {
        const data = JSON.parse(
          fs.readFileSync(path.resolve(answers.jsonModel), 'utf8'));

        if (answers.files === 'client and model') {
          const model = new LazyDynamoDBModel(answers.name, answers.path);
          model.createModel(data);
          model.synth();

          fs.unlinkSync(answers.path + '/.gitignore');
          fs.removeSync(answers.path + '/.projen');

          const client = new LazyDynamoDBClient(answers.name, answers.path);
          client.createClient(data);
          client.synth();

          const clientDynamodb = '@aws-sdk/client-dynamodb';
          const utilDynamodb = '@aws-sdk/util-dynamodb';
          console.log('');
          console.log('### Run this commands to install the required libraries ###'.blue.bold);
          console.log('npm install %s %s'.bold, clientDynamodb, utilDynamodb);
          console.log('');
          console.log('### Or if you use Projen (I highly recommend) add the   ###'.blue.bold);
          console.log('### libraries to \'deps\' field on projenrc file and run  ###'.blue.bold);
          console.log('### the \'projen\' command to add the dependencies        ###'.blue.bold);
          console.log('{'.bold);
          console.log('  deps: ['.bold);
          console.log('    \'@aws-sdk/client-dynamodb\','.bold);
          console.log('    \'@aws-sdk/util-dynamodb\','.bold);
          console.log('  ],'.bold);
          console.log('}'.bold);
          console.log('');
        } else if (answers.files === 'model') {
          const model = new LazyDynamoDBModel(answers.name, answers.path);
          model.createModel(data);
          model.synth();

          const clientDynamodb = '@aws-sdk/client-dynamodb';
          const utilDynamodb = '@aws-sdk/util-dynamodb';
          console.log('');
          console.log('### Run this commands to install the required libraries ###'.blue.bold);
          console.log('npm install %s %s'.bold, bold(clientDynamodb), bold(utilDynamodb));
          console.log('');
          console.log('### Or if you use Projen (I highly recommend) add the   ###'.blue.bold);
          console.log('### libraries to \'deps\' field on projenrc file and run  ###'.blue.bold);
          console.log('### the \'projen\' command to add the dependencies        ###'.blue.bold);
          console.log('{'.bold);
          console.log('  deps: ['.bold);
          console.log('    \'@aws-sdk/client-dynamodb\','.bold);
          console.log('    \'@aws-sdk/util-dynamodb\','.bold);
          console.log('  ],'.bold);
          console.log('}'.bold);
          console.log('');
        } else if (answers.files === 'client') {
          const client = new LazyDynamoDBClient(answers.name, answers.path);
          client.createClient(data);
          client.synth();

          console.log('');
          console.log('### If you use the CDK 2 or Projen in a CDK 2 project ###'.blue.bold);
          console.log('### (awscdk-app-java, awscdk-app-py, awscdk-app-ts) ###'.blue.bold);
          console.log('### you don\'t need install any library ###'.blue.bold);
          console.log('');
        }

        fs.unlinkSync(answers.path + '/.gitignore');
        fs.removeSync(answers.path + '/.projen');
      })
      .catch((error) => {
        console.error(error);
        process.exit();
      });
  });
