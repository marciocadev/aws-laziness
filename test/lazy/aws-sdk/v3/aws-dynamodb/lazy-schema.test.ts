import * as path from 'path';
import { LazyDynamoDBSchema } from '../../../../../src/lazy/aws-sdk/v3/aws-dynamodb/lazy-schema';
import * as fs from 'fs-extra';

describe('LazyDynamoDBSchema tests', () => {
  let lazy: LazyDynamoDBSchema;

  beforeAll(() => {
    lazy = new LazyDynamoDBSchema('schema', 'Test', 'test/files');
    lazy.synth();
  });

  test('test creation of LazyDynmoDBSchema', () => {
    expect(lazy.name).toBe('schema');
    expect(lazy.entityName).toBe('Test');
  });

  test('composing projects declaratively', () => {
    expect(fs.existsSync(path.join(lazy.outdir, '.gitignore'))).toBeTruthy();
  });
});
