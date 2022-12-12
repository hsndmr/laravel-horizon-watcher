import { Cli } from './cli';

const cli = new Cli();

// eslint-disable-next-line @typescript-eslint/no-var-requires
const yargs = require('yargs')
  .usage('Usage: laravel-horizon-auto-restart <command> [options]')
  .command(
    'start [php] [path]',
    'start the server',
    (yargs) => {
      return yargs
        .positional('php', {
          describe: 'php interpreter path',
          default: 'php',
        })
        .positional('paths', {
          describe: 'paths to watch',
          default: '',
        });
    },
    (argv) => {
      cli.start(argv);
    }
  )
  .demandCommand(1, 'Please provide a valid command.')
  .help('help')
  .alias('help', 'h');

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const argv = yargs.argv;
