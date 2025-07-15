// components/VideoCarousel.jsx
import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import VideoCard from './VideoCard';

const VideoCarousel = ({ videos, title, category }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(4);
  const carouselRef = useRef(null);

  // Calculate visible cards based on screen size
  useEffect(() => {
    const updateVisibleCards = () => {
      const width = window.innerWidth;
      if (width < 640) setVisibleCards(1);
      else if (width < 1024) setVisibleCards(2);
      else if (width < 1280) setVisibleCards(3);
      else setVisibleCards(4);
    };

    updateVisibleCards();
    window.addEventListener('resize', updateVisibleCards);
    return () => window.removeEventListener('resize', updateVisibleCards);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      const maxIndex = Math.max(0, videos.length - visibleCards);
      return Math.min(prevIndex + 1, maxIndex);
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const canGoNext = currentIndex < videos.length - visibleCards;
  const canGoPrev = currentIndex > 0;

  if (!videos || videos.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      {/* Category Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <div className="flex gap-2">
          <button
            onClick={prevSlide}
            disabled={!canGoPrev}
            className={`p-2 rounded-full transition-all duration-300 ${
              canGoPrev
                ? 'bg-pink-500 hover:bg-pink-600 text-white'
                : 'bg-gray-700 text-gray-500 cursor-not-allowed'
            }`}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextSlide}
            disabled={!canGoNext}
            className={`p-2 rounded-full transition-all duration-300 ${
              canGoNext
                ? 'bg-pink-500 hover:bg-pink-600 text-white'
                : 'bg-gray-700 text-gray-500 cursor-not-allowed'
            }`}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="relative overflow-hidden">
        <div
          ref={carouselRef}
          className="flex transition-transform duration-500 ease-in-out gap-4"
          style={{
            transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`,
          }}
        >
          {videos.map((video, index) => (
            <div
              key={video._id || index} // fixed: use _id as key if available
              className={`flex-shrink-0 ${
                visibleCards === 1 ? 'w-full' :
                visibleCards === 2 ? 'w-1/2' :
                visibleCards === 3 ? 'w-1/3' :
                'w-1/4'
              }`}
            >
              <VideoCard video={video} />
            </div>
          ))}
        </div>
      </div>


    </div>
  );
};

export default VideoCarousel;