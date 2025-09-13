import axios from "axios";
import { axiosInstance } from "../../lib/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const checkAuth = createAsyncThunk("auth/check", async (_, thunkAPI) => {
  try {
    const res = await axiosInstance.get("/users/checkauth");
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data || "error in checkAuth"
    );
  }
});

export const signup = createAsyncThunk("auth/signup", async (data, thunkAPI) => {
  try {
    const res = await axiosInstance.post("/users/register", data);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message);
  }
});

export const login = createAsyncThunk("auth/login", async (data, thunkAPI) => {
  try {
    const res = await axiosInstance.post("/users/login", data);
    return res.data;
  } catch (error) {
return thunkAPI.rejectWithValue(error.response?.data?.message);  }
});

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axiosInstance.post("/users/logout");
    return null;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    authUsers: null,
    isSigningup: false,
    isLoggingIn: false,
    isCheckingAuth: true,
  },
  reducers: {},
});

extraReducers:(builder)=>{
    builder
    //checkAuth
    .addcase(checkAuth.pending,(state)=>{
      state.isCheckingAuth=true
    })
    .addcase(checkAuth.fulfilled,(state,action)=>{
      state.authUsers=action.payload
      state.isCheckingAuth=false
    })
    .addcase(checkAuth.rejected,(state,action)=>{
      state.authUsers=null
      state.isCheckingAuth=false
    })

    //signup
    .addcase(signup.pending,(state)=>{
      state.isSigningup=true
    })
    .addcase(signup.fulfilled,(state,action)=>{
      state.isSigningup=false
      state.authUsers=action.payload.user
    })
    .addcase(signup.rejected,(state,action)=>{
      state.isSigningup=false
    })

    //login
    .addcase(login.pending,(state)=>{
      state.isLoggingIn=true
    })
    .addcase(login.fulfilled,(state,action)=>{
      state.authUsers=false
      state.authUsers=state.payload.user
    })
    .addcase(login.rejected,(state,action)=>{
      state.isLoggingIn=false
    })


    //logout
    

}
export const userAuth= (state)=>state.auth
export default authSlice.reducer