import { app, BrowserWindow, Menu } from "electron";
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
        click: function () {
          console.log("Clicked Menu Open!!!");
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
