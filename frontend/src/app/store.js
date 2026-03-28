import { configureStore } from "@reduxjs/toolkit";
import authReducer  from "../features/auth/authSlice";
import videoReducer from "../features/videos/videoSlice";
 
  const store =configureStore({
    reducer:{
        auth:authReducer,
        videos: videoReducer
    }
})


export default store
