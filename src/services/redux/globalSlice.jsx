import { createSlice } from "@reduxjs/toolkit";


const initialState = { 
    User:{},
    isLogin: false,
    isOnlinePlay:{}
   
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.User = action.payload;
      state.isLogin = true;
     
    },
    setOnline:(state,action)=>{
      state.isOnlinePlay=action.payload;
    },
    logout: (state) => {
      state.User = {};
      state.isLogin = false;
    },
   
  },
});

export const { logout,setUser,setOnline } = authSlice.actions;
export default authSlice.reducer;
