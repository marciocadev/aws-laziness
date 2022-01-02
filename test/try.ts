import { LazyDynamoDBSchema } from '../src/lazy/aws-sdk/v3/aws-dynamodb/lazy-schema';

const lazy = new LazyDynamoDBSchema('schema-projen', 'Test');
lazy.createModel({ partitionKey: { key: 'test', type: 'string' } });
console.log(lazy);

// Project
// projenCommand:'npx projen'
// name:'schema-projen'
// outdir:'/home/marcio/marciocadev/aws-laziness/test'

/*
indent:2
indentLevel:0
file: {
  executable: false,
  readonly: true
}
*/