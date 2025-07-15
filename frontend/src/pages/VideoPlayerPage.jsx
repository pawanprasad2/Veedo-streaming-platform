import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";
import "../page.css";
import { fetchVideoById, fetchVideosByCategory } from "../service/api";

const VideoPlayerPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadVideo = useCallback(async (videoId) => {
    try {
      const [videoData, relatedData] = await Promise.all([
        fetchVideoById(videoId),
        fetchVideoById(videoId).then((v) =>
          fetchVideosByCategory(v.category, videoId)
        ),
      ]);

      setVideo(videoData);
      setRelated(relatedData);
    } catch (error) {
      console.error("Error loading video:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    loadVideo(id);
  }, [id, loadVideo]);

  const handleVideoClick = useCallback(
    (videoId) => {
      navigate(`/video/${videoId}`);
    },
    [navigate]
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center  h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col  lg:flex-row gap-6 w-full  p-3  animate-fadeIn">
      {/* Player Section */}
      <div className="w-full  rounded-2xl p-1 lg:w-2/3 space-y-4">
        <div className="rounded-xl      ">
          <Plyr
            key={video._id} // Force re-render only when video changes
            source={{
              type: "video",
              sources: [{ src: video.url, type: "video/mp4" }],
            }}
          />
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl font-bold  p-2 rounded-xl bg-[#222222] text-white">
            {video.title}
          </h2>
          <div className="flex items-center gap-3 text-sm text-gray-400">
            <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-md text-xs">
              {video.category}
            </span>
          </div>
        </div>
      </div>

      {/* Related Videos */}
      <div className="w-full bg-[#1d1c1d] rounded-xl  lg:w-1/3">
        <h3 className="text-lg font-semibold p-2 text-white mb-2">
          Related Videos
        </h3>
        <div className="space-y-3    ">
          {related.map((v) => (
            <div
              key={v._id}
              onClick={() => handleVideoClick(v._id)}
              className="flex gap-3   p-3 rounded-lg hover:bg-gray-800/50 cursor-pointer transition-all duration-300 hover:scale-[1.02] group"
            >
              <div className="w-24 h-16  bg-gray-800 rounded-md flex-shrink-0 overflow-hidden relative">
                <div className="absolute   p-2 inset-0 flex items-center justify-center bg-gray-800">
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              <div className="min-w-0  p-2 flex-1">
                <h4 className="text-sm font-medium text-white line-clamp-2 group-hover:text-blue-400 transition-colors duration-200">
                  {v.title}
                </h4>
                <p className="text-xs text-gray-400 mt-1">{v.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerPage;
