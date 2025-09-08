import React from 'react';
import { 
  Video, 
  Play, 
  Pause, 
  FastForward,
  Rewind,
  RotateCcw,
  Zap,
  Hexagon
} from "lucide-react";

const AuthImageLogin = ({ title, subtitle }) => {
  const hexagonElements = [
    { Icon: Video, size: "large", position: "center", delay: "0s" },
    { Icon: Play, size: "medium", position: "top-right", delay: "0.3s" },
    { Icon: Pause, size: "small", position: "bottom-left", delay: "0.6s" },
    { Icon: FastForward, size: "medium", position: "right", delay: "0.9s" },
    { Icon: Rewind, size: "small", position: "left", delay: "1.2s" },
    { Icon: RotateCcw, size: "medium", position: "bottom-right", delay: "1.5s" },
    { Icon: Zap, size: "small", position: "top-left", delay: "1.8s" }
  ];

  const getHexagonSize = (size) => {
    switch(size) {
      case 'small': return { container: 'w-16 h-16', icon: 'w-6 h-6' };
      case 'medium': return { container: 'w-20 h-20', icon: 'w-8 h-8' };
      case 'large': return { container: 'w-24 h-24', icon: 'w-10 h-10' };
      default: return { container: 'w-20 h-20', icon: 'w-8 h-8' };
    }
  };

  const getPosition = (position) => {
    const positions = {
      'center': 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
      'top-right': 'top-16 right-16',
      'bottom-left': 'bottom-16 left-16', 
      'right': 'top-1/2 right-12 transform -translate-y-1/2',
      'left': 'top-1/2 left-12 transform -translate-y-1/2',
      'bottom-right': 'bottom-20 right-20',
      'top-left': 'top-20 left-20'
    };
    return positions[position];
  };

  return (
    <section className="hidden  lg:flex flex-col bg-pink-700 items-center justify-center p-12 relative overflow-hidden">
      {/* Neon glow background effects */}
      <div className="absolute  inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-white/10 rounded-full blur-2xl" 
             style={{ animation: 'pulse 3s ease-in-out infinite' }}></div>
        <div className="absolute top-1/2 left-1/2 w-20 h-20 bg-pink-300/15 rounded-full blur-xl transform -translate-x-1/2 -translate-y-1/2"
             style={{ animation: 'pulse 2s ease-in-out infinite 1s' }}></div>
      </div>

      {/* Hexagonal connection lines */}
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
          </linearGradient>
        </defs>
        <line x1="50%" y1="50%" x2="85%" y2="20%" stroke="url(#lineGradient)" strokeWidth="1" opacity="0.6" />
        <line x1="50%" y1="50%" x2="15%" y2="80%" stroke="url(#lineGradient)" strokeWidth="1" opacity="0.6" />
        <line x1="50%" y1="50%" x2="85%" y2="50%" stroke="url(#lineGradient)" strokeWidth="1" opacity="0.6" />
        <line x1="50%" y1="50%" x2="15%" y2="50%" stroke="url(#lineGradient)" strokeWidth="1" opacity="0.6" />
      </svg>

      {/* Hexagonal elements */}
      <div className="relative" style={{ zIndex: 2 }}>
        {hexagonElements.map(({ Icon, size, position, delay }, i) => {
          const { container, icon } = getHexagonSize(size);
          return (
            <div
              key={i}
              className={`absolute ${getPosition(position)} ${container} flex items-center justify-center`}
              style={{
                animation: `hexFloat 3s ease-in-out infinite ${delay}`,
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                background: position === 'center' 
                  ? 'rgba(255, 255, 255, 0.15)' 
                  : 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: position === 'center' 
                  ? '0 0 30px rgba(255, 255, 255, 0.2)' 
                  : '0 0 15px rgba(255, 255, 255, 0.1)'
              }}
            >
              <Icon 
                className={`${icon} ${position === 'center' ? 'text-white' : 'text-pink-100'}`} 
                strokeWidth={1.5} 
              />
            </div>
          );
        })}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center mt-32">
        <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
          {title}
        </h2>
        <p className="text-pink-100 text-lg leading-relaxed max-w-sm mx-auto mb-8">
          {subtitle}
        </p>

        
      </div>

      <style jsx>{`
        @keyframes hexFloat {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(5deg);
          }
        }
      `}</style>
    </section>
  );
};

export default AuthImageLogin;
