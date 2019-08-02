import Router from 'next/router';
import decode from 'jwt-decode';
import { setCurrentUser } from '../actions/user';
import { setErrors } from '../actions/errors';
import { fetchData, setAuthorizationToken } from '../../utils/api';
import { setCookie, removeCookie } from '../../utils/cookie';
import { listSearchResults } from '../actions/search';
import { setSearchTerm } from '../actions/searchTerm';
import { setCollection } from '../actions/collection';

const setUserInStore = (user, dispatch) => {
  const { token } = user;
  setCookie('token', token);
  setAuthorizationToken(token);
  dispatch(setCurrentUser({ authenticated: true, data: user }));
  dispatch(setErrors(null));
};

const setErrorInStore = (err, dispatch) => {
  if (err.response) {
    dispatch(setErrors(err.response.data));
  } else {
    err.response = {
      data: {
        message: 'Server not available right now',
      },
    };
    dispatch(setErrors(err.response.data));
  }
  dispatch(setErrors(err.response.data));
  dispatch(setCurrentUser({ authenticated: false, data: null }));
};

export const login = loginParams => async (dispatch) => {
  const path = '/v2/sessions';
  try {
    const res = await fetchData('post', path, loginParams);
    const { user } = res.data;
    setUserInStore(user, dispatch);
    return Promise.resolve('Successful login');
  } catch (err) {
    return setErrorInStore(err, dispatch);
  }
};

export const logout = () => dispatch => Promise.resolve()
  .then(() => {
    setAuthorizationToken(false);
    removeCookie('token');
    dispatch(setCurrentUser({ authenticated: false, data: null }));
    dispatch(setSearchTerm(''));
    dispatch(listSearchResults([]));
    dispatch(setCollection([]));
  })
  .then(() => Router.push('/login'));

export const signUp = signupParams => async (dispatch) => {
  const path = '/v2/users';
  try {
    const res = await fetchData('post', path, signupParams);
    const { user } = res.data;
    setUserInStore(user, dispatch);
  } catch (err) {
    setErrorInStore(err, dispatch);
    return Promise.reject(err);
  }
};

export const updateAccount = (userParams, usernameParam) => async (dispatch) => {
  const path = `/v2/users/${usernameParam}`;
  try {
    const res = await fetchData('put', path, userParams);
    const { user } = res.data;
    const { token } = user;
    if (token === null) {
      const currentUser = { ...decode(localStorage.token), token: localStorage.token };
      setUserInStore(currentUser, dispatch);
    } else {
      setUserInStore(user, dispatch);
    }
  } catch (err) {
    if (err.response) {
      const { password, password_confirmation } = userParams.user;
      if (password !== password_confirmation) {
        err.response.data.errors.password_confirmation = ["didn't match password"];
      }
      dispatch(setErrors(err.response.data));
    } else {
      dispatch(setErrors(err));
    }

    return Promise.reject();
  }
};

export const fetchUserData = username => async () => {
  const path = `/v2/users/${username}`;
  try {
    const res = await fetchData('get', path);
    const { user } = res.data;
    return user;
  } catch (err) {
    return Promise.reject(err.response.data.message);
  }
};
