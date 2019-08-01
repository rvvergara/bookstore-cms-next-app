import axios from 'axios';

export const fetchData = async (method, path, data) => {
  const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://bookstore-cms-api.herokuapp.com/';
  const result = await axios[method](`${baseUrl}/${path}`, data);
  return result;
};

export const setAuthorizationToken = (token) => {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};
