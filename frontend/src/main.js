import {createApp} from 'vue';
import {createPinia} from 'pinia';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

import App from './App.vue';
import './assets/css/style.css';
import router from './router';

const pinia = createPinia ();

createApp (App).use (router).use (pinia).use (Toast, {}).mount ('#app');
