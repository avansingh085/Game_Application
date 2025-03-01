import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.BACKEND_URL,
});
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');

  if (token) {
    config.headers.Authorization = `${token}`; 
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default apiClient;
