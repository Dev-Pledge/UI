import App from './App';
import { Home, Feed, Login, Logout, Signup, CreateProblem } from './containers';

export default {
  component: App,
  routes: [
    {
      path: '/',
      exact: true,
      isMenu: true,
      name: 'Homepage',
      component: Home
    },
    {
      path: '/feed',
      exact: true,
      isMenu: true,
      name: 'Feed',
      component: Feed // Add your route here
    },
    {
      path: '/login',
      exact: true,
      component: Login // Add your route here
    },
    {
      path: '/logout',
      exact: true,
      component: Logout // Add your route here
    },
    {
      path: '/signup',
      exact: true,
      component: Signup // Add your route here
    },
    {
      path: '/create-problem',
      exact: true,
      component: CreateProblem // Add your route here
    }
  ]
};
