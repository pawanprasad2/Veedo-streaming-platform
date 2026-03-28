import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";

export const fetchVideos = createAsyncThunk(
  "videos/fetchVideos",
  async ({ page = 1, limit = 20, category, title } = {}, thunkAPI) => {
    try {
      const params = { page, limit };
      if (category) params.category = category;
      if (title) params.title = title;

      const res = await axiosInstance.get("/videos", { params });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch videos"
      );
    }
  }
);

export const fetchVideoById = createAsyncThunk(
  "videos/fetchVideoById",
  async (videoId, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`/videos/${videoId}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch video"
      );
    }
  }
);

export const fetchVideosByCategory = createAsyncThunk(
  "videos/fetchVideosByCategory",
  async ({ category, excludeId, page = 1, limit = 20 }, thunkAPI) => {
    try {
      const res = await axiosInstance.get("/videos", {
        params: { category, page, limit },
      });

      const videos = Array.isArray(res.data?.videos) ? res.data.videos : [];
      return videos.filter((video) => video._id !== excludeId);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch related videos"
      );
    }
  }
);

const videoSlice = createSlice({
  name: "videos",
  initialState: {
    items: [],
    currentVideo: null,
    relatedVideos: [],
    isLoadingList: false,
    isLoadingVideo: false,
    isLoadingRelated: false,
    page: 1,
    hasMore: true,
    error: null,
  },
  reducers: {
    resetCurrentVideo(state) {
      state.currentVideo = null;
      state.relatedVideos = [];
      state.isLoadingVideo = false;
      state.isLoadingRelated = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideos.pending, (state) => {
        state.isLoadingList = true;
        state.error = null;
      })
      .addCase(fetchVideos.fulfilled, (state, action) => {
        const page = action.meta.arg?.page ?? 1;
        const limit = action.meta.arg?.limit ?? 20;
        const incoming = Array.isArray(action.payload?.videos)
          ? action.payload.videos
          : [];

        state.items = page === 1 ? incoming : [...state.items, ...incoming];
        state.page = page;
        state.hasMore = incoming.length === limit;
        state.isLoadingList = false;
      })
      .addCase(fetchVideos.rejected, (state, action) => {
        state.isLoadingList = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchVideoById.pending, (state) => {
        state.isLoadingVideo = true;
        state.error = null;
      })
      .addCase(fetchVideoById.fulfilled, (state, action) => {
        state.currentVideo = action.payload;
        state.isLoadingVideo = false;
      })
      .addCase(fetchVideoById.rejected, (state, action) => {
        state.currentVideo = null;
        state.isLoadingVideo = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchVideosByCategory.pending, (state) => {
        state.isLoadingRelated = true;
      })
      .addCase(fetchVideosByCategory.fulfilled, (state, action) => {
        state.relatedVideos = action.payload;
        state.isLoadingRelated = false;
      })
      .addCase(fetchVideosByCategory.rejected, (state, action) => {
        state.relatedVideos = [];
        state.isLoadingRelated = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { resetCurrentVideo } = videoSlice.actions;
export const selectVideos = (state) => state.videos;
export default videoSlice.reducer;
