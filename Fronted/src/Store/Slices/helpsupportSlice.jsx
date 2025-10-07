import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BaseUrl = "http://localhost:9000";

// Help & Support - Fetch All Categories
export const fetchHelpSupportCategories = createAsyncThunk(
    "helpSupport/fetchCategories",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BaseUrl}/api/getAllMainFaqCategory`);
            return response.data.result;
        } catch (error) {
            console.log("Axios error:", error.response); // <--- debug
            return rejectWithValue(
                error.response?.data?.message || "Something went wrong"
            );
        }
    }
);

const helpSupportSlice = createSlice({
    name: "helpSupport",
    initialState: {
        categories: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Help & Support Categories
            .addCase(fetchHelpSupportCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchHelpSupportCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(fetchHelpSupportCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default helpSupportSlice.reducer;
