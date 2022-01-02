#!/usr/bin/env node

import { Laziness } from '../../../laziness/laziness';
import { LazyDynamoDBEntityProps } from './lazy-dinamodb-entity';

export class LazyDynamoDBSchema extends Laziness {
  readonly entityName: string;
  readonly pathFile?: string;

  constructor(title: string, entityName: string, pathFile?: string) {
    super(title);
    if (pathFile) this.pathFile = pathFile;
    if (entityName.length >= 1) {
      this.entityName = entityName.charAt(0).toUpperCase() + entityName.slice(1);
    } else {
      this.entityName = entityName.toUpperCase();
    }
  }

  createModel(props: LazyDynamoDBEntityProps) {
    console.log(props);
    const basename = this.entityName.toLowerCase();
    let file = '';
    if (this.pathFile) {
      file = `${this.pathFile}/lambda-fns/${basename}/model.ts`;
    } else {
      file = `lambda-fns/${basename}/model.ts`;
    }
    const model = this.ts(file);
    model.open(`export interface ${this.entityName} {`);
    model.line('/**');
    model.line(`* **_${props.partitionKey.key}_** field is the **partition key**`);
    model.line('*');
    model.line('* @attribute');
    model.line('*/');
    model.line(`readonly ${props.partitionKey.key}: string; // key`);
    if (props.sortKey) {
      model.line('/**');
      model.line(`* **_${props.sortKey.key}_** field is the **sort key**`);
      model.line('*');
      model.line('* @attribute');
      model.line('*/');
      model.line(`readonly ${props.sortKey.key}: ${props.sortKey.type}; // sort key`);
    }
    if (props.fields) {
      for (const field of props.fields) {
        model.line('/**');
        model.line('*');
        model.line('* @attribute');
        model.line('*/');
        model.line(`readonly ${field.key}?: ${field.type};`);
      }
    }
    model.close('}');
  }
}