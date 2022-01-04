#!/usr/bin/env node

import { Project, SourceCode } from 'projen';
import { LazyDynamoDBEntityProps } from '../../../aws/aws-dynamodb/lazy-entity';

export class LazyDynamoDBClient extends Project {
  readonly entityName: string;
  readonly pathFile?: string;

  constructor(entityName: string, pathFile?: string) {
    super({ name: entityName, outdir: pathFile });
    if (entityName.length >= 1) {
      this.entityName = entityName.charAt(0).toUpperCase() + entityName.slice(1);
    } else {
      this.entityName = entityName.toUpperCase();
    }
  }

  createClient(props: LazyDynamoDBEntityProps) {
    const env = `${this.entityName.toUpperCase()}_TABLE_NAME`;
    const basename = this.entityName.toLowerCase();
    let file = `lambda-fns/${basename}/client.ts`;
    const client = new SourceCode(this, file);
    // imports dependencies and iniciate the class
    client.open('import {');
    client.line('DynamoDBClient,');
    client.line('PutItemCommand, PutItemCommandInput,');
    client.line('UpdateItemCommand, UpdateItemCommandInput,');
    client.line('GetItemCommand, GetItemCommandInput,');
    client.line('DeleteItemCommand, DeleteItemCommandInput,');
    client.close('} from \'@aws-sdk/client-dynamodb\';');
    client.line('import { marshall } from \'@aws-sdk/util-dynamodb\';');
    client.line(`import { ${this.entityName} } from \'./model\';`);
    client.line('');
    client.open(`export class ${this.entityName}Client {`);
    client.line('readonly client = new DynamoDBClient({ region: process.env.AWS_REGION });');
    client.line('');
    // create get item function
    if (props && props.sortKey) {
      client.open(`public async getItem(partitionKey: ${props.partitionKey.type}, sortKey: ${props.sortKey.type}) {`);
    } else {
      client.open(`public async getItem(partitionKey: ${props.partitionKey.type}) {`);
    }
    client.line('let keyObj: { [key: string]: any } = {};');
    client.line(`keyObj.${props.partitionKey.key} = partitionKey;`);
    if (props && props.sortKey) {
      client.line(`keyObj.${props.sortKey.key} = sortKey;`);
    }
    client.open('const input: GetItemCommandInput = {');
    client.line(`TableName: process.env.${env},`);
    client.line('Key: marshall(keyObj),');
    client.close('};');
    client.line('return this.client.send(new GetItemCommand(input));');
    client.close('}');
    client.line('');
    // create delete item function
    if (props && props.sortKey) {
      client.open(`public async deleteItem(partitionKey: ${props.partitionKey.type}, sortKey: ${props.sortKey.type}) {`);
    } else {
      client.open(`public async deleteItem(partitionKey: ${props.partitionKey.type}) {`);
    }
    client.line('let keyObj: { [key: string]: any } = {};');
    client.line(`keyObj.${props.partitionKey.key} = partitionKey;`);
    if (props && props.sortKey) {
      client.line(`keyObj.${props.sortKey.key} = sortKey;`);
    }
    client.open('const input: DeleteItemCommandInput = {');
    client.line(`TableName: process.env.${env},`);
    client.line('Key: marshall(keyObj),');
    client.close('};');
    client.line('return this.client.send(new DeleteItemCommand(input));');
    client.close('}');
    // create put item function
    client.open(`public async putItem(item: ${this.entityName}) {`);
    client.open('const input: PutItemCommandInput = {');
    client.line(`TableName: process.env.${env},`);
    client.line('Item: marshall(item),');
    client.close('};');
    client.line('return this.client.send(new PutItemCommand(input));');
    client.close('}');
    client.line('');
    // create update item function
    client.open(`public async updateItem(partitionKey: ${props.partitionKey.type}, item: ${this.entityName}) {`);
    client.line('let expAttrVal: { [key: string]: any } = {};');
    client.line('let upExp = \'set \';');
    client.line('let expAttrNames: { [key: string]: string } = {};');
    if (props && props.fields) {
      for (const field of props.fields) {
        client.open(`if (item.${field.key} !== null && item.${field.key} !== undefined) {`);
        client.line(`expAttrVal[\':${field.key}\'] = item.${field.key};`);
        client.line(`upExp = upExp + \'#${field.key} = :${field.key}\,';`);
        client.line(`expAttrNames[\'#${field.key}\'] = \'${field.key}\';`);
        client.close('};');
      }
    }
    client.line('upExp = upExp.slice(0, -1);');
    client.line('let keyObj: { [key: string]: any } = {};');
    client.line(`keyObj.${props.partitionKey.key} = partitionKey;`);
    if (props && props.sortKey) {
      client.line(`keyObj.${props.sortKey.key} = item.${props.sortKey.key};`);
    }
    client.open('const input: UpdateItemCommandInput = {');
    client.line(`TableName: process.env.${env},`);
    client.line('Key: marshall(keyObj),');
    client.line('ExpressionAttributeValues: marshall(expAttrVal),');
    client.line('UpdateExpression: upExp,');
    client.line('ExpressionAttributeNames: expAttrNames,');
    client.close('};');
    client.line('console.log(input);');
    client.line('return this.client.send(new UpdateItemCommand(input));');
    client.close('}');
    client.line('');
    // end class
    client.close('};');
    return client;
  }
}