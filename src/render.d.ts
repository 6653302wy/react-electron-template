export interface IElectronAPI {
  writeFile: (path: string, content: any) => void;
  createDirs: (dirs: string[]) => void;
  sayhello: () => string;
}

declare global {
  interface Window {
    electron: IElectronAPI;
  }
}
