import axios from 'axios'
import { browserHistory } from 'react-router'

var instance = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
  headers: {
    'authorization': 'Token token=ZdI9d7rxxTDFt5PxfUBVPsuo'
  }
});

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
