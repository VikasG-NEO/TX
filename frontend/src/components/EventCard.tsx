import { motion } from 'framer-motion';
import { memo } from 'react';
import { Code, Gamepad2, Brain, Mic, Trophy, LucideIcon } from 'lucide-react';
import NeonButton from './NeonButton';

const iconMap: Record<string, LucideIcon> = {
  "Hackathon": Code,
  "AI Exhibition": Brain,
  "Vecna Hunt": Gamepad2,
  "E-Sports": Trophy,
  "Upside-Down Coding": Code,
  "Capture The Flag": Brain,
  "Techstar Unplugged": Mic
};

const difficultyColors: Record<string, string> = {
  "Medium": "text-green-400",
  "Hard": "text-yellow-400",
  "Expert": "text-orange-400",
  "Nightmare": "text-primary",
  "Legendary": "text-purple-400"
};

interface EventCardProps {
  event: any;
  index: number;
  isInView: boolean;
  onSelect: (event: any) => void;
}

const EventCard = memo(({ event, index, isInView, onSelect }: EventCardProps) => {
  const Icon = iconMap[event.category] || Code;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-colors duration-500"
      whileHover="hover"
    >
      {/* Glow Background - Optimized with Framer Motion variants */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent"
        initial={{ opacity: 0 }}
        variants={{
          hover: { opacity: 1 }
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Content */}
      <div className="relative p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <span className={`text-xs font-stranger tracking-wider ${difficultyColors[event.difficulty]}`}>
            {event.difficulty}
          </span>
        </div>

        {/* Category */}
        <span className="text-xs text-muted-foreground font-stranger tracking-wider">
          {event.category}
        </span>

        {/* Title */}
        <h3 className="text-2xl font-display mt-2 mb-3 group-hover:text-primary transition-colors">
          {event.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4">
          {event.description}
        </p>

        {/* Duration */}
        {/* Duration & Fee */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex gap-6">
            <div>
              <span className="text-xs text-muted-foreground">Duration</span>
              <div className="text-xl font-display text-primary neon-text-subtle">
                {event.duration}
              </div>
            </div>
            {event.fee > 0 && (
              <div>
                <span className="text-xs text-muted-foreground">Entry Fee</span>
                <div className="text-xl font-display text-primary neon-text-subtle">
                  ₹{event.fee}
                </div>
              </div>
            )}
          </div>
          <NeonButton
            variant="ghost"
            size="sm"
            onClick={() => onSelect(event)}
          >
            Enter
          </NeonButton>
        </div>
      </div>

      {/* Animated Border - Optimized with scaleX (GPU) */}
      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-primary w-full origin-left"
        initial={{ scaleX: 0 }}
        variants={{
          hover: { scaleX: 1 }
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
});

export default EventCard;
