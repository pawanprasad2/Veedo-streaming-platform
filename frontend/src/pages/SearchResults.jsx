import { Search } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

// Format duration like "2:35"
const formatDuration = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

// Format views like "1.5K" or "2M"
const formatViews = (views) => {
  if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M`;
  if (views >= 1_000) return `${(views / 1_000).toFixed(1)}K`;
  return views?.toString() || "0";
};

function SearchResults({ results, isSearching, onClose, onClickVideo, searchQuery, isMobile = false }) {
  if (!searchQuery.trim()) return null;

  const containerClass = isMobile
    ? "max-h-64 overflow-y-auto"
    : "absolute top-full left-0 w-full bg-[#1a1a1c] border border-gray-600 rounded-xl mt-1 max-h-96 overflow-y-auto shadow-2xl z-50";

  return (
    <div className={containerClass}>
      {isSearching ? (
        <div className="p-4 text-center">
          <div className="animate-spin h-6 w-6 border-b-2 border-[#e473ff] rounded-full mx-auto mb-2" />
          <p className="text-gray-400">Searching...</p>
        </div>
      ) : results.length ? (
        results.map((video) => (
          <div
            key={video._id}
            onClick={() => onClickVideo(video._id)}
            className="p-3 hover:bg-[#2a2a2c] cursor-pointer border-b border-gray-700 last:border-b-0 transition-colors"
          >
            <div className="flex gap-3">
              <div className="relative">
                <img src={video.thumbnail} alt={video.title} className={`object-cover rounded-lg ${isMobile ? "w-16 h-10" : "w-20 h-12"}`} />
                <span className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-xs px-1 rounded">
                  {formatDuration(video.duration)}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white text-sm font-medium truncate">{video.title}</h3>
                <p className="text-gray-400 text-xs truncate">{video.channelName || "Unknown Channel"}</p>
                <p className="text-gray-500 text-xs">
                  {formatViews(video.views)} views {video.createdAt && !isMobile && `• ${new Date(video.createdAt).toLocaleDateString()}`}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="p-4 text-center text-gray-400">No videos found for "{searchQuery}"</div>
      )}
    </div>
  );
}

export default SearchResults;
