import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";

const BaseUrl = "http://localhost:9000";

export const createCareerJob = createAsyncThunk(
    "careerJob/fetchAll",
    async () => {

        const response = await axios.get(`${BaseUrl}/api/current/jobs`);
        console.log("Career Job Response:", response.data);
        return response.data;

    }
);

const careerjobSlice = createSlice({
    name: "careerJob",
    initialState: {
        loading: false,
        data: [],
        error: null,
        success: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createCareerJob.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(createCareerJob.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.success = true;
            })
            .addCase(createCareerJob.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to send message";
                state.success = false;
            });
    }
});

export default careerjobSlice.reducer;