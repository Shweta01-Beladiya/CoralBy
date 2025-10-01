// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// const BaseUrl = "http://localhost:9000";

// export const getAllUser = createAsyncThunk("fetchUser", async () => {
//     const response = await fetch(`${BaseUrl}/api/getAllnewUser`);
//     return response.json();
// })

// const userSlice = createSlice({
//     name: "user",
//     initialState: [{
//         isLoading: false,
//         data: null,
//         isError:false
//     }, {
//         extraReducers: (builder) => {
//             builder.addCase(getAllUser.pending, (state, action) => {
//                     state.isLoading = true;
//             });
//             builder.addCase(getAllUser.fulfilled, (state, action) => {
//                 state.isLoading = false;
//                 state.data = action.payload;
//             });
//             builder.addCase(getAllUser.fulfilled, (state, action) => {
//                 console.log("Error", action.payload);
//                 state.isError = true;
//             })
//         }
//     }],
//     reducers: {
//         addUser(state, action) { 
//             state.data.push(action.payload);
//         },
//         removeUser(state, action) { 
//             state.data = state.data.filter(user => user.id !== action.payload);
//         },
//     },
// });

// export default userSlice.reducer;