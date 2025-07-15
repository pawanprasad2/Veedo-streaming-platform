function SearchResults({
  results,
  isSearching,
  onClickVideo,
  searchQuery,
  isMobile = false,
}) {
  if (!searchQuery.trim()) return null;

  const containerClass = isMobile
    ? "max-h-64 overflow-y-auto "
    : "absolute top-full left-0 p-1  w-full bg-[#1a1a1c] border border-gray-600 rounded-xl mt-1 max-h-96 overflow-y-auto shadow-2xl z-50";

  if (isSearching) {
    return (
      <div className={containerClass}>
        <div className="p-4 text-center ">
          <div className="animate-spin h-6 w-6 border-b-2 border-[#e473ff] rounded-full mx-auto mb-2" />
          <p className="text-gray-400">Searching...</p>
        </div>
      </div>
    );
  }

  if (!results.length) {
    return (
      <div className={containerClass}>
        <div className="p-4 text-center text-gray-400">
          No videos found for "{searchQuery}"
        </div>
      </div>
    );
  }

  return (
    <div className={containerClass}>
      {results.map((video) => (
        <div
          key={video._id}
          onClick={() => onClickVideo(video._id)}
          className="flex items-center gap-3 p-3 hover:bg-[#2a2a2c] cursor-pointer border-b border-gray-700 last:border-b-0 transition-colors"
        >
          <div className="w-16 h-12 bg-gray-800 rounded-md flex-shrink-0 overflow-hidden relative flex items-center justify-center">
            <svg
              className="w-6 h-6 text-gray-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-sm font-medium text-white line-clamp-1 group-hover:text-blue-400 transition-colors duration-200">
              {video.title}
            </h4>
            <p className="text-xs text-gray-400">{video.category}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SearchResults;
