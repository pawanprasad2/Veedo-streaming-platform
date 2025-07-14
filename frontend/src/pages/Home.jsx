import React from "react";
import VideoGallery from "../components/VideoGallery";
import { Play, Users, Video } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  const features = [
    {
      icon: Play,
      title: "Stream Together",
      desc: "Watch videos with friends in real-time",
    },
    {
      icon: Users,
      title: "Watch Parties",
      desc: "Create or join a watch party with friends",
    },
    {
      icon: Video,
      title: "Any Device",
      desc: "Works on desktop, mobile, and tablet",
    },
  ];

  return (
    <div className="w-full mt-18 animate-fade-in">
      {/* Hero Section */}
      <div className="w-full flex flex-col lg:flex-row h-auto text-white righteous-regular mb-12 rounded-2xl p-4 sm:p-6 lg:p-12">
        <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-6 animate-slide-in-left">
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight">
            Your Screen. Your Squad. Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">Veedo</span>.
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed">
            Host movie nights, stream your videos, and watch anything together — from anywhere. Veedo turns every screen into a shared experience.
          </p>
        </div>
        <div className="w-full lg:w-1/2 flex justify-center items-center mt-8 lg:mt-0 animate-slide-in-right">
          <div className="relative w-full max-w-md">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl blur-xl opacity-30 animate-pulse"></div>
            <div className="relative bg-[#1a1a1a] rounded-2xl p-6 sm:p-8 border border-gray-800 hover:border-pink-500 transition-all duration-300">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="text-center space-y-2 animate-fade-in-up hover:scale-105 transition-transform duration-300"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <feature.icon className="w-6 sm:w-8 h-6 sm:h-8 text-pink-500 mx-auto" />
                    <h3 className="text-sm font-semibold">{feature.title}</h3>
                    <p className="text-xs text-gray-400">{feature.desc}</p>
                    {feature.title === 'Watch Parties' && (
                      <Link
                        to="/watch-party"
                        className="inline-block mt-2 px-3 py-2 bg-pink-500 hover:bg-pink-700 text-white text-xs font-semibold rounded-lg shadow transition-all duration-300 hover:scale-105"
                      >
                        Go to Watch Parties
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Video Gallery Section */}
      <div className="animate-fade-in-up" style={{ animationDelay: '600ms' }}>
        <VideoGallery />
      </div>
      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slide-in-left { from { opacity: 0; transform: translateX(-50px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes slide-in-right { from { opacity: 0; transform: translateX(50px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes fade-in-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.8s ease-out; }
        .animate-slide-in-left { animation: slide-in-left 0.8s ease-out; }
        .animate-slide-in-right { animation: slide-in-right 0.8s ease-out; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out; opacity: 0; animation-fill-mode: forwards; }
      `}</style>
    </div>
  );
};

export default Home;