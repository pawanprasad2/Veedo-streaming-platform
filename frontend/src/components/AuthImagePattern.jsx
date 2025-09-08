import React from 'react';
import { Video, Play, Camera, Film, User, Check } from "lucide-react";

const AuthImagePattern = ({ title, subtitle }) => {
  const videoIcons = [
    { Icon: Video, color: "white",  delay: "0s" },
    { Icon: Play, color: "white", delay: "0.15s" },
    { Icon: Camera, color: "white", delay: "0.3s" },
    { Icon: Film, color: "white", delay: "0.45s" },
    { Icon: Check, color: "white", delay: "0.6s" },
    { Icon: User, color: "white", delay: "0.75s" },
  ];

  return (
    <section className="hidden lg:flex flex-col bg-pink-700 items-center justify-center p-12 relative">
      <div className="grid grid-cols-3 gap-6 mb-10">
        {videoIcons.map(({ Icon, color, delay }, i) => (
          <div
            key={i}
            className="aspect-square rounded-xl bg-pink-50/10 flex items-center justify-center shadow-lg"
            style={{
              animation: `fadeInUp 0.6s ease-out ${delay} both`,
            }}
          >
            <Icon className={`w-8 h-8 text-${color}`} strokeWidth={1.5} />
          </div>
        ))}
      </div>
      <h2 className="text-3xl righteous-regular text-white mb-2">{title}</h2>
      <p className="text-pink-200 righteous-regular ">{subtitle}</p>
      <div className="flex gap-3 mt-6">
        <div className="flex righteous-regular items-center gap-1 text-xs text-white">
          <Camera className="w-4 h-4" /> <span>Video Power</span>
        </div>
        <div className="flex items-center righteous-regular gap-1 text-xs text-white">
          <Check className="w-4 h-4 " /> <span >Verified</span>
        </div>
      </div>
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </section>
  );
};

export default AuthImagePattern;
