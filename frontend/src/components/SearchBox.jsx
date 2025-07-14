import React, { useEffect, useRef } from "react";
import { CiSearch } from "react-icons/ci";
import SearchResults from "../pages/SearchResults";

function SearchBox({
  isMobile = false,
  searchQuery,
  setSearchQuery,
  showResults,
  setShowResults,
  results,
  isSearching,
  onClickVideo,
  containerRef,
}) {
  const inputRef = useRef();

  useEffect(() => {
    if (isMobile && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isMobile]);

  return (
    <div
      ref={containerRef}
      className={isMobile ? "w-full p-4 bg-gradient-to-b from-[#0d0d0f] to-[#1a1a1c] border-t border-gray-700 shadow-2xl z-40" : "relative w-full"}
    >
      <div className="relative">
        <CiSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" size={20} />
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => searchQuery.trim() && setShowResults(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && results.length > 0) {
              onClickVideo(results[0]._id);
            }
          }}
          placeholder="Search videos, movies..."
          className="w-full p-3 pl-10 pr-10 rounded-xl text-white placeholder-gray-400 bg-gradient-to-r from-[#242527] to-[#2a2a2c] border border-gray-600 focus:ring-2 focus:ring-[#e473ff] transition-all duration-300"
        />
        {searchQuery && (
          <button onClick={() => setSearchQuery("")} className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-red-500 transition">×</button>
        )}
      </div>

      {showResults && (
        <SearchResults
          results={results}
          isSearching={isSearching}
          searchQuery={searchQuery}
          onClickVideo={onClickVideo}
          isMobile={isMobile}
        />
      )}
    </div>
  );
}

export default SearchBox;
