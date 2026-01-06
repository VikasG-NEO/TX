import { memo } from 'react';
import upsideDownVines from '@/assets/upside-down-vines.png';

const AnimatedVines = memo(() => {
  return (
    <>
      {/* Top vines */}
      <div className="fixed top-0 left-0 right-0 z-20 pointer-events-none overflow-hidden h-[150px]">
        <img
          src={upsideDownVines}
          alt=""
          className="w-full h-[200px] object-cover object-bottom opacity-40 animate-vine-sway"
          style={{
            filter: 'brightness(0.4) saturate(1.5)',
            maskImage: 'linear-gradient(to bottom, black 20%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 20%, transparent 100%)',
          }}
        />
      </div>

      {/* Bottom vines */}
      <div className="fixed bottom-0 left-0 right-0 z-20 pointer-events-none overflow-hidden h-[150px]">
        <img
          src={upsideDownVines}
          alt=""
          className="w-full h-[200px] object-cover object-top opacity-30 rotate-180 animate-vine-sway-delayed"
          style={{
            filter: 'brightness(0.4) saturate(1.5)',
            maskImage: 'linear-gradient(to top, black 20%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to top, black 20%, transparent 100%)',
          }}
        />
      </div>

      {/* Left side vines */}
      <div className="fixed top-0 left-0 bottom-0 z-20 pointer-events-none overflow-hidden w-[100px]">
        <img
          src={upsideDownVines}
          alt=""
          className="h-full w-[200px] object-cover object-right opacity-30 -rotate-90 animate-vine-sway-horizontal"
          style={{
            filter: 'brightness(0.4) saturate(1.5)',
            maskImage: 'linear-gradient(to right, black 20%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, black 20%, transparent 100%)',
          }}
        />
      </div>

      {/* Right side vines */}
      <div className="fixed top-0 right-0 bottom-0 z-20 pointer-events-none overflow-hidden w-[100px]">
        <img
          src={upsideDownVines}
          alt=""
          className="h-full w-[200px] object-cover object-left opacity-30 rotate-90 animate-vine-sway-horizontal-delayed"
          style={{
            filter: 'brightness(0.4) saturate(1.5)',
            maskImage: 'linear-gradient(to left, black 20%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to left, black 20%, transparent 100%)',
          }}
        />
      </div>
    </>
  );
});

AnimatedVines.displayName = 'AnimatedVines';

export default AnimatedVines;
