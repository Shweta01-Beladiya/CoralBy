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

export const getInsideSubCategory = createAsyncThunk('category/fetchInsideSubCat', async () => {
    const response = await axios.get(`${BaseUrl}/api/getAllInsideSubCategory`);
    return response.data.result;
})

export const getProduct = createAsyncThunk('category/fetchProduct', async () => {
    const response = await axios.get(`${BaseUrl}/api/getAllProduct`);
    return response.data.result;
})

export const getProductById = createAsyncThunk(`category/getProductById`, async (id) => {
    const response = await axios.get(`${BaseUrl}/api/getProductById/${id}`);
    return response.data.result;
})

export const getProductByReviews = createAsyncThunk(`category/fetchProductReviews`, async (id) => {
    const response = await axios.get(`${BaseUrl}/api/getProductReviews/${id}`);
    return response.data.result;
})
// export const getProductVarient = createAsyncThunk('category/fetchProductVariant', async () => {
//     const response = await axios.get(`${BaseUrl}/api/getAllProductVariant`);
//     return response.data.result;
// })

const categorySlice = createSlice({
    name: "category",
    initialState: {
        mainCategory: { isLoading: false, data: [], isError: false },
        category: { isLoading: false, data: [], isError: false },
        subCategory: { isLoading: false, data: [], isError: false },
        inSubCategory: { isLoading: false, data: [], isError: false },
        product: { isLoading: false, data: [], isError: false },
        productId: { isLoading: false, data: [], isError: false },
        productReviews: { isLoading: false, data: [], isError: false }
        // productVarient: { isLoading: false, data: [], isError: false }
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

            //Inside-SubCategory
            .addCase(getInsideSubCategory.pending, (state) => {
                state.inSubCategory.isLoading = true;
            })
            .addCase(getInsideSubCategory.fulfilled, (state, action) => {
                state.inSubCategory.isLoading = false;
                state.inSubCategory.data = action.payload;

            })
            .addCase(getInsideSubCategory.rejected, (state) => {
                state.inSubCategory.isLoading = false;
                state.inSubCategory.isError = true;
            })

            //Product 
            .addCase(getProduct.pending, (state) => {
                state.product.isLoading = true;
            })
            .addCase(getProduct.fulfilled, (state, action) => {
                state.product.isLoading = false;
                state.product.data = action.payload;
            })
            .addCase(getProduct.rejected, (state) => {
                state.product.isLoading = false;
                state.product.isError = true;
            })

            //Product by id
            .addCase(getProductById.pending, (state) => {
                state.productId.isLoading = true;
            })
            .addCase(getProductById.fulfilled, (state, action) => {
                state.productId.isLoading = false;
                state.productId.data = action.payload;
            })
            .addCase(getProductById.rejected, (state) => {
                state.productId.isLoading = false;
                state.productId.isError = true;
            })

            //Product Reviews
            .addCase(getProductByReviews.pending, (state) => {
                state.productReviews.isLoading = true;
            })
            .addCase(getProductByReviews.fulfilled, (state, action) => {
                state.productReviews.isLoading = false;
                state.productReviews.data = action.payload;
            })
            .addCase(getProductByReviews.rejected, (state) => {
                state.productReviews.isLoading = false;
                state.productReviews.isError = true;
            })
    },
});


export default categorySlice.reducer;
