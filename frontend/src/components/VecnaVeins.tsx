import { memo, useMemo } from 'react';

const VecnaVeins = memo(() => {
  // Pre-generate vein paths once
  const veins = useMemo(() => {
    const generateVeinPath = (startX: number, startY: number, length: number, direction: 'up' | 'down' | 'left' | 'right') => {
      let path = `M ${startX} ${startY}`;
      let x = startX;
      let y = startY;
      
      for (let i = 0; i < length; i++) {
        const variation = (i % 3) * 10 - 10;
        
        switch (direction) {
          case 'up': y -= 30; x += variation; break;
          case 'down': y += 30; x += variation; break;
          case 'left': x -= 30; y += variation; break;
          case 'right': x += 30; y += variation; break;
        }
        
        path += ` L ${x} ${y}`;
      }
      
      return path;
    };

    return [
      { path: generateVeinPath(0, 200, 15, 'right'), delay: 0 },
      { path: generateVeinPath(0, 600, 18, 'right'), delay: 1 },
      { path: generateVeinPath(1920, 300, 15, 'left'), delay: 0.5 },
      { path: generateVeinPath(1920, 700, 16, 'left'), delay: 1.5 },
      { path: generateVeinPath(500, 0, 12, 'down'), delay: 0.3 },
      { path: generateVeinPath(1400, 0, 14, 'down'), delay: 1.2 },
      { path: generateVeinPath(400, 1080, 12, 'up'), delay: 0.8 },
      { path: generateVeinPath(1500, 1080, 14, 'up'), delay: 1.8 },
    ];
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      <svg
        className="w-full h-full"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter id="vein-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {veins.map((vein, index) => (
          <path
            key={index}
            d={vein.path}
            fill="none"
            stroke="hsl(0, 72%, 40%)"
            strokeWidth="2"
            strokeLinecap="round"
            filter="url(#vein-glow)"
            className="animate-vein-pulse"
            style={{ animationDelay: `${vein.delay}s` }}
            opacity="0.5"
          />
        ))}
      </svg>
    </div>
  );
});

VecnaVeins.displayName = 'VecnaVeins';

export default VecnaVeins;
