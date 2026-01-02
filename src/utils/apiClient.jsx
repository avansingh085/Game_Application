import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
  }
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        
        const response = await axios.post(
          `${apiClient.defaults.baseURL}/auth/refresh-token`,
          {}, 
          { withCredentials: true }
        );

        if (response.data.success) {
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        
        console.error("Session expired. Please login again.");
        
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;