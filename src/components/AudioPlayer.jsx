import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, SkipForward, SkipBack, Music } from 'lucide-react';

const BASE_PATH = import.meta.env.BASE_URL || '/';

const CHILL_PLAYLIST = [
  {
    title: 'Lofi Study Beats',
    url: `${BASE_PATH}audio/chill1.mp3`.replace(/\/+/g, '/')
  },
  {
    title: 'Midnight Chill',
    url: `${BASE_PATH}audio/chill2.mp3`.replace(/\/+/g, '/')
  },
  {
    title: 'Cozy Ambient',
    url: `${BASE_PATH}audio/chill3.mp3`.replace(/\/+/g, '/')
  }
];

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const audioRef = useRef(null);

  // Initial startup: set volume strictly to 5% (0.05) and attempt autoplay
  useEffect(() => {
    setIsMounted(true);
    if (!audioRef.current) return;
    
    audioRef.current.volume = 0.05;

    const startPlay = () => {
      if (!audioRef.current) return;
      audioRef.current.volume = 0.05;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Autoplay policy blocked initial playback until user gesture
      });
    };

    startPlay();

    // Listen for first interaction if browser blocked initial autoplay
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

  // Track change handler: reload local audio & play seamlessly at 5% volume
  useEffect(() => {
    if (!isMounted || !audioRef.current) return;
    const audio = audioRef.current;
    audio.volume = 0.05;
    audio.load(); // Force HTML5 audio decoder to load new local track

    audio.play().then(() => {
      setIsPlaying(true);
    }).catch(err => {
      console.warn('Local track playback error:', err);
    });
  }, [trackIndex, isMounted]);

  const currentTrack = CHILL_PLAYLIST[trackIndex];

  // Play / Pause toggle
  const togglePlay = (e) => {
    e?.stopPropagation();
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.volume = 0.05;
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
        <div className="flex items-center gap-1 shrink-0" title="Volumen: 5%">
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
            VOL 5% · CANCIÓN {trackIndex + 1}/{CHILL_PLAYLIST.length}
          </span>
        </div>

        {/* Track Switcher & Playback Controls */}
        <div className="flex items-center gap-1 shrink-0">
          
          {/* Previous Track Button */}
          <button
            onClick={(e) => changeTrack('prev', e)}
            className="p-1.5 text-slate-300 hover:text-emerald-400 hover:bg-white/10 rounded-lg transition active:scale-90"
            title="Canción anterior"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            className="w-7 h-7 rounded-lg bg-emerald-400 text-slate-950 flex items-center justify-center font-bold shadow-md shadow-emerald-500/20 active:scale-95 transition"
            title={isPlaying ? 'Pausar' : 'Reproducir (Volumen 5%)'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 fill-slate-950" /> : <Play className="w-3.5 h-3.5 fill-slate-950 ml-0.5" />}
          </button>

          {/* Next Track Button */}
          <button
            onClick={(e) => changeTrack('next', e)}
            className="p-1.5 text-slate-300 hover:text-emerald-400 hover:bg-white/10 rounded-lg transition active:scale-90"
            title="Siguiente canción"
          >
            <SkipForward className="w-4 h-4" />
          </button>

          {/* Mute Button */}
          <button
            onClick={toggleMute}
            className="p-1 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition ml-0.5"
            title={isMuted ? 'Activar sonido (5%)' : 'Silenciar'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
          </button>

        </div>

      </div>
    </div>
  );
}
