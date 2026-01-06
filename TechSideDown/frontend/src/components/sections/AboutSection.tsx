import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Cpu, Zap, Globe, Users } from 'lucide-react';

const features = [
  {
    icon: Cpu,
    title: "Technical Event",
    description: "Innovative technology-driven events focused on problem-solving, coding, and real-world applications.."
  },
  {
    icon: Zap,
    title: "Hackathons",
    description: "An intense 25-hour technical challenge where teams build creative solutions using AI, web, data, and automation."
  },
  {
    icon: Globe,
    title: "Escape From Upside",
    description: "A pop-culture themed escape room experience with puzzles, clues, and logic inspired by a mysterious upside-down world."
  },
  {
    icon: Users,
    title: "Carnival 011",
    description: "A cultural celebration featuring music, dance, open mic performances, and creative showcases."
  }
];

const AboutSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="about" className="relative py-32 px-4 overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
      
      {/* Decorative Lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="relative max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-primary font-stranger tracking-[0.5em] text-sm">DISCOVER</span>
          <h2 className="text-5xl md:text-7xl font-display mt-4 neon-text-subtle text-primary">
            ABOUT THE TSƎℲ
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Step through the portal into a world where technology defies reality. 
            TechXpression brings together the brightest minds to explore the unknown.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative p-6 bg-card border border-border rounded-lg hover:border-primary/50 transition-all duration-300"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-primary/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
              
              {/* Icon */}
              <div className="relative mb-4">
                <feature.icon className="w-10 h-10 text-primary group-hover:animate-pulse" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-display text-foreground mb-2 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {feature.description}
              </p>

              {/* Corner Accent */}
              <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-primary/30 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-primary/30 rounded-bl-lg opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: "5000+", label: "Attendees" },
            { value: "50+", label: "Events" },
            { value: "3", label: "Days" },
            { value: "∞", label: "Memories" }
          ].map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl md:text-5xl font-display text-primary neon-text-subtle">
                {stat.value}
              </div>
              <div className="text-sm font-stranger tracking-wider text-muted-foreground mt-2">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
