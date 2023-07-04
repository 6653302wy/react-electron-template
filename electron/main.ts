import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";
import installExtension, {
  REACT_DEVELOPER_TOOLS,
} from "electron-devtools-installer";
const fs = require("fs");

function createWindow() {
  const win = new BrowserWindow({
    width: 950,
    height: 750,
    webPreferences: {
      // nodeIntegration: true,
      // contextIsolation: true,
      webSecurity: false,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  if (app.isPackaged) {
    // 'build/index.html'
    win.loadURL(`file://${__dirname}/../index.html`);
  } else {
    win.loadURL("http://localhost:3000/index.html");

    win.webContents.openDevTools();

    // Hot Reloading on 'node_modules/.bin/electronPath'
    require("electron-reload")(__dirname, {
      electron: path.join(
        __dirname,
        "..",
        "..",
        "node_modules",
        ".bin",
        "electron" + (process.platform === "win32" ? ".cmd" : "")
      ),
      forceHardReset: true,
      hardResetMethod: "exit",
    });
  }
}

const createDirs = (dirs: string[]) => {
  // let index = 1;
  // function next(index: number) {
  //   //递归结束判断
  //   if (index > paths.length) return "creat dirs ok!!";
  //   let newPath = paths.slice(0, index).join("/");
  //   fs.access(newPath, function (err: any) {
  //     if (err) {
  //       //如果文件不存在，就创建这个文件
  //       fs.mkdir(newPath, function (err: any) {
  //         next(index + 1);
  //       });
  //     } else {
  //       //如果这个文件已经存在，就进入下一个循环
  //       next(index + 1);
  //     }
  //   });
  // }
  // next(index);
  for (const dir of dirs) {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  }
  return "creat dirs ok!!";
};

const writeFiles = (path: string, contents: any) => {
  console.log(path, contents);
  const buffer = Buffer.from(contents);
  fs.writeFileSync(path, buffer);
  return "file write ok!! ";
};

app.whenReady().then(() => {
  ipcMain.handle("create-dir", (event, message) => {
    console.log(`主程序收到。。。create-dir:`, message);
    return createDirs(message.dirs);
  });
  ipcMain.handle("write-file", (event, message) => {
    console.log("主程序收到。。。write-file: ", message);
    return writeFiles(message.path, message.contents);
  });

  // DevTools
  installExtension(REACT_DEVELOPER_TOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log("An error occurred: ", err));

  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });
});
