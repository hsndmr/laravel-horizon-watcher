import { exec } from 'child_process';

const execPromise = (command: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error || stderr) {
        reject(error || stderr);
        return;
      }

      resolve(stdout);
    });
  });
};

const isPhpInstalled = (interpreter = 'php'): Promise<boolean> => {
  return execPromise(`${interpreter} -v`)
    .then(() => true)
    .catch(() => false);
};

export { isPhpInstalled, execPromise };
