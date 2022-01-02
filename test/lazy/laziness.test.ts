import { Project, SourceCode } from 'projen';
import { LazyDynamoDBSchema } from '../../src/lazy/aws-sdk/v3/aws-dynamodb/lazy-schema';
import { Laziness } from '../../src/lazy/laziness';

jest.mock('projen', () => {
  return {
    Project: jest.fn().mockImplementation(() => {
      return {
        name: 'projen',
        projenCommand: 'npx projen',
      };
    }),
    SourceCode: jest.fn().mockImplementation(() => {
      return {
        indent: 2,
        indentLevel: 0,
        file: {
          executable: false,
          readonly: true,
        },
        open: jest.fn().mockImplementation(() => { return {}; }),
        close: jest.fn().mockImplementation(() => { return {}; }),
        line: jest.fn().mockImplementation(() => { return {}; }),
      };
    }),
  };
});

test('Project is called', () => {
  new Laziness('projen');
  expect(Project).toHaveBeenCalledTimes(1);
});

test('', () => {
  const lazy = new LazyDynamoDBSchema('projen', 'Test');
  lazy.createModel({ partitionKey: { key: 'testKey', type: 'string' } } );
  expect(SourceCode).toHaveBeenCalledTimes(1);
});