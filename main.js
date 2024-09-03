// 메인 스크립트에서 Electron 모듈을 불러옴
const { app, BrowserWindow } = require("electron");

// 새로운 브라우저 창을 생성하는 함수를 정의
function createWindow() {
  // BrowserWindow 인스턴스를 생성
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
