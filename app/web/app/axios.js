import axios from 'axios'
import { browserHistory } from 'react-router'
  
var instance = axios.create({
  baseURL: webpackEnv.SERVER_HOST + '/api/v1'
});

if (localStorage.getItem('apiToken')) {
  axios.defaults.headers.common['authorization'] = 'Token token=' + localStorage.getItem('apiToken');
}

// Add a response interceptor
instance.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response.status === 401) {
    browserHistory.push('/logout')
    return
  }
  return Promise.reject(error);
});

export default instance
