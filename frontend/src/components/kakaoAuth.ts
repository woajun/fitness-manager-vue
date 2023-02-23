import axios from 'axios';

async function login() {
  const loginURL = await axios.get('/login/kakao');
  alert('hello');
  window.location.replace(loginURL.data);
}

export default {
  login,
};
