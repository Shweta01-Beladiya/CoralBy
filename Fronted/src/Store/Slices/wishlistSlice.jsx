import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BaseUrl = "http://localhost:9000";


export const addToWishlist = createAsyncThunk('wish/add', async (id, { rejectWithValue }) => {
    try {

        const token = localStorage.getItem('token');
        const response = await axios.post(`${BaseUrl}/api/addToWishlist/${id}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if (response.data) {
            return response.data.result;
        }


        return rejectWithValue('add To Wishlist Failed !!')
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'add To Wishlist Failed !!');
    }
})

export const getWishlist = createAsyncThunk('wish/get', async(_, {rejectWithValue})=> {
    try {
        
        const token = localStorage.getItem('token');
        const response = await axios.get(`${BaseUrl}/api/getWishlist`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })

        if(response.data){
            return response?.data?.result?.items
        }

        return rejectWithValue('Get Wishlist Failed !!')
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Get Wishlist Failed !!');
    }
})

export const removeWishlist = createAsyncThunk('wish/Remove', async (id, {rejectWithValue}) => {
    try {
        
        const token = localStorage.getItem('token');
        const response = await axios.delete(`${BaseUrl}/api/removeFromWishlist/${id}`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })

        if(response.data){
            return response.data.result
        }

        return rejectWithValue('Remove Wishlist Failed')
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Remove Wishlist Failed !!');
    }
} )


const wishlistSlice = createSlice({
    name: 'wish',
    initialState: {
        wishlistData: [],
        isLoading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

            // add Wishlist
            .addCase(addToWishlist.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addToWishlist.fulfilled, (state) => {
                state.isLoading = false;
                state.error = null;
            })
            .addCase(addToWishlist.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || "Faild to add In Wishlist";
            })

            // Get Wishlist
            .addCase(getWishlist.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getWishlist.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.wishlistData = action.payload;
            })
            .addCase(getWishlist.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || "Faild to add In Wishlist";
            })

            // Remove Wishlist
            .addCase(removeWishlist.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(removeWishlist.fulfilled, (state) => {
                state.isLoading = false;
                state.error = null;
            })
            .addCase(removeWishlist.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || "Faild to Delete In Wishlist";
            })

    }
})


export default wishlistSlice.reducer;