"use client";

import * as React from "react";
import { Play, Pause, Volume2, VolumeX, Maximize2 } from "lucide-react";

export function VideoSection() {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [showControls, setShowControls] = React.useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn("Playback error:", err);
        });
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration || 60);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = pos * duration;
    setCurrentTime(pos * duration);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const formatTime = (timeInSeconds: number) => {
    const mins = Math.floor(timeInSeconds / 60);
    const secs = Math.floor(timeInSeconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <section className="w-full py-12 bg-white">
      <div className="max-w-[1280px] mx-auto px-6 flex flex-col gap-6">
        {/* Section Header */}
        <div className="flex flex-col gap-1">
          <h2 className="font-grotesque font-bold text-[28px] sm:text-[32px] leading-[40px] text-[#222325]">
            What success on Fix it looks like
          </h2>
          <p className="text-[15px] leading-[22px] text-[#62646A]">
            See how local professionals help bring home projects to life.
          </p>
        </div>

        {/* Video Player Container */}
        <div
          ref={containerRef}
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(isPlaying ? false : true)}
          className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-[16px] overflow-hidden bg-[#0A0A0A] border border-[#003912]/40 shadow-md group select-none"
        >
          {/* Subtle Top Green Accent Bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#003912] z-30" />

          {/* HTML5 Video Element */}
          <video
            ref={videoRef}
            src="/videos/construction.mp4"
            poster="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1800&q=80"
            playsInline
            loop
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
            onClick={togglePlay}
            className="w-full h-full object-cover cursor-pointer"
          />

          {/* Central Play/Pause Trigger Button */}
          {(!isPlaying || showControls) && (
            <button
              type="button"
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause video" : "Play video"}
              className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-[#003912]/90 hover:bg-[#003912] text-white flex items-center justify-center shadow-lg transition-all hover:scale-110 z-20 cursor-pointer"
            >
              {isPlaying ? (
                <Pause className="w-7 h-7 fill-white" />
              ) : (
                <Play className="w-7 h-7 fill-white ml-1" />
              )}
            </button>
          )}

          {/* Bottom Video Controls Bar */}
          <div
            className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/95 via-black/60 to-transparent flex flex-col gap-2.5 z-20 transition-opacity duration-300 ${
              showControls || !isPlaying ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Interactive Scrub Bar */}
            <div
              onClick={handleSeek}
              className="w-full h-2 bg-white/20 hover:h-2.5 rounded-full cursor-pointer relative flex items-center transition-all"
            >
              <div
                className="h-full bg-[#3DD6F2] rounded-full transition-all"
                style={{ width: `${progressPercent}%` }}
              />
              <div
                className="absolute w-3.5 h-3.5 bg-white rounded-full shadow-xs -ml-1.5 pointer-events-none"
                style={{ left: `${progressPercent}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-white text-[12px] pt-1">
              {/* Play/Pause & Timer */}
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={togglePlay}
                  className="hover:text-[#3DD6F2] transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 fill-current" />
                  ) : (
                    <Play className="w-4 h-4 fill-current" />
                  )}
                </button>
                <span className="font-mono">
                  {formatTime(currentTime)} / {formatTime(duration || 60)}
                </span>
              </div>

              {/* Volume & Fullscreen */}
              <div className="flex items-center gap-3.5">
                <button
                  type="button"
                  onClick={toggleMute}
                  aria-label={isMuted ? "Unmute" : "Mute"}
                  className="hover:text-[#3DD6F2] transition-colors"
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={toggleFullscreen}
                  aria-label="Fullscreen"
                  className="hover:text-[#3DD6F2] transition-colors"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
