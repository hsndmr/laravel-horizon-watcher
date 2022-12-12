import fs from 'fs/promises';

const fileExists = async (path) => !!(await fs.stat(path).catch(() => false));

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export { fileExists, wait };
