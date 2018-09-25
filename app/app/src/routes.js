import App from './App';
import { Home, Feed, Login, Logout, Signup, Problem, CreateProblem, Preferences } from './containers';

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
      path: '/problem/:problem_id',
      exact: true,
      component: Problem // Add your route here
    },
    {
      path: '/create-problem',
      exact: true,
      component: CreateProblem // Add your route here
    },
    {
      path: '/preferences',
      exact: true,
      component: Preferences // Add your route here
    }
  ]
};
