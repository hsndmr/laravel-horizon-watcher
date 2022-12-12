import { ChildProcessWithoutNullStreams, spawn } from 'child_process';

import {
  HorizonProcessArgs,
  HorizonProcessSpawnArgs,
} from './horizon-process.interface';

export class HorizonProcess {
  stream?: ChildProcessWithoutNullStreams;

  constructor(private args: HorizonProcessArgs) {}

  spawnHorizon({
    onStdout,
    onClose,
  }: HorizonProcessSpawnArgs): Promise<string> {
    return new Promise((resolve, reject) => {
      this.stream = spawn(
        this.args.phpInterpreter || 'php',
        [this.args.artisanPath + 'artisan', 'horizon'],
        {
          detached: true,
        }
      );
      this.stream.stdout.on('data', (data) => {
        onStdout(data.toString());
      });
      this.stream.stderr.on('data', (data) => {
        reject(data.toString());
      });
      this.stream.on('close', (code) => {
        onClose(code);
        resolve('closed');
      });
      this.stream.on('error', (err) => {
        reject(err);
      });
      this.stream.on('uncaughtException', function (err) {
        reject(err);
      });
    });
  }

  kill() {
    this.stream?.stdin.destroy();
    this.stream?.unref();
    this.stream?.kill();
  }
}
