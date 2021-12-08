import axios from 'axios';

const Api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

Api.interceptors.request.use(
  (config) => {
    const customConfig = config;
    const token = workerGetUserData();
    if (token) {
      customConfig.headers.Authorization = token;
    }
    customConfig.headers.ContentType = 'application/json; charset=UTF-8';
    return customConfig;
  },
  (error) => Promise.reject(error),
);

export default Api;
