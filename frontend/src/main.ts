import { createApp } from 'vue';
import axios from 'axios';
import App from './App.vue';
import './style.css';

axios.defaults.baseURL = 'http://localhost:5000/api';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
createApp(App).mount('#app');
