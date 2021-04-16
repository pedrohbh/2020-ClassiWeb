import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8083/api'
});

function getToken() {
  return localStorage.getItem('token');
}

api.interceptors.request.use(async (config) => {
  const token = getToken();
  if (token) {
    config.headers.common['auth'] = token;
    config.headers.Pragma = 'no-cache';
  }
  return config;
});

export default api;