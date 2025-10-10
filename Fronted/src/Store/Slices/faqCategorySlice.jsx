import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BaseUrl = "http://localhost:9000";

// Fetch All FAQ Category
export const fetchFaqCategory = createAsyncThunk(
    "faqCategory/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BaseUrl}/api/getAllSimilarFaqCategory`);
            return response.data.result;
        } catch (error) {
            console.log("Axios error:", error.response); 
            return rejectWithValue(
                error.response?.data?.message || "Something went wrong"
            );
        }
    }
);

// Fetch FAQ Questions by Category ID
export const fetchFaqQuestionsByCategory = createAsyncThunk(
    "faqCategory/fetchQuestionsByCategory",
    async (categoryId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BaseUrl}/api/getSimilarFAQQuestionsByCategory/${categoryId}`);
            return response.data.result;
        } catch (error) {
            console.log("Axios error:", error.response); 
            return rejectWithValue(
                error.response?.data?.message || "Something went wrong"
            );
        }
    }
);


const faqCategorySlice = createSlice({
    name: "faqCategory",
    initialState: {
        faqCategories: [],
        faqQuestionsByCategory: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

            // Fetch All FAQ Category
            .addCase(fetchFaqCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFaqCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.faqCategories = action.payload;
            })
            .addCase(fetchFaqCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Fetch FAQ Questions by Category ID
            .addCase(fetchFaqQuestionsByCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFaqQuestionsByCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.faqQuestionsByCategory = action.payload;
            })
            .addCase(fetchFaqQuestionsByCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default faqCategorySlice.reducer;