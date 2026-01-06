import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Countdown = () => {
  const targetDate = new Date('2026-01-30T00:00:00');
  
  const calculateTimeLeft = (): TimeLeft => {
    const difference = targetDate.getTime() - new Date().getTime();
    
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: 'DAYS', value: timeLeft.days },
    { label: 'HOURS', value: timeLeft.hours },
    { label: 'MINS', value: timeLeft.minutes },
    { label: 'SECS', value: timeLeft.seconds },
  ];

  return (
    <div className="flex items-center justify-center gap-3 md:gap-6">
      {timeUnits.map((unit, index) => (
        <motion.div
          key={unit.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="relative"
        >
          <div className="flex flex-col items-center">
            {/* Number Box */}
            <div className="relative w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-card border border-primary/30 rounded-lg flex items-center justify-center neon-border overflow-hidden">
              {/* Glowing Background */}
              <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent" />
              
              {/* Number */}
              <motion.span
                key={unit.value}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="relative text-3xl md:text-4xl lg:text-5xl font-display text-primary neon-text-subtle"
              >
                {String(unit.value).padStart(2, '0')}
              </motion.span>

              {/* Scan Line */}
              <motion.div
                className="absolute left-0 right-0 h-[1px] bg-primary/30"
                animate={{ top: ['0%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              />
            </div>

            {/* Label */}
            <span className="mt-2 text-xs md:text-sm font-stranger tracking-wider text-muted-foreground">
              {unit.label}
            </span>
          </div>

          {/* Separator */}
          {index < timeUnits.length - 1 && (
            <div className="absolute -right-2 md:-right-4 top-1/2 -translate-y-1/2 flex flex-col gap-1">
              <motion.div
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full bg-primary"
              />
              <motion.div
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
                className="w-1.5 h-1.5 rounded-full bg-primary"
              />
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default Countdown;
