import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BaseUrl = "http://localhost:9000";

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {

      const response = await axios.post(`${BaseUrl}/api/new/user`, {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password
      });

      if (response.data) {
        return response.data.user;
      }

      return rejectWithValue('Register failed');
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Register failed');
    }

  });


export const loginUser = createAsyncThunk('auth/login', async (userData, { rejectWithValue }) => {
  try {

    const response = await axios.post(`${BaseUrl}/api/login`, {
      email: userData.email,
      password: userData.password
    });

    if (response.data) {

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }

      return response.data.user;
    }

    return rejectWithValue('login failed');
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Login failed');
  }

});


export const forgotPassword = createAsyncThunk('auth/forgot', async (userData, { rejectWithValue }) => {
  try {

    const response = await axios.post(`${BaseUrl}/api/forget/password`, {
      email: userData.email
    })

    if (response.data) {
      return response.data.toEmail;
    }

    return rejectWithValue('Forgot Password failed');

  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Forgot Password failed');
  }
})


export const verifyOtp = createAsyncThunk('auth/otpVerify', async (userData, { rejectWithValue }) => {

  try {

    const response = await axios.post(`${BaseUrl}/api/verify/forget/password`, {
      email: userData.email,
      otp: userData.otp
    })

    if (response.data) {
      return response.data
    }

    return rejectWithValue('OTP Verification failed');

  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'OTP Verification failed');
  }

})


export const resetPassword = createAsyncThunk('auth/resetPwd', async (userData, { rejectWithValue }) => {

  try {

    const response = await axios.post(`${BaseUrl}/api/reset/password`, {
      email: userData.email,
      newPassword: userData.newPassword
    })

    if (response.data) {
      return response.data;
    }

    return rejectWithValue('Reset Password Failed');

  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Reset Password failed');
  }

})





const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token') || null,
    isLoading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to register user";
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to Login user";
      })


      //Forgot Password 
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to Forgot Password";
      })

      // Verify OTP 
      .addCase(verifyOtp.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to Verify Otp";
      })

      // Reset Password
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Faild to Reset Password";
      })




  }
});

export default authSlice.reducer;
