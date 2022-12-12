import { fileExists } from './fs-helper';

describe('fileExists', () => {
  it('should return true if file exists', async () => {
    const path = `${__dirname}/fs-helper.spec.ts`;
    const result = await fileExists(path);
    expect(result).toBe(true);
  });

  it('should return false if file not exists', async () => {
    const path = `${__dirname}/fshelper.spec.ts`;
    const result = await fileExists(path);
    expect(result).toBe(false);
  });
});
