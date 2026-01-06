import { useState } from 'react';
import IntroAnimation from '@/components/IntroAnimation';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import EventsSection from '@/components/sections/EventsSection';
import ScheduleSection from '@/components/sections/ScheduleSection';
import GallerySection from '@/components/sections/GallerySection';
import SponsorsSection from '@/components/sections/SponsorsSection';
import Footer from '@/components/Footer';
import AudioPlayer from '@/components/AudioPlayer';
import VecnaVeins from '@/components/VecnaVeins';
import StrangerThingsCharacters from '@/components/StrangerThingsCharacters';
import AnimatedVines from '@/components/AnimatedVines';
import MindFlayer from '@/components/MindFlayer';

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      {showIntro && (
        <IntroAnimation onComplete={() => setShowIntro(false)} />
      )}
      
      <div className={`min-h-screen bg-background transition-opacity duration-500 ${showIntro ? 'opacity-0' : 'opacity-100'}`}>
        {/* Stranger Things Atmosphere Elements */}
        <MindFlayer />
        <VecnaVeins />
        <AnimatedVines />
        <StrangerThingsCharacters />
        
        <Navbar />
        
        <main className="relative z-10">
          <HeroSection />
          <AboutSection />
          <EventsSection />
          <ScheduleSection />
          <GallerySection />
          <SponsorsSection />
        </main>

        <Footer />
        
        <AudioPlayer />
      </div>
    </>
  );
};

export default Index;
