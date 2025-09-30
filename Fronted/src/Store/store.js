import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../Store/Slices/UserSlice';
import contactusReducer from '../Store/Slices/contactusSlice';

export const store = configureStore({
    reducer: {
        // Add your reducers here
        users: userSlice,
        contactUs: contactusReducer,
    },
});

export default store;