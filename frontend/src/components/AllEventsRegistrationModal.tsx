import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Code, Gamepad2, Brain, Palette, Mic, Trophy, Check } from 'lucide-react';
import NeonButton from './NeonButton';
import EventRegistrationModal from './EventRegistrationModal';

interface AllEventsRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const events = [
  {
    id: 1,
    icon: Code,
    title: "TECHXPRESSION × CSI HACKATHON",
    category: "Hackathon",
    description: "25 Hours | Jan 30–31 | IT Block. AI, Web, Data & Automation.",
    difficulty: "Nightmare"
  },
  {
    id: 2,
    icon: Brain,
    title: "THE NINA PROJECT",
    category: "AI Exhibition",
    description: "Jan 30–31 | Main Lawn / IoT Lab. AI, ML, automation models.",
    difficulty: "Expert"
  },
  {
    id: 3,
    icon: Gamepad2,
    title: "Escape Room",
    category: "Vecna Hunt",
    description: "Jan 30–31 | Rooms 208/209.  (Teams of 2).",
    difficulty: "Medium"
  },
  {
    id: 4,
    icon: Trophy,
    title: "PALACE ARCADE",
    category: "E-Sports",
    description: "Jan 30 | NR 309/310. Mobile gaming (Teams of 4).",
    difficulty: "Hard"
  },
  {
    id: 5,
    icon: Code,
    title: "PROJECT HAWKINS",
    category: "Upside-Down Coding",
    description: "Jan 31. Solo coding with inverted logic.",
    difficulty: "medium"
  },
  {
    id: 6,
    icon: Brain,
    title: "CLOSE THE GATES",
    category: "Capture The Flag",
    description: "Jan 31. Solo cybersecurity challenge.",
    difficulty: "Hard"
  },
  {
    id: 7,
    icon: Mic,
    title: "CARNIVAL 011",
    category: "Techstar Unplugged",
    description: "Jan 31 | Main Lawn. Cultural events & performances.",
    difficulty: "Medium"
  }
];

const difficultyColors: Record<string, string> = {
  "Medium": "text-green-400",
  "Hard": "text-yellow-400",
  "Expert": "text-orange-400",
  "Nightmare": "text-primary",
};

const AllEventsRegistrationModal = ({ isOpen, onClose }: AllEventsRegistrationModalProps) => {
  const [selectedEvent, setSelectedEvent] = useState<typeof events[0] | null>(null);

  if (selectedEvent) {
    return (
      <EventRegistrationModal
        isOpen={true}
        onClose={() => setSelectedEvent(null)}
        eventName={selectedEvent.title}
        eventId={selectedEvent.id.toString()}
      />
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
          >
            <div className="relative w-full max-w-3xl my-8 bg-card border border-primary/30 rounded-lg overflow-hidden shadow-2xl shadow-primary/20">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 pointer-events-none" />

              {/* Header */}
              <div className="relative p-6 border-b border-border">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <h2 className="text-2xl font-display text-primary neon-text-subtle">
                  SELECT AN EVENT
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Choose an event to register
                </p>
              </div>

              {/* Events List */}
              <div className="relative p-6 max-h-[60vh] overflow-y-auto">
                <div className="grid md:grid-cols-2 gap-4">
                  {events.map((event) => (
                    <motion.div
                      key={event.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedEvent(event)}
                      className="group relative bg-background/50 border border-border rounded-lg p-4 cursor-pointer hover:border-primary/50 transition-all duration-300"
                    >
                      {/* Glow on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />

                      <div className="relative flex items-start gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                          <event.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-muted-foreground font-stranger tracking-wider">
                              {event.category}
                            </span>
                            <span className={`text-xs font-stranger tracking-wider ${difficultyColors[event.difficulty]}`}>
                              {event.difficulty}
                            </span>
                          </div>
                          <h3 className="text-sm font-display group-hover:text-primary transition-colors">
                            {event.title}
                          </h3>
                          <p className="text-xs text-muted-foreground mt-1">
                            {event.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AllEventsRegistrationModal;