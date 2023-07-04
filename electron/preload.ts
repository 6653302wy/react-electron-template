const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  writeFile: (path: string, contents: any) =>
    ipcRenderer.invoke("write-file", { path, contents }),
  createDirs: (dirs: string[]) => ipcRenderer.invoke("create-dir", { dirs }),
});
