// 메인 스크립트에서 Electron 모듈을 불러옴
const { app, BrowserWindow, ipcMain } = require("electron/main");
const path = require("node:path"); // 스크립트를 렌더러 프로세스에 연결

// 자동 업데이트 활성화
const { updateElectronApp } = require("update-electron-app");
updateElectronApp();

// 새로운 브라우저 창을 생성하는 함수를 정의
function createWindow() {
  // BrowserWindow를 생성하여 HTML 파일을 렌더링
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // preload스크립트 연결
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // 창에 표시할 HTML 파일을 지정
  win.loadFile("index.html");
}

// Electron이 초기화를 완료하고 창을 생성할 준비가 되면 createWindow 함수를 호출
app.whenReady().then(() => {
  ipcMain.handle("ping", () => "pong"); // IPC 핸들러 설정
  createWindow();

  // (macOS에서) 열려 있지 않은 경우 창 열기
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// 모든 창을 닫으면 앱 종료(Windows & Linux)
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
