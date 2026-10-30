import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface SubtitleBannerProps {
  text: string;
  reactionNote?: string;
  theme?: "normal" | "danger" | "success" | "brand";
}

export const SubtitleBanner: React.FC<SubtitleBannerProps> = ({
  text,
  reactionNote,
  theme = "normal",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  const translateY = interpolate(entrance, [0, 1], [40, 0]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);

  const borderColors = {
    normal: "border-amber-400/40 bg-slate-950/85 text-amber-50",
    danger: "border-red-500/60 bg-red-950/85 text-red-50 shadow-red-900/40",
    success: "border-emerald-400/50 bg-slate-950/85 text-emerald-50",
    brand: "border-blue-400/60 bg-slate-950/90 text-blue-50 shadow-blue-900/40",
  };

  return (
    <div
      style={{
        transform: `translateY(${translateY}px)`,
        opacity,
      }}
      className="absolute bottom-16 left-6 right-6 z-40 flex flex-col items-center gap-3"
    >
      {reactionNote && (
        <div className="px-5 py-2 rounded-full text-xl font-bold tracking-wide uppercase bg-amber-500/90 text-slate-950 shadow-lg border border-amber-300 animate-pulse backdrop-blur-md">
          {reactionNote}
        </div>
      )}

      <div
        className={`px-8 py-5 rounded-3xl border-2 shadow-2xl backdrop-blur-xl text-center max-w-4xl ${borderColors[theme]}`}
      >
        <p className="text-3xl font-extrabold leading-snug tracking-tight drop-shadow-md">
          {text}
        </p>
      </div>
    </div>
  );
};
