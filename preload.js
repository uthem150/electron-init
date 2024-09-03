const { contextBridge, ipcRenderer } = require("electron");

// contextBridge를 통해 전역 변수나 함수를 렌더러 프로세스(render.js)에 노출
contextBridge.exposeInMainWorld("versions", {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,

  // 프로세스 간 통신(IPC)
  // 웹 페이지에서 메인 프로세스로 메시지를 보내려면,
  // `ipcMain.handle`을 사용하여 메인 프로세스 핸들러를 설정한 다음,
  // 프리로드 스크립트에서 이를 호출하는 `ipcRenderer.invoke` 함수를 노출할 수 있음
  ping: () => ipcRenderer.invoke("ping"), // IPC 호출을 위한 함수 노출

  // 함수뿐만 아니라 변수도 노출할 수 있음
});
