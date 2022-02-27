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
    const partitionKeyType = props.partitionKey.type == "number" ? "number" : "string";
    model.line(`readonly ${props.partitionKey.key}: ${partitionKeyType}; // key`);
    if (props.sortKey) {
      model.line('/**');
      if (props.sortKey.description) {
        model.line(`* ${props.sortKey.description}`);
      }
      model.line(`* **_${props.sortKey.key}_** field is the **sort key**`);
      model.line('*');
      model.line('* @attribute');
      model.line('*/');
      const sortKeyType = props.sortKey.type == "number" ? "number" : "string";
      model.line(
        `readonly ${props.sortKey.key}: ${sortKeyType}; // sort key`,
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
        let fieldType = field.type == "number" ? "number" : "string";
        model.line(`readonly ${field.key}?: ${fieldType};`);
      }
    }
    model.close('}');
    return model;
  }
}
