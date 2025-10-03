import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from '../Store/Slices/categorySlice'
import userSlice from '../Store/Slices/UserSlice';
import contactusReducer from '../Store/Slices/contactusSlice';
import careerjobReducer from '../Store/Slices/careerjobSlice';
import subscribeReducer from '../Store/Slices/subscribeSlice';
import blogallcategoryReducer from '../Store/Slices/blogcategorySlice';
import authReducer from '../Store/Slices/authSlice';
import authProfileReducer from '../Store/Slices/authProfileSlice';

export const store = configureStore({
    reducer: {

        category: categoryReducer,
        // users: userSlice,
        contactUs: contactusReducer,
        careerJob: careerjobReducer,
        subscribe: subscribeReducer,
        blogallcategory: blogallcategoryReducer,
        auth: authReducer,
        authProfie: authProfileReducer
    },
});

export default store;