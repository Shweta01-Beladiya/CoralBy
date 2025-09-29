import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from '../Store/Slices/categorySlice'

export const store = configureStore({
    reducer: {
        // Add your reducers here
        category: categoryReducer
    },
});

export default store;