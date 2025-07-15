import React, { useState } from "react";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";
import { Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

function VideoCard({ video }) {
  const [showPlayer, setShowPlayer] = useState(false);
  const navigate = useNavigate();

  const playerOptions = {
    type: "video",
    sources: [{ src: video.url, type: "video/mp4" }],
  };

  // Handle play overlay click
  const handlePlayClick = (e) => {
    e.stopPropagation();
    setShowPlayer(true);
  };

  // Navigate to video page
  const handleCardClick = () => navigate(`/video/${video._id}`);

  return (
    <div
      onClick={handleCardClick}
      className="w-full rounded-2xl overflow-hidden bg-[#1a1a1a] shadow-lg hover:shadow-pink-500/20 transition-all duration-300 hover:-translate-y-1"
    >
      <div className="aspect-video relative group">
        {!showPlayer ? (
          <div className="relative w-full h-full bg-gray-800 cursor-pointer">
            {/* Always show fallback, remove thumbnail usage */}
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-800">
              <Play size={48} className="text-gray-400" />
            </div>
            {/* Play overlay */}
            <div
              className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none"
              onClick={handlePlayClick}
              style={{ pointerEvents: "auto" }}
            >
              <button
                className="bg-pink-500 hover:bg-pink-600 text-white p-4 rounded-full transition-all duration-300 hover:scale-110"
                tabIndex={-1}
                aria-hidden="true"
                type="button"
              >
                <Play size={24} fill="white" />
              </button>
            </div>
          </div>
        ) : (
          <Plyr
            source={playerOptions}
            options={{
              controls: [
                "play-large",
                "rewind",
                "fast-forward",
                "progress",
                "current-time",
                "mute",
                "volume",
                "settings",
                "fullscreen",
              ],
            }}
          />
        )}
      </div>
      {/* Video Info */}
      <div className="p-4">
        <h3 className="text-sm font-medium text-white text-center line-clamp-2">
          {video.title}
        </h3>
      </div>
    </div>
  );
}

export default VideoCard