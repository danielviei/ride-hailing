import {createRouter, createWebHistory} from 'vue-router';
import UserLogin from './views/UserLogin.vue';
import CarsHome from './views/CarsHome.vue';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: UserLogin,
  },
  {
    path: '/',
    name: 'Home',
    component: CarsHome,
  },
];

const router = createRouter ({
  history: createWebHistory (),
  routes,
});

export default router;
