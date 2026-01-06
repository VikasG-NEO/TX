import { useRef, useEffect } from 'react';

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioSrc = "/audio/bgsong.mp3";

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
    }
  }, []);

  // Auto-play on mount
  useEffect(() => {
    const playAudio = async () => {
      if (audioRef.current) {
        try {
          await audioRef.current.play();
        } catch (error) {
          // Browser may block autoplay, add click listener to start
          const startAudio = () => {
            audioRef.current?.play();
            document.removeEventListener('click', startAudio);
          };
          document.addEventListener('click', startAudio);
        }
      }
    };
    playAudio();
  }, []);

  return <audio ref={audioRef} src={audioSrc} loop />;
};

export default AudioPlayer;
