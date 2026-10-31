import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";

export interface CaptionChunk {
  startFrame: number;
  endFrame: number;
  before: string;
  highlight: string;
  after?: string;
}

interface ViralCaptionProps {
  currentFrame: number;
  chunks: CaptionChunk[];
  bottomClass?: string;
}

export const ViralCaption: React.FC<ViralCaptionProps> = ({
  currentFrame,
  chunks,
  bottomClass = "bottom-20",
}) => {
  const { fps } = useVideoConfig();

  // Find active chunk
  const activeChunk = chunks.find(
    (c) => currentFrame >= c.startFrame && currentFrame < c.endFrame
  );

  if (!activeChunk) {
    return null;
  }

  const chunkAge = currentFrame - activeChunk.startFrame;

  // Spring entrance pop
  const popSpring = spring({
    frame: chunkAge,
    fps,
    config: { damping: 12, mass: 0.5, stiffness: 180 },
  });

  const scale = interpolate(popSpring, [0, 1], [0.82, 1]);
  const opacity = interpolate(popSpring, [0, 0.4, 1], [0, 1, 1]);

  return (
    <div
      className={`absolute ${bottomClass} left-0 right-0 z-50 flex justify-center items-center pointer-events-none px-6`}
      style={{
        transform: `scale(${scale})`,
        opacity,
      }}
    >
      {/* Premium viral caption pill inspired by Alex Hormozi / CapCut TikTok style */}
      <div className="bg-white/95 backdrop-blur-md px-6 py-3.5 rounded-2xl shadow-[0_12px_36px_rgba(0,0,0,0.35)] border-2 border-slate-200/90 flex items-center gap-2.5 flex-wrap justify-center max-w-2xl">
        {activeChunk.before && (
          <span className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            {activeChunk.before}
          </span>
        )}

        {/* Highlighted keyword in golden amber rounded pill */}
        <span className="text-3xl md:text-4xl font-black text-slate-950 bg-amber-400 px-3.5 py-1 rounded-xl shadow-sm inline-block">
          {activeChunk.highlight}
        </span>

        {activeChunk.after && (
          <span className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            {activeChunk.after}
          </span>
        )}
      </div>
    </div>
  );
};
