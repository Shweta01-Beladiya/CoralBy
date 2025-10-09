import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BaseUrl = "http://localhost:9000";

export const getAllCoupen = createAsyncThunk('coupen/fetchAll', async (_, { rejectWithValue }) => {
    try {

        const token = localStorage.getItem('token')
        const resposne = await axios.get(`${BaseUrl}/api/getAllCoupon`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if (resposne.data) {
            return resposne.data.result
        }

        return rejectWithValue('Coupen Fetch Failed');
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Coupen fetch failed');
    }
})




const coupenSlice = createSlice({
    name: 'coupen',
    initialState: {
        allCoupen: {},
        isLoading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(getAllCoupen.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getAllCoupen.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.allCoupen = action.payload;
            })
            .addCase(getAllCoupen.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || "Faild to Fetch All Couepn";
            })
    }
})

export default coupenSlice.reducer;