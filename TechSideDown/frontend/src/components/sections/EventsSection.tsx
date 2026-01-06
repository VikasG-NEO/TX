import { motion, useInView } from 'framer-motion';
import { useRef, useState, useCallback } from 'react';
import NeonButton from '../NeonButton';
import EventRegistrationModal from '../EventRegistrationModal';
import EventCard from '../EventCard';

import { useQuery } from '@tanstack/react-query';
import { getEvents } from '@/lib/api';
import { toast } from 'sonner';

const EventsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Hover state is now handled within individual EventCard components
  // to prevent re-rendering the entire list.

  const { data: events, isLoading, error } = useQuery({
    queryKey: ['events'],
    queryFn: getEvents,
  });
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);

  const handleSelectEvent = useCallback((event: any) => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please login to register for events');
      setTimeout(() => {
        window.location.href = '/login';
      }, 1000);
      return;
    }
    setSelectedEvent(event);
  }, []);

  return (
    <section ref={ref} id="events" className="relative py-32 px-4 overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.1)_0%,transparent_70%)]" />

      <div className="relative max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-primary font-stranger tracking-[0.5em] text-sm">CHALLENGES AWAIT</span>
          <h2 className="text-5xl md:text-7xl font-display mt-4 neon-text-subtle text-primary">
            Ƨ⊥ИƎΛƎ
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Each event is a portal to prove your worth. Choose your battle wisely.
          </p>
        </motion.div>

        {/* Events Grid */}
        {isLoading ? (
          <div className="text-center text-white"></div>
        ) : error ? (
          <div className="text-center text-red-500"></div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events?.map((event: any, index: number) => (
              <EventCard
                key={event._id || event.id}
                event={event}
                index={index}
                isInView={isInView}
                onSelect={handleSelectEvent}
              />
            ))}
          </div>
        )}


      </div>
      {/* Registration Modal */}
      <EventRegistrationModal
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        eventName={selectedEvent?.title || ''}
        eventId={selectedEvent?._id || selectedEvent?.id || ''}
        eventFee={selectedEvent?.fee}
        eventDescription={selectedEvent?.description || ''}
      />
    </section>
  );
};

export default EventsSection;
