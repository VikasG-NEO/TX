import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlitchTextProps {
  children: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
}

const GlitchText = ({ children, className, as: Component = 'span' }: GlitchTextProps) => {
  return (
    <motion.div
      className="relative inline-block"
      whileHover="glitch"
    >
      <Component className={cn("relative z-10", className)}>
        {children}
      </Component>
      
      {/* Glitch layers */}
      <motion.span
        className={cn("absolute top-0 left-0 -z-10 text-cyan-500 opacity-0", className)}
        variants={{
          glitch: {
            opacity: [0, 0.8, 0, 0.8, 0],
            x: [-2, 2, -2, 2, 0],
            transition: { duration: 0.3, repeat: Infinity }
          }
        }}
        aria-hidden
      >
        {children}
      </motion.span>
      
      <motion.span
        className={cn("absolute top-0 left-0 -z-10 text-primary opacity-0", className)}
        variants={{
          glitch: {
            opacity: [0, 0.8, 0, 0.8, 0],
            x: [2, -2, 2, -2, 0],
            transition: { duration: 0.3, repeat: Infinity, delay: 0.05 }
          }
        }}
        aria-hidden
      >
        {children}
      </motion.span>
    </motion.div>
  );
};

export default GlitchText;
