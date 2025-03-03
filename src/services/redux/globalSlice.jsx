import { createSlice } from "@reduxjs/toolkit";


const initialState = { 
    userId: "", 
    isLogin: true,  
    score: 0,
    user: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
      state.isLogin = true;
     
    },
    logout: (state) => {
      state.userId = null;
      state.isLogin = false;
    },
    setScore: (state, action) => {
      state.score = action.payload;
    },
    setUser:(state,action)=>{
      state.user=action.payload;
    }
  },
});

export const { setScore, logout, setUserId,setUser } = authSlice.actions;
export default authSlice.reducer;
