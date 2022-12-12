import * as fs from 'fs';

export interface HorizonWatcherArgs {
  path: string;
  phpInterpreter?: string;
}

export interface HorizonWatcherWatchArgs {
  onChange: (path: string, stats?: fs.Stats) => void;
}
