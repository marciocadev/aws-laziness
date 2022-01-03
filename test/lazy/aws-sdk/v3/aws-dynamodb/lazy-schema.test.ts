import { LazyDynamoDBSchema } from '../../../../../src/lazy/aws-sdk/v3/aws-dynamodb/lazy-schema';


describe('LazyDynamoDBSchema tests', () => {
  let lazy: LazyDynamoDBSchema;

  beforeAll(() => {
    lazy = new LazyDynamoDBSchema('schema', 'Test', 'new');
  });

  test('test creation of LazyDynmoDBSchema', () => {
    expect(lazy.name).toBe('schema');
    expect(lazy.entityName).toBe('Test');
  });
});
