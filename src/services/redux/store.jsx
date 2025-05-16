import { configureStore } from '@reduxjs/toolkit';
import authReducer from './globalSlice';
import userSlice from './userSlice';
const store = configureStore({
  reducer: {
    auth: authReducer,
    user:userSlice
  },
});

export default store;
