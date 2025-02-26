import { createSlice } from "@reduxjs/toolkit";


const initialState = { 
    userId: "",  // Load user ID from localStorage
    isLogin: false,  // Set login state accordingly
    score: 0,
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
  },
});

export const { setScore, logout, setUserId } = authSlice.actions;
export default authSlice.reducer;
