import { memo } from 'react';

const MindFlayer = memo(() => {
  return (
    <div className="fixed inset-0 pointer-events-none z-5 overflow-hidden will-change-transform">
      {/* Sky glow effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(220,38,38,0.08)_0%,transparent_60%)]" />
      
      {/* Mind Flayer silhouette - CSS animation for performance */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[20%] animate-mind-flayer"
      >
        <svg
          width="800"
          height="600"
          viewBox="0 0 800 600"
          className="opacity-[0.15]"
          style={{ filter: 'blur(2px)' }}
        >
          {/* Main body */}
          <ellipse cx="400" cy="350" rx="80" ry="120" fill="hsl(0, 50%, 20%)" />
          
          {/* Head */}
          <ellipse cx="400" cy="200" rx="60" ry="70" fill="hsl(0, 50%, 18%)" />
          
          {/* Static tentacles - Left */}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <path
              key={`left-${i}`}
              d={`M ${380 - i * 10} ${300 + i * 30} Q ${250 - i * 40} ${350 + i * 50} ${100 - i * 30} ${450 + i * 40} Q ${50 - i * 20} ${500 + i * 30} ${-50 + i * 10} ${550 + i * 20}`}
              fill="none"
              stroke="hsl(0, 50%, 18%)"
              strokeWidth={12 - i}
              strokeLinecap="round"
            />
          ))}
          
          {/* Static tentacles - Right */}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <path
              key={`right-${i}`}
              d={`M ${420 + i * 10} ${300 + i * 30} Q ${550 + i * 40} ${350 + i * 50} ${700 + i * 30} ${450 + i * 40} Q ${750 + i * 20} ${500 + i * 30} ${850 - i * 10} ${550 + i * 20}`}
              fill="none"
              stroke="hsl(0, 50%, 18%)"
              strokeWidth={12 - i}
              strokeLinecap="round"
            />
          ))}
          
          {/* Upper tentacles */}
          {[0, 1, 2, 3].map((i) => (
            <path
              key={`upper-${i}`}
              d={`M ${370 + i * 20} ${200} Q ${350 + i * 25 - 50} ${100 - i * 20} ${320 + i * 40 - 30} ${20 - i * 10}`}
              fill="none"
              stroke="hsl(0, 50%, 18%)"
              strokeWidth={8 - i}
              strokeLinecap="round"
            />
          ))}
        </svg>
      </div>

      {/* Red lightning - CSS animation */}
      <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] animate-lightning-pulse">
        <svg width="100%" height="100%" viewBox="0 0 600 400">
          <path
            d="M 300 350 L 280 250 L 320 260 L 290 150 L 330 170 L 300 50"
            fill="none"
            stroke="hsl(0, 100%, 50%)"
            strokeWidth="2"
            filter="url(#lightning-glow)"
          />
          <defs>
            <filter id="lightning-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
        </svg>
      </div>

      {/* Reduced particles - only 10 */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px]">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/50 rounded-full animate-particle"
            style={{
              left: `${10 + i * 9}%`,
              top: `${10 + i * 8}%`,
              animationDelay: `${i * 0.4}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
});

MindFlayer.displayName = 'MindFlayer';

export default MindFlayer;
