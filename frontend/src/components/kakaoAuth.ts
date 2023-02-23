import axios from 'axios';

declare const Kakao : {
  init: (key: string) => void;
  Auth: any;
};

export function kakaoInit() {
  Kakao.init('8e53e038d8115c2ce57ff4702ca30d40');
}

async function login() {
  const apple = await axios.get('/login/kakao');
  location.replace(apple.data);
}

export default {
  login,
};
