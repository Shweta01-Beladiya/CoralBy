import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BaseUrl = "http://localhost:9000";


export const subscribe = createAsyncThunk('subscribe/post', async (Email) => {

    console.log("response", Email)
    const response =  await axios.post(`${BaseUrl}/api/createSubcribe`,Email);
    return response.data.result;
})



const subscribeSlice = createSlice({
    name: "subscribe",
    initialState: {
        isLoading: false, 
        subscribeData: [], 
        isError: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(subscribe.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(subscribe.fulfilled, (state, action) => {
                state.isLoading = false;
                state.subscribeData = action.payload;
            })
            .addCase(subscribe.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })
    },
});


export default subscribeSlice.reducer;
