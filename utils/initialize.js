import Router from 'next/router';
import { getCookie } from './cookie';
import { setCurrentUser } from '../redux/actions/user';

export default (ctx) => {
  if (ctx.isServer) {
    if (ctx.req.headers.cookie) {
      const { req, store } = ctx;
      const { currentUser, dispatch } = store;
      dispatch(setCurrentUser({ ...currentUser, data: { ...currentUser.data, token: getCookie('token', req) } }));
    }
  } else {
    const { token } = ctx.store.getState().currentUser.data;

    if (token && (ctx.pathname === '/login' || ctx.pathname === '/signup')) {
      setTimeout(() => Router.push('/'), 0);
    }
  }
};
