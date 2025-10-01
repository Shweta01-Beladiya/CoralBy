import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from '../Store/Slices/categorySlice'
import userSlice from '../Store/Slices/UserSlice';
import contactusReducer from '../Store/Slices/contactusSlice';
import careerjobReducer from '../Store/Slices/careerjobSlice';
import subscribeReducer from '../Store/Slices/subscribeSlice';
import blogallcategoryReducer from '../Store/Slices/blogcategorySlice';

export const store = configureStore({
    reducer: {

        category: categoryReducer,
        users: userSlice,
        contactUs: contactusReducer,
        careerJob: careerjobReducer,
        subscribe: subscribeReducer
        blogallcategory: blogallcategoryReducer,
    },
});

export default store;