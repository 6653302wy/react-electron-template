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
      webSecurity: false,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  if (app.isPackaged) {
    win.loadURL(`file://${__dirname}/../index.html`);
  } else {
    win.loadURL("http://localhost:3000/index.html");

    win.webContents.openDevTools();

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

// clean up dir
const emptyDir = (path: string) => {
  const files = fs.readdirSync(path);
  files.forEach((file: any) => {
    const filePath = `${path}/${file}`;
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      emptyDir(filePath);
    } else {
      fs.unlinkSync(filePath);
    }
  });
};

const createDirs = (dirs: string[]) => {
  for (const dir of dirs) {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    else emptyDir(dir);
  }
  return "creat dirs ok!!";
};

const writeFiles = (path: string, contents: any) => {
  console.log(path, contents);
  const buffer = Buffer.from(contents);
  fs.writeFileSync(path, buffer);
  return "file write ok!! ";
};

const renderEventHandler = () => {
  ipcMain.handle("sayhello", () => {
    console.log(`main render receive msg: sayhello:`);
    return "Hi, i got message and this is return from main process";
  });

  ipcMain.handle("create-dir", (event, message) => {
    console.log(`main render receive msg: create-dir:`);
    return createDirs(message.dirs);
  });

  ipcMain.handle("write-file", (event, message) => {
    console.log("main render receive msg: write-file: ");
    return writeFiles(message.path, message.contents);
  });
};

app.whenReady().then(() => {
  renderEventHandler();

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
