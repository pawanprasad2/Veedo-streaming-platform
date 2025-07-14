// services/api.js
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const api = axios.create({ baseURL: BASE_URL });

/**
 * Fetch paginated list of videos
 */
export const fetchVideos = async (page = 1, limit = 10) => {
  try {
    const { data } = await api.get(`/api/videos`, {
      params: { page, limit },
    });
    return data;
  } catch (err) {
    console.error("❌ Error fetching videos:", err);
    throw err;
  }
};

/**
 * Fetch single video by ID
 */
export const fetchVideoById = async (id) => {
  try {
    const { data } = await api.get(`/api/videos/${id}`);
    return data;
  } catch (err) {
    console.error(`❌ Error fetching video with id ${id}:`, err);
    throw err;
  }
};

/**
 * Fetch all videos by category (excluding a specific video ID)
 */
export const fetchVideosByCategory = async (category, excludeId) => {
  try {
    const { data } = await api.get(`/api/videos`, {
      params: { category },
    });
    return data.videos.filter((v) => v._id !== excludeId);
  } catch (err) {
    console.error(`❌ Error fetching category videos:`, err);
    throw err;
  }
};

/**
 * Search videos by title (with pagination)
 */
export const searchVideos = async (query, page = 1, limit = 10) => {
  try {
    const { data } = await api.get(`/api/videos`, {
      params: { title: query, page, limit },
    });
    return data;
  } catch (err) {
    console.error(`❌ Error searching videos for "${query}":`, err);
    throw err;
  }
};
