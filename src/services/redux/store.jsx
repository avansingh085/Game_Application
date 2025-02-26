import { configureStore } from '@reduxjs/toolkit';
import authReducer from './globalSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
