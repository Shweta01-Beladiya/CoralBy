import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";

const BaseUrl = "http://localhost:9000";

// Async thunk to fetch career job data
export const createCareerJob = createAsyncThunk(
    "careerJob/fetchAll",
    async () => {

        const response = await axios.get(`${BaseUrl}/api/current/jobs`);
        // console.log("Career Job Response:", response.data);
        return response.data;

    }
);

// Async thunk to apply for a career job
export const applyCareerJob = createAsyncThunk(
    "careerJob/apply",
    async ({ jobId, applicationData }, { rejectWithValue }) => {
        try {
            
            let token = localStorage.getItem("token");
            
            console.log("Sending job application request:");
            console.log("Job ID:", jobId);
            console.log("Token exists:", !!token);
            console.log("FormData:", applicationData);

            const response = await axios.post(`${BaseUrl}/api/apply/job/${jobId}`, applicationData, {
                headers: {
                   "Authorization":`Bearer ${token}`,
                   "Content-Type": "multipart/form-data"
                },
            });
            console.log("Apply Career Job Response:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error applying for job:", error);
            console.error("Error response:", error.response?.data);
            console.error("Error status:", error.response?.status);
            console.error("Error message:", error.message);
            
            // Return more detailed error information
            return rejectWithValue({
                message: error.response?.data?.message || error.message || "Failed to apply for job",
                status: error.response?.status,
                data: error.response?.data
            });
        }
    }
);


const careerjobSlice = createSlice({
    name: "careerJob",
    initialState: {
        loading: false,
        data: [],
        applyjob: [],
        error: null,
        success: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

            // Fetch All Career Job Data
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
            })

            // Apply for Career Job
            .addCase(applyCareerJob.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(applyCareerJob.fulfilled, (state, action) => {
                state.loading = false;
                state.applyjob = action.payload;
                state.success = true;
            })
            .addCase(applyCareerJob.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to apply for job";
                state.success = false;
            });
    }
});

export default careerjobSlice.reducer;