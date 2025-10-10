import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BaseUrl = "http://localhost:9000";

// Fetch Celebrate with Style & Savings
export const fetchCelebrateProduct = createAsyncThunk(
    "homeProduct/fetchCelebrate",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BaseUrl}/api/getBestSellingProducts`);
            return response.data;
        } catch (error) {
            console.log("Axios error:", error.response);
            return rejectWithValue(
                error.response?.data?.message || "Something went wrong"
            );
        }
    }
);

// Fetch Trending Items
export const fetchTrendingItems = createAsyncThunk(
    "homeProduct/fetchTrending",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BaseUrl}/api/getTrendingProducts`);
            return response?.data?.result;
        } catch (error) {
            console.log("Axios error:", error.response);
            return rejectWithValue(
                error.response?.data?.message || "Something went wrong"
            );
        }
    }
);

// Fetch Discover What’s New
export const fetchDiscoverNew = createAsyncThunk(
    "homeProduct/fetchDiscover",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BaseUrl}/api/discover/product`);
            return response?.data?.result;
        } catch (error) {
            // console.log("Axios error:", error.response);
            return rejectWithValue(
                error.response?.data?.message || "Something went wrong"
            );
        }
    }
);

// Fetch Customer Favorites
export const fetchCustomerFav = createAsyncThunk(
    "homeProduct/fetchCustomer",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BaseUrl}/api/getMostWishlistedProducts`);
            return response?.data?.result;
        } catch (error) {
            console.log("Axios error:", error.response);
            return rejectWithValue(
                error.response?.data?.message || "Something went wrong"
            );
        }
    }
);


const homeProductSlice = createSlice({
    name: "homeproduct",
    initialState: {
        celebrateproducts: [],
        trendingitems: [],
        discovernew: [],
        customerfav: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

            // Fetch Celebrate with Style & Savings
            .addCase(fetchCelebrateProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCelebrateProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.celebrateproducts = action.payload;
            })
            .addCase(fetchCelebrateProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Fetch Trending Items
            .addCase(fetchTrendingItems.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTrendingItems.fulfilled, (state, action) => {
                state.loading = false;
                state.trendingitems = action.payload;
            })
            .addCase(fetchTrendingItems.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Fetch Discover What’s New
            .addCase(fetchDiscoverNew.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDiscoverNew.fulfilled, (state, action) => {
                state.loading = false;
                state.discovernew = action.payload;
            })
            .addCase(fetchDiscoverNew.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Fetch Customer Favorites
            .addCase(fetchCustomerFav.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCustomerFav.fulfilled, (state, action) => {
                state.loading = false;
                state.customerfav = action.payload;
            })
            .addCase(fetchCustomerFav.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default homeProductSlice.reducer;