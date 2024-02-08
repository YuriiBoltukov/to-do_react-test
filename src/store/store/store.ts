import { configureStore, combineReducers } from '@reduxjs/toolkit';
import todoReducer from '../reducers/todoSlice';

const rootReducer = combineReducers({ todos: todoReducer });

const store = configureStore({
  reducer: rootReducer,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type appDispatch = typeof store.dispatch;
