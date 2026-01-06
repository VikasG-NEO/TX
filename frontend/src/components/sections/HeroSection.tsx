import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import NeonButton from '../NeonButton';
import Countdown from '../Countdown';
import AllEventsRegistrationModal from '../AllEventsRegistrationModal';
import { toast } from 'sonner';

const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [showRegistration, setShowRegistration] = useState(false);

  const handleRegisterClick = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please login to register for events');
      setTimeout(() => {
        window.location.href = '/login';
      }, 1000);
      return;
    }
    setShowRegistration(true);
  };

  const scrollToEvents = () => {
    const eventsSection = document.getElementById('events');
    if (eventsSection) {
      eventsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-dvh flex items-center justify-center overflow-hidden pt-16 pb-8 md:pt-0 md:pb-0">
      {/* Parallax Background */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 bg-gradient-to-b from-background via-background to-primary/10"
      />

      {/* Animated Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(220,38,38,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(220,38,38,0.03)_1px,transparent_1px)] bg-[size:100px_100px]" />

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 text-center px-4 max-w-5xl"
      >
        {/* Decorative Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="w-32 md:w-48 h-[2px] bg-primary mx-auto mb-4"
          style={{
            boxShadow: '0 0 10px hsl(var(--primary)), 0 0 20px hsl(var(--primary) / 0.5)'
          }}
        />

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-stranger tracking-[0.05em] sm:tracking-[0.1em] stranger-title mb-2"
        >
          TECHXPRESSION
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="text-lg sm:text-2xl md:text-4xl font-stranger tracking-[0.15em] sm:tracking-[0.3em] text-foreground/70 mb-8"
        >
          TECHSIDE <span className="upside-down text-primary">DOWN</span>
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 font-sans"
        >
          Enter the portal to the ultimate tech experience. Where innovation meets the unknown.
          Join us for a journey through code, creativity, and the extraordinary.
        </motion.p>

        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mb-10"
        >
          <p className="text-sm font-stranger tracking-[0.3em] text-muted-foreground mb-4">
            THE PORTAL OPENS IN
          </p>
          <Countdown />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <NeonButton variant="primary" size="lg" onClick={handleRegisterClick}>
            Register Now
          </NeonButton>
          <NeonButton variant="outline" size="lg" onClick={scrollToEvents}>
            Explore Events
          </NeonButton>
        </motion.div>

        <AllEventsRegistrationModal
          isOpen={showRegistration}
          onClose={() => setShowRegistration(false)}
        />

        {/* Event Date */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="mt-12 flex items-center justify-center gap-8 text-muted-foreground"
        >
          <div className="text-center">
            <div className="text-3xl font-display text-primary neon-text-subtle">30-31</div>
            <div className="text-sm font-stranger tracking-wider">JANUARY</div>
          </div>
          <div className="w-px h-12 bg-primary/30" />
          <div className="text-center">
            <div className="text-3xl font-display text-primary neon-text-subtle">2026</div>
            <div className="text-sm font-stranger tracking-wider">THE YEAR</div>
          </div>
          <div className="w-px h-12 bg-primary/30" />
          <div className="text-center">
            <div className="text-3xl font-display text-primary neon-text-subtle">2</div>
            <div className="text-sm font-stranger tracking-wider">DAYS</div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center pt-2"
        >
          <motion.div className="w-1 h-2 bg-primary rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;