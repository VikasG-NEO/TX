import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import NeonButton from '../NeonButton';

const sponsors = {
  title: [
    { name: "TechCorp", logo: "TC" },
    { name: "InnovateLabs", logo: "IL" },
  ],
  gold: [
    { name: "CodeForge", logo: "CF" },
    { name: "DataStream", logo: "DS" },
    { name: "CloudNine", logo: "C9" },
  ],
  silver: [
    { name: "ByteWise", logo: "BW" },
    { name: "PixelPerfect", logo: "PP" },
    { name: "NetStack", logo: "NS" },
    { name: "DevHub", logo: "DH" },
  ],
};

const SponsorsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="sponsors" className="relative py-32 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />

      {/* Top Line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="relative max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-primary font-stranger tracking-[0.5em] text-sm">POWERED BY</span>
          <h2 className="text-5xl md:text-7xl font-display mt-4 neon-text-subtle text-primary">
            SPONSORS
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            The forces that make the portal possible. Partners in bridging dimensions.
          </p>
        </motion.div>

        {/* Title Sponsors */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-16"
        >
          <h3 className="text-center text-sm font-stranger tracking-[0.3em] text-muted-foreground mb-8">
            TITLE SPONSORS
          </h3>
          <div className="flex justify-center gap-8 flex-wrap">
            {sponsors.title.map((sponsor, index) => (
              <motion.div
                key={sponsor.name}
                whileHover={{ scale: 1.05 }}
                className="w-48 h-24 bg-card border border-primary/30 rounded-lg flex items-center justify-center neon-border group"
              >
                <span className="text-4xl font-display text-primary group-hover:neon-text transition-all">
                  {sponsor.logo}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Gold Sponsors */}




        {/* Become a Sponsor CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center mt-16 p-8 bg-card border border-border rounded-xl"
        >
          <h3 className="text-2xl font-display mb-4">Join the Portal</h3>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Become a sponsor and connect with 5000+ tech enthusiasts.
            Open the gateway to the next generation of innovators.
          </p>
          <NeonButton variant="primary">
            Become a Sponsor
          </NeonButton>
        </motion.div>
      </div>
    </section>
  );
};

export default SponsorsSection;
