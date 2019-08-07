import axios from 'axios';
import { getUnique, sanitizeBooks } from './arrayProcessing';


export const fetchData = async (method, path, data) => {
  const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : process.env.API_URL;
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

export const googleBookSearch = async (keyword, queryPage) => {
  const page = queryPage || 1;
  const startIndex = (page - 1) * 40;
  const path = `https://www.googleapis.com/books/v1/volumes?q=${keyword}&maxResults=40&startIndex=${startIndex}&orderBy=relevance&key=AIzaSyBAnRcfwnf_nZkUwPl_6KQmBadxh7nmnMU`;

  setAuthorizationToken(false);
  const rawItems = await axios.get(path);

  return rawItems;
};
