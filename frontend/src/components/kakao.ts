declare const Kakao : {
  init: (key: string) => void;
  isInitialized: () => boolean;
} & Record<string, any>;

function init() {
  Kakao.init('8e53e038d8115c2ce57ff4702ca30d40');
}

function use() {
  if (Kakao.isInitialized()) {
    init();
  }
  return Kakao;
}

export default {
  init,
  use,
};
