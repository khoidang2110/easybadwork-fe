import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import localStorageReducer from './slices/localStorageSlice'; // Đảm bảo bạn import localStorageReducer từ file slice của bạn

const rootReducer = combineReducers({
  counter: counterReducer,
  localStorage: localStorageReducer
});

export default rootReducer;