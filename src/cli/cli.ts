import colors from 'colors';

import { isPhpInstalled } from '../lib/exec-helper';
import { HorizonProcess } from '../lib/horizon-process';
import { HorizonWatcher } from '../lib/horizon-watcher';

import { CliStartArgs } from './cli.interface';
export class Cli {
  async start(argv: CliStartArgs) {
    const basePath = process.cwd();

    const horizonWatcher = new HorizonWatcher({
      path: basePath,
      pathsToWatch: argv.paths,
    });

    if (!(await isPhpInstalled())) {
      console.log(colors.red('php is not installed'));
      return;
    }

    if (!(await horizonWatcher.isHorizonInstalled())) {
      console.log(colors.red('Horizon is not installed'));
      return;
    }

    const handleStdout = (data) => {
      console.log(colors.yellow(data));
    };

    const handleClose = () => {
      //
    };

    const horizonProcess = new HorizonProcess({
      artisanPath: basePath + '/',
      phpInterpreter: argv.php,
    });

    const spawnHorizon = async () => {
      horizonProcess.kill();
      horizonProcess.spawnHorizon({
        onStdout: handleStdout,
        onClose: handleClose,
      });
    };

    console.log(colors.green('Starting Horizon...'));
    spawnHorizon();

    horizonWatcher.watch({
      onChange: async () => {
        horizonProcess.kill();
        console.log(colors.green('Restarting Horizon...'));
        await spawnHorizon();
      },
    });

    process.on('exit', async () => {
      console.log(colors.green('Terminating Horizon...'));
      horizonProcess.kill();
      await horizonWatcher.close();
    });

    process.on('SIGINT', () => process.exit());
    process.on('SIGHUP', () => process.exit());
    process.on('SIGTERM', () => process.exit());
  }
}
