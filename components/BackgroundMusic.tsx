import React, { useState, useEffect, useRef } from "react";
import { Music, Volume2, VolumeX, Upload } from "lucide-react";
import { BACKGROUND_MUSIC_URL } from "../constants";

const BackgroundMusic: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3); // Default 30%
  const [isHovered, setIsHovered] = useState(false);
  const [audioSrc, setAudioSrc] = useState(BACKGROUND_MUSIC_URL);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;

      // Auto-play attempt
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            // Auto-play was prevented
            console.log(
              "Autoplay prevented by browser policy. User interaction required."
            );
            setIsPlaying(false);
          });
      }
    }
  }, []);

  // Reload audio when source changes
  useEffect(() => {
    if (audioRef.current && audioSrc !== BACKGROUND_MUSIC_URL) {
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch(console.error);
      }
    }
  }, [audioSrc]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setAudioSrc(objectUrl);
      setIsPlaying(true);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className="fixed bottom-8 left-8 z-50 flex items-center gap-3"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <audio ref={audioRef} src={audioSrc} loop />
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="audio/*"
        className="hidden"
      />

      {/* Control Container */}
      <div
        className={`
        flex items-center gap-2 bg-slate-900/80 backdrop-blur-md border border-emerald-500/30 rounded-full p-2 pr-4 transition-all duration-300 shadow-lg shadow-emerald-900/20
        ${
          isHovered ? "w-auto opacity-100" : "w-12 overflow-hidden hover:w-auto"
        }
      `}
      >
        <button
          onClick={togglePlay}
          className={`
            w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300
            ${
              isPlaying
                ? "bg-emerald-500 text-white animate-pulse-slow shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                : "bg-slate-700 text-slate-400 hover:text-white"
            }
          `}
        >
          {isPlaying ? (
            <Music
              className="w-4 h-4 animate-spin-slow"
              style={{ animationDuration: "3s" }}
            />
          ) : (
            <VolumeX className="w-4 h-4" />
          )}
        </button>

        {/* Expandable Controls */}
        <div
          className={`flex items-center gap-3 overflow-hidden transition-all duration-300 ${
            isHovered ? "max-w-[300px] opacity-100" : "max-w-0 opacity-0"
          }`}
        >
          <div className="flex flex-col min-w-[60px]">
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest whitespace-nowrap">
              {isPlaying ? "Đang phát" : "Tạm dừng"}
            </span>
            <span className="text-[10px] text-slate-400 whitespace-nowrap overflow-hidden text-ellipsis max-w-[80px]">
              {audioSrc === BACKGROUND_MUSIC_URL ? "Mặc định" : "C418 - Sweden"}
            </span>
          </div>

          <div className="h-8 w-[1px] bg-slate-700 mx-1"></div>

          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-slate-400" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              className="w-16 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500 hover:accent-emerald-400"
            />
          </div>

          <div className="h-8 w-[1px] bg-slate-700 mx-1"></div>

          <button
            onClick={triggerFileUpload}
            className="p-1.5 rounded-full hover:bg-slate-700 text-slate-400 hover:text-emerald-400 transition-colors"
            title="Upload nhạc (Admin)"
          >
            <Upload className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BackgroundMusic;
