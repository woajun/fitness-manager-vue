declare const Kakao : {
  init: (key: string) => void;
  Auth: any;
};

export function kakaoInit() {
  Kakao.init('8e53e038d8115c2ce57ff4702ca30d40');
}

function login() {
  Kakao.Auth.authorize({
    redirectUri: 'http://127.0.0.1:5173',
  });
}

export default {
  login,
};
