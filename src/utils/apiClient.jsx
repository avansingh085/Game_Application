import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://game-backend-28ge.onrender.com',
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
  }
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

   
    if (
      error.response?.status === 401 && 
      !originalRequest._retry && 
      !originalRequest.url.includes('/api/auth/refresh-token')
    ) {
      originalRequest._retry = true;

      try {
      
        const response = await axios.post(
          `${apiClient.defaults.baseURL}/api/auth/refresh-token`,
          {}, 
          { withCredentials: true }
        );

        if (response.data.success) {
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
       
        console.error("Session expired. Redirecting to login...");
       
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;