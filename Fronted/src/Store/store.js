import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from '../Store/Slices/categorySlice'
import userSlice from '../Store/Slices/UserSlice';
import contactusReducer from '../Store/Slices/contactusSlice';

export const store = configureStore({
    reducer: {
        // Add your reducers here
        category: categoryReducer
        users: userSlice,
        contactUs: contactusReducer,
    },
});

export default store;