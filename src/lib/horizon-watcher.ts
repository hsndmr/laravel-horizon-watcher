import chokidar, { FSWatcher } from 'chokidar';

import { fileExists } from './fs-helper';
import {
  HorizonWatcherArgs,
  HorizonWatcherWatchArgs,
} from './horizon-watcher.interface';
export class HorizonWatcher {
  paths: string[] = [
    'app',
    'config',
    'resources/views',
    'database',
    '.env',
    'composer.lock',
  ];

  watcher?: FSWatcher;

  constructor(private args: HorizonWatcherArgs) {}

  isHorizonInstalled() {
    return fileExists(`${this.args.path}/vendor/laravel/horizon/composer.json`);
  }

  getPaths() {
    return this.paths.map((path) => `${this.args.path}/${path}`);
  }

  watch(args: HorizonWatcherWatchArgs) {
    this.watcher = chokidar.watch(this.getPaths(), {
      persistent: true,
    });

    this.watcher.on('change', args.onChange);
  }

  async close(): Promise<void> {
    return await this.watcher?.close();
  }
}
