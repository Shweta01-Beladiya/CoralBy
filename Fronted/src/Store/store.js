import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from '../Store/Slices/categorySlice'
import contactusReducer from '../Store/Slices/contactusSlice';
import careerjobReducer from '../Store/Slices/careerjobSlice';
import subscribeReducer from '../Store/Slices/subscribeSlice';
import blogallcategoryReducer from '../Store/Slices/blogcategorySlice';
import authReducer from '../Store/Slices/authSlice';
import authProfileReducer from '../Store/Slices/authProfileSlice';
import offerReducer from '../Store/Slices/offerSlice';
import faqCategoryReducer from '../Store/Slices/faqCategorySlice';
import helpSupportReducer from '../Store/Slices/helpsupportSlice';

export const store = configureStore({
    reducer: {
        category: categoryReducer,
        contactUs: contactusReducer,
        careerJob: careerjobReducer,
        subscribe: subscribeReducer,
        blogallcategory: blogallcategoryReducer,
        auth: authReducer,
        authProfie: authProfileReducer,
        offer: offerReducer,
        faqCategory: faqCategoryReducer,
        helpSupport: helpSupportReducer,
    },
});

export default store;