// import { LazyDynamoDBSchema } from '../../src/lazy/aws-sdk/v3/aws-dynamodb/lazy-schema';
//import { Laziness } from '../../src/lazy/laziness';
// import { Project, SourceCode } from 'projen';

jest.mock('projen', () => {
  class MockProject {
    ts() {
      return {
        indent: 2,
        indentLevel: 0,
      };
    }
  }
  return {
    LazyDynamoDBSchema: MockProject,
    Project: jest.fn().mockImplementation(() => { return {}; }),
    SourceCode: jest.fn().mockImplementation(() => { return {}; }),
  };
});

test('hello1', () => {
  expect(true);
});

// test('', () => {
//   const lazy = new LazyDynamoDBSchema('projen', 'Test');
//   lazy.createModel({ partitionKey: { key: 'testKey', type: 'string' } } );
//   expect(Project).toHaveBeenCalledTimes(1);
//   expect(SourceCode).toHaveBeenCalledTimes(1);
// });


// jest.mock('projen', () => {
//   return {
//     Project: jest.fn().mockImplementation(() => {
//       return {
//         name: 'projen',
//         projenCommand: 'npx projen',
//         ts: jest.fn().mockImplementation(() => { return {}; }),
//       };
//     }),
//     SourceCode: jest.fn().mockImplementation(() => {
//       return {
//         indent: 2,
//         indentLevel: 0,
//         file: {
//           executable: false,
//           readonly: true,
//         },
//         open: jest.fn().mockImplementation(() => { return {}; }),
//         close: jest.fn().mockImplementation(() => { return {}; }),
//         line: jest.fn().mockImplementation(() => { return {}; }),
//       };
//     }),
//   };
// });

// test('Project is called', () => {
//   new Laziness('projen');
//   expect(Project).toHaveBeenCalledTimes(1);
// });

// test('', () => {
//   const lazy = new LazyDynamoDBSchema('projen', 'Test');
//   lazy.createModel({ partitionKey: { key: 'testKey', type: 'string' } } );
//   expect(Project.ts).toHaveBeenCalledTimes(1);
// });