import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { X } from 'lucide-react';

const galleryImages = [
  { id: 1, src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600", alt: "Tech conference crowd" },
  { id: 2, src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600", alt: "Hackathon coding" },
  { id: 3, src: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600", alt: "Team collaboration" },
  { id: 4, src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600", alt: "Stage presentation" },
  { id: 5, src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600", alt: "Night event" },
  { id: 6, src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600", alt: "Tech workspace" },
  { id: 7, src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600", alt: "Workshop session" },
  { id: 8, src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600", alt: "Group discussion" },
];

const GallerySection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);

  return (
    <section ref={ref} id="gallery" className="relative py-32 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(220,38,38,0.1)_0%,transparent_50%)]" />

      <div className="relative max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-stranger tracking-[0.5em] text-sm">MEMORIES FROM</span>
          <h2 className="text-5xl md:text-7xl font-display mt-4 neon-text-subtle text-primary">
            THE <span className="upside-down">PAST</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Glimpses from previous editions. Every photo tells a story from the upside down.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setSelectedImage(image)}
              className={`relative group cursor-pointer overflow-hidden rounded-lg ${
                index === 0 || index === 5 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover aspect-square transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Glitch Effect on Hover */}
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 group-hover:glitch transition-opacity" />
              
              {/* Red Tint */}
              <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />

              {/* Scanlines */}
              <div className="absolute inset-0 scanlines opacity-20" />
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="relative max-w-4xl max-h-[80vh]"
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="max-w-full max-h-[80vh] object-contain rounded-lg neon-border"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-4 -right-4 p-2 bg-primary rounded-full neon-box"
              >
                <X className="w-5 h-5 text-primary-foreground" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default GallerySection;
