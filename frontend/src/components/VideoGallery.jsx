import React, { useState, useEffect } from "react";
import VideoCarousel from "./VideoCarousel";

const categories = [
  { id: "all", name: "All Videos", filter: () => true },
  { id: "music", name: "Music", filter: (video) => video.category === "music" },
  {
    id: "coding",
    name: "Coding",
    filter: (video) => video.category === "coding",
  },
  {
    id: "entertainment",
    name: "Entertainment",
    filter: (video) => video.category === "entertainment",
  },
  {
    id: "education",
    name: "Education",
    filter: (video) => video.category === "education",
  },
];

function VideoGallery() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    loadVideos(1);
    // eslint-disable-next-line
  }, []);

  // Load videos for a given page
  async function loadVideos(pageNum) {
    setLoading(true);
    const res = await fetchVideos(pageNum, 20);
    const newVideos = Array.isArray(res?.videos) ? res.videos : [];
    setVideos(pageNum === 1 ? newVideos : (prev) => [...prev, ...newVideos]);
    setHasMore(newVideos.length === 20);
    setPage(pageNum);
    setLoading(false);
  }

  // Load more videos on button click
  function loadMoreVideos() {
    if (hasMore && !loading) loadVideos(page + 1);
  }

  if (loading && videos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mb-4"></div>
        <p className="text-gray-400">Loading videos...</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="space-y-8">
        {categories.map((cat) => {
          const vids = videos.filter(cat.filter);
          if (!vids.length) return null;
          return (
            <VideoCarousel
              key={cat.id}
              videos={vids}
              title={cat.name}
              category={cat.id}
            />
          );
        })}
      </div>
      {hasMore && (
        <div className="flex justify-center mt-8">
          <button
            onClick={loadMoreVideos}
            disabled={loading}
            className="bg-pink-500 hover:bg-pink-600 disabled:bg-gray-600 text-white px-8 py-3 rounded-lg flex items-center gap-2 transition-colors"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Loading...
              </>
            ) : (
              "Load More Videos"
            )}
          </button>
        </div>
      )}
    </div>
  );
}

export default VideoGallery;
