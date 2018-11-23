import axios from 'axios';
import util from '@/util';

// Add a request interceptor
axios.interceptors.request.use((config) => {
  let user = window.sessionStorage.getItem('user'),
    token = null;
  if (user) {
    user = JSON.parse(user);
    if (user.token) {
      token = user.token;
    }
  }
  if (token) {
    config.headers['X-Token'] = token;
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use((response) => {
  // Do something with response data
  if (response.config.url.indexOf('/login') < 0) {
    if (typeof response.data.code !== 'undefined') {
      response.data.code != 'OK' && util.handleRes(response.data);
    }
  }
  return response;
}, function (error) {
  if (error.response.data) {
    util.handleRes(error.response.data);
  }

  // Do something with response error
  return Promise.reject(error);
});
