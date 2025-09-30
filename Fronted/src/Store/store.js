import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from '../Store/Slices/categorySlice'
import userSlice from '../Store/Slices/UserSlice';
import contactusReducer from '../Store/Slices/contactusSlice';
import careerjobReducer from '../Store/Slices/careerjobSlice';

export const store = configureStore({
    reducer: {
        // Add your reducers here
        category: categoryReducer,
        users: userSlice,
        contactUs: contactusReducer,
        careerJob: careerjobReducer,
    },
});

export default store;