import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BaseUrl = "http://localhost:9000";

// Fetch Simple All Offers ( 0 )
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

// Fetch Special Offers ( 1 )
export const specialOffers = createAsyncThunk(
    "offer/specialoffers",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BaseUrl}/api/get/offer/1`);
            return response.data;
        } catch (error) {
            console.log("Axios error:", error.response); // <--- debug
            return rejectWithValue(
                error.response?.data?.message || "Something went wrong"
            );
        }
    }
);

// Fetch Simplest Offers ( 2 )
export const simplestOffers = createAsyncThunk(
    "offer/simplestoffers",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BaseUrl}/api/get/offer/2`);
            return response.data;
        } catch (error) {
            console.log("Axios error:", error.response); // <--- debug
            return rejectWithValue(
                error.response?.data?.message || "Something went wrong"
            );
        }
    }
);

// Fetch Offer Slice
export const offers = createAsyncThunk(
    "offer/offers",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BaseUrl}/api/get/offer/3`);
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
        specialoffer: [],
        simplestoffer: [],
        offer: [],
        error: null,
        success: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

            // Fetch Simple All Offers ( 0 )
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
            })

            // Fetch Special Offers ( 1 )
            .addCase(specialOffers.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(specialOffers.fulfilled, (state, action) => {
                state.loading = false;
                state.specialoffer = action.payload;
                state.success = true;
            })
            .addCase(specialOffers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch special offers";
                state.success = false;
            })

            // Fetch Simplest Offers ( 2 )
            .addCase(simplestOffers.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(simplestOffers.fulfilled, (state, action) => {
                state.loading = false;
                state.simplestoffer = action.payload;
                state.success = true;
            })
            .addCase(simplestOffers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch simplest offers";
                state.success = false;
            })

            // Fetch Offers Slice ( 3 )
            .addCase(offers.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(offers.fulfilled, (state, action) => {
                state.loading = false;
                state.offer = action.payload;
                state.success = true;
            })
            .addCase(offers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch offers slice";
                state.success = false;
            });
    }
});

export default offerSlice.reducer;