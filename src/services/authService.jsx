export const setToken = (token) => {
    localStorage.setItem('authToken', token);
  };
  export const getToken = () => {
    return localStorage.getItem('authToken');
  };
  export const removeToken = () => {
    localStorage.removeItem('authToken');
  };
  export const setUserID=(userId)=>{
    localStorage.setItem("userId",userId);
  }
  export const getUserID=()=>{
    localStorage.getItem("userId");
  }
  export const isLoggedIn = () => {
    return !!getToken();
  };