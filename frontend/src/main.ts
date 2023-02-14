import { createApp } from 'vue';
import axios from 'axios';
import router from './router';
import App from './App.vue';
import './style.css';

// axios.defaults.baseURL = 'http://localhost:5000/api';
const baseURL = 'http://fitnessfriend-env.eba-ieugjpqk.ap-northeast-2.elasticbeanstalk.com/';
const suffix = 'api/';
axios.defaults.baseURL = baseURL + suffix;
axios.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
const app = createApp(App);
app.use(router);
app.mount('#app');
