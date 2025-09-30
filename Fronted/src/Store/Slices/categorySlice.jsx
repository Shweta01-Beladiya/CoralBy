import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BaseUrl = "http://localhost:9000";


export const getMainCategory = createAsyncThunk('category/fetchMain', async () => {
    const response = await axios.get(`${BaseUrl}/api/getAllMainCategory`);
    return response.data.result;
})

export const getCategory = createAsyncThunk('category/fetchCat', async () => {
    const response = await axios.get(`${BaseUrl}/api/getAllCategory`);
    return response.data.result;
})

export const getSubCategory = createAsyncThunk('category/fetchSubCat', async () => {
    const response = await axios.get(`${BaseUrl}/api/getAllSubCategory`);
    return response.data.result;
})



const categorySlice = createSlice({
    name: "category",
    initialState: {
        mainCategory: { isLoading: false, data: [], isError: false },
        category: { isLoading: false, data: null, isError: false },
        subCategory: { isLoading: false, data: null, isError: false },
    },
    reducers: {},
    extraReducers: (builder) => {

        builder

            // Main Category
            .addCase(getMainCategory.pending, (state) => {
                state.mainCategory.isLoading = true;
            })
            .addCase(getMainCategory.fulfilled, (state, action) => {
                state.mainCategory.isLoading = false;
                state.mainCategory.data = action.payload;
        
            })
            .addCase(getMainCategory.rejected, (state) => {
                state.mainCategory.isLoading = false;
                state.mainCategory.isError = true;
            })

            // Category
            .addCase(getCategory.pending, (state) => {
                state.category.isLoading = true;
            })
            .addCase(getCategory.fulfilled, (state, action) => {
                state.category.isLoading = false;
                state.category.data = action.payload;
        
            })
            .addCase(getCategory.rejected, (state) => {
                state.category.isLoading = false;
                state.category.isError = true;
            })

            // SubCategory
            .addCase(getSubCategory.pending, (state) => {
                state.subCategory.isLoading = true;
            })
            .addCase(getSubCategory.fulfilled, (state, action) => {
                state.subCategory.isLoading = false;
                state.subCategory.data = action.payload;
        
            })
            .addCase(getSubCategory.rejected, (state) => {
                state.subCategory.isLoading = false;
                state.subCategory.isError = true;
            })

    },
});


export default categorySlice.reducer;
