
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const api = axios.create({ baseURL: BASE_URL });

// Handle API errors
function handleError(error, operation) {
  console.error(`❌ Error ${operation}:`, error);
  throw error;
}

// Fetch paginated list of videos
export async function fetchVideos(page = 1, limit = 10) {
  try {
    const { data } = await api.get(`/api/videos`, { params: { page, limit } });
    return data;
  } catch (error) {
    handleError(error, "fetching videos");
  }
}

// Fetch single video by ID
export async function fetchVideoById(id) {
  try {
    const { data } = await api.get(`/api/videos/${id}`);
    return data;
  } catch (error) {
    handleError(error, `fetching video with id ${id}`);
  }
}

// Fetch all videos by category (excluding a specific video ID)
export async function fetchVideosByCategory(category, excludeId) {
  try {
    const { data } = await api.get(`/api/videos`, { params: { category } });
    return data.videos.filter((video) => video._id !== excludeId);
  } catch (error) {
    handleError(error, "fetching category videos");
  }
}

// Search videos by title (with pagination)
export async function searchVideos(query, page = 1, limit = 10) {
  try {
    const { data } = await api.get(`/api/videos`, { params: { title: query, page, limit } });
    return data;
  } catch (error) {
    handleError(error, `searching videos for "${query}"`);
  }
}