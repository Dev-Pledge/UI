/* @flow */
/* eslint-disable no-use-before-define */

import type { Store as ReduxStore } from 'redux';

import type { Reducers } from '../reducers';

// Reducers
export type Home = {
  +readyStatus: string,
  +err: any,
  +list: Array<Object>
};

export type Feed = {
  +foo: string,
  +readyStatus: string,
  +err: any,
  +list: Array<Object>
};

export type Auth = {
  +isLoggedIn: boolean,
  +err: string,
  +token: string,
  +jwt: Object,
  +expires: int, // 10 mins before real expiry
  +username: string
}

export type UserInfo = {
  +[userId: string]: {
    +readyStatus: string,
    +err: any,
    +info: Object
  }
};

// State
type $ExtractFunctionReturn = <V>(v: (...args: any) => V) => V; // eslint-disable-line no-undef
export type ReduxState = $ObjMap<Reducers, $ExtractFunctionReturn>; // eslint-disable-line no-undef

// Action
export type Action =
  | { type: 'USERS_REQUESTING' }
  | { type: 'USERS_SUCCESS', data: Array<Object> }
  | { type: 'USERS_FAILURE', err: any }
  | { type: 'USER_REQUESTING', userId: string }
  | { type: 'USER_SUCCESS', userId: string, data: Object }
  | { type: 'USER_FAILURE', userId: string, err: any }
  | { type: 'FEED_REQUESTING', foo: string }
  | { type: 'FEED_SUCCESS', foo: string, data: Array<Object> }
  | { type: 'FEED_FAILURE', foo: string, err: string }
  | { type: 'AUTH_SUCCESS', token: string, jwt: Object }
  | { type: 'AUTH_REQUESTING' }
  | { type: 'AUTH_FAILURE', err: string }
  | { type: 'AUTH_UNAUTHORISED' }

export type Dispatch = (
  action: Action | ThunkAction | PromiseAction | Array<Action>
) => any;
export type GetState = () => ReduxState;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export type PromiseAction = Promise<Action>;

// Store
export type Store = ReduxStore<ReduxState, Action>;
