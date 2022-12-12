import { execPromise, isPhpInstalled } from './exec-helper';

jest.mock('child_process', () => ({
  exec: jest.fn((command, callback) => {
    switch (command) {
      case 'php':
        callback(null, 'PHP 8.1', '');
        break;
      case 'error':
        callback(new Error('error'), '', '');
        break;
      case 'stderr':
        callback(null, '', 'stderr');
        break;
      default:
        callback(null, 'hello', '');
        break;
    }
  }),
}));

describe('exec-helper', () => {
  it('should execute command and return result', async () => {
    const result = await execPromise('echo "hello"');
    expect(result).toBe('hello');
  });

  it('should throw an error if the command callback has an error', async () => {
    await expect(async () => {
      await execPromise('error');
    }).rejects.toThrow();
  });

  it('should throw an error if the command callback stderr prop is not empty', async () => {
    await expect(async () => {
      await execPromise('stderr');
    }).rejects.toEqual('stderr');
  });
  it('should return true if php is installed', async () => {
    expect(await isPhpInstalled()).toEqual(true);
  });
});
