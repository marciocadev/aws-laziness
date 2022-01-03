import { LazyDynamoDBSchema2 } from '../../../../../src/lazy/aws-sdk/v3/aws-dynamodb/lazy-schema-2';

test('teste', () => {
  const lazy = new LazyDynamoDBSchema2('schema', 'Test', '/home/marcio/marciocadev/aws-laziness/test/new');
  lazy.createModel({
    partitionKey: { key: 'company', type: 'string' },
  });
});