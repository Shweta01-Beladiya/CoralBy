import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BaseUrl = "http://localhost:9000";


export const getAuthData = createAsyncThunk('authProfile/getdata', async (_, { rejectWithValue }) => {

  try {

    const token = localStorage.getItem('token');
    const response = await axios.get(`${BaseUrl}/api/getUser`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if(response.data){
      return response.data.result;
    }

    return rejectWithValue('User Data Fetch failed !!')

  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'User Data fetch failed');
  }

})


const authProfile = createSlice({
  name: 'authProfile',
  initialState: {
    userData: {},
    isLoading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Auth Data 
      .addCase(getAuthData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAuthData.fulfilled, (state,action) => {
        state.isLoading = false;
        state.error = null;
        state.userData = action.payload;
      })
      .addCase(getAuthData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Faild to Fetch User Data";
      })


  }
});

export default authProfile.reducer;