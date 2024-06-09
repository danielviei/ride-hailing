import {createRouter, createWebHistory} from 'vue-router';
import UserLogin from './views/UserLogin.vue';
import CarsHome from './views/CarsHome.vue';
import CarCreate from './views/CarCreate.vue';
import UserRegister from './views/UserRegister.vue';

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
  },
  {
    path: '/register',
    name: 'UserRegister',
    component: UserRegister,
  },
];

const router = createRouter ({
  history: createWebHistory (),
  routes,
});

export default router;
