import App from './App';
import { Home, Feed } from './containers';

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
    }
  ]
};
