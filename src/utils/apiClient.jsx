import axios from 'axios';

const apiClient = axios.create({
  baseURL: "https://game-backend-28ge.onrender.com",
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
