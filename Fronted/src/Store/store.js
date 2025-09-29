import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../Store/Slices/UserSlice';

export const store = configureStore({
    reducer: {
        // Add your reducers here
        users: userSlice,
    },
});

export default store;