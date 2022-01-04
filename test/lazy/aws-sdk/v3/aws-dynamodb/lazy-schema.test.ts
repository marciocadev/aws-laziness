// import * as path from 'path';
import { LazyDynamoDBModel } from "../../../../../src/lazy/aws-sdk/v3/aws-dynamodb/lazy-model";
// import * as fs from 'fs-extra';

describe("LazyDynamoDBSchema tests", () => {
  let lazy: LazyDynamoDBModel;

  beforeAll(() => {
    lazy = new LazyDynamoDBModel("Test", "test/files");
    //lazy.synth();
  });

  test("test creation of LazyDynamoDBModel", () => {
    expect(lazy.name).toBe("Test");
    expect(lazy.entityName).toBe("Test");
  });

  // test('composing projects declaratively', () => {
  //   expect(fs.existsSync(path.join(lazy.outdir, '.gitignore'))).toBeTruthy();
  // });
});
