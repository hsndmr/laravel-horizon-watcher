export interface HorizonProcessArgs {
  phpInterpreter?: string;
  artisanPath: string;
}

export interface HorizonProcessSpawnArgs {
  onStdout: (data: string) => void;
  onClose: (code: number) => void;
}
