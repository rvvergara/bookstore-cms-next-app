import Router from 'next/router';
import decode from 'jwt-decode';
import { getCookie } from './cookie';
import { setCurrentUser } from '../redux/actions/user';

export default (ctx) => {
  if (ctx.isServer) {
    if (ctx.req.headers.cookie) {
      const { req, store } = ctx;
      const { dispatch } = store;
      const token = getCookie('token', req);
      const currentUserData = decode(token);
      const currentUser = {
        authenticated: true,
        data: {
          ...currentUserData,
          token,
        },
      };
      dispatch(setCurrentUser(currentUser));
    }
  } else {
    try {
      const { token } = ctx.store.getState().currentUser.data;

      if (token && (ctx.pathname === '/login' || ctx.pathname === '/signup')) {
        setTimeout(() => Router.push('/'), 0);
      }
    } catch (err) {
      err;
    }
  }
};
