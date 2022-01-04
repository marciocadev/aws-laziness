#!/usr/bin/env node

import { Entity } from './entity';

export interface LazyDynamoDBEntityProps {
  readonly partitionKey: Entity;
  readonly sortKey?: Entity;
  readonly fields?: Array<Entity>;
}
