import {createRouter, createWebHistory} from 'vue-router';
import UserLogin from './views/UserLogin.vue';
import CarsHome from './views/CarsHome.vue';
import CarCreate from './views/CarCreate.vue';

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
  {
    path: '/car/create',
    name: 'CarCreate',
    component: CarCreate,
  }
];

const router = createRouter ({
  history: createWebHistory (),
  routes,
});

export default router;
