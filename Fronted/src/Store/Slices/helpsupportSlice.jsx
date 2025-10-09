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

// Help & Support - Fetch faqCategory Slice
export const fetchfaqCategory = createAsyncThunk(
    "faqCategory/fetchCategories",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BaseUrl}/api/getAllfaqCategory`);
            return response.data.result;
        } catch (error) {
            console.log("Axios error:", error.response); // <--- debug
            return rejectWithValue(
                error.response?.data?.message || "Something went wrong"
            );
        }
    }
);

// Help & Support FAQQuestions Slice
export const fetchfaqQuestions = createAsyncThunk(
    "faqQuestions/fetchQuestions",
    async ( { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BaseUrl}/api/getAllFAQQuestions`);
            return response.data.result;
        } catch (error) {
            console.log("Axios error:", error.response); // <--- debug
            return rejectWithValue(
                error.response?.data?.message || "Something went wrong"
            );
        }
    }
);

// Help & Support FAQQuestions by Category ID Slice
export const fetchfaqQuestionsByCategory = createAsyncThunk(
    "faqQuestions/fetchQuestionsByCategory",
    async (categoryId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BaseUrl}/api/getFAQQuestionsByCategory/${categoryId}`);
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
        faqcategory: [],
        faqquestions: [],
        faqquestionsByCategory: [],
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
            })

            // Fetch FAQ Categories
            .addCase(fetchfaqCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchfaqCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.faqcategory = action.payload;
            })
            .addCase(fetchfaqCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Fetch FAQ Questions
            .addCase(fetchfaqQuestions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchfaqQuestions.fulfilled, (state, action) => {
                state.loading = false;
                state.faqquestions = action.payload;
            })
            .addCase(fetchfaqQuestions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Fetch FAQ Questions by Category
            .addCase(fetchfaqQuestionsByCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchfaqQuestionsByCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.faqquestionsByCategory = action.payload;
            })
            .addCase(fetchfaqQuestionsByCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default helpSupportSlice.reducer;
