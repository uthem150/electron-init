import { app, BrowserWindow, Menu, shell } from "electron";
import path from "path";

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  win.loadURL("http://localhost:3000");
}

const template = [
  {
    label: "File",
    submenu: [
      {
        label: "Open",
        type: "checkbox",
        checked: true,
        click: function () {
          shell.openExternal("https://www.electronjs.org/docs/api");
        },
      },
      { type: "separator" },

      {
        role: "toggleDevTools",
      },
    ],
  },
];
const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

app.whenReady().then(() => {
  createWindow();
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
