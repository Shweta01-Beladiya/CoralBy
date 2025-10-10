import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BaseUrl = "http://localhost:9000";

export const fetchAddToCartData = createAsyncThunk(
    "addToCart/fetchCart",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BaseUrl}/api/my/cart`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            return response?.result?.items;
        } catch (error) {
            console.log("Axios error:", error.response);
            return rejectWithValue(
                error.response?.data?.message || "Something went wrong"
            );
        }
    }
);


const addToCartSlice = createSlice({
    name: "addToCart",
    initialState: {
        cartData: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

            // Fetch Add to Cart Data
            .addCase(fetchAddToCartData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAddToCartData.fulfilled, (state, action) => {
                state.loading = false;
                state.cartData = action.payload;
            })
            .addCase(fetchAddToCartData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default addToCartSlice.reducer;