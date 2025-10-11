import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BaseUrl = "http://localhost:9000";


export const getCartData = createAsyncThunk('cart/fetch', async (_, { rejectWithValue }) => {
    try {

        const token = localStorage.getItem('token');
        const response = await axios.get(`${BaseUrl}/api/my/cart`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if (response.data) {
            return response?.data?.result
        }


        return rejectWithValue('Get Cart Failed');
    } catch (error) {
        return rejectWithValue(error?.response?.data?.message || 'Get Cart Failed')
    }
})


export const addToCart = createAsyncThunk('cart/add', async ({ id, data }, { rejectWithValue }) => {
    try {

        const token = localStorage.getItem('token');
        const response = await axios.post(`${BaseUrl}/api/add/cart/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if (response.data) {
            return response?.data?.result
        }

        return rejectWithValue('add To Cart Failed');
    } catch (error) {
        return rejectWithValue(error?.response?.data?.message || 'add To Cart Failed')
    }
})

export const YouMayAlsoLike = createAsyncThunk('cart/youLike', async (id, { rejectWithValue }) => {
    try {

        const token = localStorage.getItem('token');
        const response = await axios.get(`${BaseUrl}/api/youMayAlsoLike/${id}`)
        
        if(response.data){
            return response?.data?.result
        }

        return rejectWithValue('You May Also Like Get Failed');
    } catch (error) {
        return rejectWithValue(error?.response?.data?.message || 'You May Also Like Get Failed')
    }
})





const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartData: [],
        YouLike: [],
        isLoading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Get Cart
            .addCase(getCartData.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getCartData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.cartData = action.payload;
            })
            .addCase(getCartData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || "Failed to Get Cart Data";
            })

            // add To Cart
            .addCase(addToCart.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addToCart.fulfilled, (state) => {
                state.isLoading = false;
                state.error = null;
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || "Failed to add To Cart";
            })


            // You May Also Like 
            .addCase(YouMayAlsoLike.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(YouMayAlsoLike.fulfilled, (state,action) => {
                state.isLoading = false;
                state.error = null;
                state.YouLike = action.payload
            })
            .addCase(YouMayAlsoLike.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || "Failed To Get You May Also Like";
            })
    }
})

export default cartSlice.reducer;