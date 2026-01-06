import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Clock, MapPin } from 'lucide-react';

const days = [
  { id: 'day1', label: 'Day 1', date: 'Jan 30' },
  { id: 'day2', label: 'Day 2', date: 'Jan 31' },
];

const schedule: Record<string, Array<{
  time: string;
  title: string;
  venue: string;
  type: string;
}>> = {
  day1: [
    { time: "09:00", title: "Techxpression × CSI – Hackathon  ", venue: "1st Floor IT Building", type: "Hackathon (25 hours)" },
    { time: "10:30", title: "AI Exhibition ", venue: "Main Lawn / IOT Lab / Placement Cell", type: " The NINA Project" },
    { time: "12:00", title: "Escape Room ", venue: "Venue IT BLDG 208/209", type: "Escape from Upside  " },
    { time: "14:00", title: "E-Sports Tournament ", venue: "Venue : NR 310 /309", type: "Palace Arcade" },
    { time: "16:00", title: "Upside-Down Coding ", venue: "Quiz Hall", type: "Quiz" },
  
  ],
  day2: [
    
    { time: "11:00", title: "Escape Room ", venue: "Venue IT BLDG 208/209", type: "Escape from Upside  " },
    { time: "15:00", title: "Capture the Flag ", venue: "Main Arena", type: "Close the Gates" },
    { time: "17:00", title: "Upside-Down Coding ", venue: "Bvoc Lab", type: "Carnival 011  " },
    { time: "19:00", title: "Techstar Unplugged ", venue: "Main Lawn / Seminar Hall", type: "Ceremony" },
    { time: "21:00", title: "Award Ceremony", venue: "Seminar Hall", type: "Cere" },
  ],
};

const typeColors: Record<string, string> = {
  "Ceremony": "bg-purple-500/20 text-purple-400",
  "Hackathon": "bg-primary/20 text-primary",
  "Talk": "bg-blue-500/20 text-blue-400",
  "Workshop": "bg-green-500/20 text-green-400",
  "Gaming": "bg-orange-500/20 text-orange-400",
  "Social": "bg-pink-500/20 text-pink-400",
  "Quiz": "bg-yellow-500/20 text-yellow-400",
  "Design": "bg-cyan-500/20 text-cyan-400",
  "Speaking": "bg-indigo-500/20 text-indigo-400",
  "Demo": "bg-teal-500/20 text-teal-400",
  "Championship": "bg-amber-500/20 text-amber-400",
};

const ScheduleSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeDay, setActiveDay] = useState('day1');

  return (
    <section ref={ref} id="schedule" className="relative py-32 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />

      <div className="relative max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-stranger tracking-[0.5em] text-sm">TIMELINE</span>
          <h2 className="text-5xl md:text-7xl font-display mt-4 neon-text-subtle text-primary">
            Ǝ⅂UᗡƎHƆS
          </h2>
        </motion.div>

        {/* Day Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center gap-4 mb-12"
        >
          {days.map((day) => (
            <button
              key={day.id}
              onClick={() => setActiveDay(day.id)}
              className={`px-6 py-3 rounded-lg font-display text-lg transition-all duration-300 ${
                activeDay === day.id
                  ? 'bg-primary text-primary-foreground neon-box'
                  : 'bg-card border border-border hover:border-primary/50 text-foreground'
              }`}
            >
              <div>{day.label}</div>
              <div className="text-xs font-stranger opacity-70">{day.date}</div>
            </button>
          ))}
        </motion.div>

        {/* Schedule Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-primary/30" />

          {schedule[activeDay].map((item, index) => (
            <motion.div
              key={item.time + item.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative flex items-center gap-4 mb-8 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-4 md:left-1/2 w-3 h-3 -translate-x-1/2 bg-primary rounded-full neon-box z-10" />

              {/* Content Card */}
              <div className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                <div className="p-4 bg-card border border-border rounded-lg hover:border-primary/50 transition-all group">
                  {/* Type Badge */}
                  <span className={`inline-block px-2 py-1 text-xs rounded font-stranger ${typeColors[item.type]}`}>
                    {item.type}
                  </span>

                  {/* Title */}
                  <h3 className="text-lg font-display mt-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>

                  {/* Time & Venue */}
                  <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-primary" />
                      {item.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-primary" />
                      {item.venue}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScheduleSection;
