export const setToken = (token) => {
    localStorage.setItem('authToken', token);
  };
  export const getToken = () => {
    return localStorage.getItem('authToken');
  };
  export const removeToken = () => {
    localStorage.removeItem('authToken');
  };
  export const isLoggedIn = () => {
    return !!getToken();
  };