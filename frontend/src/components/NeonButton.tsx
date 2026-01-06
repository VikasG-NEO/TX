import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface NeonButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const baseStyles = "relative font-display tracking-wider uppercase transition-all duration-300 overflow-hidden group";

const variants = {
  primary: "bg-primary text-primary-foreground neon-box hover:shadow-[0_0_30px_hsl(var(--neon-red)),0_0_60px_hsl(var(--neon-red)/0.5)]",
  outline: "bg-transparent border-2 border-primary text-primary neon-border hover:bg-primary/10",
  ghost: "bg-transparent text-primary hover:text-primary-foreground hover:bg-primary/20"
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg"
};

const NeonButton = ({ 
  children, 
  onClick, 
  className,
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false
}: NeonButtonProps) => {

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(baseStyles, variants[variant], sizes[size], disabled && 'opacity-50 cursor-not-allowed', className)}
      whileHover={disabled ? {} : { scale: 1.05 }}
      whileTap={disabled ? {} : { scale: 0.95 }}
    >
      {/* Glitch effect on hover */}
      <span className="relative z-10 group-hover:glitch">{children}</span>
      
      {/* Scan line effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/20 to-transparent"
        initial={{ y: '-100%' }}
        whileHover={{ y: '100%' }}
        transition={{ duration: 0.5, ease: 'linear' }}
      />
    </motion.button>
  );
};

export default NeonButton;
