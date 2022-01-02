import { LazyDynamoDBSchema } from '../src/aws-sdk/v3/aws-dynamodb/lazy-dynamodb-schema';

const lazy = new LazyDynamoDBSchema('lazy-model', 'Company');
lazy.createModel({
  partitionKey: { key: 'company', type: 'string' },
  sortKey: { key: '', type: 'string' },
});
lazy.synth();