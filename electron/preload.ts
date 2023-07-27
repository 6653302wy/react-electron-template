const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  sayhello: () => ipcRenderer.invoke("sayhello"),
  createDirs: (dirs: string[]) => ipcRenderer.invoke("create-dir", { dirs }),
  writeFile: (path: string, contents: any) =>
    ipcRenderer.invoke("write-file", { path, contents }),
});
