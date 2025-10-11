import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BaseUrl = "http://localhost:9000";

// Fetch Add to Cart Data
export const fetchAddToCartData = createAsyncThunk(
    "addToCart/fetchCart",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BaseUrl}/api/my/cart`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            return response?.data?.result?.items;
        } catch (error) {
            console.log("Axios error:", error.response);
            return rejectWithValue(
                error.response?.data?.message || "Something went wrong"
            );
        }
    }
);

// fetch remove from cart
export const fetchRemoveFromCart = createAsyncThunk(
    "addToCart/removeFromCart",
    async ({ productId, productVarientId }, { rejectWithValue, dispatch }) => {
        try {
            const response = await axios.delete(
                `${BaseUrl}/api/remove/cart/${productId}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    data: { productVarientId },
                }
            );
            // After removing the item, fetch the updated cart data
            dispatch(fetchAddToCartData());
            return response?.data;
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
        removecartData: [],
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
            })

            // Fetch Remove from Cart
            .addCase(fetchRemoveFromCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRemoveFromCart.fulfilled, (state, action) => {
                state.loading = false;
                state.removecartData = action.payload;
            })
            .addCase(fetchRemoveFromCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default addToCartSlice.reducer;