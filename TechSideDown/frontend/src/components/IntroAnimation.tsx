import { useState, useEffect, useMemo, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IntroAnimationProps {
  onComplete: () => void;
}

// Pre-generate vein paths at module level to avoid computation on mount
const generateVeinPath = (startX: number, startY: number, length: number, direction: number) => {
  let path = `M ${startX} ${startY}`;
  let x = startX;
  let y = startY;
  
  for (let i = 0; i < length; i++) {
    const dx = Math.cos(direction) * (15 + Math.random() * 10);
    const dy = Math.sin(direction) * (15 + Math.random() * 10);
    direction += (Math.random() - 0.5) * 0.5;
    x += dx;
    y += dy;
    path += ` Q ${x - dx/2 + (Math.random() - 0.5) * 8} ${y - dy/2 + (Math.random() - 0.5) * 8} ${x} ${y}`;
  }
  
  return path;
};

// Static vein data - computed once
const STATIC_VEINS = [
  { path: generateVeinPath(0, 200, 8, 0.3), delay: 0 },
  { path: generateVeinPath(0, 500, 10, 0.1), delay: 0.4 },
  { path: generateVeinPath(1920, 250, 9, Math.PI - 0.2), delay: 0.2 },
  { path: generateVeinPath(1920, 450, 8, Math.PI + 0.1), delay: 0.6 },
];

const IntroAnimation = memo(({ onComplete }: IntroAnimationProps) => {
  const [phase, setPhase] = useState<'zoom' | 'reveal' | 'subtitle' | 'fadeout'>('zoom');
  const title = "TECHXPRESSION";
  const subtitle = "THE TECHSIDE DOWN";

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase('reveal'), 300),
      setTimeout(() => setPhase('subtitle'), 3500),
      setTimeout(() => setPhase('fadeout'), 5000),
      setTimeout(() => onComplete(), 6000),
    ];

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  // Reduced particles with CSS animation
  const particles = useMemo(() => 
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 8 + 8,
      delay: Math.random() * 3,
    })), []
  );

  return (
    <AnimatePresence>
      {phase !== 'fadeout' ? (
        <motion.div
          className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden will-change-transform"
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Simple dark background */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0000] to-black" />
          
          {/* Red fog - simplified */}
          <div 
            className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-red-900/20 rounded-full opacity-40"
            style={{ filter: 'blur(80px)' }}
          />

          {/* Particles with CSS animation */}
          <div className="absolute inset-0 overflow-hidden">
            {particles.map((particle) => (
              <div
                key={particle.id}
                className="absolute rounded-full bg-red-500 animate-intro-particle"
                style={{
                  left: `${particle.x}%`,
                  width: particle.size,
                  height: particle.size,
                  boxShadow: '0 0 4px rgba(239, 68, 68, 0.6)',
                  animationDuration: `${particle.duration}s`,
                  animationDelay: `${particle.delay}s`,
                }}
              />
            ))}
          </div>

          {/* Vecna Veins - simplified */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-[5]">
            <defs>
              <filter id="intro-vein-glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            {STATIC_VEINS.map((vein, i) => (
              <path
                key={i}
                d={vein.path}
                fill="none"
                stroke="rgba(220, 38, 38, 0.6)"
                strokeWidth="2"
                filter="url(#intro-vein-glow)"
                className={`animate-intro-vein ${phase !== 'zoom' ? 'opacity-100' : 'opacity-0'}`}
                style={{
                  animationDelay: `${vein.delay}s`,
                  strokeDasharray: 1000,
                  strokeDashoffset: phase !== 'zoom' ? 0 : 1000,
                  transition: 'stroke-dashoffset 2s ease-out, opacity 0.5s',
                }}
              />
            ))}
          </svg>

          {/* Main Title Container */}
          <motion.div
            className="relative z-10 will-change-transform"
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ 
              scale: phase === 'zoom' ? 0.4 : 1,
              opacity: phase === 'zoom' ? 0 : 1,
            }}
            transition={{ 
              duration: 2.5,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            {/* Title */}
            <h1 className="relative text-center">
              <span className="sr-only">{title}</span>
              <span className="flex justify-center tracking-[0.15em]" aria-hidden="true">
                {title.split('').map((letter, index) => (
                  <span
                    key={index}
                    className={`inline-block text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-serif font-bold transition-all duration-500 ${
                      phase !== 'zoom' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                    style={{
                      fontFamily: "'EB Garamond', 'Times New Roman', serif",
                      color: 'transparent',
                      WebkitTextStroke: '1px #dc2626',
                      textShadow: `
                        0 0 20px rgba(220, 38, 38, 0.8),
                        0 0 40px rgba(220, 38, 38, 0.5),
                        0 0 60px rgba(220, 38, 38, 0.3)
                      `,
                      transitionDelay: `${index * 60}ms`,
                    }}
                  >
                    {letter}
                  </span>
                ))}
              </span>
            </h1>

            {/* Subtitle */}
            <div
              className={`mt-6 md:mt-8 text-center transition-all duration-700 ${
                phase === 'subtitle' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <p 
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl tracking-[0.5em] uppercase"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  color: '#991b1b',
                  textShadow: '0 0 20px rgba(220, 38, 38, 0.5)',
                }}
              >
                {subtitle}
              </p>
            </div>
          </motion.div>

          {/* Flickering lines - CSS only */}
          <div className="absolute left-0 right-0 h-px bg-red-600/20 top-[30%] animate-intro-flicker" />
          <div className="absolute left-0 right-0 h-px bg-red-600/20 top-[50%] animate-intro-flicker" style={{ animationDelay: '0.5s' }} />

          {/* Scanlines - static */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-[0.02]"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.02) 2px, rgba(255,255,255,0.02) 4px)',
            }}
          />

          {/* Vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,black_100%)]" />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
});

IntroAnimation.displayName = 'IntroAnimation';

export default IntroAnimation;
