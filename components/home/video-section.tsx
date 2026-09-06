"use client";

import * as React from "react";
import Image from "next/image";
import { Play, Pause, Volume2, VolumeX, Maximize2 } from "lucide-react";

export function VideoSection() {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(false);

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

        {/* Video Player Mockup Container */}
        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-[16px] overflow-hidden bg-[#0A0A0A] border border-[#003912]/40 shadow-md group">
          {/* Subtle Top Green Accent Bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#003912] z-20" />

          {/* Background Video Thumbnail Frame */}
          <Image
            src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1800&q=80"
            alt="Local home restoration project"
            fill
            sizes="100vw"
            className="object-cover object-center opacity-75 group-hover:opacity-85 transition-opacity"
          />

          {/* Central Play Trigger */}
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? "Pause video" : "Play video"}
            className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-[#003912]/90 hover:bg-[#003912] text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110 z-20 cursor-pointer"
          >
            {isPlaying ? (
              <Pause className="w-7 h-7 fill-white" />
            ) : (
              <Play className="w-7 h-7 fill-white ml-1" />
            )}
          </button>

          {/* Bottom Video Controls Bar */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col gap-2 z-20">
            {/* Scrub Bar */}
            <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-[#3DD6F2] w-1/4 rounded-full" />
            </div>

            <div className="flex items-center justify-between text-white text-[12px] pt-1">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="hover:text-[#3DD6F2] transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                </button>
                <span className="font-mono">0:00 / 0:60</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsMuted(!isMuted)}
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
