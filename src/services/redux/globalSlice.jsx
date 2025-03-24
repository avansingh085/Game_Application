import { createSlice } from "@reduxjs/toolkit";


const initialState = { 
    User:{},
    isLogin: false,  
   
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.User = action.payload;
      state.isLogin = true;
     
    },
    logout: (state) => {
      state.User = {};
      state.isLogin = false;
    },
   
  },
});

export const { logout,setUser } = authSlice.actions;
export default authSlice.reducer;
