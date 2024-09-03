const information = document.getElementById("info");
information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`;

const func = async () => {
  const response = await window.versions.ping(); // 메인 프로세스와의 IPC 통신 (메인 프로세스로 메시지를 보냄)
  console.log(response); // 'pong' 출력됨
};

func();
