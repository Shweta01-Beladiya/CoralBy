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

export const removeAddress = createAsyncThunk('authProfile/removeAdd', async (id, { rejectWithValue }) => {
  try {

    const token = localStorage.getItem('token');
    const response = await axios.delete(`${BaseUrl}/api/user/address/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (response.data) {
      return response.data.result;
    }

    return rejectWithValue("Remove addereess failed")
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Remove address failed');
  }
})


export const removeBillingAddress = createAsyncThunk('authProfile/removeBillingAdd', async (id, { rejectWithValue }) => {
  try {

    const token = localStorage.getItem('token');
    const response = await axios.delete(`${BaseUrl}/api/user/billingaddress/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (response.data) {
      return response.data.result;
    }

    return rejectWithValue("Remove Billing adderess failed")
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Remove Billing address failed');
  }
})


export const updateNewAddress = createAsyncThunk('authProfile/updateNewAdd', async ({ id, data }, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.patch(`${BaseUrl}/api/user/address/update/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })


    if (response.data) {
      return response.data.result
    }


    return rejectWithValue("Update New Address Failed")
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Update New Address Failed')
  }
})


export const updateBillingAddress = createAsyncThunk('authProfile/updateBillAdd', async ({ id, data }, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.patch(`${BaseUrl}/api/user/billingaddress/update/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })


    if (response.data) {
      return response.data.result
    }


    return rejectWithValue("Update Billing Address Failed")
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Update Billing Address Failed')
  }
})


export const selectNewAddress = createAsyncThunk('authProfile/selectNewAdd', async (addressId, { rejectWithValue }) => {

  try {

    const token = localStorage.getItem('token');
    const response = await axios.put(`${BaseUrl}/api/user/selectUserAddressController/${addressId}`,{},{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (response.data) {
      return response.data.result
    }

    return rejectWithValue('Select New Address Failed')
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Select New Address Failed')
  }

})

export const selectBillingAddress = createAsyncThunk('authProfile/selectBillAdd', async (addressId, { rejectWithValue }) => {

  try {

    const token = localStorage.getItem('token');
    const response = await axios.put(`${BaseUrl}/api/user/selectUserBillingAddressController/${addressId}`,{},{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (response.data) {
      return response.data.result
    }

    return rejectWithValue('Select Billing Address Failed')
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Select Billing Address Failed')
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

      // Remove Address
      .addCase(removeAddress.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(removeAddress.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(removeAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Faild to Remove Add";
      })

      // Remove Billing Address
      .addCase(removeBillingAddress.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(removeBillingAddress.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(removeBillingAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Faild to Remove removeBillingAddress";
      })

      // Update New Address 
      .addCase(updateNewAddress.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateNewAddress.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updateNewAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Update New Address Failed";
      })


      // Update Billing Address 
      .addCase(updateBillingAddress.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateBillingAddress.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updateBillingAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Update Billing Address Failed";
      })

      // Select New Address 
      .addCase(selectNewAddress.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(selectNewAddress.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(selectNewAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Select New Address Failed";
      })

      // Select Billing Address 
      .addCase(selectBillingAddress.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(selectBillingAddress.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(selectBillingAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Select New Address Failed";
      })




  }
});

export default authProfile.reducer;