import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { usersReducer } from './slices/usersSlice';
import { authReducer } from './slices/authSlice';
import { postsReducer } from './slices/postsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    posts: postsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export { setUser, flushUser } from './slices/authSlice';
export { selectPost } from './slices/postsSlice';

export { selectUser } from './slices/usersSlice';
export * from './thunks/users/fetchUsers';
export * from './thunks/users/addUser';

export * from './thunks/posts/fetchPosts';
export * from './thunks/posts/addPost';

export default store;
