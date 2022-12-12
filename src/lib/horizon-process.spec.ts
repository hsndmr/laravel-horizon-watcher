import path from 'path';

import { wait } from './fs-helper';
import { HorizonProcess } from './horizon-process';

const mockLaravelApp = path.join(
  __dirname,
  '../..',
  'mock-app/laravel-with-horizon'
);

const mockNotLaravelApp = path.join(
  __dirname,
  '../..',
  'mock-app/laravel-with-horizon'
);

describe('horizonProcess', () => {
  it('should kill if kill method is called', async () => {
    const horizonProcess = new HorizonProcess({
      artisanPath: `${mockLaravelApp}/`,
    });
    const onStdout = jest.fn();

    horizonProcess.spawnHorizon({
      onStdout: onStdout,
      onClose: jest.fn(),
      onExit: jest.fn(),
    });

    await wait(100);

    horizonProcess.kill();

    expect(onStdout.mock.calls.length).toBeLessThan(3);
  });
  it('should execute laravel horizon', async () => {
    const horizonProcess = new HorizonProcess({
      artisanPath: `${mockNotLaravelApp}/`,
    });
    const onStdout = jest.fn();
    const onClose = jest.fn();
    const onExit = jest.fn();

    await horizonProcess.spawnHorizon({
      onStdout,
      onClose,
      onExit,
    });

    expect(onStdout).toBeCalledTimes(3);
    expect(onClose).toHaveBeenCalled();
    expect(onExit).toHaveBeenCalled();
  });
  it('should throw error if there is no artisan file', async () => {
    const mockLaravelApp = path.join(
      __dirname,
      '../..',
      'mock-app/laravel-without-horizon'
    );

    const horizonProcess = new HorizonProcess({
      artisanPath: `${mockLaravelApp}/`,
    });
    const onStdout = jest.fn();
    const onClose = jest.fn();
    const onExit = jest.fn();

    const stdout = await horizonProcess.spawnHorizon({
      onStdout,
      onClose,
      onExit,
    });

    expect(stdout.includes('Could not open input file')).toBe(true);

    expect(onStdout).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
    expect(onExit).toHaveBeenCalled();
  });
});
