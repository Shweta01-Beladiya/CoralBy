import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BaseUrl = "http://localhost:9000";

export const simplefetchOffers = createAsyncThunk(
    "offer/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BaseUrl}/api/get/offer/0`);
            return response.data;
        } catch (error) {
            console.log("Axios error:", error.response); // <--- debug
            return rejectWithValue(
                error.response?.data?.message || "Something went wrong"
            );
        }
    }
);


const offerSlice = createSlice({
    name: "offer",
    initialState: {
        loading: false,
        simpleoffer: [],
        error: null,
        success: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

            // Fetch Simple All Offers
            .addCase(simplefetchOffers.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(simplefetchOffers.fulfilled, (state, action) => {
                state.loading = false;
                state.simpleoffer = action.payload;
                state.success = true;
            })
            .addCase(simplefetchOffers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch offers";
                state.success = false;
            });
    }
});

export default offerSlice.reducer;