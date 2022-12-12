import * as fs from 'fs';
import * as path from 'path';

import { wait } from './fs-helper';
import { HorizonWatcher } from './horizon-watcher';

const mockApp = path.join(__dirname, '../..', 'mock-app');

describe('HorizonWatcher', () => {
  it('should return false for not exists laravel', async () => {
    const horizonWatcher = new HorizonWatcher({
      path: `${mockApp}/not-exists-laravel`,
    });
    const isHorizonInstalled = await horizonWatcher.isHorizonInstalled();
    expect(isHorizonInstalled).toBe(false);
  });

  it('should return false laravel app that is not installed horizon', async () => {
    const horizonWatcher = new HorizonWatcher({
      path: `${mockApp}/laravel-without-horizon`,
    });
    const isHorizonInstalled = await horizonWatcher.isHorizonInstalled();
    expect(isHorizonInstalled).toBe(false);
  });

  it('should return true laravel app that is installed horizon', async () => {
    const horizonWatcher = new HorizonWatcher({
      path: `${mockApp}/laravel-with-horizon`,
    });
    const isHorizonInstalled = await horizonWatcher.isHorizonInstalled();
    expect(isHorizonInstalled).toBe(true);
  });

  it('should call onChange method when file is changed', async () => {
    const horizonWatcher = new HorizonWatcher({
      path: `${mockApp}/laravel-with-horizon`,
    });
    const onChange = jest.fn();
    horizonWatcher.watch({ onChange });

    fs.writeFileSync(`${mockApp}/laravel-with-horizon/app/file.php`, 'test');

    await wait(1000);
    expect(onChange).toBeCalledTimes(1);
    await horizonWatcher.close();
  });

  it('should get paths with prefix app path', () => {
    const horizonWatcher = new HorizonWatcher({
      path: 'path',
    });

    const paths = horizonWatcher.getPaths();

    expect(paths).toEqual([
      'path/app',
      'path/config',
      'path/resources/views',
      'path/database',
      'path/.env',
      'path/composer.lock',
    ]);
  });
});
