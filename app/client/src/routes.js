/* @flow */

// import type { Dispatch } from './types';
// import { fetchUsersIfNeeded } from './actions/users';
import { fetchUserIfNeeded } from './actions/user';
import { fetchFeed } from './actions/feed';
import { fetchJwtIfNeeded } from './actions/jwt';
import {
  App,
  asyncHome,
  asyncFeed,
  Login,
  Logout,
  asyncUserInfo,
  NotFound
} from './containers';

export default [
  {
    component: App,
    routes: [
      {
        path: '/',
        exact: true,
        isMenu: true,
        name: 'Home',
        component: asyncHome, // Add your route here
        loadData: () => [
          fetchJwtIfNeeded()
          // Add other pre-fetched actions here
        ]
      },
      {
        path: '/feed',
        exact: true,
        isMenu: true,
        name: 'Feed',
        component: asyncFeed, // Add your route here
        loadData: () => [
          fetchJwtIfNeeded(),
          fetchFeed()
          // Add other pre-fetched actions here
        ]
      },
      {
        path: '/login',
        component: Login
      },
      {
        path: '/logout',
        component: Logout
      },
      {
        // this will be pledges
        path: '/UserInfo/:id',
        component: asyncUserInfo,
        loadData: ({ params }: Object) => [fetchUserIfNeeded(params.id)]
      },
      {
        component: NotFound
      }
    ]
  }
];
