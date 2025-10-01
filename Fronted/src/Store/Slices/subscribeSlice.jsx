import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BaseUrl = "http://localhost:9000";


export const getMainCategory = createAsyncThunk('subscribe/post', async (Email) => {
    const response = await axios.post(`${BaseUrl}/api/getAllMainCategory`);
    return response.data.result;
})



const categorySlice = createSlice({
    name: "subscribe",
    initialState: {
        isLoading: false, 
        data: [], 
        isError: false
    },
    reducers: {},
    extraReducers: (builder) => {

        builder

            .addCase(getMainCategory.pending, (state) => {
                state.mainCategory.isLoading = true;
            })
            .addCase(getMainCategory.fulfilled, (state, action) => {
                state.mainCategory.isLoading = false;
                state.mainCategory.data = action.payload;
        
            })
            .addCase(getMainCategory.rejected, (state) => {
                state.mainCategory.isLoading = false;
                state.mainCategory.isError = true;
            })

          

    },
});


export default categorySlice.reducer;
