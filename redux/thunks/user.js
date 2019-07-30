import { setCurrentUser } from '../actions/user';
import { setErrors } from '../actions/errors';
import { fetchData, setAuthorizationToken } from '../../utils/api';
import { setCookie, removeCookie } from '../../utils/cookie';

const setUserInStore = (user, dispatch) => {
  const { token } = user;
  setCookie('token', token);
  setAuthorizationToken(token);
  dispatch(setCurrentUser({ authenticated: true, data: user }));
  dispatch(setErrors(null));
};

const setErrorInStore = (err, dispatch) => {
  dispatch(setErrors(err.response.data));
  dispatch(setCurrentUser({ authenticated: false, data: null }));
};

export const login = loginParams => (dispatch) => {
  const path = '/v1/sessions';
  return fetchData('post', path, loginParams).then((res) => {
    const { user } = res.data;
    setUserInStore(user, dispatch);
    return Promise.resolve('Successful login');
  })
    .catch(err => setErrorInStore(err, dispatch));
};

export const logout = () => (dispatch) => {
  setAuthorizationToken(false);
  removeCookie('token');
  dispatch(setCurrentUser({ authenticated: false, data: null }));
  return Promise.resolve();
};
