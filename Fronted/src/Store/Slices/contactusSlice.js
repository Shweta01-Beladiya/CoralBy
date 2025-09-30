import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";

const BaseUrl = "http://localhost:9000";

export const createContactUs = createAsyncThunk(
    "contactUs/create",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BaseUrl}/api/createContactUs`, formData);
            return response.data;
        } catch (error) {
            console.log("Axios error:", error.response); // <--- debug
            return rejectWithValue(
                error.response?.data?.message || "Something went wrong"
            );
        }
    }
);

const contactusSlice = createSlice({
    name: "contactUs",
    initialState: {
        loading: false,
        data: [],
        error: null,
        success: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createContactUs.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(createContactUs.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.success = true;
            })
            .addCase(createContactUs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to send message";
                state.success = false;
            });
    }
});

export default contactusSlice.reducer;
