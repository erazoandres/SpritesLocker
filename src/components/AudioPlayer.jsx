import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, SkipForward, SkipBack, Music } from 'lucide-react';

const CHILL_PLAYLIST = [
  {
    title: 'Lofi Study Beats',
    url: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3'
  },
  {
    title: 'Midnight Chill',
    url: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a7315b.mp3?filename=chill-lofi-song-8444.mp3'
  },
  {
    title: 'Cozy Ambient',
    url: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=lofi-background-music-18158.mp3'
  },
  {
    title: 'Sunset Waves',
    url: 'https://cdn.pixabay.com/download/audio/2022/11/06/audio_c9a0b12753.mp3?filename=lofi-chill-medium-version-124968.mp3'
  },
  {
    title: 'Rainy Night Lofi',
    url: 'https://cdn.pixabay.com/download/audio/2023/04/18/audio_2d36d8d672.mp3?filename=rainy-day-lofi-147348.mp3'
  }
];

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const audioRef = useRef(null);

  // Attempt Autoplay with 10% volume on mount + fallback on first user gesture
  useEffect(() => {
    if (!audioRef.current) return;
    
    // Set volume strictly to 10% (0.10)
    audioRef.current.volume = 0.10;

    const startPlay = () => {
      if (!audioRef.current) return;
      audioRef.current.volume = 0.10;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Handle browser autoplay policies
      });
    };

    startPlay();

    // Listen for first interaction if autoplay policy blocked initial play
    const handleFirstGesture = () => {
      if (audioRef.current && audioRef.current.paused) {
        startPlay();
      }
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
    };

    window.addEventListener('click', handleFirstGesture);
    window.addEventListener('keydown', handleFirstGesture);
    window.addEventListener('touchstart', handleFirstGesture);

    return () => {
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
    };
  }, []);

  const currentTrack = CHILL_PLAYLIST[trackIndex];

  // Play / Pause toggle
  const togglePlay = (e) => {
    e?.stopPropagation();
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.volume = 0.10;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.warn('Playback error:', err);
      });
    }
  };

  // Change Track (Next / Previous)
  const changeTrack = (direction, e) => {
    e?.stopPropagation();
    let nextIndex;
    if (direction === 'next') {
      nextIndex = (trackIndex + 1) % CHILL_PLAYLIST.length;
    } else {
      nextIndex = (trackIndex - 1 + CHILL_PLAYLIST.length) % CHILL_PLAYLIST.length;
    }
    setTrackIndex(nextIndex);

    if (audioRef.current) {
      audioRef.current.src = CHILL_PLAYLIST[nextIndex].url;
      audioRef.current.volume = 0.10;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {});
    }
  };

  // Mute / Unmute toggle
  const toggleMute = (e) => {
    e?.stopPropagation();
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 select-none animate-fadeIn font-sans">
      <audio
        ref={audioRef}
        src={currentTrack.url}
        onEnded={(e) => changeTrack('next', e)}
        preload="auto"
      />

      <div className={`flex items-center gap-2.5 p-2 sm:px-3.5 sm:py-2 rounded-2xl border transition-all duration-300 shadow-2xl backdrop-blur-md ${
        isPlaying 
          ? 'bg-[#101322]/95 border-emerald-400/60 text-emerald-400 shadow-emerald-500/20 ring-2 ring-emerald-400/20' 
          : 'bg-[#101322]/85 border-white/10 hover:border-emerald-400/40 text-slate-300'
      }`}>
        
        {/* Animated Equalizer Sound Waves */}
        <div className="flex items-center gap-1 shrink-0" title="Volumen: 10%">
          {isPlaying ? (
            <div className="flex items-end gap-0.5 h-4 w-3.5">
              <span className="w-0.5 bg-emerald-400 rounded-full animate-[bounce_1s_infinite_100ms] h-2"></span>
              <span className="w-0.5 bg-emerald-400 rounded-full animate-[bounce_1s_infinite_300ms] h-4"></span>
              <span className="w-0.5 bg-emerald-400 rounded-full animate-[bounce_1s_infinite_200ms] h-3"></span>
            </div>
          ) : (
            <Music className="w-4 h-4 text-emerald-400" />
          )}
        </div>

        {/* Track Title Info */}
        <div className="hidden sm:flex flex-col justify-center max-w-[130px]">
          <span className="text-[10px] font-extrabold uppercase font-display leading-none tracking-wider truncate text-white">
            {currentTrack.title}
          </span>
          <span className="text-[9px] font-mono text-emerald-400/80 leading-none mt-0.5">
            VOL 10% · CANCIÓN {trackIndex + 1}/{CHILL_PLAYLIST.length}
          </span>
        </div>

        {/* Track Switcher & Playback Controls */}
        <div className="flex items-center gap-1 shrink-0">
          
          {/* Previous Track Button */}
          <button
            onClick={(e) => changeTrack('prev', e)}
            className="p-1 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition"
            title="Canción anterior"
          >
            <SkipBack className="w-3.5 h-3.5" />
          </button>

          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            className="w-7 h-7 rounded-lg bg-emerald-400 text-slate-950 flex items-center justify-center font-bold shadow-md shadow-emerald-500/20 active:scale-95 transition"
            title={isPlaying ? 'Pausar' : 'Reproducir (Volumen 10%)'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 fill-slate-950" /> : <Play className="w-3.5 h-3.5 fill-slate-950 ml-0.5" />}
          </button>

          {/* Next Track Button */}
          <button
            onClick={(e) => changeTrack('next', e)}
            className="p-1 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition"
            title="Siguiente canción"
          >
            <SkipForward className="w-3.5 h-3.5" />
          </button>

          {/* Mute Button */}
          <button
            onClick={toggleMute}
            className="p-1 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition ml-0.5"
            title={isMuted ? 'Activar sonido (10%)' : 'Silenciar'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
          </button>

        </div>

      </div>
    </div>
  );
}
