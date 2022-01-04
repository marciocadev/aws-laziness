#!/usr/bin/env node

import { Project, SourceCode } from 'projen';
import { LazyDynamoDBEntityProps } from '../../../aws/aws-dynamodb/lazy-entity';

export class LazyDynamoDBModel extends Project {
  readonly entityName: string;
  readonly pathFile?: string;

  constructor(entityName: string, pathFile?: string) {
    super({ name: entityName, outdir: pathFile });
    if (entityName.length >= 1) {
      this.entityName =
        entityName.charAt(0).toUpperCase() + entityName.slice(1);
    } else {
      this.entityName = entityName.toUpperCase();
    }
  }

  createModel(props: LazyDynamoDBEntityProps) {
    const basename = this.entityName.toLowerCase();
    let file = `lambda-fns/${basename}/model.ts`;
    const model = new SourceCode(this, file);
    model.open(`export interface ${this.entityName} {`);
    model.line('/**');
    if (props.partitionKey.description) {
      model.line(`* ${props.partitionKey.description}`);
    }
    model.line(
      `* **_${props.partitionKey.key}_** field is the **partition key**`,
    );
    model.line('*');
    model.line('* @attribute');
    model.line('*/');
    model.line(`readonly ${props.partitionKey.key}: string; // key`);
    if (props.sortKey) {
      model.line('/**');
      if (props.sortKey.description) {
        model.line(`* ${props.sortKey.description}`);
      }
      model.line(`* **_${props.sortKey.key}_** field is the **sort key**`);
      model.line('*');
      model.line('* @attribute');
      model.line('*/');
      model.line(
        `readonly ${props.sortKey.key}: ${props.sortKey.type}; // sort key`,
      );
    }
    if (props.fields) {
      for (const field of props.fields) {
        model.line('/**');
        if (field.description) {
          model.line(`* ${field.description}`);
        }
        model.line('*');
        model.line('* @attribute');
        model.line('*/');
        model.line(`readonly ${field.key}?: ${field.type};`);
      }
    }
    model.close('}');
    return model;
  }
}
