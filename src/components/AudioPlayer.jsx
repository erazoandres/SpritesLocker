import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, Music } from 'lucide-react';

const AUDIO_PLAYLIST = [
  'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3',
  'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a7315b.mp3?filename=chill-lofi-song-8444.mp3'
];

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.4; // Soft background volume (40%)
    }
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.warn('Audio playback error:', err);
      });
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTrackEnded = () => {
    // Loop to next chill track
    const nextIndex = (currentTrackIndex + 1) % AUDIO_PLAYLIST.length;
    setCurrentTrackIndex(nextIndex);
    if (audioRef.current) {
      audioRef.current.src = AUDIO_PLAYLIST[nextIndex];
      audioRef.current.play().catch(() => {});
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 select-none animate-fadeIn font-sans">
      <audio
        ref={audioRef}
        src={AUDIO_PLAYLIST[currentTrackIndex]}
        loop={AUDIO_PLAYLIST.length === 1}
        onEnded={handleTrackEnded}
        preload="metadata"
      />

      <div 
        onClick={togglePlay}
        className={`flex items-center gap-2.5 p-2.5 sm:px-4 sm:py-2.5 rounded-2xl border cursor-pointer transition-all duration-300 shadow-2xl backdrop-blur-md ${
          isPlaying 
            ? 'bg-[#101322]/90 border-emerald-400/60 text-emerald-400 shadow-emerald-500/20 ring-2 ring-emerald-400/20' 
            : 'bg-[#101322]/80 border-white/10 hover:border-emerald-400/40 text-slate-300 hover:text-white'
        }`}
        title={isPlaying ? 'Pausar música chill' : 'Reproducir música chill de fondo'}
      >
        {/* Equalizer Wave / Icon */}
        <div className="flex items-center gap-1 shrink-0">
          {isPlaying ? (
            <div className="flex items-end gap-0.5 h-4 w-4">
              <span className="w-1 bg-emerald-400 rounded-full animate-[bounce_1s_infinite_100ms] h-2"></span>
              <span className="w-1 bg-emerald-400 rounded-full animate-[bounce_1s_infinite_300ms] h-4"></span>
              <span className="w-1 bg-emerald-400 rounded-full animate-[bounce_1s_infinite_200ms] h-3"></span>
            </div>
          ) : (
            <Music className="w-4 h-4 text-emerald-400" />
          )}
        </div>

        {/* Text Label */}
        <div className="hidden sm:flex flex-col justify-center">
          <span className="text-[11px] font-bold uppercase font-display leading-none tracking-wider">
            {isPlaying ? 'LOFI CHILL' : 'MÚSICA CHILL'}
          </span>
          <span className="text-[9px] font-mono text-slate-400 leading-none mt-0.5">
            {isPlaying ? 'REPRODUCIENDO' : 'HAZ CLIC PARA ESCUCHAR'}
          </span>
        </div>

        {/* Play/Pause Button */}
        <div className="w-6 h-6 rounded-lg bg-emerald-400/10 flex items-center justify-center text-emerald-400 shrink-0">
          {isPlaying ? <Pause className="w-3.5 h-3.5 fill-emerald-400" /> : <Play className="w-3.5 h-3.5 fill-emerald-400 ml-0.5" />}
        </div>

        {/* Mute Button */}
        {isPlaying && (
          <button
            onClick={toggleMute}
            className="p-1 text-slate-400 hover:text-white transition rounded-md hover:bg-white/10 shrink-0"
            title={isMuted ? 'Activar sonido' : 'Silenciar'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
          </button>
        )}
      </div>
    </div>
  );
}
