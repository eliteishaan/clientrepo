'use client';

import { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { AdaptedAsset } from '@/lib/types/viewer';
import { useViewerStore } from '@/lib/store/useViewerStore';
import { clsx } from 'clsx';

export default function VideoRenderer({ asset, viewerId }: { asset: AdaptedAsset; viewerId: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const { viewers, setRendererState } = useViewerStore();
  const instance = viewers[viewerId];
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    setRendererState(viewerId, 'Ready');
  }, [viewerId, setRendererState]);

  useGSAP(() => {
    if (!containerRef.current) return;
    
    gsap.fromTo(containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: 'power2.out' }
    );
  }, { scope: containerRef });
  
  // Pause video if viewer goes offscreen or is paused by store
  useEffect(() => {
    if (instance?.isPaused && isPlaying && videoRef.current) {
      videoRef.current.pause();
    }
  }, [instance?.isPaused, isPlaying]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
    setRendererState(viewerId, 'Ready');
  };

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return '00:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    videoRef.current.currentTime = percentage * videoRef.current.duration;
  };

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full bg-black flex flex-col group overflow-hidden"
    >
      <video
        ref={videoRef}
        src={asset.sourceUrl}
        className="w-full h-full object-contain cursor-pointer"
        playsInline
        muted={isMuted}
        loop
        onClick={togglePlay}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />
      
      {/* Play/Pause Overlay Hint */}
      <div 
        className={clsx(
          "absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300",
          !isPlaying ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="w-16 h-16 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center border border-white/10">
          <svg className="w-6 h-6 text-white ml-1" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
      
      {/* Custom Video Controls HUD */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="max-w-5xl mx-auto flex items-center gap-6">
          
          <button 
            onClick={togglePlay}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors focus-ring shrink-0"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
          
          <div className="font-mono text-[10px] tracking-widest text-white/70 tabular-nums shrink-0 mt-0.5">
            {formatTime(currentTime)}
          </div>
          
          {/* Timeline */}
          <div 
            className="flex-1 h-1.5 bg-white/20 rounded-full cursor-pointer relative overflow-hidden group/timeline"
            onClick={handleTimelineClick}
          >
            <div 
              className="absolute top-0 left-0 h-full bg-accent transition-[width] duration-100 ease-linear"
              style={{ width: duration > 0 ? `${(currentTime / duration) * 100}%` : '0%' }}
            />
          </div>
          
          <div className="font-mono text-[10px] tracking-widest text-white/40 tabular-nums shrink-0 mt-0.5">
            {formatTime(duration)}
          </div>
          
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className="w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors focus-ring shrink-0"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 5L6 9H2v6h4l5 4V5z M23 9l-6 6 M17 9l6 6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 5L6 9H2v6h4l5 4V5z M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </button>
          
        </div>
      </div>
    </div>
  );
}
