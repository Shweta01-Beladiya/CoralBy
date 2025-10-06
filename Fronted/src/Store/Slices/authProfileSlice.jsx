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

    if (response.data) {
      return response.data.result;
    }

    return rejectWithValue('User Data Fetch failed !!')

  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'User Data fetch failed');
  }

})

export const updateProfile = createAsyncThunk('authProfile/update', async (updateData, { rejectWithValue }) => {
  try {

    const token = localStorage.getItem('token');
    const response = await axios.patch(`${BaseUrl}/api/user/profile/update`, {
      firstName: updateData.firstName,
      lastName: updateData.lastName,
      mobileNo: updateData.mobileNo
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (response.data) {
      return response.data.result;
    }

    return rejectWithValue('Update Auth data failed')

  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Update Auth data failed');
  }
})

export const addNewAddress = createAsyncThunk('authProfile/addNewAdd', async (addNewData, { rejectWithValue }) => {
  try {

    const token = localStorage.getItem('token');
    const response = await axios.post(`${BaseUrl}/api/user/address`, addNewData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    // console.log("Add Data from api console ::", addNewData)


    if (response.data) {
      return response.data.result
    }

    return rejectWithValue('Add New Address failed')

  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Add New Address failed');

  }
})

export const addBillingAddress = createAsyncThunk('authProfile/addBillingAdd', async (addBillingData, { rejectWithValue }) => {
  try {

    const token = localStorage.getItem('token');
    const response = await axios.post(`${BaseUrl}/api/user/billingaddress`, addBillingData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    // console.log("Add Data from api console ::", addNewData)


    if (response.data) {
      return response.data.result
    }

    return rejectWithValue('Add Billing address failed')

  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Add Billing Address failed');

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
      .addCase(getAuthData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.userData = action.payload;
      })
      .addCase(getAuthData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Faild to Fetch Auth Data";
      })

      // Update Auth Data 
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Faild to Update Auth Data";
      })

      // add New Address
      .addCase(addNewAddress.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addNewAddress.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(addNewAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Faild to add New Add";
      })


      // add Billing Address
      .addCase(addBillingAddress.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addBillingAddress.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(addBillingAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Faild to add Billing Add";
      })




  }
});

export default authProfile.reducer;